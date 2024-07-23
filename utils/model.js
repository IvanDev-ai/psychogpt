import * as tf from '@tensorflow/tfjs';

// Cargar el modelo
export const loadModel = async () => {
  const model = await tf.loadGraphModel('/models/model.json');
  return model;
};

// Preprocesar el input y predecir
export const predict = async (inputText) => {
  const model = await loadModel();

  // Preprocesar el input
  const { inputTensor, attentionMask } = preprocessInput(inputText);

  // Hacer la predicción
  const prediction = await model.executeAsync({
    input_ids: inputTensor,
    attention_mask: attentionMask
  });

  // Procesar la salida
  const response = processOutput(prediction);

  return response;
};

// Preprocesamiento de input
const preprocessInput = (inputText) => {
  const specialTokens = {
    pad: "<pad>",
    bos: "<startofstring>",
    eos: "<endofstring>",
    bot: "<bot>:"
  };

  inputText = `${specialTokens.bos} ${inputText} ${specialTokens.bot}`;
  
  // Suponiendo que tienes un método de tokenización que convierte texto a IDs
  const inputIDs = tokenize(inputText);
  const inputTensor = tf.tensor([inputIDs], [1, inputIDs.length], 'int32');
  const attentionMask = tf.tensor([Array(inputIDs.length).fill(1)], [1, inputIDs.length], 'int32');

  return { inputTensor, attentionMask };
};

// Tokenización del texto
const tokenize = (text) => {
  // Implementa la tokenización usando el vocabulario del modelo
  // Aquí se muestra un ejemplo simple que necesitará ser adaptado
  // Para un tokenizer real, necesitas el vocabulario del modelo
  return Array.from(text).map(char => char.charCodeAt(0));
};

// Procesamiento de output
const processOutput = async (prediction) => {
  let logitsTensor = prediction.find(tensor => tensor.shape.includes(50257)); // Ajusta según el tamaño del vocabulario

  if (!logitsTensor) {
    throw new Error('Logits tensor not found in prediction');
  }

  const logitsArray = await logitsTensor.array();
  const outputIDs = logitsArray[0][0]; // Ajusta según la forma de logitsArray
  
  // Convertir IDs a texto usando un mapeo inverso desde IDs a tokens
  // Aquí se asume que tienes un método para convertir IDs a texto
  let outputText = idsToText(outputIDs);
  
  // Filtra los tokens especiales
  const specialTokens = ["<pad>", "<startofstring>", "<endofstring>", "<bot>:"];
  specialTokens.forEach(token => {
    outputText = outputText.replace(new RegExp(token, 'g'), '');
  });

  return outputText.trim();
};

// Convertir IDs a texto
const idsToText = (ids) => {
  // Implementa la conversión de IDs a texto usando el vocabulario del modelo
  return ids.map(id => String.fromCharCode(id)).join('');
};

// Ejemplo de uso
const example = async () => {
  const question = "¿Cómo estás?";
  const response = await predict(question);
  console.log("Response:", response);
};

example();
