'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, CreditCard, Shield, CheckCircle, IndianRupee } from 'lucide-react';
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

export default function PurchasePage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

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

  const handlePurchase = async () => {
    if (!lesson) return;
    
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call purchase API
      await axios.post('/api/purchase', {
        lessonId: lesson.id,
        amount: lesson.priceInINR,
        userId: 'user1' // In a real app, this would be the actual user ID
      });
      
      // Mark lesson as purchased/completed
      await axios.post('/api/progress', {
        userId: 'user1',
        lessonId: lesson.id,
        completed: true
      });
      
      router.push(`/lessons/${lesson.id}`);
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="w-full h-8 bg-gray-200 rounded mb-6"></div>
            <div className="w-full h-64 bg-gray-200 rounded"></div>
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Purchase Lesson
              </h1>
              <p className="text-gray-600 mb-8">
                Unlock premium content and start your learning journey
              </p>

              <div className="border border-gray-200 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-2xl font-bold text-orange-600">
                    <IndianRupee className="w-6 h-6" />
                    <span>{lesson.priceInINR}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    One-time payment • Lifetime access
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Complete lesson content and materials</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Interactive quizzes and assessments</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{lesson.resources.length} expert resources and references</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Progress tracking and certificates</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Lifetime access to all content</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Complete Your Purchase</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Lesson Price</span>
                  <div className="flex items-center space-x-1 font-semibold">
                    <IndianRupee className="w-4 h-4" />
                    <span>{lesson.priceInINR}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex items-center justify-between py-3 text-lg font-bold">
                  <span>Total</span>
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="w-5 h-5" />
                    <span>{lesson.priceInINR}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={processing}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                  processing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white'
                }`}
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Purchase Now</span>
                  </>
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Secure payment powered by Razorpay</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• 7-day money-back guarantee</p>
                  <p>• Secure payment processing</p>
                  <p>• Instant access after purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
