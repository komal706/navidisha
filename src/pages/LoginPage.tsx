import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type AuthMode = 'login' | 'signup';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup, loginAsGuest, isLoading, error } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Guest login error:', error);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    // Reset form fields when changing modes
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-purple-700 py-6 px-4 sm:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold">
              {mode === 'login' 
                ? t('loginTitle', 'Welcome Back') 
                : t('signupTitle', 'Create Your Account')}
            </h2>
            <p className="mt-2">
              {mode === 'login' 
                ? t('loginSubtitle', 'Sign in to continue your career journey') 
                : t('signupSubtitle', 'Join NaviDisha to discover your potential')}
            </p>
          </div>
        </div>
        
        <div className="py-8 px-4 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('fullName', 'Full Name')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder={t('fullNamePlaceholder', 'Your full name')}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email', 'Email or Phone')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder={t('emailPlaceholder', 'Your email or phone number')}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password', 'Password')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder={t('passwordPlaceholder', 'Your password')}
                />
              </div>
              {mode === 'login' && (
                <div className="text-right mt-1">
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                    {t('forgotPassword', 'Forgot password?')}
                  </a>
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    {t('loading', 'Loading...')}
                  </div>
                ) : (
                  mode === 'login' ? t('login', 'Login') : t('signup', 'Sign Up')
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('orContinueWith', 'Or continue with')}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {t('continueAsGuest', 'Continue as Guest')}
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'login' 
                ? t('noAccount', "Don't have an account?") 
                : t('alreadyHaveAccount', 'Already have an account?')}
              {' '}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-purple-600 hover:text-purple-800"
              >
                {mode === 'login' ? t('signup', 'Sign Up') : t('login', 'Login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;