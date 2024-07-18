import React, { useState, useEffect } from 'react';
import { Chat } from '@/data/types';

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isSelected, onClick }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.menu-container') && !target.closest('.group-edit')) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleMenu = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setMenuVisible(!menuVisible);
  };

  return (
    <li
      className={`group/item relative my-2 flex items-center justify-between rounded-xl p-2 text-sm cursor-pointer 
      ${isSelected ? 'bg-slate-100 text-black' : 'bg-gray-900 text-white hover:bg-slate-100 hover:text-black'}`}
      onClick={onClick}
    >
      <span className="truncate">{`Chat ${chat.id}`}</span>
      <a
        href="#"
        className="group-edit invisible relative flex items-center whitespace-nowrap rounded-full py-1 pl-4 pr-3 text-sm text-slate-500 transition hover:bg-slate-200 group-hover/item:visible"
        onClick={toggleMenu}
      >
        <span className="font-semibold transition group-hover/edit:text-gray-700">...</span>
      </a>

      {menuVisible && (
        <>
          <div className="fixed inset-0 z-40 bg-black opacity-30"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 menu-container">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Remove chat
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Modify name
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default ChatListItem;
