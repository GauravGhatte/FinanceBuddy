'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Home, TrendingUp, Trophy } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50';
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Finance Buddy
            </span>
          </Link>

          <div className="flex space-x-1">
            <Link
              href="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${isActive('/')}`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:block">Home</span>
            </Link>
            <Link
              href="/lessons"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${isActive('/lessons')}`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:block">Lessons</span>
            </Link>
            <Link
              href="/progress"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${isActive('/progress')}`}
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:block">Progress</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
