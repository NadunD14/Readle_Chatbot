"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface DashboardHeaderProps {
  userName?: string;
  avatar?: string;
  notificationCount?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = "Kasun",
  avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  notificationCount = 0
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white py-5 px-6 md:px-12 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center">
          <Image src="/images/logo.png" alt="Readle Logo" width={36} height={36} />
          <span className="ml-2 text-xl font-bold text-indigo-600">Readle</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-gray-700 font-medium hover:text-indigo-600 transition-colors">
            Dashboard
          </Link>
          <Link href="/children" className="text-gray-700 font-medium hover:text-indigo-600 transition-colors">
            My Children
          </Link>
          <Link href="/psychologists" className="text-gray-700 font-medium hover:text-indigo-600 transition-colors">
            Psychologists
          </Link>
        </nav>

        {/* Desktop Auth & Notifications */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="text-gray-700 hover:text-indigo-600 focus:outline-none" 
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-100">
                <Image 
                  src={avatar} 
                  alt={`${userName}'s avatar`} 
                  width={32} 
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-gray-700 font-medium">{userName}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                <Link 
                  href="/account" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Account Settings
                </Link>
                <Link 
                  href="/subscription" 
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Subscription
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {!isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 py-3 px-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100">
              <Image 
                src={avatar} 
                alt={`${userName}'s avatar`} 
                width={40} 
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium">{userName}</span>
            {notificationCount > 0 && (
              <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </div>
          
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/dashboard" 
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/my-children" 
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              My Children
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="/notifications" 
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Notifications
              {notificationCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-3">
              <Link 
                href="/account" 
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Account Settings
              </Link>
              <Link 
                href="/subscription" 
                className="text-gray-700 font-medium hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscription
              </Link>
              <button 
                className="text-left text-red-600 font-medium py-2 px-3 rounded-lg hover:bg-red-50 w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;