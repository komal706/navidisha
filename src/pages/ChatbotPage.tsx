import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, RefreshCw, Globe, Keyboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { t, currentLanguage } = useLanguage();
  const { user } = useAuth();
  const [showKeyboardHelper, setShowKeyboardHelper] = useState(false);

  // Add initial bot message when component mounts
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      text: getWelcomeMessage(),
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [currentLanguage]);

  // Scroll helper function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      const scrollOptions: ScrollToOptions = {
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      };
      scrollContainer.scrollTo(scrollOptions);
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    // Immediate scroll for user messages
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      scrollToBottom();
    }
    
    // Delayed scroll for bot messages to account for rendering time
    if (messages.length > 0 && messages[messages.length - 1].sender === 'bot') {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  // Additional scroll on window resize
  useEffect(() => {
    const handleResize = () => {
      if (messages.length > 0) {
        scrollToBottom();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [messages]);

  const getWelcomeMessage = (): string => {
    const welcomeMessages: Record<string, string> = {
      en: `Hi ${user?.name || 'there'}! I'm your AI career guide. I can help you discover career paths, assess your skills, or find training opportunities. What would you like to know today?`,
      hi: `नमस्ते ${user?.name || 'वहाँ'}! मैं आपका AI कैरियर गाइड हूं। मैं आपको कैरियर पथ खोजने, आपके कौशल का आकलन करने या प्रशिक्षण के अवसर खोजने में मदद कर सकता हूं। आज आप क्या जानना चाहेंगे?`,
      ta: `வணக்கம் ${user?.name || 'அங்கே'}! நான் உங்கள் AI கரியர் வழிகாட்டி. நான் உங்களுக்கு தொழில் பாதைகளைக் கண்டறிய, உங்கள் திறன்களை மதிப்பீடு செய்ய அல்லது பயிற்சி வாய்ப்புகளைக் கண்டறிய உதவ முடியும். இன்று நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?`,
      te: `హాయ్ ${user?.name || 'అక్కడ'}! నేను మీ AI కెరీర్ గైడ్. నేను మీకు కెరీర్ మార్గాలను కనుగొనడానికి, మీ నైపుణ్యాలను అంచనా వేయడానికి లేదా శిక్షణ అవకాశాలను కనుగొనడానికి సహాయం చేయగలను. ఈరోజు మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?`,
      bn: `হাই ${user?.name || 'সেখানে'}! আমি আপনার AI ক্যারিয়ার গাইড। আমি আপনাকে ক্যারিয়ার পথ আবিষ্কার করতে, আপনার দক্ষতা মূল্যায়ন করতে, বা প্রশিক্ষণের সুযোগ খুঁজতে সাহায্য করতে পারি। আজ আপনি কী জানতে চান?`
    };
    
    return welcomeMessages[currentLanguage] || welcomeMessages.en;
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // If text-to-speech is enabled, speak the response
      if (isSpeakingResponse) {
        speakText(botResponse);
      }
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    const responses: Record<string, Record<string, string>> = {
      en: {
        default: "I'm here to help guide your career journey. Could you tell me what interests you most?\n\n1. Learning new skills\n2. Finding job opportunities\n3. Understanding salary prospects\n4. Getting career advice\n\nOr feel free to ask any specific questions!",
        
        skills_start: "Let's assess your skills to find the best opportunities for you. Please answer these questions:\n\n1. Are you comfortable using a computer? (Yes/No)\n2. Which languages can you speak and write?\n3. Do you have any experience working with customers or in teams?\n4. What is your highest level of education?\n5. Are you interested in working from home?",
        
        skills_computer_yes: "That's excellent! Your computer skills open up many opportunities in the digital workspace. Here are some potential career paths:\n\n1. Data Entry Specialist (₹12,000-18,000/month)\n2. Customer Service Representative (₹15,000-22,000/month)\n3. Virtual Assistant (₹14,000-20,000/month)\n4. Digital Marketing Assistant (₹18,000-25,000/month)\n\nWould you like to:\na) Learn more about any of these roles\nb) See relevant training courses\nc) View current job openings",
        
        skills_computer_no: "Don't worry! Everyone starts somewhere. I recommend starting with our 'Digital Literacy Fundamentals' course (₹499 only). This 4-week course will teach you:\n\n1. Basic computer operations\n2. Internet and email usage\n3. Microsoft Office basics (Word, Excel)\n4. Online communication tools\n\nAfter completing this, you'll be ready for entry-level remote jobs paying ₹10,000-15,000 monthly. Should I show you the course details?",
        
        skills_language: "Multilingual skills are highly valued! Here are your career opportunities:\n\n1. Customer Service Representative\n   • Salary: ₹12,000-18,000/month\n   • Work from home options available\n   • Handle customer queries in multiple languages\n\n2. Content Translator\n   • Salary: ₹15,000-25,000/month\n   • Flexible working hours\n   • Translate documents and websites\n\n3. Language Trainer\n   • Earnings: ₹300-500/hour\n   • Online teaching opportunities\n   • Set your own schedule\n\nWould you like to:\na) See current openings\nb) View required certifications\nc) Connect with a mentor in your chosen field",
        
        skills_customer: "Your customer service experience is valuable! Here are suitable roles:\n\n1. Remote Customer Support\n   • Salary: ₹15,000-22,000/month\n   • Work from home\n   • Flexible shifts\n   • Health insurance included\n\n2. Virtual Assistant\n   • Salary: ₹14,000-20,000/month\n   • Choose your working hours\n   • Handle emails and scheduling\n\n3. Sales Coordinator\n   • Salary: ₹18,000-25,000/month\n   • Commission opportunities\n   • Career growth path\n\nInterested in any role? I can show you:\na) Detailed job descriptions\nb) Required training courses\nc) Current openings",
        
        courses: "Here are our most popular courses, all under ₹1,000:\n\n1. Digital Literacy Fundamentals\n   • Price: ₹499\n   • Duration: 4 weeks\n   • No prerequisites needed\n   • Includes: Computer basics, internet skills, MS Office\n\n2. Customer Service Excellence\n   • Price: ₹799\n   • Duration: 6 weeks\n   • Includes: Communication skills, problem-solving, customer handling\n\n3. Data Entry Specialist\n   • Price: ₹699\n   • Duration: 3 weeks\n   • Includes: Typing skills, data accuracy, Excel basics\n\nAll courses include:\n• Certificate upon completion\n• Practice assignments\n• Job placement assistance\n• Mentor support\n\nWhich course would you like to know more about?",
        
        jobs: "Based on current market demand, here are the top remote job opportunities:\n\n1. Data Entry Specialist\n   • Salary: ₹12,000-18,000/month\n   • Requirements: Basic computer skills\n   • Work from home\n   • Flexible timing (4-8 hours/day)\n\n2. Customer Service Representative\n   • Salary: ₹15,000-22,000/month\n   • Requirements: Good communication skills\n   • Language bonus: +₹2,000-5,000/month\n   • Health insurance included\n\n3. Virtual Assistant\n   • Salary: ₹14,000-20,000/month\n   • Requirements: Computer skills, English proficiency\n   • Choose your working hours\n   • Growth opportunities\n\nBenefits included:\n• Work from home\n• Paid training\n• Performance bonuses\n• Career growth\n\nWould you like to:\na) Apply for any position\nb) See required qualifications\nc) Get application tips",
        
        salary: "Here's a breakdown of remote work salaries for beginners:\n\n1. Entry-Level Positions (0-1 year experience)\n   • Data Entry: ₹10,000-15,000/month\n   • Customer Service: ₹12,000-18,000/month\n   • Virtual Assistant: ₹12,000-16,000/month\n\n2. With 1-2 Years Experience\n   • Data Entry: ₹15,000-20,000/month\n   • Customer Service: ₹18,000-25,000/month\n   • Virtual Assistant: ₹16,000-22,000/month\n\nAdditional Benefits:\n• Performance bonuses: ₹2,000-5,000/month\n• Language skills bonus: ₹2,000-5,000/month\n• Health insurance\n• Annual increments\n\nWould you like to:\na) See current job openings\nb) Learn skills for higher-paying roles\nc) Get salary negotiation tips",
        
        education: "Good news! Many remote jobs focus on skills rather than formal degrees. Here's what you need to know:\n\n1. Required Qualifications:\n   • Basic computer skills\n   • Good communication\n   • Reliability and dedication\n\n2. Recommended Certifications:\n   • Digital Literacy (₹499)\n   • Customer Service (₹799)\n   • Data Entry Specialist (₹699)\n\n3. Career Growth Path:\n   • Start: Entry-level position (₹10,000-15,000/month)\n   • 6 months: Team lead opportunities (₹18,000-25,000/month)\n   • 1 year: Specialist roles (₹25,000-35,000/month)\n\nWould you like to:\na) View certification courses\nb) See success stories\nc) Talk to a career counselor",
        
        mentor: "Connecting with a mentor can accelerate your career growth. Our mentors are experienced professionals who can help you:\n\n1. Career Planning\n   • Choose the right career path\n   • Set achievable goals\n   • Create development plans\n\n2. Skill Development\n   • Identify key skills to learn\n   • Recommend courses\n   • Provide practical tips\n\n3. Job Search Support\n   • Resume review\n   • Interview preparation\n   • Salary negotiation\n\nWould you like to:\na) View mentor profiles\nb) Schedule a free consultation\nc) Join group mentoring sessions",

        work_from_home: "Here's everything you need to know about working from home:\n\n1. Essential Requirements:\n   • Computer/laptop\n   • Stable internet connection\n   • Quiet workspace\n   • Basic computer skills\n\n2. Popular WFH Jobs:\n   • Data Entry: ₹12,000-18,000/month\n   • Customer Service: ₹15,000-22,000/month\n   • Virtual Assistant: ₹14,000-20,000/month\n\n3. Benefits:\n   • Save time and money on commuting\n   • Flexible working hours\n   • Better work-life balance\n\nWould you like to:\na) See WFH job openings\nb) Learn required skills\nc) Get home office setup tips"
      },
      hi: {
        default: "मैं आपकी करियर यात्रा में मदद करने के लिए यहां हूं। क्या आप मुझे बता सकते हैं कि आपकी सबसे ज्यादा रुचि किसमें है?\n\n1. नए कौशल सीखना\n2. नौकरी के अवसर खोजना\n3. वेतन की जानकारी\n4. करियर सलाह\n\nया कोई भी सवाल पूछें!",
        
        skills_start: "आइए आपके कौशल का आकलन करें:\n\n1. क्या आप कंप्यूटर का उपयोग करने में सहज हैं? (हां/नहीं)\n2. आप कौन-कौन सी भाषाएं बोल और लिख सकते हैं?\n3. क्या आपको ग्राहकों या टीम में काम करने का अनुभव है?\n4. आपकी उच्चतम शिक्षा क्या है?\n5. क्या आप घर से काम करने में रुचि रखते हैं?",
        
        // Add more Hindi responses following the same detailed format as English
      },
      ta: {
        default: "உங்கள் தொழில் பயணத்தில் உதவ நான் இங்கே இருக்கிறேன். உங்களுக்கு எது மிகவும் ஆர்வமாக உள்ளது என்பதை சொல்ல முடியுமா?\n\n1. புதிய திறன்களைக் கற்றல்\n2. வேலை வாய்ப்புகளைக் கண்டறிதல்\n3. சம்பள விவரங்கள்\n4. தொழில் ஆலோசனை\n\nஅல்லது எந்த கேள்வியையும் கேளுங்கள்!",
        
        // Add more Tamil responses following the same detailed format as English
      },
      te: {
        default: "మీ కెరీర్ ప్రయాణంలో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీకు ఏది ఎక్కువ ఆసక్తి కలిగిస్తుందో చెప్పగలరా?\n\n1. కొత్త నైపుణ్యాలు నేర్చుకోవడం\n2. ఉద్యోగ అవకాశాలు కనుగొనడం\n3. జీతం వివరాలు\n4. కెరీర్ సలహా\n\nలేదా ఏదైనా ప్రశ్న అడగండి!",
        
        // Add more Telugu responses following the same detailed format as English
      },
      bn: {
        default: "আপনার ক্যারিয়ার যাত্রায় সাহায্য করতে আমি এখানে আছি। আপনার সবচেয়ে বেশি আগ্রহ কোনটিতে তা বলতে পারবেন?\n\n1. নতুন দক্ষতা শেখা\n2. চাকরির সুযোগ খোঁজা\n3. বেতনের তথ্য\n4. ক্যারিয়ার পরামর্শ\n\nঅথবা যেকোনো প্রশ্ন জিজ্ঞাসা করুন!",
        
        // Add more Bengali responses following the same detailed format as English
      }
    };

    // Default to English if language not available
    const languageResponses = responses[currentLanguage] || responses.en;

    // Enhanced context-aware response logic
    if (messages.length > 0) {
      const lastBotMessage = messages[messages.length - 1].text;
      const lastUserMessage = messages.filter(m => m.sender === 'user').pop()?.text.toLowerCase() || '';
      
      // Handle follow-up responses to skill assessment
      if (lastBotMessage.includes("Are you comfortable using a computer?")) {
        if (input.match(/yes|yeah|sure|हां|ஆம்|అవును|হ্যাঁ/i)) {
          return languageResponses.skills_computer_yes;
        }
        if (input.match(/no|nope|not|नहीं|இல்லை|లేదు|না/i)) {
          return languageResponses.skills_computer_no;
        }
      }

      // Handle follow-up to computer skills response
      if (lastBotMessage.includes("Digital Literacy Fundamentals") && input.match(/yes|show|tell|more|details/i)) {
        return languageResponses.courses;
      }

      // Handle follow-up to job roles
      if (lastBotMessage.includes("Would you like to:") && lastBotMessage.includes("job")) {
        if (input.match(/role|position|detail|more/i)) {
          return languageResponses.jobs;
        }
        if (input.match(/course|train|learn/i)) {
          return languageResponses.courses;
        }
        if (input.match(/apply|opening|current/i)) {
          return languageResponses.jobs;
        }
      }

      // Handle follow-up to salary information
      if (lastBotMessage.includes("salary") && lastBotMessage.includes("Would you like to:")) {
        if (input.match(/job|opening|position/i)) {
          return languageResponses.jobs;
        }
        if (input.match(/skill|learn|course/i)) {
          return languageResponses.courses;
        }
        if (input.match(/tip|negotiat/i)) {
          return "Here are some salary negotiation tips:\n\n1. Research the market rate for your role\n2. Highlight your skills and experience\n3. Consider the total package (salary + benefits)\n4. Be confident but professional\n\nWould you like to:\na) See current job openings\nb) Connect with a mentor for negotiation advice";
        }
      }

      // Handle follow-up to education query
      if (lastBotMessage.includes("Career Growth Path") && lastBotMessage.includes("Would you like to:")) {
        if (input.match(/course|certification/i)) {
          return languageResponses.courses;
        }
        if (input.match(/success|stor/i)) {
          return "Here are some success stories from our platform:\n\n1. Priya - Started with Digital Literacy course, now earning ₹25,000/month as a Virtual Assistant\n2. Meena - Learned data entry, promoted to Team Lead in 8 months\n3. Lakshmi - Started with customer service, now training new employees\n\nWould you like to:\na) Start your success story with our courses\nb) Connect with these achievers\nc) See current job openings";
        }
      }
    }

    // Enhanced keyword matching with synonyms and related terms
    const keywords = {
      skills: /skill|ability|talent|expert|कौशल|திறன்|నైపుణ్యం|দক্ষতা/i,
      language: /language|speak|tongue|भाषा|மொழி|భాష|ভাষা/i,
      customer: /customer|client|support|ग्राहक|வாடிக்கையாளர்|కస్టమర్|গ্রাহক/i,
      course: /course|class|learn|study|train|कोर्स|படிப்பு|కోర్స్|কোর্স/i,
      job: /job|work|career|employ|position|नौकरी|வேலை|ఉద్యోగం|চাকরি/i,
      salary: /salary|pay|income|earn|money|वेतन|சம்பளம்|జీతం|বেতন/i,
      education: /education|degree|study|school|शिक्षा|கல்வி|విద్య|শিক্ষা/i,
      mentor: /mentor|guide|coach|help|मेंटर|வழிகாட்டி|మార్గదర్శి|মেন্টর/i,
      home: /home|remote|online|distance|घर|வீட்டில்|ఇంటి|বাড়ি/i
    };

    // Check for multiple keywords to provide more relevant responses
    const matchedKeywords = Object.entries(keywords)
      .filter(([_, pattern]) => pattern.test(input))
      .map(([key]) => key);

    if (matchedKeywords.length > 1) {
      // Combine relevant information from multiple topics
      if (matchedKeywords.includes('job') && matchedKeywords.includes('home')) {
        return languageResponses.work_from_home;
      }
      if (matchedKeywords.includes('salary') && matchedKeywords.includes('education')) {
        return languageResponses.education;
      }
      if (matchedKeywords.includes('skills') && matchedKeywords.includes('job')) {
        return languageResponses.skills_start;
      }
    }

    // Single keyword matching
    for (const [key, pattern] of Object.entries(keywords)) {
      if (pattern.test(input)) {
        return languageResponses[key === 'skills' ? 'skills_start' : key];
      }
    }

    return languageResponses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // In a real implementation, this would use the Web Speech API
    if (!isRecording) {
      // Start recording
      // For demo purposes, we're just toggling the state
    } else {
      // Stop recording and process the speech
      // For demo purposes, let's just set a mock input
      setInputText("I want to learn new skills for work");
    }
  };

  const toggleSpeaking = () => {
    setIsSpeakingResponse(!isSpeakingResponse);
  };

  const speakText = (text: string) => {
    // This would use the Web Speech API in a real implementation
    // For demo purposes, we're just logging
    console.log("Speaking:", text);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Add keyboard helper component
  const KeyboardHelper = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('keyboardHelper', 'Language Input Guide')}</h3>
          <button
            onClick={() => setShowKeyboardHelper(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Google Input Tools</h4>
            <p className="text-gray-600 mb-2">The easiest way to type in different languages:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Visit <a href="https://www.google.com/inputtools/try/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">Google Input Tools</a></li>
              <li>Select your language (Hindi, Tamil, Telugu, Bengali)</li>
              <li>Type in English, and it will convert to your selected language</li>
              <li>Copy and paste the text into our chat</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Windows Built-in Method</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Open Windows Settings → Time & Language → Language</li>
              <li>Click "Add a language" and select your preferred language</li>
              <li>Click on the language and select "Options"</li>
              <li>Add the keyboard for your language</li>
              <li>Use Win + Space to switch between languages</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Quick Language Tips</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Hindi Example:</p>
                <p>namaste → नमस्ते</p>
                <p>kaise ho → कैसे हो</p>
              </div>
              <div>
                <p className="font-medium">Tamil Example:</p>
                <p>vanakkam → வணக்கம்</p>
                <p>eppadi → எப்படி</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-gray-600">
            <p className="text-sm">💡 Tip: You can also use voice input in your preferred language by clicking the microphone icon.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl h-screen flex flex-col">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col flex-grow">
        {/* Header */}
        <div className="bg-primary-500 p-4 text-white flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{t('aiCareerGuide', 'AI Career Guide')}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowKeyboardHelper(true)}
                className="p-2 rounded-full hover:bg-primary-600 transition-colors"
                aria-label="Language Input Help"
              >
                <Keyboard size={20} />
              </button>
              <button 
                onClick={toggleSpeaking}
                className="p-2 rounded-full hover:bg-primary-600 transition-colors"
                aria-label={isSpeakingResponse ? 'Disable text-to-speech' : 'Enable text-to-speech'}
              >
                {isSpeakingResponse ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              <button 
                onClick={resetChat}
                className="p-2 rounded-full hover:bg-primary-600 transition-colors"
                aria-label="Reset conversation"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Chat messages area */}
        <div 
          ref={chatContainerRef}
          className="p-4 flex-grow overflow-y-auto bg-gray-50 scroll-smooth"
          style={{ 
            maxHeight: 'calc(100vh - 300px)',
            scrollbarWidth: 'thin',
            scrollbarColor: '#E2E8F0 #CBD5E0'
          }}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-primary-500 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center">
            <button
              onClick={toggleRecording}
              className={`p-2 rounded-full mr-2 ${
                isRecording 
                  ? 'bg-red-100 text-red-600 animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <div className="flex-grow relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('typeChatbotMessage', 'Type your message... (Click keyboard icon for language input help)')}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={inputText.trim() === ''}
              className={`p-2 rounded-full ml-2 ${
                inputText.trim() === ''
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 flex items-center">
            <Keyboard size={14} className="mr-1" />
            {t('languageInputTip', 'Click the keyboard icon above for language input help')}
          </div>
        </div>
      </div>
      
      {/* Suggested questions */}
      <div className="mt-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{t('suggestedQuestions', 'Suggested Questions:')}</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'What skills are in demand?',
            'How can I work remotely?',
            'Do I need a degree?',
            'How much can I earn?'
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="bg-white border border-primary-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors"
            >
              {t(`suggestedQuestion${index}`, question)}
            </button>
          ))}
        </div>
      </div>

      {/* Show keyboard helper modal */}
      {showKeyboardHelper && <KeyboardHelper />}
    </div>
  );
};

export default ChatbotPage;