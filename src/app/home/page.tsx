"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [userName, setUserName] = useState("User");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [fontStyle, setFontStyle] = useState("dyslexic"); // Default to dyslexia-friendly
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
    
    // Get font preference if saved
    const savedFont = localStorage.getItem("fontPreference") || "dyslexic";
    setFontStyle(savedFont);
  }, []);

  const toggleFontStyle = () => {
    const newStyle = fontStyle === "dyslexic" ? "standard" : "dyslexic";
    setFontStyle(newStyle);
    localStorage.setItem("fontPreference", newStyle);
  };

  const nextStepsCards = [
    {
      title: "Setup Parent Profile",
      description: "Manage your account settings",
      content: "Customize your parent dashboard to monitor progress and set preferences.",
      image: "/images/parent-profile.png", 
      icon: "👨‍👩‍👧‍👦",
      altImage: "Parent Profile",
      placeholder: "Parent",
      link: "/parent-setup"
    },
    {
      title: "Setup Child Profile",
      description: "Personalize their reading experience",
      content: "Create a profile for your child to tailor their activities and recommendations.",
      image: "/images/setup-child-profile.png",
      icon: "👶",
      altImage: "Child Avatar",
      placeholder: "Child",
      link: "/child-setup"
    },
    {
      title: "Choose Activities",
      description: "Select engaging activities",
      content: "Pick reading activities that spark your child's interest and encourage learning.",
      image: "/images/choose-activities.png",
      icon: "🎮",
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
    if (currentCardIndex < nextStepsCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] ${fontStyle === "dyslexic" ? "font-dyslexic" : "font-sans"}`}>
      {/* Accessibility Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg">
        <button 
          onClick={toggleFontStyle} 
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
          aria-label="Toggle dyslexia-friendly font"
          title={`Switch to ${fontStyle === "dyslexic" ? "standard" : "dyslexia-friendly"} font`}
        >
          {fontStyle === "dyslexic" ? "Aa" : "𝔸𝕒"}
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center py-3 px-6 bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Readle Logo" width={50} height={50} className="rounded-lg" />
          <span className="ml-2 font-bold text-2xl text-indigo-700">Readle</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/features" className="px-3 py-1 rounded-md hover:bg-indigo-50 transition flex items-center gap-2">
            <span className="text-xl">✨</span> Features
          </Link>
          <Link href="/how-it-works" className="px-3 py-1 rounded-md hover:bg-indigo-50 transition flex items-center gap-2">
            <span className="text-xl">🧩</span> How It Works
          </Link>
          <Link href="/about" className="px-3 py-1 rounded-md hover:bg-indigo-50 transition flex items-center gap-2">
            <span className="text-xl">ℹ️</span> About
          </Link>
          <Link href="/contact" className="px-3 py-1 rounded-md hover:bg-indigo-50 transition flex items-center gap-2">
            <span className="text-xl">📞</span> Contact
          </Link>
        </div>
        <button className="md:hidden text-2xl">☰</button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-4 bg-indigo-100 p-3 rounded-full">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">Welcome to Readle, {userName}!</h1>
          <p className="text-gray-700 mb-8 text-xl max-w-2xl mx-auto leading-relaxed">
            Where every child discovers the <span className="underline decoration-yellow-400 decoration-4">joy of reading</span>, 
            designed specially for children with dyslexia.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/learn-more" className="group px-8 py-3 rounded-xl border-2 border-indigo-200 bg-white hover:border-indigo-300 transition-all duration-300 flex items-center gap-2">
              <span>Learn More</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link href="/question" className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300">
              Get Started Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Next Steps Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full">JOURNEY</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-2">What's Next For You?</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">Three simple steps to begin your reading adventure.</p>
        </div>
        
        <div className="relative">
          {/* Arrow Navigation */}
          <button 
            onClick={scrollLeft} 
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg ${currentCardIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={currentCardIndex === 0}
            aria-label="Previous card"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="overflow-hidden">
            <div 
              ref={cardsRef}
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
            >
              {nextStepsCards.map((card, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-none w-full md:w-[calc(100%/3-1rem)] p-6 rounded-2xl bg-white shadow-lg border-t-4 border-indigo-400 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-20 h-20 bg-indigo-50 text-4xl rounded-full flex items-center justify-center mb-2">
                      {card.icon}
                    </div>
                    <div>
                      <Link href={card.link}>
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      </Link>
                      <p className="text-sm text-purple-600 font-medium mb-3">{card.description}</p>
                      <p className="text-gray-600">{card.content}</p>
                      <Link href={card.link} className="mt-6 inline-block px-6 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-300">
                        Start →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={scrollRight} 
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg ${currentCardIndex >= nextStepsCards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            disabled={currentCardIndex >= nextStepsCards.length - 1}
            aria-label="Next card"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 gap-3">
            {nextStepsCards.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentCardIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="px-6 py-16 bg-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Readle Works</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Designed with dyslexic readers in mind, our platform offers unique features to enhance the reading experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
              <p className="text-gray-600">Adapts to your child's reading level and learning pace in real-time.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">🔊</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Audio Support</h3>
              <p className="text-gray-600">Text-to-speech features to help with pronunciation and comprehension.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4 w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified Exercises</h3>
              <p className="text-gray-600">Fun, interactive activities that make learning to read engaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Profile Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-3xl text-white">
                  {userName.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  ⭐
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{userName}</h3>
                <p className="text-purple-600">Ready to start your reading journey!</p>
                <p className="text-gray-600 mt-1">Helping your child explore the magical world of reading.</p>
              </div>
            </div>
            <Link href="/question" className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 flex items-center gap-2">
              <span>Begin Journey</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-medium bg-green-100 text-green-700 px-4 py-1.5 rounded-full">SUCCESS STORIES</span>
          <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-2">Helping Children Thrive</h2>
          <p className="text-gray-600 max-w-xl mx-auto">See how Readle has made a difference for families.</p>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-10 shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">👩‍👧</div>
                <div>
                  <h4 className="font-bold">Sarah's Mom</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700">
                "My daughter struggled with reading for years. Within weeks of using Readle, she's showing incredible progress and actually looks forward to reading time!"
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">👨‍👦</div>
                <div>
                  <h4 className="font-bold">Michael's Dad</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700">
                "The dyslexia-friendly features have been a game-changer. For the first time, my son can read independently and feels confident about his abilities."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Begin Your Child's Reading Adventure Today</h2>
          <p className="text-lg mb-8 text-indigo-100 max-w-2xl mx-auto">
            Join thousands of families who have discovered the joy of reading with Readle.
          </p>
          <Link href="/question" className="px-10 py-4 bg-white text-indigo-700 rounded-xl font-bold hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 inline-block">
            Start Free Trial
          </Link>
          <p className="mt-4 text-indigo-200 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-200 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/images/logo.png" alt="Readle Logo" width={40} height={40} className="rounded-lg" />
                <span className="ml-2 font-bold text-xl text-white">Readle</span>
              </div>
              <p className="mb-4 max-w-xs">Helping children with dyslexia discover the joy of reading through personalized learning.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-white mb-3">Support</h3>
                <ul className="space-y-2">
                  <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition">FAQs</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-3">Learn More</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><Link href="/research" className="hover:text-white transition">Our Research</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                  <li><Link href="/accessibility" className="hover:text-white transition">Accessibility</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-indigo-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p>© {new Date().getFullYear()} Readle. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </Link>
              <Link href="#" className="hover:text-white transition" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </Link>
              <Link href="#" className="hover:text-white transition" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}