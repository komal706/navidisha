import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language translations
const translations: Record<string, Record<string, string>> = {
  en: {
    getStarted: 'Get Started',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    careerChatbot: 'Career Chatbot',
    skillAssessment: 'Skill Assessment',
    coursesJobs: 'Courses & Jobs',
    mentorship: 'Mentorship',
    welcomeMessage: 'Discover Your Career Path',
    subtitle: 'AI-powered guidance for rural women',
    ctaButton: 'Get Career Guidance Now',
    footerTagline: 'Empowering rural women through AI-powered career guidance and skill development',
    // Add more translations as needed
  },
  hi: {
    getStarted: 'शुरू करें',
    login: 'लॉग इन',
    signup: 'साइन अप',
    dashboard: 'डैशबोर्ड',
    careerChatbot: 'कैरियर चैटबॉट',
    skillAssessment: 'कौशल मूल्यांकन',
    coursesJobs: 'कोर्स और नौकरियां',
    mentorship: 'मार्गदर्शन',
    welcomeMessage: 'अपना करियर पथ खोजें',
    subtitle: 'ग्रामीण महिलाओं के लिए AI-संचालित मार्गदर्शन',
    ctaButton: 'अभी कैरियर मार्गदर्शन प्राप्त करें',
    footerTagline: 'AI-संचालित कैरियर मार्गदर्शन और कौशल विकास के माध्यम से ग्रामीण महिलाओं को सशक्त बनाना',
    // Add more translations as needed
  },
  ta: {
    getStarted: 'தொடங்கவும்',
    login: 'உள்நுழைய',
    signup: 'பதிவு செய்யவும்',
    dashboard: 'டாஷ்போர்டு',
    careerChatbot: 'கரியர் சாட்போட்',
    skillAssessment: 'திறன் மதிப்பீடு',
    coursesJobs: 'படிப்புகள் & வேலைகள்',
    mentorship: 'வழிகாட்டுதல்',
    welcomeMessage: 'உங்கள் தொழில் பாதையைக் கண்டறியுங்கள்',
    subtitle: 'கிராமப்புற பெண்களுக்கான AI-வழிகாட்டுதல்',
    ctaButton: 'இப்போது கரியர் வழிகாட்டுதல் பெறுங்கள்',
    footerTagline: 'AI-வழிகாட்டுதல் மற்றும் திறன் மேம்பாட்டின் மூலம் கிராமப்புற பெண்களுக்கு அதிகாரம் அளித்தல்',
    // Add more translations as needed
  },
  // Add more languages as needed
  te: {
    // Telugu translations
    getStarted: 'ప్రారంభించండి',
    login: 'లాగిన్',
    signup: 'సైన్ అప్',
    // Add more translations as needed
  },
  bn: {
    // Bengali translations
    getStarted: 'শুরু করুন',
    login: 'লগইন',
    signup: 'সাইন আপ',
    // Add more translations as needed
  }
};

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if user has a preferred language stored
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('preferredLanguage', language);
    }
  };

  // Translation function
  const t = (key: string, fallback?: string): string => {
    if (!translations[currentLanguage]) return fallback || key;
    return translations[currentLanguage][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};