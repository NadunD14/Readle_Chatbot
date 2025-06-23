"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    language: "en",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        language: user.preferences.language,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // In a real app, you would send this to your backend
    console.log("Saving user data:", formData);
    
    setSaveSuccess(true);
    setIsSaving(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fdfbea] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <Link href="/login" className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfbea]">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 bg-white">
        <div className="flex items-center">
          <Link href="/home">
            <div className="flex items-center cursor-pointer">
              <Image src="/images/logo.png" alt="Readle Logo" width={40} height={40} />
              <span className="ml-2 font-bold text-xl">Readle</span>
            </div>
          </Link>
        </div>
        <nav className="flex gap-6">
          <Link href="/home" className="hover:text-blue-600">Home</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <button onClick={logout} className="hover:text-blue-600">Logout</button>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        {/* Account Form */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="language" className="block mb-2 font-medium">
                Preferred Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-4">
              {saveSuccess && (
                <span className="text-green-600">Changes saved successfully!</span>
              )}
              <button
                type="submit"
                className="ml-auto bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Child Accounts (if parent) */}
        {user.role === 'parent' && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Child Accounts</h2>
            <div className="flex items-center justify-between p-4 border rounded-md mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-blue-700">J</span>
                </div>
                <span>Jessie</span>
              </div>
              <Link href="/child-setup" className="text-blue-600 hover:text-blue-800">
                Edit
              </Link>
            </div>
            <Link 
              href="/child-setup" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Child Account
            </Link>
          </div>
        )}
        
        {/* Delete Account Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
          <p className="mb-4 text-gray-700">
            Deleting your account will permanently remove all your data and cannot be undone.
          </p>
          
          {deleteConfirm ? (
            <div className="border border-red-300 bg-red-50 p-4 rounded-md">
              <p className="mb-4 font-medium">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
                  onClick={() => console.log("Account would be deleted here")}
                >
                  Yes, Delete My Account
                </button>
                <button 
                  className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="text-red-600 border border-red-600 hover:bg-red-50 py-2 px-4 rounded-md"
              onClick={() => setDeleteConfirm(true)}
            >
              Delete Account
            </button>
          )}
        </div>
      </div>
    </main>
  );
}