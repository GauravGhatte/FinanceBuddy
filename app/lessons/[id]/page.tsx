'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, BookOpen, ExternalLink, Play } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

interface Lesson {
  id: string;
  title: string;
  description: string;
  priceInINR: number;
  content: string;
  resources: { title: string; url: string }[];
}

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchLesson(params.id as string);
    }
  }, [params.id]);

  const fetchLesson = async (id: string) => {
    try {
      const response = await axios.get(`/api/lessons/${id}`);
      setLesson(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      setLoading(false);
    }
  };

  const markAsCompleted = async () => {
    if (!lesson) return;
    
    try {
      await axios.post('/api/progress', {
        userId: 'user1', // In a real app, this would be the actual user ID
        lessonId: lesson.id,
        completed: true
      });
      
      router.push(`/quiz/${lesson.id}`);
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 text-gray-900">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 text-gray-800 mt-8">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-3 text-gray-800 mt-6">$1</h3>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<h|<li|<strong)(.*$)/gm, '<p class="mb-4">$1</p>')
      .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc pl-6 mb-4 space-y-1">$1</ul>')
      .replace(/<\/ul>\s*<ul[^>]*>/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="w-full h-8 bg-gray-200 rounded mb-6"></div>
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="w-full h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href="/lessons" className="text-blue-600 hover:text-blue-700">
            ← Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/lessons"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lessons</span>
          </Link>
          
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-lg text-gray-600 mt-2">{lesson.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formatContent(lesson.content) }}
              />
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Resources</h3>
              <div className="grid gap-4">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-blue-700">
                      {resource.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Lesson</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Ready to test your knowledge? Complete this lesson and take the quiz to track your progress.
              </p>
              
              <button
                onClick={markAsCompleted}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Take Quiz</span>
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated time:</span>
                    <span className="font-medium">15-20 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resources:</span>
                    <span className="font-medium">{lesson.resources.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
