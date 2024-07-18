'use client';
import React, { useState } from 'react';
import Sidebar from './SideBar';
import Mainchat from './MainChat';
import { Chat } from '@/data/types';

const MainPage = () => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const handleNewChat = (newChat: Chat) => {
    setCurrentChat(newChat); 
  };
  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };
  return (
    <div className='bg-gray-900 w-full flex'>
      <Sidebar onNewChat={handleNewChat} onSelectChat={handleSelectChat} currentChatId={currentChat ? currentChat.id : null} />
      <Mainchat currentChat={currentChat} />
    </div>
  )
}

export default MainPage