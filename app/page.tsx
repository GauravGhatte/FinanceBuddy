import Link from 'next/link';
import { BookOpen, TrendingUp, Shield, Smartphone, Award, Users } from 'lucide-react';
import ShareQR from '../components/ShareQR';
import Navbar from '../components/Navbar';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn finance through engaging, easy-to-understand lessons crafted by experts'
    },
    {
      icon: Award,
      title: 'Quizzes & Progress',
      description: 'Test your knowledge and track your learning journey with interactive quizzes'
    },
    {
      icon: Shield,
      title: 'Expert Resources',
      description: 'Access curated resources from RBI, SEBI, and other trusted financial institutions'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Learn anywhere, anytime with our fully responsive mobile-first design'
    }
  ];

  const stats = [
    { number: '5', label: 'Finance Lessons' },
    { number: '10', label: 'Practice Quizzes' },
    { number: '15+', label: 'Expert Resources' },
    { number: '100%', label: 'Free Core Content' }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-green-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn essential finance skills through interactive lessons, expert resources, and practical quizzes. 
              Start your journey to financial literacy today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/lessons"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Learning Now
              </Link>
              
              <ShareQR />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white to-transparent opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-400 to-transparent opacity-20 rounded-full translate-y-24 -translate-x-24"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Finance Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make financial education accessible, engaging, and practical for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all card-hover group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Knowledge?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who have already started their financial literacy journey
          </p>
          <Link
            href="/lessons"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Explore All Lessons
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Finance Buddy</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making financial literacy accessible to everyone
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/lessons" className="text-gray-400 hover:text-white transition-colors">
                Lessons
              </Link>
              <Link href="/progress" className="text-gray-400 hover:text-white transition-colors">
                Progress
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
              © 2024 Finance Buddy. Made with ❤️ for financial education.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
