'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

interface Quiz {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Lesson {
  id: string;
  title: string;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.lessonId) {
      fetchQuizzes(params.lessonId as string);
      fetchLesson(params.lessonId as string);
    }
  }, [params.lessonId]);

  const fetchQuizzes = async (lessonId: string) => {
    try {
      const response = await axios.get(`/api/quizzes/${lessonId}`);
      setQuizzes(response.data);
      setSelectedAnswers(new Array(response.data.length).fill(''));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setLoading(false);
    }
  };

  const fetchLesson = async (id: string) => {
    try {
      const response = await axios.get(`/api/lessons/${id}`);
      setLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuiz] = answer;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuiz > 0) {
      setCurrentQuiz(currentQuiz - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswers(new Array(quizzes.length).fill(''));
    setShowResults(false);
  };

  const getScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizzes[index]?.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((getScore() / quizzes.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="animate-pulse">
            <div className="w-3/4 h-8 bg-gray-200 rounded mx-auto mb-8"></div>
            <div className="w-full h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Quiz Available</h1>
          <p className="text-gray-600 mb-8">There are no quiz questions for this lesson yet.</p>
          <Link 
            href="/lessons"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = getScore();
    const percentage = getScorePercentage();
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-500" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quiz {passed ? 'Completed!' : 'Needs Improvement'}
            </h1>

            <div className="mb-8">
              <div className={`text-6xl font-bold mb-2 ${
                passed ? 'text-green-500' : 'text-red-500'
              }`}>
                {percentage}%
              </div>
              <p className="text-gray-600">
                You scored {score} out of {quizzes.length} questions correctly
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h3>
              <div className="space-y-4">
                {quizzes.map((quiz, index) => (
                  <div key={index} className="text-left">
                    <p className="font-medium text-gray-900 mb-2">
                      {index + 1}. {quiz.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className={`p-3 rounded-lg ${
                        selectedAnswers[index] === quiz.correctAnswer
                          ? 'bg-green-100 text-green-800'
                          : selectedAnswers[index]
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        Your answer: {selectedAnswers[index] || 'Not answered'}
                      </div>
                      {selectedAnswers[index] !== quiz.correctAnswer && (
                        <div className="p-3 rounded-lg bg-green-50 text-green-800">
                          Correct answer: {quiz.correctAnswer}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
              
              <Link
                href="/lessons"
                className="flex items-center justify-center space-x-2 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                <span>Back to Lessons</span>
              </Link>
              
              <Link
                href="/progress"
                className="flex items-center justify-center space-x-2 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                <span>View Progress</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuizData = quizzes[currentQuiz];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href={`/lessons/${params.lessonId}`}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lesson</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {lesson?.title} - Quiz
              </h1>
              <span className="text-sm text-gray-500">
                Question {currentQuiz + 1} of {quizzes.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuiz + 1) / quizzes.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuizData.question}
          </h2>

          <div className="space-y-3 mb-8">
            {currentQuizData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all quiz-option ${
                  selectedAnswers[currentQuiz] === option ? 'selected' : ''
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuiz === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={nextQuestion}
              disabled={!selectedAnswers[currentQuiz]}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <span>
                {currentQuiz === quizzes.length - 1 ? 'Finish Quiz' : 'Next'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
