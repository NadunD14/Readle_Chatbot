import React from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';

interface ProgressBarProps {
  progress: number; // 0-100
  level: number;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  level,
  animate = true 
}) => {
  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <Badge 
          text={`Level ${level}`} 
          type="level" 
          size="small"
        />
        <span className="text-indigo-700 font-medium">{validProgress}%</span>
      </div>
      
      <div className="h-6 bg-indigo-100 rounded-full overflow-hidden relative">
        {animate ? (
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${validProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ) : (
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${validProgress}%` }}
          />
        )}
        
        {/* Progress markers */}
        <div className="absolute inset-0 flex justify-between px-2">
          {[25, 50, 75].map((marker) => (
            <div 
              key={marker} 
              className="h-full w-0.5 bg-indigo-200"
              style={{opacity: marker <= validProgress ? 0.3 : 0.8}}
            />
          ))}
        </div>
      </div>
      
      {/* XP to next level */}
      <div className="mt-1 text-right text-xs text-indigo-600">
        {validProgress < 100 ? `${100 - validProgress} XP to Level ${level + 1}` : "Ready to level up!"}
      </div>
    </div>
  );
};

export default ProgressBar;