import React from 'react';
import Image from 'next/image';

interface ChildHeaderProps {
  childName: string;
  avatar: string;
  level: number;
  progress: number;
  coins?: number;
}

const ChildHeader: React.FC<ChildHeaderProps> = ({
  childName = "Buddy",
  avatar = "/avatars/child-default.png",
  level = 1,
  progress = 0,
  coins = 0
}) => {
  return (
    <header className="bg-gradient-to-r from-indigo-50 to-blue-50 py-3 px-6 shadow-sm rounded-b-xl">
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

        {/* Coins */}
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
          <Image 
            src="/images/coin.png" 
            alt="Coins" 
            width={24} 
            height={24}
          />
          <span className="ml-2 font-bold text-yellow-600">{coins}</span>
        </div>
      </div>
    </header>
  );
};

export default ChildHeader;