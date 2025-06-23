import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  id: string;
  title: string;
  type: 'phonics' | 'spelling' | 'comprehension' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  description?: string;
}

const getTypeIcon = (type: ActivityCardProps['type']) => {
  switch (type) {
    case 'phonics':
      return '🔤';
    case 'spelling':
      return '✏️';
    case 'reading':
      return '📚';
    case 'comprehension':
      return '🧩';
    default:
      return '📝';
  }
};

const getTypeColor = (type: ActivityCardProps['type']) => {
  switch (type) {
    case 'phonics':
      return 'from-blue-400 to-indigo-500';
    case 'spelling':
      return 'from-green-400 to-teal-500';
    case 'reading':
      return 'from-purple-400 to-pink-500';
    case 'comprehension':
      return 'from-yellow-400 to-orange-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

const getDifficultyLabel = (difficulty: ActivityCardProps['difficulty']) => {
  switch (difficulty) {
    case 'easy':
      return '⭐';
    case 'medium':
      return '⭐⭐';
    case 'hard':
      return '⭐⭐⭐';
    default:
      return '⭐';
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  id, 
  title, 
  type, 
  difficulty, 
  description 
}) => {
  const typeIcon = getTypeIcon(type);
  const typeColor = getTypeColor(type);
  const difficultyLabel = getDifficultyLabel(difficulty);
  
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className={`bg-gradient-to-r ${typeColor} p-4 text-white`}>
        <div className="flex justify-between items-center">
          <span className="text-3xl">{typeIcon}</span>
          <span className="text-sm font-medium opacity-90">{difficultyLabel}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
            {type}
          </span>
          
          <Link 
            href={`/activities/${id}`}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center transition-colors"
          >
            Start
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;