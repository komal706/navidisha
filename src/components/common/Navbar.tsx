import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <Logo />
              <span className="ml-2 text-xl font-semibold text-primary-800">NaviDisha</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/dashboard') 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/chatbot" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/chatbot') 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                >
                  Career Chatbot
                </Link>
                <Link 
                  to="/courses" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/courses') 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                >
                  Courses & Jobs
                </Link>
                <Link 
                  to="/mentors" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/mentors') 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                >
                  Mentors
                </Link>
                <button 
                  onClick={logout}
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors duration-200"
              >
                <User size={18} className="mr-1" />
                Login
              </Link>
            )}

            <div className="relative ml-3">
              <div className="flex items-center">
                <button 
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors duration-200"
                  onClick={() => {
                    const nextIndex = languages.findIndex(l => l.code === currentLanguage) + 1;
                    changeLanguage(languages[nextIndex % languages.length].code);
                  }}
                >
                  <Globe size={18} className="mr-1" />
                  {languages.find(l => l.code === currentLanguage)?.name || 'English'}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-800 hover:bg-primary-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/dashboard') 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                to="/chatbot" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/chatbot') 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
                onClick={closeMenu}
              >
                Career Chatbot
              </Link>
              <Link 
                to="/courses" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/courses') 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
                onClick={closeMenu}
              >
                Courses & Jobs
              </Link>
              <Link 
                to="/mentors" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/mentors') 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
                onClick={closeMenu}
              >
                Mentors
              </Link>
              <button 
                onClick={() => { logout(); closeMenu(); }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-800"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="px-3 py-2 text-base font-medium text-gray-600">
              Language
            </div>
            <div className="space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentLanguage === lang.code
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-800'
                  }`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    closeMenu();
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;