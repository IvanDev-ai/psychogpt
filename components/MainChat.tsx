// /src/components/Mainchat.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message } from '@/data/types';
import { Chats } from '@/data/chats';
import { predict } from '../utils/model';

interface MainchatProps {
  currentChat: Chat | null;
  setCurrentChat: (chat: Chat) => void;
}

const Mainchat: React.FC<MainchatProps> = ({ currentChat, setCurrentChat }) => {
  const [messages, setMessages] = useState<Message[]>(currentChat ? currentChat.message : []);
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.message);
    }
  }, [currentChat]);

  const handleSend = async () => {
    if (currentChat && inputValue.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        message: inputValue,
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');

      const chatIndex = Chats.findIndex(chat => chat.id === currentChat.id);
      if (chatIndex !== -1) {
        Chats[chatIndex].message = updatedMessages;
      }

      const updatedChat = { ...currentChat, message: updatedMessages };
      setCurrentChat(updatedChat);

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      // Generar la respuesta de IA
      const aiResponse = await predict(inputValue);
      const responseMessage: Message = {
        id: updatedMessages.length + 1,
        message: aiResponse,
      };

      const finalMessages = [...updatedMessages, responseMessage];
      setMessages(finalMessages);

      if (chatIndex !== -1) {
        Chats[chatIndex].message = finalMessages;
      }

      setCurrentChat({ ...updatedChat, message: finalMessages });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 w-full p-4">
      <div className="flex-1 overflow-y-auto p-4 bg-black shadow-lg rounded-lg">
        {currentChat ? (
          messages.map((msg) => (
            <div key={msg.id} className={`mb-4 flex ${msg.id % 2 === 0 ? 'justify-end md:ml-60' : 'justify-start md:mr-60'}`}>
              <div className="bg-gray-700 text-white p-3 rounded-lg max-w-1/3 break-words whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Select a chat to see messages</div>
        )}
      </div>
      {currentChat && (
        <div className="mt-4 flex items-center">
          <textarea
            ref={textareaRef}
            className="flex-1 p-2 border border-gray-800 text-white bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-gray-800 resize-none overflow-hidden"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{ height: 'auto' }}
          />
          <button className="ml-2 bg-gray-700 text-gray-300 p-2 rounded-lg" onClick={handleSend}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Mainchat;
