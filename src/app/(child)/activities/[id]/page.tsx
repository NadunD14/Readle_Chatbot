"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import AudioButton from '@/components/ui/AudioButton';
import { useTTS } from '@/hooks/useTTS';
import { childActivities, Activity } from '@/lib/childActivities';
import Image from 'next/image';

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { speakWithHighlight } = useTTS();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [readDescription, setReadDescription] = useState(false);

  const id = typeof params.id === 'string' ? params.id : '';
  
  // Fetch activity data
  useEffect(() => {
    if (id) {
      const activityData = childActivities.find(act => act.id === id);
      setActivity(activityData || null);
      setLoading(false);
    }
  }, [id]);

  // Auto-read description when page first loads
  useEffect(() => {
    if (activity && !readDescription) {
      setTimeout(() => {
        speakWithHighlight(activity.description, 'activity-description');
        setReadDescription(true);
      }, 1000);
    }
  }, [activity, readDescription, speakWithHighlight]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-400 border-t-indigo-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-indigo-700">Loading activity...</p>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-6 text-5xl"
          >
            😢
          </motion.div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Activity Not Found</h1>
          <p className="mb-6 text-gray-600">We couldn&apos;t find the activity you&apos;re looking for.</p>
          <Link 
            href="/dashboard" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Get difficulty label
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { text: 'Easy', color: 'bg-green-100 text-green-800' };
      case 'intermediate':
        return { text: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
      case 'advanced':
        return { text: 'Hard', color: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const difficultyInfo = getDifficultyLabel(activity.difficulty);

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phonics': return '🔤';
      case 'spelling': return '✏️';
      case 'reading': return '📚';
      case 'comprehension': return '🧩';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Activity card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Activity header with image */}
          {activity.thumbnailUrl && (
            <div className="h-48 md:h-64 w-full relative">
              <Image 
                src={activity.thumbnailUrl} 
                alt={activity.title}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <Badge 
                  text={activity.type} 
                  icon={getTypeIcon(activity.type)}
                  type="achievement" 
                  size="small"
                />
              </div>
            </div>
          )}

          {/* Activity content */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{activity.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyInfo.color}`}>
                {difficultyInfo.text}
              </span>
            </div>

            <div className="mb-8 relative">
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-700">About This Activity</h2>
                <AudioButton 
                  text={activity.description}
                  size="small"
                  variant="ghost"
                  className="ml-2"
                />
              </div>
              <p 
                id="activity-description" 
                className="text-gray-600 leading-relaxed transition-all"
              >
                {activity.description}
              </p>
            </div>

            {/* Activity info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-indigo-50 p-4 rounded-xl">
                <p className="text-sm text-indigo-700 font-medium">Type</p>
                <p className="text-lg text-gray-800 capitalize">{activity.type}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-700 font-medium">Duration</p>
                <p className="text-lg text-gray-800">
                  {activity.durationMinutes || 15} minutes
                </p>
              </div>
            </div>

            {/* Start button */}
            <Link
              href={`/activities/${activity.id}/play`}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl flex items-center justify-center hover:shadow-lg transition-all"
            >
              <span>Start Activity</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related activities */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {childActivities
              .filter(a => a.id !== activity.id && a.type === activity.type)
              .slice(0, 3)
              .map(relatedActivity => (
                <motion.div 
                  key={relatedActivity.id}
                  whileHover={{ y: -5 }}
                >
                  <Link 
                    href={`/activities/${relatedActivity.id}`}
                    className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-gray-800 mb-1">{relatedActivity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedActivity.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${difficultyInfo.color}`}>
                        {relatedActivity.difficulty}
                      </span>
                      <span className="text-indigo-600">View →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}