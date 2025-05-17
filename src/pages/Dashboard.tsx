import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Users, BarChart2, Star, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: 'AI Career Chatbot',
      description: 'Get personalized career advice from our AI assistant',
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      link: '/chatbot',
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      title: 'Skill Assessment',
      description: 'Discover your strengths and areas for improvement',
      icon: <BarChart2 className="h-8 w-8 text-white" />,
      link: '/chatbot',
      color: 'bg-primary-500 hover:bg-primary-600'
    },
    {
      title: 'Courses & Jobs',
      description: 'Find learning resources and job opportunities',
      icon: <BookOpen className="h-8 w-8 text-white" />,
      link: '/courses',
      color: 'bg-primary-400 hover:bg-primary-500'
    },
    {
      title: 'Find a Mentor',
      description: 'Connect with experienced professionals for guidance',
      icon: <Users className="h-8 w-8 text-white" />,
      link: '/mentors',
      color: 'bg-primary-300 hover:bg-primary-400'
    }
  ];

  const recommendedCourses = [
    {
      title: 'Digital Literacy Fundamentals',
      provider: 'NSDC Digital',
      duration: '4 weeks',
      match: 95,
    },
    {
      title: 'Introduction to Data Entry',
      provider: 'SkillIndia',
      duration: '3 weeks',
      match: 92,
    },
    {
      title: 'Customer Service Basics',
      provider: 'Coursera',
      duration: '6 weeks',
      match: 88,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-lavender-50">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {user?.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="h-16 w-16 rounded-full object-cover border-4 border-primary-100"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600">
                {user?.name.charAt(0) || 'G'}
              </div>
            )}
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-primary-900">{t('welcomeBack', 'Welcome back')}, {user?.name || 'Guest'}!</h1>
              <p className="text-lavender-600">{t('dashboardSubtitle', "Let's continue your career journey.")}</p>
            </div>
          </div>
          <div>
            <Link 
              to="/chatbot" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {t('getTodayAdvice', "Get Today's Advice")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`p-6 rounded-lg shadow-md ${card.color} text-white transform hover:scale-105 transition-all duration-200`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-lg p-3">
                {card.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{t(`card${index}Title`, card.title)}</h3>
                <p className="mt-1 text-sm text-white text-opacity-90">
                  {t(`card${index}Description`, card.description)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recommended courses */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary-900">
            {t('recommendedCourses', 'Recommended Courses For You')}
          </h2>
          <Link 
            to="/courses" 
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            {t('viewAll', 'View All')}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course, index) => (
            <div 
              key={index} 
              className="border border-lavender-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-lavender-50"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-primary-900">
                  {t(`course${index}Title`, course.title)}
                </h3>
                <div className="flex items-center bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 mr-1" fill="currentColor" /> {course.match}% {t('match', 'match')}
                </div>
              </div>
              <div className="text-sm text-lavender-600 mb-4">
                {t(`course${index}Provider`, course.provider)}
              </div>
              <div className="flex items-center text-sm text-lavender-500">
                <Clock className="h-4 w-4 mr-1" />
                {t(`course${index}Duration`, course.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress tracker */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-4">
          {t('yourProgress', 'Your Progress')}
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-lavender-700">
                {t('profileCompletion', 'Profile Completion')}
              </span>
              <span className="text-sm font-medium text-lavender-700">65%</span>
            </div>
            <div className="w-full bg-lavender-100 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-lavender-700">
                {t('skillAssessment', 'Skill Assessment')}
              </span>
              <span className="text-sm font-medium text-lavender-700">40%</span>
            </div>
            <div className="w-full bg-lavender-100 rounded-full h-2.5">
              <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-lavender-700">
                {t('coursesCompleted', 'Courses Completed')}
              </span>
              <span className="text-sm font-medium text-lavender-700">20%</span>
            </div>
            <div className="w-full bg-lavender-100 rounded-full h-2.5">
              <div className="bg-primary-400 h-2.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;