"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { childBadges, Badge as BadgeType, getBadgesByCategory } from '@/lib/childBadges';

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [displayedBadges, setDisplayedBadges] = useState<BadgeType[]>(childBadges);
  
  // Get all categories
  const categories = Array.from(
    new Set(childBadges.map(badge => badge.category))
  );
  
  // Filter badges when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setDisplayedBadges(childBadges);
    } else {
      setDisplayedBadges(getBadgesByCategory(selectedCategory));
    }
  }, [selectedCategory]);
  
  // Group badges by category for display
  const groupedBadges: Record<string, BadgeType[]> = {};
  
  if (selectedCategory === 'all') {
    categories.forEach(category => {
      groupedBadges[category] = getBadgesByCategory(category);
    });
  } else {
    groupedBadges[selectedCategory] = displayedBadges;
  }

  // Calculate achievement stats
  const totalBadges = childBadges.length;
  const totalEarned = childBadges.length; // Since these are all "earned" badges in our demo
  const completionPercentage = Math.round((totalEarned / totalBadges) * 100);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">My Achievements</h1>
            <Link 
              href="/dashboard" 
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          <p className="text-gray-600 mt-2">Track your learning journey with these badges!</p>
        </div>
        
        {/* Achievement Stats */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl text-center">
              <p className="text-sm text-indigo-700 mb-1">Total Badges</p>
              <p className="text-3xl font-bold text-indigo-800">{totalBadges}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-sm text-green-700 mb-1">Badges Earned</p>
              <p className="text-3xl font-bold text-green-700">{totalEarned}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <p className="text-sm text-purple-700 mb-1">Completion</p>
              <p className="text-3xl font-bold text-purple-700">{completionPercentage}%</p>
            </div>
          </div>
        </motion.div>
        
        {/* Category Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                ${selectedCategory === 'all' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Badges
            </button>
            
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize
                  ${selectedCategory === category
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Badges Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.keys(groupedBadges).map(category => (
            <motion.div 
              key={category}
              variants={itemVariants}
              className="mb-8"
            >
              {selectedCategory === 'all' && (
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 capitalize mb-1">{category}</h2>
                  <div className="h-1 w-20 bg-indigo-300 rounded-full"></div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {groupedBadges[category].map(badge => (
                  <motion.div
                    key={badge.id}
                    variants={itemVariants}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center"
                  >
                    <Badge
                      text={badge.title}
                      icon={badge.icon}
                      type="achievement"
                      size="large"
                      category={badge.category}
                    />
                    
                    <p className="mt-4 text-center text-gray-700">{badge.description}</p>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Earned on {badge.earnedOn.toLocaleDateString()}
                    </div>
                    
                    {badge.level && (
                      <div className="mt-2 flex">
                        {Array.from({ length: badge.level }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">⭐</span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
          
          {Object.keys(groupedBadges).length === 0 && (
            <div className="text-center p-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500 text-lg">No badges found in this category.</p>
            </div>
          )}
        </motion.div>
        
        {/* Locked Badges Teaser */}
        <motion.div 
          className="mt-12 bg-gray-100 p-6 rounded-2xl border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-700 mb-4">Badges to Unlock</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center opacity-60">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">Mystery Badge</p>
                <p className="text-xs text-gray-400 mt-1">Complete more activities to unlock</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}