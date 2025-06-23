// filepath: d:\Readle\src\app\(authenticated)\children\page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dummy data for children
const CHILDREN = [
  {
    id: 1,
    name: "Emma",
    age: 8,
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
    progress: 78,
    level: 3,
    lastActivity: "Beginning Sounds",
    completedActivities: 12
  },
  {
    id: 2,
    name: "Noah",
    age: 7,
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
    progress: 65,
    level: 2,
    lastActivity: "CVC Words",
    completedActivities: 8
  },
  {
    id: 3,
    name: "Olivia",
    age: 9,
    avatar: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face",
    progress: 92,
    level: 4,
    lastActivity: "Simple Sentences",
    completedActivities: 15
  }
];

export default function ChildrenPage() {
  const [sortBy, setSortBy] = useState<'name' | 'progress'>('name');
  
  // Sort children based on selected sort option
  const sortedChildren = [...CHILDREN].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return b.progress - a.progress;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-800 mb-1">
              Your Children
            </h1>
            <p className="text-indigo-600">Manage profiles and view reading progress</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white rounded-xl shadow-sm px-4 py-2">
              <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
              <select 
                id="sort"
                className="border-none bg-transparent font-medium text-indigo-700 focus:outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'progress')}
              >
                <option value="name">Name</option>
                <option value="progress">Progress</option>
              </select>
            </div>
            
            <Link
              href="#"
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Child
            </Link>
          </div>
        </div>
        
        {/* Children Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedChildren.map((child) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center">
                <div className="bg-white rounded-full overflow-hidden mr-4 w-16 h-16 flex items-center justify-center">
                  <Image
                    src={child.avatar} 
                    alt={child.name}
                    width={60}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <div className="text-white">
                  <h2 className="text-xl font-bold">{child.name}</h2>
                  <p className="text-indigo-100">Age {child.age}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                    <span className="text-sm font-medium text-indigo-700">{child.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${child.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="font-bold text-indigo-700">{child.level}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Activities</p>
                    <p className="font-bold text-indigo-700">{child.completedActivities}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  Last activity: <span className="font-medium text-gray-700">{child.lastActivity}</span>
                </p>
                
                <div className="flex gap-2">
                  <Link
                    href={`/child/${child.id}`}
                    className="flex-1 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-center"
                  >
                    Profile
                  </Link>
                  <Link
                    href={`/progress/${child.id}`}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                  >
                    Progress
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add Child Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border-2 border-dashed border-indigo-200 flex items-center justify-center min-h-[300px] cursor-pointer hover:border-indigo-300"
          >
            <div className="text-center p-6">
              <div className="bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">Add New Child</h2>
              <p className="text-indigo-500">Create a new profile</p>
            </div>
          </motion.div>
        </div>
        
        <div className="flex justify-between">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}