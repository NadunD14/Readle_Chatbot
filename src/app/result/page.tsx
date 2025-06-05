"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResultPage() {
  const [childName, setChildName] = useState("Jessie");
  const [parentName, setParentName] = useState("John");
  const [screeningResult, setScreeningResult] = useState(80);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get data from local storage
    const storedChildName = localStorage.getItem("childName");
    const storedParentName = localStorage.getItem("parentName");
    const screeningAnswers = localStorage.getItem("screeningAnswers");
    
    // Calculate result based on answers (simplified for demo)
    // In a real implementation, you would analyze the answers to determine the percentage
    const calculateResult = () => {
      if (screeningAnswers) {
        try {
          const answers = JSON.parse(screeningAnswers);
          // This is a placeholder calculation
          // In a real app, you would have a more sophisticated algorithm
          const result = Math.floor(Math.random() * 30) + 70; // Random value between 70-99%
          return result;
        } catch (e) {
          console.error("Error parsing screening answers", e);
        }
      }
      return 80; // Default value
    };

    if (storedChildName) setChildName(storedChildName);
    if (storedParentName) setParentName(storedParentName);
    setScreeningResult(calculateResult());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-[#fdfbea] flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-[#fdfbea]">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-white">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image src="/images/logo.png" alt="Readle Logo" width={40} height={40} />
              <span className="ml-2 font-bold text-xl">Readle</span>
            </div>
          </Link>
        </div>
        <div className="space-x-6">
          <Link href="/home" className="hover:text-blue-600">Home</Link>
          <Link href="/about-dyslexia" className="hover:text-blue-600">About Dyslexia</Link>
          <Link href="/resources" className="hover:text-blue-600">Resources</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-10 px-4 relative">
        {/* Results Card */}
        <div className="bg-[#e8f5da] rounded-lg p-12 shadow-md text-center relative">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">
            Dear {parentName},
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            there is about
          </p>

          {/* Percentage */}
          <div className="text-8xl font-bold text-green-500 mb-6">
            {screeningResult}%
          </div>

          <p className="text-xl text-gray-600 mb-2">
            chance that {childName} has
          </p>
          <p className="text-2xl font-semibold text-gray-700 mb-6">
            Dyslexia.
          </p>

          <p className="text-lg text-gray-600 mb-8">
            But don't worry! We are here for you!
          </p>

          <div className="flex justify-center">
            <Link href="/resources">
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-full transition-all">
                Start Your Journey with Us!
              </button>
            </Link>
          </div>

          {/* Character illustration */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Image 
              src="/images/result-child.png" 
              alt="Happy character" 
              width={300} 
              height={200}
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/150x200?text=Character";
              }}
            />
          </div>
        </div>

        {/* Additional Resources Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Get Professional Assessment</h3>
              <p className="text-gray-600">We recommend consulting with a learning specialist for a comprehensive evaluation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Explore Learning Strategies</h3>
              <p className="text-gray-600">Discover personalized techniques to support {childName}'s learning journey.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">Join Our Community</h3>
              <p className="text-gray-600">Connect with other parents and share experiences in our supportive community.</p>
            </div>
          </div>
        </div>

        {/* Email results option */}
        <div className="mt-12 text-center">
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition-all">
            Email These Results
          </button>
          <p className="mt-3 text-sm text-gray-500">
            We'll never share your information with third parties.
          </p>
        </div>
      </div>
    </main>
  );
}