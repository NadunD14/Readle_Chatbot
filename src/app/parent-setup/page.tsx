"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ParentSetupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    relationship: "",
    gender: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRelationshipSelect = (relationship: string) => {
    setFormData(prev => ({
      ...prev,
      relationship
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save parent data and navigate to child setup
    console.log("Form submitted:", formData);
    // Navigate to child setup page
    // In a real implementation, you'd save this data and redirect
    window.location.href = "/child-setup"; // Replace with your actual child setup page
  };

  return (
    <main className="min-h-screen bg-[#fdfbea]">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 bg-white">
        <div className="flex items-center">
          <Image src="/images/logo.png" alt="Readle Logo" width={40} height={40} />
          <h1 className="ml-2 font-bold text-xl">Readle Parent Setup</h1>
        </div>
        <nav className="flex gap-6">
          <Link href="/home" className="hover:text-blue-600">Home</Link>
          <Link href="/help" className="hover:text-blue-600">Help</Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="px-4 py-10 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Welcome to Readle!</h1>
          <p className="text-gray-700">Please fill in your details to get started.</p>
        </div>
      </section>

      <hr className="border-t border-gray-200 max-w-4xl mx-auto" />

      {/* Setup Form */}
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-5">Parent Profile Setup</h2>
            <div className="flex justify-center">
              <Image 
                src="/images/parent-profile.png" 
                alt="Family" 
                width={250} 
                height={250}
                className="rounded-full bg-pink-100 p-3"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/250?text=Family";
                }}
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              {/* Relationship to Child */}
              <div className="space-y-2">
                <label className="block font-medium">
                  Relationship to Child
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.relationship === "Mother" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleRelationshipSelect("Mother")}
                  >
                    Mother
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.relationship === "Father" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleRelationshipSelect("Father")}
                  >
                    Father
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.relationship === "Guardian" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleRelationshipSelect("Guardian")}
                  >
                    Guardian
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block font-medium">
                  Gender
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.gender === "Male" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleGenderSelect("Male")}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.gender === "Female" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleGenderSelect("Female")}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.gender === "Non-binary" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleGenderSelect("Non-binary")}
                  >
                    Non-binary
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${
                      formData.gender === "Prefer not to say" ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleGenderSelect("Prefer not to say")}
                  >
                    Prefer not to say
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Select your gender</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-800"
                >
                  Proceed to Child Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-[#fdfbea] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-gray-600">
          <Link href="/about" className="hover:text-blue-800">About Readle</Link>
          <Link href="/terms" className="hover:text-blue-800">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-800">Privacy Policy</Link>
          <Link href="/help-center" className="hover:text-blue-800">Help Center</Link>
          <Link href="/contact" className="hover:text-blue-800">Contact Us</Link>
        </div>
      </footer>
    </main>
  );
}