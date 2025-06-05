'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function HeaderClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="flex justify-between items-center py-2 px-6 bg-white sticky top-0 z-50">
      <div className="flex items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/images/logo.png" alt="Readle Logo" width={70} height={70} />
            <span className="ml-2 font-bold text-xl">Readle</span>
          </div>
        </Link>
      </div>
      <div className="space-x-6">
        <button 
          onClick={() => scrollToSection('how-it-works')} 
          className="hover:text-blue-600 cursor-pointer"
        >
          How It Works
        </button>
        <button 
          onClick={() => scrollToSection('features')} 
          className="hover:text-blue-600 cursor-pointer"
        >
          Features
        </button>
        <button 
          onClick={() => scrollToSection('testimonials')} 
          className="hover:text-blue-600 cursor-pointer"
        >
          Testimonials
        </button>
        <button 
          onClick={() => scrollToSection('contact')} 
          className="hover:text-blue-600 cursor-pointer"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}