import React from 'react';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedAnswer?: string;
  onSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  options, 
  selectedAnswer, 
  onSelect 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">{question}</h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center
              ${
                selectedAnswer === option
                  ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700'
                  : 'bg-gray-50 border-2 border-gray-200 hover:border-indigo-200 text-gray-700 hover:bg-gray-100'
              }
            `}
            aria-pressed={selectedAnswer === option}
          >
            <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center border-2
              ${
                selectedAnswer === option
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-400'
              }
            `}>
              {selectedAnswer === option && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;