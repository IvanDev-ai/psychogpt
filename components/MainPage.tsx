'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import Mainchat from './MainChat';
import { Chat } from '@/data/types';

const MainPage = () => {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const handleNewChat = (newChat: Chat) => {
    setCurrentChat(newChat);
  };

  const handleSelectChat = (chat: Chat | null) => {
    setCurrentChat(chat)
  };

  const handleRemoveChat = (remove: boolean | null) => {
    if(remove === true){
      setCurrentChat(null);
    }
  };

  useEffect(() => {
    console.log('Current Chat Updated:', currentChat); 
  }, [currentChat]);

  return (
    <div className='bg-gray-900 w-full flex'>
      <Sidebar
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChat ? currentChat.id : null}
        onRemoveChat={handleRemoveChat}
      />
      <Mainchat
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
    </div>
  );
};

export default MainPage;
