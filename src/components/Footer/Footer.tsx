import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center space-x-8 mb-6">
          <Link href="/about" className="hover:text-blue-600">About Readle</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link href="/help" className="hover:text-blue-600">Help Center</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
        </div>
        <p className="text-center text-gray-500">© {new Date().getFullYear()} Readle. All rights reserved.</p>
      </div>
    </footer>
  );
}