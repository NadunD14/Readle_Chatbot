"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Psychologist } from '@/lib/psychologists';
import { Star, Calendar, MessageCircle, Phone } from 'lucide-react';
import BookingForm from './BookingForm';

interface PsychologistCardProps {
  psychologist: Psychologist;
  onBook?: () => void;
  onMessage?: () => void;
  onRequestCall?: () => void;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
  onBook,
  onMessage,
  onRequestCall
}) => {
  const { id, name, specialties, rating, reviews, availability, languages, imageUrl } = psychologist;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookClick = () => {
    if (onBook) {
      onBook();
    }
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
        {/* Header with gradient background */}
        <div className="bg-blue-50 to-purple-500 p-6">
          <Link href={`/psychologists/${id}`} className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white p-1 group-hover:ring-2 group-hover:ring-white transition-all">
              <Image 
                src={imageUrl || '/images/default-avatar.png'} 
                alt={name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-gray-900">
              <h3 className="text-xl font-bold group-hover:underline">{name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">{rating} ({reviews})</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Specialties:</div>
            <div className="flex flex-wrap gap-2">
              {specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md"
                >
                  {specialty}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md">
                  +{specialties.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Availability</p>
              <p className="font-medium text-indigo-700 text-sm">{availability}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Languages</p>
              <p className="font-medium text-indigo-700 text-sm">{languages.join(", ")}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow">
            {psychologist.bio}
          </p>

          <div className="flex justify-between items-center mt-auto">
            <div className="flex gap-3">
              <button 
                onClick={onMessage} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                aria-label="Send message"
              >
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </button>
              <button 
                onClick={onRequestCall} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
                aria-label="Request call"
              >
                <Phone className="w-5 h-5 text-orange-600" />
              </button>
            </div>
            
            <button 
              onClick={handleBookClick}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center gap-1.5 px-5 py-2.5 text-white text-sm font-medium rounded-xl hover:shadow-md hover:shadow-indigo-200 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingForm 
        psychologist={psychologist} 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </>
  );
};

export default PsychologistCard;