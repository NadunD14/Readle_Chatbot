"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import questionsData from "@/data/questions.json";

export default function QuestionPage() {
  const [childName, setChildName] = useState("Jessie");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get child name from local storage or session if available
    const storedName = localStorage.getItem("childName");
    if (storedName) {
      setChildName(storedName);
    }
    setIsLoading(false);
  }, []);

  const handleOptionSelect = (option: string) => {
    const updatedAnswers = { ...answers, [questionsData[currentQuestion].id]: option };
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit answers or navigate to results page
      localStorage.setItem("screeningAnswers", JSON.stringify(answers));
      window.location.href = "/result";
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#fdfbea] flex items-center justify-center">Loading...</div>;
  }

  const question = questionsData[currentQuestion];

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

      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Left side decoration */}
        <div className="absolute left-0 top-0 h-full w-1/4 pointer-events-none overflow-hidden">
          <div className="absolute w-64 h-64 bg-purple-300 rounded-full opacity-70 -left-20 top-1/4"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center mb-3">Tell Us a Bit About {childName}</h1>
          <p className="text-center mb-12">
            Please answer the following questions regarding {childName}'s reading and learning abilities.
          </p>

          <div className="mb-16">
            <h2 className="text-xl font-medium mb-8">
              Question {String(question.id).padStart(2, '0')}: {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`w-full py-3 px-4 border rounded-md text-center transition-all ${
                    answers[question.id] === option
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-md bg-blue-900 text-white flex items-center transition-all ${
                !answers[question.id] ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
              }`}
              disabled={!answers[question.id]}
            >
              Next Question
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side decoration and character */}
        <div className="absolute right-0 bottom-0 pointer-events-none">
          <div className="relative">
            <div className="absolute w-64 h-64 bg-purple-300 rounded-full opacity-70 -right-20 bottom-10"></div>
            <div className="relative">
              <Image 
                src="/images/friendly-character.png" 
                alt="Friendly character" 
                width={200} 
                height={200}
                className="mb-6"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/200?text=Character";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}