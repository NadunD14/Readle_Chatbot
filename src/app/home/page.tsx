"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [userName, setUserName] = useState("User");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardsRef = useRef(null);

  // Simulating getting user name from a stored session/auth system
  useEffect(() => {
    // This would be replaced with actual authentication data
    const fetchUserName = () => {
      // Placeholder for actual auth/user data retrieval
      const storedName = localStorage.getItem("userName") || "Kasun";
      setUserName(storedName);
    };
    fetchUserName();
  }, []);

  const nextStepsCards = [
    {
      title: "Setup Parent Profile",
      description: "Manage your account settings",
      content: "Customize your parent dashboard to monitor progress and set preferences.",
      image: "/images/parent-profile.png", 
      altImage: "Parent Profile",
      placeholder: "Parent",
      link: "/parent-setup"
    },
    {
      title: "Setup Child Profile",
      description: "Personalize their reading experience",
      content: "Create a profile for your child to tailor their activities and recommendations.",
      image: "/images/setup-child-profile.png",
      altImage: "Child Avatar",
      placeholder: "Child",
      link: "/child-setup"
    },
    {
      title: "Choose Activities",
      description: "Select engaging activities",
      content: "Pick reading activities that spark your child's interest and encourage learning.",
      image: "/images/choose-activities.png",
      altImage: "Activities",
      placeholder: "Activities",
      link: "/activities"
    }
  ];

  const scrollLeft = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentCardIndex < nextStepsCards.length - 2) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfbea]">
        {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-white">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Readle Logo" width={70} height={70} />
          <span className="ml-2 font-bold text-xl">Readle</span>
        </div>
        <div className="space-x-6">
          <Link href="/features" className="hover:text-blue-600">Features</Link>
          <Link href="/how-it-works" className="hover:text-blue-600">How It Works</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Readle, {userName}!</h1>
          <p className="text-gray-700 mb-8">Your adventure in reading begins here.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/learn-more" className="px-8 py-3 border border-gray-400 rounded-md bg-white hover:bg-gray-50 transition">
              Learn More
            </Link>
            <Link href="/question" className="px-8 py-3 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="px-4 py-12 max-w-6xl mx-auto border-t border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">What's Next?</h2>
          <p className="text-gray-700 mt-2">Here are some quick steps to take.</p>
        </div>
        
        <div className="relative">
          {/* Arrow Navigation */}
          <button 
            onClick={scrollLeft} 
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={currentCardIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="overflow-hidden">
            <div 
              ref={cardsRef}
              className="flex gap-8 transition-transform duration-300"
              style={{ transform: `translateX(-${currentCardIndex * 50}%)` }}
            >
              {nextStepsCards.map((card, index) => (
                <div 
                  key={index} 
                  className="border-2 border-gray-400 p-6 rounded-lg bg-white flex-none w-[calc(50%-1rem)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image 
                        src={card.image}
                        alt={card.altImage}
                        width={64} 
                        height={64}
                        className="rounded-full"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/64?text=${card.placeholder}`;
                        }}
                      />
                    </div>
                    <div>
                      <Link href={card.link}><h3 className="text-lg font-semibold">{card.title}</h3></Link>
                      <p className="text-sm text-gray-500 mb-2">{card.description}</p>
                      <p className="text-gray-700">{card.content}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-amber-400">👍</span>
                        <span className="text-gray-400">📝</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollRight} 
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md ${currentCardIndex >= nextStepsCards.length - 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={currentCardIndex >= nextStepsCards.length - 2}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 gap-2">
            {nextStepsCards.map((_, index) => {
              if (index <= nextStepsCards.length - 2) {
                return (
                  <button 
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`h-2 w-2 rounded-full ${index === currentCardIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      {/* User Profile Section */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="font-semibold">{userName}</h3>
              <p className="text-sm text-gray-600">Excited to help your child explore the world of reading!</p>
            </div>
          </div>
          <Link href="/question" className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition">
            Get Started
          </Link>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-sm text-gray-700 mb-4">Discover exciting stories and build reading skills!</p>
          <div className="h-24 flex items-center justify-center">
            <div className="w-12">
              <div className="w-2 h-2 bg-gray-300 rounded-full mx-auto mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mx-auto mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}