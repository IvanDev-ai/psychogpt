'use client';
import React, { useState } from 'react';
import BottomProfile from './ui/BottomProfile';
import ChatListItem from './ui/ChatListItem';
import { Chats } from '@/data/chats';
import { Chat } from '@/data/types';

interface SidebarProps {
  onNewChat: (newChat: Chat) => void;
  onSelectChat: (chat: Chat) => void;
  currentChatId: number | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewChat, onSelectChat, currentChatId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatItems, setChatItems] = useState<Chat[]>(Chats);

  const handleClick = () => {
    console.log(Chats)
    const newChat: Chat = {
      id: chatItems.length + 1,
      message: [{ id: 1, message: "Hey, how can I help you?" }],
    };
    setChatItems([...chatItems, newChat]);
     (newChat);
     Chats.push(newChat);
  };

  return (
    <div className="flex">
      <div
        className={`bg-black text-white fixed h-screen transition-all duration-300 z-10 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
      >
        <div className="flex flex-col items-center">
          <button className='w-[90%] bg-gray-900 my-4 rounded-xl p-2' onClick={handleClick}>+</button>
          <ul role="list" className='w-[90%] max-h-[80vh] overflow-y-auto hide-scrollbar'>
            {chatItems.map((chat) => (
              <ChatListItem 
                key={chat.id} 
                chat={chat} 
                isSelected={chat.id === currentChatId} 
                onClick={() => onSelectChat(chat)} 
              />
            ))}
          </ul>
          <BottomProfile />
        </div>
      </div>
      <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="ml-auto">
          <button className="bg-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
