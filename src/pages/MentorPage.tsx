import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, Star, Calendar, Phone, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Mentor {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  expertise: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  availability: string;
  bio: string;
  profilePicture: string;
}

const MentorPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const { t } = useLanguage();

  // Mock mentors data
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      title: 'Digital Marketing Specialist',
      location: 'Remote (Delhi)',
      experience: '7 years',
      expertise: ['Social Media', 'Content Creation', 'E-commerce'],
      languages: ['English', 'Hindi'],
      rating: 4.8,
      reviewCount: 24,
      availability: 'Weekends, Evening IST',
      bio: 'Started my career from a rural background with minimal resources. Now I help women develop skills for digital marketing careers. Specialized in training beginners with limited technical knowledge.',
      profilePicture: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
    },
    {
      id: '2',
      name: 'Anjali Desai',
      title: 'Remote Work Consultant',
      location: 'Remote (Mumbai)',
      experience: '5 years',
      expertise: ['Virtual Assistance', 'Remote Job Coaching', 'Freelancing'],
      languages: ['English', 'Hindi', 'Marathi'],
      rating: 4.9,
      reviewCount: 32,
      availability: 'Weekdays, Flexible hours',
      bio: 'I specialize in helping women transition to remote work. Having started my own journey from a small town, I understand the unique challenges rural women face and help them navigate the digital workplace.',
      profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
    },
    {
      id: '3',
      name: 'Kavita Reddy',
      title: 'Data Entry & Admin Specialist',
      location: 'Remote (Bangalore)',
      experience: '6 years',
      expertise: ['Data Entry', 'Office Administration', 'Excel'],
      languages: ['English', 'Telugu', 'Kannada'],
      rating: 4.7,
      reviewCount: 19,
      availability: 'Weekday mornings, Some weekends',
      bio: 'Former teacher who transitioned to remote work. I now train women in data entry and administrative skills that are in high demand for remote positions. I focus on practical, job-ready skills.',
      profilePicture: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
    },
    {
      id: '4',
      name: 'Meena Kumari',
      title: 'Handcraft Entrepreneur',
      location: 'Remote (Jaipur)',
      experience: '10 years',
      expertise: ['Handicraft Business', 'E-commerce', 'Traditional Arts'],
      languages: ['Hindi', 'English', 'Rajasthani'],
      rating: 4.9,
      reviewCount: 45,
      availability: 'Flexible schedule',
      bio: 'Built a successful handicraft business from my village. Now I mentor women artisans on how to sell their crafts online and reach global markets while preserving traditional techniques.',
      profilePicture: 'https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
    },
    {
      id: '5',
      name: 'Fatima Begum',
      title: 'Customer Service Expert',
      location: 'Remote (Lucknow)',
      experience: '4 years',
      expertise: ['Customer Support', 'Communication Skills', 'Problem Solving'],
      languages: ['Urdu', 'Hindi', 'English'],
      rating: 4.6,
      reviewCount: 17,
      availability: 'Weekdays, Evening hours',
      bio: 'Started my career in customer service with no prior experience or formal education. Now I help women develop the communication and problem-solving skills needed for remote customer service roles.',
      profilePicture: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
    },
    {
      id: '6',
      name: 'Lakshmi Devi',
      title: 'Technology Trainer',
      location: 'Remote (Chennai)',
      experience: '8 years',
      expertise: ['Basic Programming', 'Web Development', 'Digital Tools'],
      languages: ['Tamil', 'English'],
      rating: 4.8,
      reviewCount: 28,
      availability: 'Weekends, Some weekday evenings',
      bio: 'From a farming family background to a tech professional. I specialize in introducing technology concepts to women with no prior tech exposure, making learning accessible and practical.',
      profilePicture: 'https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150'
    }
  ];

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedMentor = mentors.find(mentor => mentor.id === selectedMentorId);

  const handleContactMentor = (mentorId: string) => {
    // In a real app, this would open a contact form or messaging interface
    alert(`Request sent to mentor. They will contact you soon.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {t('findMentor', 'Find a Mentor')}
        </h1>
        <p className="text-gray-600">
          {t('mentorSubtitle', 'Connect with experienced professionals who can guide your career journey')}
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder={t('searchMentorsPlaceholder', 'Search mentors by name, expertise, or job title...')}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            {t('filters', 'Filters')}
          </button>
        </div>

        {/* Filter options - simplified for demo */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('expertise', 'Expertise')}
              </label>
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                <option value="">{t('allExpertise', 'All Expertise')}</option>
                <option value="digital">{t('digitalMarketing', 'Digital Marketing')}</option>
                <option value="data">{t('dataEntry', 'Data Entry')}</option>
                <option value="customer">{t('customerService', 'Customer Service')}</option>
                <option value="tech">{t('technology', 'Technology')}</option>
                <option value="handicraft">{t('handicraft', 'Handicraft Business')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('language', 'Language')}
              </label>
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                <option value="">{t('allLanguages', 'All Languages')}</option>
                <option value="hindi">{t('hindi', 'Hindi')}</option>
                <option value="english">{t('english', 'English')}</option>
                <option value="tamil">{t('tamil', 'Tamil')}</option>
                <option value="telugu">{t('telugu', 'Telugu')}</option>
                <option value="marathi">{t('marathi', 'Marathi')}</option>
                <option value="urdu">{t('urdu', 'Urdu')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('availability', 'Availability')}
              </label>
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                <option value="">{t('anyAvailability', 'Any Availability')}</option>
                <option value="weekends">{t('weekends', 'Weekends')}</option>
                <option value="weekdays">{t('weekdays', 'Weekdays')}</option>
                <option value="evenings">{t('evenings', 'Evenings')}</option>
                <option value="mornings">{t('mornings', 'Mornings')}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Mentor grid or detail view */}
      {selectedMentorId ? (
        // Mentor detail view
        selectedMentor && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <button 
                onClick={() => setSelectedMentorId(null)}
                className="mb-4 text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                ← {t('backToMentors', 'Back to mentors list')}
              </button>
              
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-full md:w-1/3">
                  <img 
                    src={selectedMentor.profilePicture} 
                    alt={selectedMentor.name} 
                    className="w-full h-auto rounded-lg shadow-md object-cover" 
                  />
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{selectedMentor.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{selectedMentor.experience} {t('experience', 'experience')}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-600">{selectedMentor.availability}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <button 
                      onClick={() => handleContactMentor(selectedMentor.id)}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {t('requestMentoring', 'Request Mentoring')}
                    </button>
                    
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {t('sendMessage', 'Send Message')}
                    </button>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMentor.name}</h2>
                      <p className="text-lg text-gray-600">{selectedMentor.title}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      <span className="ml-1 text-gray-900 font-semibold">{selectedMentor.rating}</span>
                      <span className="ml-1 text-gray-500">({selectedMentor.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('about', 'About')}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{selectedMentor.bio}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('expertise', 'Expertise')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.expertise.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('languages', 'Languages')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.languages.map((language, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('testimonials', 'Testimonials')}</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      </div>
                      <p className="text-gray-600 italic">
                        "{t('testimonialExample', `${selectedMentor.name} has been an incredible mentor. She understood my rural background and helped me find opportunities that work with my constraints. I now have a stable remote job thanks to her guidance.`)}"
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-900">{t('testimonialAuthor', 'Sunita, Madhya Pradesh')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        // Mentors grid view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={mentor.profilePicture} 
                      alt={mentor.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4" 
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{mentor.name}</h2>
                      <p className="text-gray-600">{mentor.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center mr-4">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      <span className="ml-1">{mentor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="font-medium text-gray-700 mb-1">{t('expertise', 'Expertise')}:</div>
                    <div className="flex flex-wrap gap-1 text-sm">
                      {mentor.expertise.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setSelectedMentorId(mentor.id)}
                      className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                    >
                      {t('viewProfile', 'View Profile')}
                    </button>
                    <button
                      onClick={() => handleContactMentor(mentor.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      {t('connect', 'Connect')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{t('noMentorsFound', 'No mentors found matching your search.')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MentorPage;