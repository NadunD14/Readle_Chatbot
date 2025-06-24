"use client";

import React, { useState } from 'react';
import { psychologists } from '@/lib/psychologists';
import PsychologistCard from '@/components/psychologists/PsychologistCard';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Search, Filter, UserSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PsychologistsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const router = useRouter();

  // Extract unique specialties for filter dropdown
  const specialties = ['All', ...Array.from(new Set(psychologists.flatMap(p => p.specialties)))];
  
  // Filter psychologists based on search and specialty
  const filteredPsychologists = psychologists.filter(psychologist => {
    const matchesSearch = searchTerm === '' || 
      psychologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'All' || 
      psychologist.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  // These would connect to real functionality in a production app
  const handleBookSession = (id: string) => {
    toast.success(`Opening booking form for psychologist ID: ${id}`);
  };
  
  const handleSendMessage = (id: string) => {
    toast.success(`Opening message window for psychologist ID: ${id}`);
  };
  
  const handleRequestCall = (id: string) => {
    toast.success(`Requesting call from psychologist ID: ${id}`);
  };
  
  const handleOpenMatchModal = () => {
    router.push('/psychologists/match');
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header with integrated search */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-y-4">
          <div className="w-full lg:w-auto">
            <h1 className="text-3xl font-bold text-indigo-800 mb-1">
              Find a Psychologist
            </h1>
            <p className="text-indigo-600">Connect with professionals specializing in child development</p>
          </div>
          
          <div className="flex w-full lg:w-auto flex-col sm:flex-row gap-3 items-center">
            {/* Enhanced search bar with integrated filter dropdown */}
            <div className="relative flex w-full sm:max-w-md rounded-full overflow-hidden shadow-sm border border-gray-200 bg-white">
              <div className="absolute left-0 pl-4 flex items-center h-full pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              
              <input
                type="text"
                placeholder="Search psychologists..."
                className="pl-12 py-3 pr-3 flex-grow bg-transparent border-none outline-none focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div className="h-full flex items-center">
                <div className="w-px h-[60%] bg-gray-200 self-center"></div>
              </div>
              
              <div className="relative border-l-2 border-gray-200 flex items-center pl-3 pr-3 w-fit">
                <select
                  className="appearance-none bg-transparent text-sm font-medium text-gray-400 py-3 cursor-pointer outline-none w-25"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="All">All Specialties</option>
                  {specialties.filter(s => s !== 'All').map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Match-Me button */}
            <button
              onClick={handleOpenMatchModal}
              className="whitespace-nowrap bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <UserSearch className="w-5 h-5" />
              Match-Me
            </button>
          </div>
        </div>
        
        {/* Results count and quick filter tags */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center gap-3">
          <span className="text-gray-700 font-medium">
            <span className="text-indigo-700">{filteredPsychologists.length}</span> psychologists found
          </span>
          
          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Quick filters:</span>
            {['Anxiety', 'Child Development', 'ADHD', 'Learning Disabilities'].map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedSpecialty(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedSpecialty === tag 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Psychologist cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPsychologists.length > 0 ? (
            filteredPsychologists.map((psychologist, index) => (
              <motion.div
                key={psychologist.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PsychologistCard
                  psychologist={psychologist}
                  onBook={() => handleBookSession(psychologist.id)}
                  onMessage={() => handleSendMessage(psychologist.id)}
                  onRequestCall={() => handleRequestCall(psychologist.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No psychologists found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters to find more results</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedSpecialty('All');}}
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <a
            href="/dashboard"
            className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </a>
        </div>
      </motion.div>
    </div>
  );
}