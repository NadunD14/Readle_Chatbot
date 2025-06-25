"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ActivityCard from '@/components/ui/ActivityCard';
import { childActivities, Activity, ActivityType, DifficultyLevel } from '@/lib/childActivities';
import { CHILD } from '@/lib/constants';
import Image from 'next/image';

export default function ActivitiesPage() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<ActivityType | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(childActivities);
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'duration'>('title');

  // Set initial filter from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type') as ActivityType;
    if (typeParam && ['phonics', 'spelling', 'reading', 'comprehension'].includes(typeParam)) {
      setSelectedType(typeParam);
    }
  }, [searchParams]);

  // Filter activities based on selected criteria
  useEffect(() => {
    let filtered = [...childActivities];

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(activity => activity.type === selectedType);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(activity => activity.difficulty === selectedDifficulty);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort activities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'duration':
          return (a.durationMinutes || 0) - (b.durationMinutes || 0);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredActivities(filtered);
  }, [selectedType, selectedDifficulty, searchQuery, sortBy]);

  // Mock progress data for activities
  const getActivityProgress = (activityId: string) => {
    const progressMap: Record<string, number> = {
      'act-001': 100, // Completed
      'act-002': 65,  // In progress
      'act-003': 100, // Completed
      'act-004': 0,   // Not started
      'act-005': 40,  // In progress
      'act-006': 0,   // Not started
      'act-007': 80,  // In progress
      'act-008': 0,   // Not started
    };
    return progressMap[activityId] || 0;
  };

  const activityTypeData = [
    { 
      type: 'phonics', 
      icon: '🔤', 
      title: 'Phonics', 
      color: 'from-blue-400 to-indigo-500',
      description: 'Learn letter sounds',
      count: childActivities.filter(a => a.type === 'phonics').length
    },
    { 
      type: 'spelling', 
      icon: '✏️', 
      title: 'Spelling', 
      color: 'from-green-400 to-emerald-500',
      description: 'Master word spelling',
      count: childActivities.filter(a => a.type === 'spelling').length
    },
    { 
      type: 'reading', 
      icon: '📚', 
      title: 'Reading', 
      color: 'from-purple-400 to-pink-500',
      description: 'Practice reading skills',
      count: childActivities.filter(a => a.type === 'reading').length
    },
    { 
      type: 'comprehension', 
      icon: '🧩', 
      title: 'Comprehension', 
      color: 'from-yellow-400 to-orange-500',
      description: 'Understand what you read',
      count: childActivities.filter(a => a.type === 'comprehension').length
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
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
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Learning Activities 🎮</h1>
              <p className="text-gray-600 text-lg">Choose your next adventure, {CHILD.name}!</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-sm text-gray-600">Level {CHILD.level}</span>
                <span className="mx-2">•</span>
                <span className="text-sm font-bold text-indigo-600">{CHILD.totalStars} ⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Type Cards */}
        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activityTypeData.map((category) => (
              <motion.button
                key={category.type}
                variants={itemVariants}
                onClick={() => setSelectedType(category.type as ActivityType)}
                className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-105 ${
                  selectedType === category.type ? 'ring-4 ring-indigo-300' : ''
                }`}
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 text-white text-center h-32`}>
                  <span className="text-4xl mb-2 block">{category.icon}</span>
                  <h3 className="font-bold text-lg">{category.title}</h3>
                </div>
                <div className="bg-white p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">{category.description}</p>
                  <p className="text-sm font-bold text-gray-800">{category.count} activities</p>
                </div>
                
                {selectedType === category.type && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-2">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ActivityType | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="all">All Types</option>
                <option value="phonics">Phonics</option>
                <option value="spelling">Spelling</option>
                <option value="reading">Reading</option>
                <option value="comprehension">Comprehension</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner ⭐</option>
                <option value="intermediate">Intermediate ⭐⭐</option>
                <option value="advanced">Advanced ⭐⭐⭐</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'difficulty' | 'duration')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <option value="title">Sort by Name</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="duration">Sort by Duration</option>
              </select>

              {/* Clear Filters */}
              {(selectedType !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedType !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedType !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  Type: {selectedType}
                  <button 
                    onClick={() => setSelectedType('all')}
                    className="ml-2 hover:text-indigo-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Level: {selectedDifficulty}
                  <button 
                    onClick={() => setSelectedDifficulty('all')}
                    className="ml-2 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Search: &quot;{searchQuery}&quot;
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedType === 'all' ? 'All Activities' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Activities`}
            </h2>
            <span className="text-gray-600 text-sm">
              {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
            </span>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <ActivityCard
                    id={activity.id}
                    title={activity.title}
                    type={activity.type}
                    difficulty={activity.difficulty}
                    description={activity.description}
                    imageUrl={activity.thumbnailUrl || `https://images.unsplash.com/photo-${
                      activity.type === 'phonics' ? '1503676260728-1c00da094a0b' :
                      activity.type === 'spelling' ? '1455390582262-044cdead277a' :
                      activity.type === 'reading' ? '1481627834876-b7833e8f5570' :
                      '1606092195730-5d7b9af1efc5'
                    }?w=400&h=250&fit=crop`}
                    completedPercentage={getActivityProgress(activity.id)}
                    isNew={activity.id === 'act-001' || activity.id === 'act-008'}
                    durationMinutes={activity.durationMinutes}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=200&h=200&fit=crop"
                alt="No activities found"
                className="w-32 h-32 rounded-full mx-auto mb-6 opacity-60"
                width={200}
                height={200}
              />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Activities Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors"
              >
                Show All Activities
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Recommended Activities */}
        {selectedType === 'all' && searchQuery === '' && (
          <motion.div 
            className="mt-12 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 p-8 rounded-2xl shadow-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <Image 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"
                alt="Recommendation"
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                width={100}
                height={100}
              />
              <h2 className="text-3xl font-bold mb-2">Ready for a Challenge? 🚀</h2>
              <p className="text-lg opacity-90 mb-6">
                Based on your level {CHILD.level} progress, we recommend trying intermediate activities!
              </p>
              <button
                onClick={() => setSelectedDifficulty('intermediate')}
                className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                Show Intermediate Activities
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}