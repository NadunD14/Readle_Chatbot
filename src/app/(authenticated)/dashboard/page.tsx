"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Dummy data for dashboard stats
const DASHBOARD_STATS = {
  totalChildren: 3,
  totalActivities: 24,
  completedActivities: 18,
  averageProgress: 72,
};

export default function ParentDashboard() {
  const userName = "John"; // This should come from your user context or state

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-1">
            Welcome back, {userName}!
          </h1>
          <p className="text-indigo-600">Let&apos;s continue your child&apos;s reading journey</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Children Count */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <span className="text-2xl" role="img" aria-label="Children">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-gray-600 font-medium">Total Children</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{DASHBOARD_STATS.totalChildren}</p>
          </div>
          
          {/* Total Activities */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-3">
                <span className="text-2xl" role="img" aria-label="Activities">📚</span>
              </div>
              <h3 className="text-gray-600 font-medium">Total Activities</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{DASHBOARD_STATS.totalActivities}</p>
          </div>
          
          {/* Completed Activities */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-3">
                <span className="text-2xl" role="img" aria-label="Completed">✅</span>
              </div>
              <h3 className="text-gray-600 font-medium">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{DASHBOARD_STATS.completedActivities}</p>
          </div>
          
          {/* Average Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-3">
                <span className="text-2xl" role="img" aria-label="Progress">📈</span>
              </div>
              <h3 className="text-gray-600 font-medium">Avg. Progress</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{DASHBOARD_STATS.averageProgress}%</p>
          </div>
        </div>
        
        {/* Quick Access */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/children" className="block p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl hover:shadow-md transition-all hover:-translate-y-1 border border-indigo-100">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <span className="text-2xl" role="img" aria-label="Children">👪</span>
                </div>
                <div>
                  <h3 className="font-medium text-indigo-800 mb-1">View Children</h3>
                  <p className="text-sm text-gray-600">Manage profiles and progress</p>
                </div>
              </div>
            </Link>
            
            <Link href="#" className="block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all hover:-translate-y-1 border border-purple-100">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <span className="text-2xl" role="img" aria-label="Resources">📖</span>
                </div>
                <div>
                  <h3 className="font-medium text-purple-800 mb-1">Resources</h3>
                  <p className="text-sm text-gray-600">Learning materials and guides</p>
                </div>
              </div>
            </Link>
            
            <Link href="/account" className="block p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-md transition-all hover:-translate-y-1 border border-green-100">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-2xl" role="img" aria-label="Account">⚙️</span>
                </div>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Account</h3>
                  <p className="text-sm text-gray-600">Settings and preferences</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {[
              { child: "Emma", activity: "Completed 'Beginning Sounds'", time: "2 hours ago", icon: "📚" },
              { child: "Noah", activity: "Started 'CVC Words'", time: "Yesterday", icon: "✍️" },
              { child: "Olivia", activity: "Took reading assessment", time: "2 days ago", icon: "📝" }
            ].map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.child} <span className="font-normal text-gray-600">{item.activity}</span>
                  </p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <Link 
                  href={`/child/${index + 1}`} 
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              href="/children" 
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              View All Children
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}