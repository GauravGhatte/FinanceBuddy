'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, BookOpen, CheckCircle, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

interface Lesson {
  id: string;
  title: string;
  description: string;
  priceInINR: number;
}

interface Progress {
  userId: string;
  lessonId: string;
  completed: boolean;
}

export default function ProgressPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lessonsRes, progressRes] = await Promise.all([
        axios.get('/api/lessons'),
        axios.get('/api/progress')
      ]);
      
      setLessons(lessonsRes.data);
      setProgress(progressRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const freeLessonsCompleted = lessons.filter(lesson => 
    lesson.priceInINR === 0 && progress.some(p => p.lessonId === lesson.id && p.completed)
  ).length;
  const paidLessonsCompleted = lessons.filter(lesson => 
    lesson.priceInINR > 0 && progress.some(p => p.lessonId === lesson.id && p.completed)
  ).length;

  const isCompleted = (lessonId: string) => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const getProgressLevel = () => {
    if (completedLessons === 0) return 'Beginner';
    if (completedLessons <= 2) return 'Learning';
    if (completedLessons <= 4) return 'Advancing';
    return 'Expert';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-20 bg-gray-200 rounded"></div>
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
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Learning Progress
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your financial education journey and celebrate your achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{completionRate}%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{completedLessons}</div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{totalLessons - completedLessons}</div>
            <div className="text-sm text-gray-600">Lessons Remaining</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{getProgressLevel()}</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Learning Journey</h2>
            <span className="text-sm text-gray-500">{completedLessons} of {totalLessons} completed</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Free Lessons</h3>
              <div className="flex items-center justify-between">
                <span className="text-green-700">{freeLessonsCompleted} completed</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Premium Lessons</h3>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">{paidLessonsCompleted} completed</span>
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Progress */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Lesson Progress</h2>
          
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isCompleted(lesson.id) 
                      ? 'bg-green-100' 
                      : lesson.priceInINR === 0 
                      ? 'bg-blue-100' 
                      : 'bg-gray-100'
                  }`}>
                    {isCompleted(lesson.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <BookOpen className={`w-5 h-5 ${
                        lesson.priceInINR === 0 ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      isCompleted(lesson.id) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {isCompleted(lesson.id) ? 'Completed' : 'Not Started'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {lesson.priceInINR === 0 ? 'Free' : `₹${lesson.priceInINR}`}
                    </div>
                  </div>

                  <Link
                    href={`/lessons/${lesson.id}`}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isCompleted(lesson.id)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : lesson.priceInINR === 0
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {isCompleted(lesson.id) ? 'Review' : lesson.priceInINR === 0 ? 'Start' : 'Purchase'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {completionRate < 100 && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Keep Learning!</h3>
              <p className="text-blue-100 mb-6">
                You're doing great! Continue your financial education journey to unlock more achievements.
              </p>
              <Link
                href="/lessons"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
