"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ChildHeaderProps {
  childName: string;
  avatar: string;
  level: number;
  progress: number;
  coins?: number;
}

const ChildHeader: React.FC<ChildHeaderProps> = ({
  childName = "Buddy",
  avatar = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
  level = 1,
  progress = 0,
  coins = 0
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-50 to-blue-50 py-3 px-6 shadow-sm rounded-b-xl relative">
      <div className="max-w-5xl mx-auto flex items-center">
        {/* Avatar and Name */}
        <div className="flex items-center">
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-indigo-200 bg-white">
              <Image 
                src={avatar} 
                alt={`${childName}'s avatar`} 
                width={56} 
                height={56}
                className="object-cover"
              />
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center border-2 border-white">
              {level}
            </div>
          </div>
          <h2 className="ml-3 text-xl font-bold text-indigo-800">
            Hi, {childName}!
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="ml-auto flex-grow max-w-md mx-4">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium text-indigo-700">Level {level}</span>
            <span className="ml-auto text-xs font-medium text-indigo-700">
              {progress}% to Level {level + 1}
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Coins */}
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
            {/* Using emoji or SVG instead of external image */}
            <div className="w-6 h-6 flex items-center justify-center text-xl">
              🪙
            </div>
            <span className="ml-2 font-bold text-yellow-600">{coins}</span>
          </div>

          {/* Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-white/50 transition-colors focus:outline-none"
            aria-label="Menu"
          >
            <svg 
              className="w-6 h-6 text-indigo-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-6 top-16 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
          <button 
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            My Rewards
          </button>
          <button 
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            My Progress
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default ChildHeader;