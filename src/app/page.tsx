"use client";

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/PublicHeader';
import Footer from '@/components/Footer/PublicFooter';
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff]">
      <Header />

      {/* Hero Section - Updated with gradient background and more modern layout */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4 bg-indigo-100 p-3 rounded-full">
                <span className="text-4xl">📚</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
                Confident Reading Starts Here
              </h1>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Empower your child with dyslexia to enjoy reading with 
                <span className="underline decoration-yellow-400 decoration-4"> interactive, proven methods </span>
                designed specifically for their unique learning needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/learn-more" className="group px-8 py-3 border-2 border-indigo-200 bg-white hover:border-indigo-300 transition-all duration-300 text-center rounded-xl flex items-center justify-center gap-2">
                  <span>Learn More</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                <Link href="/sign-up" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 text-center">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="/images/hero-image.png" 
              alt="Children enjoying reading" 
              width={550} 
              height={450} 
              className="mx-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section - Updated with cards and icons */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 lg:px-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full">JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">How It Works</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Follow these simple steps to get started with Readle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-t-4 border-purple-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-purple-100 p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image.png" alt="Create Account" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Create Account</h3>
                <p className="text-gray-600">Join Readle and set up your profile to begin your child's reading journey.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 border-t-4 border-blue-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-blue-100 p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image-1.png" alt="Setup Parent" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Setup Parent</h3>
                <p className="text-gray-600">Customize your dashboard to monitor progress and set preferences for your child.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 border-t-4 border-red-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-red-100 p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image-2.png" alt="Setup Child" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Setup Child</h3>
                <p className="text-gray-600">Create a profile for your child that personalizes their reading experience.</p>
              </div>
            </div>
            
            <div className="bg-white p-8 border-t-4 border-green-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start">
              <div className="bg-green-100 p-4 rounded-2xl mr-6">
                <Image src="/images/how-it-works/image-3.png" alt="Start Learning" width={70} height={70} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Start Learning</h3>
                <p className="text-gray-600">Access fun games and activities specifically designed for children with dyslexia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Updated with modern cards */}
      <section id="features" className="py-20 px-6 md:px-12 lg:px-24 bg-indigo-50 scroll-mt-16 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-green-100 text-green-700 px-4 py-1.5 rounded-full">FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">Our Features</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Tools designed with dyslexic readers in mind</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center p-5 group-hover:bg-yellow-200 transition-colors">
                <Image src="/images/our-features/image.png" alt="Games" width={80} height={80} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Games</h3>
              <p className="text-gray-600">Fun and engaging activities designed specifically for dyslexic learners.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center p-5 group-hover:bg-blue-200 transition-colors">
                <Image src="/images/our-features/image-1.png" alt="Tracking" width={80} height={80} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tracking</h3>
              <p className="text-gray-600">Monitor your child's improvement and progress over time with detailed insights.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center p-5 group-hover:bg-purple-200 transition-colors">
                <Image src="/images/our-features/image-2.png" alt="Rewards" width={80} height={80} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rewards</h3>
              <p className="text-gray-600">Incentives that motivate children to continue learning and building confidence.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center p-5 group-hover:bg-green-200 transition-colors">
                <Image src="/images/our-features/image-3.png" alt="Support" width={80} height={80} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support</h3>
              <p className="text-gray-600">Resources for effective parental guidance and education for ongoing success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dyslexia Quiz Section - Updated with gradient background */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-4 text-indigo-900">Is Your Child Struggling with Reading?</h2>
              <p className="mb-8 text-lg text-indigo-800">Take our internationally recognized dyslexia identification quiz to see if your child might need specialized support.</p>
              <Link href="/quiz" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 inline-flex items-center">
                <span>Start Free Quiz</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="md:w-1/3">
              <Image 
                src="/quiz-illustration.png" 
                alt="Dyslexia Quiz" 
                width={320} 
                height={320} 
                className="mx-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Updated with modern testimonial cards */}
      <section id="testimonials" className="py-20 px-6 md:px-12 lg:px-24 bg-indigo-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full">SUCCESS STORIES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">What Parents Are Saying</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Real experiences from families using Readle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full p-4 mr-4 text-white font-bold text-xl">
                  SB
                </div>
                <div>
                  <p className="font-bold text-lg">Sarah B.</p>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "Readle has made reading fun for my kid! The dyslexia-friendly activities have boosted his confidence tremendously."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full p-4 mr-4 text-white font-bold text-xl">
                  JD
                </div>
                <div>
                  <p className="font-bold text-lg">John D.</p>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "The progress tracking helps us stay motivated. We can see real improvement in our daughter's reading abilities."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-full p-4 mr-4 text-white font-bold text-xl">
                  TM
                </div>
                <div>
                  <p className="font-bold text-lg">Tina M.</p>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "My child loves the games and activities! They've made learning to read enjoyable instead of frustrating."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-full p-4 mr-4 text-white font-bold text-xl">
                  MP
                </div>
                <div>
                  <p className="font-bold text-lg">Michael P.</p>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "Great platform for building literacy skills. The dyslexia identification quiz helped us understand our son's challenges."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Updated with modern design */}
      <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">Contact Us</h2>
            <p className="text-gray-600 max-w-xl mx-auto">We're here to help with any questions</p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-indigo-50 p-10 shadow-lg rounded-2xl max-w-3xl mx-auto">
            <p className="text-center mb-10 text-lg text-gray-700">
              Have questions about how Readle can help your child? Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="text-lg">support@readle.com</span>
              </div>
              <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <span className="text-lg">1-800-READLE-1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with gradient background */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Child's Reading Experience?</h2>
          <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
            Join thousands of families who've discovered the joy of reading with Readle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/sign-up" className="px-10 py-4 bg-white text-indigo-700 font-medium rounded-xl hover:bg-indigo-50 transition-all duration-300 text-center shadow-lg">
              Sign Up Free
            </Link>
            <Link href="/learn-more" className="px-10 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center">
              Learn More
            </Link>
          </div>
          <p className="mt-6 text-indigo-200 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Accessibility Control - Fixed Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow text-2xl border-2 border-indigo-200"
          aria-label="Accessibility options"
        >
          Aa
        </button>
      </div>

      <Footer />
    </main>
  );
}