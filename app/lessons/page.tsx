'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BookOpen, Clock, IndianRupee, Lock, CheckCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';

interface Lesson {
  id: string;
  title: string;
  description: string;
  priceInINR: number;
  content: string;
  resources: { title: string; url: string }[];
}

interface Progress {
  userId: string;
  lessonId: string;
  completed: boolean;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
    fetchProgress();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get('/api/lessons');
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await axios.get('/api/progress');
      setProgress(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress:', error);
      setLoading(false);
    }
  };

  const isCompleted = (lessonId: string) => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const isPurchased = (lesson: Lesson) => {
    return lesson.priceInINR === 0 || isCompleted(lesson.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-sm p-8 animate-pulse">
                <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-6"></div>
                <div className="w-full h-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Finance Lessons
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master essential financial skills through our carefully crafted lessons. 
            Start with free content and unlock premium lessons as you progress.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all card-hover">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    {isCompleted(lesson.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm font-semibold">
                    {lesson.priceInINR === 0 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        FREE
                      </span>
                    ) : isPurchased(lesson) ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        OWNED
                      </span>
                    ) : (
                      <>
                        <IndianRupee className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-600">{lesson.priceInINR}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>15-20 min read</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {lesson.resources.length} resources
                  </div>
                </div>

                <div className="space-y-3">
                  {isPurchased(lesson) ? (
                    <Link
                      href={`/lessons/${lesson.id}`}
                      className="block w-full bg-gradient-to-r from-blue-500 to-green-500 text-white text-center py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105"
                    >
                      {isCompleted(lesson.id) ? 'Review Lesson' : 'Start Learning'}
                    </Link>
                  ) : (
                    <Link
                      href={`/purchase/${lesson.id}`}
                      className="block w-full bg-orange-500 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Purchase for ₹{lesson.priceInINR}</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
