"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { getActivityById, Activity } from '@/lib/constants';
import confetti from 'canvas-confetti';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function ActivityPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch activity data
  useEffect(() => {
    if (id) {
      const activityData = getActivityById(id);
      setActivity(activityData || null);
      setLoading(false);
    }
  }, [id]);

  // Trigger confetti when activity is completed
  useEffect(() => {
    if (isCompleted) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCompleted]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
        <div className="text-2xl font-bold text-indigo-600">Loading...</div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Activity Not Found</h1>
          <p className="mb-6">Sorry, this activity doesn&apos;t exist.</p>
          <Link 
            href="/activities" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion: Question | undefined = 
    activity.questions && activity.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer || isCompleted) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion?.correctAnswer;
    setIsAnswerCorrect(correct);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }

    // Move to next question or complete activity after delay
    setTimeout(() => {
      if (!activity.questions || currentQuestionIndex >= activity.questions.length - 1) {
        // Activity completed
        setIsCompleted(true);
      } else {
        // Next question
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      }
    }, 1500);
  };

  // Completion screen
  if (isCompleted) {
    // Calculate stars based on score percentage
    const totalQuestions = activity.questions?.length || 1;
    const scorePercentage = (score / totalQuestions) * 100;
    const stars = scorePercentage >= 80 ? 3 : scorePercentage >= 60 ? 2 : 1;
    
    const badgeText = stars === 3 
      ? `⭐⭐⭐ Amazing!` 
      : stars === 2 
        ? `⭐⭐ Great Job!` 
        : `⭐ Good Try!`;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 -mx-8 -mt-8 rounded-t-2xl mb-8">
            <h1 className="text-4xl font-bold mb-4">Well Done!</h1>
            <p className="text-xl">You completed the {activity.title} activity!</p>
          </div>
          
          <div className="mb-10">
            <div className="mb-6">
              <Badge text={badgeText} type="reward" size="large" withAnimation />
            </div>
            
            <p className="text-gray-700 text-lg mb-2">
              You scored {score} out of {activity.questions?.length || 0}
            </p>
            
            <div className="flex justify-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="mx-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: i < stars ? 1 : 0.6 }}
                    transition={{ delay: i * 0.3, type: "spring" }}
                    className={`text-4xl ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ⭐
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/child-dashboard"
              className="px-6 py-3 bg-white border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Return to Dashboard
            </Link>
            
            {/* Find the next activity ID if it exists */}
            {(() => {
              const activityIds = activity.questions?.map((_, i) => i) || [];
              const currentIndex = activityIds.indexOf(Number(id));
              const nextActivityId = currentIndex < activityIds.length - 1 
                ? activityIds[currentIndex + 1]
                : null;
                
              if (nextActivityId !== null) {
                return (
                  <Link
                    href={`/activities/${nextActivityId}`}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Next Activity
                  </Link>
                );
              }
              return null;
            })()}
          </div>
        </motion.div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          {/* Activity Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{activity.title}</h1>
              <Badge 
                text={activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                type={
                  activity.type === 'phonics' ? 'level' :
                  activity.type === 'spelling' ? 'achievement' :
                  'reward'
                }
                size="small"
              />
            </div>
            
            <p className="text-gray-600">{activity.description}</p>
            
            {/* Progress indicator */}
            <div className="mt-4 flex items-center">
              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full"
                  style={{ width: `${((currentQuestionIndex + 1) / (activity.questions?.length || 1)) * 100}%` }}
                />
              </div>
              <span className="ml-3 text-sm text-indigo-700 font-medium">
                {currentQuestionIndex + 1}/{activity.questions?.length || 0}
              </span>
            </div>
          </div>
          
          {/* Question */}
          {currentQuestion ? (
            <div>
              <h2 className="text-xl font-medium text-gray-700 mb-6">{currentQuestion.question}</h2>
              
              {/* Answer options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = isSelected && option === currentQuestion.correctAnswer;
                    const isWrong = isSelected && option !== currentQuestion.correctAnswer;
                    
                    return (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          isCorrect 
                            ? 'border-green-500 bg-green-50 text-green-700' 
                            : isWrong
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : isSelected
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                            isCorrect 
                              ? 'bg-green-500 text-white' 
                              : isWrong
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100'
                          }`}>
                            {isCorrect ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : isWrong ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            ) : (
                              <span>{String.fromCharCode(65 + index)}</span>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
              
              {/* Feedback message */}
              <AnimatePresence>
                {isAnswerCorrect !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-6 p-4 rounded-xl ${
                      isAnswerCorrect 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <p className={`font-medium ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isAnswerCorrect 
                        ? 'Great job! That\'s correct!' 
                        : `Oops! The correct answer is: ${currentQuestion.correctAnswer}`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-center text-gray-600">No questions available for this activity.</p>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Link 
            href="/child-dashboard"
            className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          
          {/* Skip button (only visible when answer not selected) */}
          {selectedAnswer === null && currentQuestion && (
            <button 
              onClick={() => {
                if (currentQuestionIndex >= (activity.questions?.length || 0) - 1) {
                  setIsCompleted(true);
                } else {
                  setCurrentQuestionIndex(prev => prev + 1);
                }
              }}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Skip →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}