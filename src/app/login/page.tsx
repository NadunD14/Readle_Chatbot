'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please enter all required fields');
      return;
    }

    // Here you would typically handle the login API call
    console.log('Login with:', { identifier, password, method: loginMethod });

    // Redirect to dashboard on successful login
    router.push('/home');
  };

  return (
    <main className="min-h-screen bg-[#FFFFE5]">
      {/* Use the common Header component */}
      <Header />

      {/* Login Content */}
      <div className="">
        <h1 className="text-4xl font-bold text-center my-8">Welcome back!</h1>

        <div className="w-full mx-auto flex flex-col md:flex-row">
          {/* Left Section with Image */}
          <div className="md:w-3/7 bg-gradient-to-br from-[#0D00A0] to-indigo-900 p-8 text-white flex flex-col justify-center rounded-r-xl overflow-hidden">
            <div className="z-10 mb-60 ml-24">
              <h2 className="text-3xl font-bold mb-4">Log in to<br />your account</h2>
              <p className="text-lg opacity-90">Access all your reading resources and track your progress.</p>
            </div>

            <div className="z-10">
              <Image 
                src="/images/login.png" 
                alt="Person logging in" 
                width={350} 
                height={300} 
                className="mx-auto absolute bottom-4/20 right-40/80"
              />
            </div>
          </div>

          {/* Right Section with Form */}
          <div className="md:w-4/7 bg-[#FFFFE5] p-8">
            <div className="max-w-xl mx-auto">
              <div className="mb-6">
                <h3 className="font-medium mb-4">Login Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`py-2 px-4 text-center rounded ${
                      loginMethod === 'email'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Email Login
                  </button>
                  <button
                    onClick={() => setLoginMethod('mobile')}
                    className={`py-2 px-4 text-center rounded ${
                      loginMethod === 'mobile'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Mobile Login
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Choose your preferred login method</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="identifier" className="block mb-2 font-medium">
                    {loginMethod === 'email' ? 'Email' : 'Mobile'}
                  </label>
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    id="identifier"
                    className="w-full bg-white p-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your mobile number'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  {/* <p className="text-xs text-gray-500 mt-1">
                    We will send a login link to your {loginMethod === 'email' ? 'email' : 'SMS'}
                  </p> */}
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-white p-3 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* <p className="text-xs text-gray-500 mt-1">Your password must be 8 characters or more</p> */}
                </div>

                <div className="flex justify-between gap-6 items-center">
                  <button
                    type="button"
                    onClick={() => router.push('/forgot-password')}
                    className="w-1/2 py-3 px-8 bg-transparent border-2 border-gray-600 text-black rounded-md"
                  >
                    Forgot Password?
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-3 px-8 bg-indigo-900 border-2 border-indigo-900 text-white rounded-md hover:bg-indigo-800"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="mt-10">
                <div className="text-center mb-4">
                  <p className="text-gray-500">Or login with</p>
                </div>
                {/* <p className="text-center text-sm mb-4">Choose your preferred social login option</p> */}

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-center mb-2">
                      <Image src="/images/google.png" alt="Google" width={40} height={40} />
                    </div>
                    <p className="text-center text-sm">Log in using your Google account.</p>
                  </div>

                  <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-center mb-2">
                      <Image src="/images/apple.png" alt="Apple" width={40} height={40} />
                    </div>
                    <p className="text-center text-sm">Log in using your Apple account.</p>
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