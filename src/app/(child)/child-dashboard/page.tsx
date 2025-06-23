"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import ActivityCard from '@/components/ui/ActivityCard';
import Badge from '@/components/ui/Badge';
import { ACTIVITIES, CHILD } from '@/lib/constants';

export default function ChildDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {CHILD.name}!
            </h1>
            <p className="text-gray-700 mb-8">Ready for today&apos;s reading adventure?</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-sm text-gray-600">Total Stars</p>
              <p className="font-bold text-xl text-indigo-700">{CHILD.totalStars}</p>
            </div>
          </div>
        </div>
        
        {/* Progress Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
          <ProgressBar progress={CHILD.progress} level={CHILD.level} />
          
          {CHILD.progress >= 95 && (
            <div className="mt-4 bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center">
              <span className="text-2xl mr-3">🎉</span>
              <p className="text-sm text-yellow-700">
                You&apos;re almost ready to level up! Complete one more activity.
              </p>
            </div>
          )}
        </div>
        
        {/* Today's Tasks */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Today&apos;s Activities</h2>
            <Badge text="3 activities today" type="achievement" size="small" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACTIVITIES.map(activity => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                title={activity.title}
                type={activity.type}
                difficulty={activity.difficulty}
                description={activity.description}
              />
            ))}
          </div>
        </div>
        
        {/* Recent Achievements */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Achievements</h2>
          <div className="flex flex-wrap gap-3">
            <Badge text="⭐ Phonics Hero!" type="reward" size="medium" withAnimation />
            <Badge text="🏆 3 Day Streak" type="achievement" size="medium" />
            <Badge text="🔤 Word Master" type="reward" size="medium" />
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="bg-white p-6 rounded-2xl shadow-md mt-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Today&apos;s Challenge</h2>
            <p className="text-gray-700 mt-2">Complete the &ldquo;Phonics Fun&rdquo; activity to earn your daily star!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}