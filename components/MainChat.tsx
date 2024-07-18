import React, { useState, useEffect } from 'react';
import { Chat, Message } from '@/data/types';
import { Chats } from '@/data/chats'
interface MainchatProps {
  currentChat: Chat | null;
}

const Mainchat: React.FC<MainchatProps> = ({ currentChat }) => {
  const [messages, setMessages] = useState<Message[]>(currentChat ? currentChat.message : []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.message);
    }
  }, [currentChat]);

  const handleSend = () => {
    if (currentChat && inputValue.trim() !== '' ) {
      const newMessage: Message = {
        id: messages.length + 1,
        message: inputValue,
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 w-full p-4">
      <div className="flex-1 overflow-y-auto p-4 bg-black shadow-lg rounded-lg">
        {currentChat ? (
          messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
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
          <input
            type="text"
            className="flex-1 p-2 border border-gray-800 text-white bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:border-gray-800"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="ml-2 bg-gray-700 text-gray-300 p-2 rounded-lg" onClick={handleSend}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Mainchat;
