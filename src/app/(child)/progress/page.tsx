"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import { CHILD } from '@/lib/constants';
import { getRecentBadges } from '@/lib/childBadges';
import Image from 'next/image';

export default function ProgressPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');
  
  // Mock progress data
  const progressData = {
    currentLevel: CHILD.level,
    currentProgress: CHILD.progress,
    totalStars: CHILD.totalStars,
    totalActivities: 45,
    completedActivities: 32,
    weeklyStreak: 7,
    longestStreak: 12,
    timeSpent: 180, // minutes this week
    
    // Activity breakdown by type
    activityStats: {
      phonics: { completed: 8, total: 12, accuracy: 85 },
      spelling: { completed: 6, total: 10, accuracy: 92 },
      reading: { completed: 12, total: 15, accuracy: 88 },
      comprehension: { completed: 6, total: 8, accuracy: 90 }
    },
    
    // Weekly progress data
    weeklyData: [
      { day: 'Mon', activities: 2, stars: 15, timeSpent: 25 },
      { day: 'Tue', activities: 1, stars: 8, timeSpent: 15 },
      { day: 'Wed', activities: 3, stars: 22, timeSpent: 35 },
      { day: 'Thu', activities: 2, stars: 18, timeSpent: 30 },
      { day: 'Fri', activities: 1, stars: 12, timeSpent: 20 },
      { day: 'Sat', activities: 3, stars: 25, timeSpent: 40 },
      { day: 'Sun', activities: 2, stars: 16, timeSpent: 15 }
    ],
    
    // Level milestones
    levelMilestones: [
      { level: 1, unlockedAt: new Date('2025-05-01'), badge: 'First Steps' },
      { level: 2, unlockedAt: new Date('2025-05-15'), badge: 'Rising Star' },
      { level: 3, unlockedAt: new Date('2025-06-01'), badge: 'Learning Hero' },
      { level: 4, unlockedAt: null, badge: 'Reading Master' }, // Future level
    ]
  };

  // Calculate completion percentage
  const completionPercentage = Math.round((progressData.completedActivities / progressData.totalActivities) * 100);
  
  // Get recent badges
  const recentBadges = getRecentBadges().slice(0, 6);
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Learning Journey 🌟</h1>
          <p className="text-gray-600 text-lg">See how amazing you&apos;re doing, {CHILD.name}!</p>
        </div>

        {/* Level Progress & Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Level Progress */}
          <motion.div 
            className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=50&h=50&fit=crop"
                alt="Level progress"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Level {progressData.currentLevel}</h2>
                <p className="text-gray-600">Your Learning Level</p>
              </div>
            </div>
            
            <ProgressBar 
              progress={progressData.currentProgress} 
              level={progressData.currentLevel} 
              theme="rainbow" 
              animate={true}
            />
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-yellow-600">{progressData.totalStars}</div>
                <div className="text-sm text-yellow-700">⭐ Total Stars</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{progressData.completedActivities}</div>
                <div className="text-sm text-green-700">📚 Activities Done</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{progressData.weeklyStreak}</div>
                <div className="text-sm text-purple-700">🔥 Day Streak</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{Math.round(progressData.timeSpent / 60)}h</div>
                <div className="text-sm text-blue-700">⏰ This Week</div>
              </div>
            </div>
          </motion.div>

          {/* Achievement Summary */}
          <motion.div 
            className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white"
            variants={itemVariants}
          >
            <div className="text-center">
              <Image 
                src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=80&h=80&fit=crop"
                alt="Trophy"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-2">Amazing Progress!</h3>
              <div className="text-4xl font-bold mb-1">{completionPercentage}%</div>
              <p className="text-indigo-100 text-sm">Activities Completed</p>
              
              <div className="mt-4 pt-4 border-t border-indigo-300">
                <p className="text-sm text-indigo-100">Next milestone at 75%</p>
                <p className="text-xs text-indigo-200">Keep going, you&apos;re doing great!</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Activity Categories Progress */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(progressData.activityStats).map(([type, stats]) => {
              const percentage = Math.round((stats.completed / stats.total) * 100);
              const colors = {
                phonics: { bg: 'from-blue-400 to-indigo-500', icon: '🔤' },
                spelling: { bg: 'from-green-400 to-emerald-500', icon: '✏️' },
                reading: { bg: 'from-purple-400 to-pink-500', icon: '📚' },
                comprehension: { bg: 'from-yellow-400 to-orange-500', icon: '🧩' }
              };
              
              return (
                <div key={type} className="text-center">
                  <div className={`bg-gradient-to-br ${colors[type as keyof typeof colors].bg} w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-3xl">{colors[type as keyof typeof colors].icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 capitalize mb-2">{type}</h3>
                  
                  {/* Progress Circle */}
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                      <circle 
                        cx="32" cy="32" r="28" fill="none" 
                        stroke={type === 'phonics' ? '#4f46e5' : type === 'spelling' ? '#059669' : type === 'reading' ? '#7c3aed' : '#ea580c'}
                        strokeWidth="4"
                        strokeDasharray={`${percentage * 1.76} 176`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">{percentage}%</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <div>{stats.completed}/{stats.total} activities</div>
                    <div className="font-medium text-green-600">{stats.accuracy}% accuracy</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Activity Chart */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=40&h=40&fit=crop"
                alt="Chart"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-2xl font-bold text-gray-800">This Week&apos;s Activity</h2>
            </div>
            
            <div className="flex gap-2">
              {['week', 'month', 'all'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe as 'week' | 'month' | 'all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
                    ${selectedTimeframe === timeframe 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="space-y-4">
            <div className="flex items-end gap-2 h-40 px-4">
              {progressData.weeklyData.map((day) => {
                const maxActivities = Math.max(...progressData.weeklyData.map(d => d.activities));
                const height = (day.activities / maxActivities) * 100;
                
                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-400 to-purple-500 rounded-t-lg transition-all duration-500 flex items-end justify-center pb-1"
                      style={{ height: `${height}%`, minHeight: day.activities > 0 ? '20px' : '0' }}
                    >
                      {day.activities > 0 && (
                        <span className="text-white text-xs font-bold">{day.activities}</span>
                      )}
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-600">{day.day}</div>
                    <div className="text-xs text-gray-500">{day.stars}⭐</div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Activities completed each day
            </div>
          </div>
        </motion.div>

        {/* Level Journey & Recent Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Level Journey */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=40&h=40&fit=crop"
                alt="Journey"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">Level Journey</h2>
            </div>
            
            <div className="space-y-4">
              {progressData.levelMilestones.map((milestone) => (
                <div key={milestone.level} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                    ${milestone.unlockedAt 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : milestone.level === progressData.currentLevel
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        : 'bg-gray-300'
                    }`}>
                    {milestone.level}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">Level {milestone.level}</span>
                      {milestone.unlockedAt && <span className="text-green-500">✓</span>}
                      {milestone.level === progressData.currentLevel && <span className="text-yellow-500">⭐</span>}
                    </div>
                    <div className="text-sm text-gray-600">{milestone.badge}</div>
                    {milestone.unlockedAt && (
                      <div className="text-xs text-gray-500">
                        Unlocked {milestone.unlockedAt.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Badges */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Image 
                  src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=40&h=40&fit=crop"
                  alt="Badges"
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-bold text-gray-800">Recent Badges</h2>
              </div>
              
              <Link 
                href="/achievements" 
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {recentBadges.map(badge => (
                <div key={badge.id} className="p-3 bg-gray-50 rounded-xl text-center">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-sm font-medium text-gray-800">{badge.title}</div>
                  <div className="text-xs text-gray-500">{badge.earnedOn.toLocaleDateString()}</div>
                </div>
              ))}
              
              {recentBadges.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <div className="text-4xl mb-2">🏆</div>
                  <Image 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop"
                    alt="No badges yet"
                    width={60}
                    height={60}
                    className="mx-auto mb-3 opacity-50"
                  />
                  <p className="text-gray-500 text-sm">Complete more activities to earn badges!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Motivational Section */}
        <motion.div 
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 p-8 rounded-2xl shadow-lg text-white text-center"
          variants={itemVariants}
        >
          <Image 
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop"
            alt="Celebration"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h2 className="text-3xl font-bold mb-2">You&apos;re Doing Amazing! 🎉</h2>
          <p className="text-lg opacity-90 mb-4">
            You&apos;ve completed {progressData.completedActivities} activities and earned {progressData.totalStars} stars!
          </p>
          <p className="text-sm opacity-75">
            Keep learning every day to maintain your {progressData.weeklyStreak}-day streak!
          </p>
          
          <div className="mt-6">
            <Link 
              href="/activities" 
              className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              Continue Learning
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}