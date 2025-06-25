"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import ActivityCard from '@/components/ui/ActivityCard';
import { CHILD } from '@/lib/constants';
import { childActivities } from '@/lib/childActivities';
import { getRecentBadges } from '@/lib/childBadges';
import Image from 'next/image';

export default function ChildDashboard() {
  const [currentStreak] = useState(7);
  const [weeklyGoal] = useState(5);
  const [completedToday] = useState(2);
  
  // Get recent badges
  const recentBadges = getRecentBadges().slice(0, 4);
  
  // Calculate weekly progress
  const weeklyProgress = Math.min((completedToday / weeklyGoal) * 100, 100);
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Mock data for today's activities
  const todayActivities = [
    { id: 'act-001', completed: true, timeSpent: 15 },
    { id: 'act-003', completed: true, timeSpent: 12 },
    { id: 'act-004', completed: false, timeSpent: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Today's Challenge */}
        <motion.div 
          className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-6 rounded-2xl shadow-lg mb-8 text-white"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop"
                alt="Challenge trophy"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">Daily Challenge 🏆</h2>
                <p className="opacity-90">Complete &quot;Rhyme Time&quot; to earn a special badge!</p>
                <p className="text-sm opacity-75 mt-1">+50 bonus stars for completion today</p>
              </div>
            </div>
            <Link 
              href="/activities/act-004" 
              className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              Start Challenge
            </Link>
          </div>
        </motion.div>
        {/* Welcome Header with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Welcome Message */}
          <motion.div 
            className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              {/* <img 
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face"
                alt="Reading mascot"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              /> */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {CHILD.name}! 🌟
                </h1>
                <p className="text-gray-600 text-lg">Ready to continue your learning adventure?</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">Today&apos;s Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">⭐ Stars Earned</span>
                <span className="font-bold text-yellow-600">{CHILD.totalStars}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">🔥 Day Streak</span>
                <span className="font-bold text-orange-600">{currentStreak}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">📚 Activities</span>
                <span className="font-bold text-indigo-600">{completedToday}/{weeklyGoal}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress & Goals Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Level Progress */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=40&h=40&fit=crop"
                alt="Progress icon"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">Level Progress</h2>
            </div>
            <ProgressBar progress={CHILD.progress} level={CHILD.level} theme="rainbow" />
            
            {CHILD.progress >= 90 && (
              <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200 flex items-center">
                <span className="text-2xl mr-3">🎉</span>
                <p className="text-sm text-yellow-700 font-medium">
                  Almost there! One more activity to level up!
                </p>
              </div>
            )}
          </motion.div>

          {/* Weekly Goal */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=40&h=40&fit=crop"
                alt="Goal icon"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">This Week&apos;s Goal</h2>
            </div>
            
            <div className="relative">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${weeklyProgress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600">{completedToday} completed</span>
                <span className="font-medium text-gray-800">{weeklyGoal} activities</span>
              </div>
            </div>

            {completedToday >= weeklyGoal && (
              <div className="mt-3 text-center">
                <span className="text-green-600 font-bold text-sm">🎯 Goal Complete! Amazing work!</span>
              </div>
            )}
          </motion.div>
        </div>


        {/* Activity Categories */}
        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Adventure</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'phonics', icon: '🔤', color: 'from-blue-400 to-indigo-500', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop' },
              { type: 'spelling', icon: '✏️', color: 'from-green-400 to-teal-500', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop' },
              { type: 'reading', icon: '📚', color: 'from-purple-400 to-pink-500', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' },
              { type: 'comprehension', icon: '🧩', color: 'from-yellow-400 to-orange-500', image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop' }
            ].map((category) => (
              <Link 
                key={category.type}
                href={`/activities?type=${category.type}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group-hover:scale-105">
                  <div className={`bg-gradient-to-br ${category.color} p-6 text-white text-center`}>
                    <span className="text-4xl mb-2 block">{category.icon}</span>
                    <h3 className="font-bold capitalize text-lg">{category.type}</h3>
                  </div>
                  <div className="h-24 overflow-hidden">
                    <Image 
                      src={category.image}
                      alt={category.type}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Continue Learning & Recent Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Continue Learning */}
          <motion.div 
            className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="https://images.unsplash.com/photo-1472173148041-00294f0814a2?w=40&h=40&fit=crop"
                alt="Continue learning"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {childActivities.slice(0, 4).map(activity => (
                <ActivityCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  type={activity.type}
                  difficulty={activity.difficulty}
                  description={activity.description}
                  imageUrl={`https://images.unsplash.com/photo-${
                    activity.type === 'phonics' ? '1503676260728-1c00da094a0b' :
                    activity.type === 'spelling' ? '1455390582262-044cdead277a' :
                    activity.type === 'reading' ? '1481627834876-b7833e8f5570' :
                    '1606092195730-5d7b9af1efc5'
                  }?w=400&h=250&fit=crop`}
                  completedPercentage={
                    todayActivities.find(a => a.id === activity.id)?.completed ? 100 :
                    Math.random() > 0.7 ? Math.floor(Math.random() * 80) : 0
                  }
                  isNew={activity.id === 'act-001' || activity.id === 'act-008'}
                />
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                href="/activities" 
                className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors"
              >
                View All Activities
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=40&h=40&fit=crop"
                alt="Achievements"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">Latest Badges</h2>
            </div>
            
            <div className="space-y-3">
              {recentBadges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{badge.title}</p>
                    <p className="text-xs text-gray-500">{badge.earnedOn.toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              
              {recentBadges.length === 0 && (
                <div className="text-center py-8">
                  <Image 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=80&h=80&fit=crop"
                    alt="No badges yet"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mx-auto mb-3 opacity-50"
                  />
                  <p className="text-gray-500 text-sm">Complete activities to earn your first badge!</p>
                </div>
              )}
            </div>
            
            <Link 
              href="/achievements" 
              className="block mt-4 text-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              View All Achievements →
            </Link>
          </motion.div>
        </div>

        {/* Learning Streak & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learning Streak */}
          <motion.div 
            className="bg-gradient-to-br from-emerald-400 to-cyan-500 p-6 rounded-2xl shadow-lg text-white"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <Image 
                src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=80&h=80&fit=crop"
                alt="Fire streak"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-bold mb-1">{currentStreak} Day Streak! 🔥</h3>
                <p className="opacity-90">You&apos;re on fire! Keep learning every day.</p>
                <p className="text-sm opacity-75 mt-1">Next milestone: 10 days</p>
              </div>
            </div>
          </motion.div>

          {/* Parent Connection */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg border-2 border-pink-200"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <Image 
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=80&h=80&fit=crop"
                alt="Parent message"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Message from Mom 💕</h3>
                <p className="text-gray-600 text-sm">&quot;Great job on your reading today! I&apos;m so proud of you!&quot;</p>
                <button className="mt-2 text-pink-600 text-xs font-medium hover:text-pink-800">
                  Send a message back →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}