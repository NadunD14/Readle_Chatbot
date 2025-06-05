'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpMethod, setSignUpMethod] = useState('email'); // 'email' or 'mobile'
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !confirmPassword) {
      setError('Please enter all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and privacy policy');
      return;
    }
    
    // Here you would typically handle the sign-up API call
    console.log('Sign up with:', { email, password, method: signUpMethod });
    
    // Redirect to dashboard on successful sign-up
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-[#FFFFE5]">
      {/* Use the common Header component */}
      <Header />

      {/* Sign Up Content */}
      <div className="">
        <h1 className="text-4xl font-bold text-center my-8">Create an account</h1>

        <div className="w-full mx-auto flex flex-col md:flex-row">
          {/* Left Section with Image */}
          <div className="md:w-3/7 bg-gradient-to-br from-[#0D00A0] to-indigo-900 p-8 text-white flex flex-col justify-center rounded-r-xl overflow-hidden">
            <div className="z-10 mb-100 ml-24">
              <h2 className="text-3xl font-bold mb-4">Join our<br />reading community</h2>
              <p className="text-lg opacity-90">Create your account to start your reading journey today.</p>
            </div>

            <div className="z-10">
              <Image 
                src="/images/sign-up.png" 
                alt="Person signing up" 
                width={350} 
                height={300} 
                className="mx-auto absolute bottom-3/20 right-39/80"
              />
            </div>
          </div>

          {/* Right Section with Form */}
          <div className="md:w-4/7 bg-[#FFFFE5] p-8">
            <div className="max-w-xl mx-auto">
              <div className="mb-6">
                <h3 className="font-medium mb-4">Sign Up Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSignUpMethod('email')}
                    className={`py-2 px-4 text-center rounded ${
                      signUpMethod === 'email'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Email Sign Up
                  </button>
                  <button
                    onClick={() => setSignUpMethod('mobile')}
                    className={`py-2 px-4 text-center rounded ${
                      signUpMethod === 'mobile'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Mobile Sign Up
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Choose your preferred sign-up method</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    {signUpMethod === 'email' ? 'Email' : 'Mobile'}
                  </label>
                  <input
                    type={signUpMethod === 'email' ? 'email' : 'tel'}
                    id="email"
                    className="w-full bg-white p-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder={signUpMethod === 'email' ? 'Enter your email' : 'Enter your mobile number'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-white p-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full bg-white p-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms"
                    className="mr-2 h-5 w-5"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="terms" className="text-sm">
                    I accept the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-6 items-center">
                  <Link 
                    href="/login"
                    className="w-full sm:w-1/2 py-3 px-8 text-center bg-transparent border-2 border-gray-600 text-black rounded-md"
                  >
                    Already have an account?
                  </Link>

                  <button
                    type="submit"
                    className="w-full sm:w-1/2 py-3 px-8 bg-indigo-900 border-2 border-indigo-900 text-white rounded-md hover:bg-indigo-800"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <div className="mt-10">
                <div className="text-center mb-4">
                  <p className="text-gray-500">Or sign up with</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-center mb-2">
                      <Image src="/images/google.png" alt="Google" width={40} height={40} />
                    </div>
                    <p className="text-center text-sm">Sign up using your Google account.</p>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-center mb-2">
                      <Image src="/images/apple.png" alt="Apple" width={40} height={40} />
                    </div>
                    <p className="text-center text-sm">Sign up using your Apple account.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use the common Footer component */}
      <Footer />
    </main>
  );
}