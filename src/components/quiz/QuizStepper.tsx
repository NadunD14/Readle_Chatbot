import React from 'react';

interface QuizStepperProps {
  currentStep: number;
  totalSteps: number;
}

const QuizStepper: React.FC<QuizStepperProps> = ({ currentStep, totalSteps }) => {
  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Question {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-indigo-600">{Math.round(progressPercentage)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Progress: ${currentStep} of ${totalSteps} questions`}
        />
      </div>
    </div>
  );
};

export default QuizStepper;