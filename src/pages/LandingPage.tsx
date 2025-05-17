import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Users, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: 'AI Career Guidance',
      description: 'Get personalized career advice powered by artificial intelligence tailored for rural women'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-teal-600" />,
      title: 'Skill Development',
      description: 'Access curated courses and resources to develop marketable skills for various career paths'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: 'Mentorship',
      description: 'Connect with experienced mentors who can guide you through your professional journey'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Job Opportunities',
      description: 'Discover job opportunities that match your skills, interests, and location preferences'
    }
  ];

  const testimonials = [
    {
      quote: "NaviDisha helped me discover my passion for digital marketing. Now I work remotely and support my family.",
      name: "Priya Sharma",
      location: "Rajasthan",
      image: "https://images.pexels.com/photos/3768163/pexels-photo-3768163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
    },
    {
      quote: "I never thought I could have a career in technology. The AI chatbot guided me to the right courses for my skills.",
      name: "Lakshmi Devi",
      location: "Tamil Nadu",
      image: "https://images.pexels.com/photos/3394347/pexels-photo-3394347.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
    },
    {
      quote: "My mentor helped me start my own handicraft business. The platform connected me to online marketplaces.",
      name: "Fatima Begum",
      location: "Uttar Pradesh",
      image: "https://images.pexels.com/photos/3459925/pexels-photo-3459925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6915285/pexels-photo-6915285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] opacity-20 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {t('welcomeMessage', 'Discover Your Career Path')}
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-purple-100">
                  {t('subtitle', 'AI-powered guidance for rural women')}
                </p>
              </div>
              <div className="space-y-4">
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-lg bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
                  >
                    {t('goToDashboard', 'Go to Dashboard')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-lg bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
                  >
                    {t('ctaButton', 'Get Career Guidance Now')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                <p className="text-purple-200">
                  {t('accessibilityNote', 'Available in 5 languages. Voice support for low literacy.')}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Rural women using technology" 
                className="rounded-lg shadow-xl max-w-full h-auto transform rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="#F9FAFB" 
              fillOpacity="1" 
              d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,96C960,107,1056,117,1152,122.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('howWeHelp', 'How NaviDisha Empowers You')}
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {t('featureSubtitle', 'Our platform provides comprehensive support for your career journey')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(`feature${index}Title`, feature.title)}</h3>
                <p className="text-gray-600">{t(`feature${index}Description`, feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('successStories', 'Success Stories')}
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {t('testimonialsSubtitle', 'Hear from women who transformed their lives with NaviDisha')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-purple-100"
                  />
                </div>
                <blockquote className="text-gray-600 mb-4 italic text-center">
                  "{t(`testimonial${index}Quote`, testimonial.quote)}"
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {t('ctaHeading', 'Ready to Start Your Career Journey?')}
                </h2>
                <p className="mt-4 text-teal-100 text-lg md:text-xl">
                  {t('ctaSubtext', 'Join thousands of women who have discovered new opportunities with NaviDisha')}
                </p>
                <div className="mt-8">
                  {isAuthenticated ? (
                    <Link 
                      to="/dashboard" 
                      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-lg bg-white text-teal-700 hover:bg-gray-50 transition-colors duration-300"
                    >
                      {t('goToDashboard', 'Go to Dashboard')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  ) : (
                    <Link 
                      to="/login" 
                      className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-lg bg-white text-teal-700 hover:bg-gray-50 transition-colors duration-300"
                    >
                      {t('getStarted', 'Get Started')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Women collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;