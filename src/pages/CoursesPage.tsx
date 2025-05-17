import React, { useState } from 'react';
import { Search, Filter, Clock, Star, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CourseDetailsModal from '../components/CourseDetailsModal';
import JobDetailsModal from '../components/JobDetailsModal';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  match: number;
  language: string;
  description: string;
  price: number;
  syllabus: string[];
  startDate: string;
  enrollmentDeadline: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salary: string;
  category: string;
  match: number;
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationDeadline: string;
}

interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  resume?: File;
}

const CoursesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'jobs'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { t } = useLanguage();

  // Mock courses data with added details
  const courses: Course[] = [
    {
      id: '1',
      title: 'Digital Literacy Fundamentals',
      provider: 'NSDC Digital',
      duration: '4 weeks',
      level: 'Beginner',
      category: 'Digital Skills',
      match: 95,
      language: 'Multiple',
      description: 'Learn essential computer skills, internet navigation, email usage, and basic office software. Perfect for beginners entering the digital workforce.',
      price: 499,
      syllabus: [
        'Introduction to Computers',
        'Internet Basics and Web Navigation',
        'Email Communication',
        'Basic Office Software',
        'Digital Safety and Security',
        'Mobile Device Usage'
      ],
      startDate: '2024-04-01',
      enrollmentDeadline: '2024-03-25'
    },
    {
      id: '2',
      title: 'Introduction to Data Entry',
      provider: 'SkillIndia',
      duration: '3 weeks',
      level: 'Beginner',
      category: 'Office Skills',
      match: 92,
      language: 'Multiple',
      description: 'Master data entry techniques, typing skills, and accuracy methods. Includes practice with common data entry software and forms.',
      price: 299,
      syllabus: [
        'Typing Fundamentals',
        'Data Entry Software Overview',
        'Accuracy and Speed Techniques',
        'Common Forms and Formats',
        'Quality Control in Data Entry'
      ],
      startDate: '2024-04-15',
      enrollmentDeadline: '2024-04-10'
    },
    {
      id: '3',
      title: 'Customer Service Basics',
      provider: 'Coursera',
      duration: '6 weeks',
      level: 'Beginner',
      category: 'Communication',
      match: 88,
      language: 'English',
      description: 'Develop essential customer service skills including effective communication, problem-solving, and handling difficult situations.',
      price: 799,
      syllabus: [
        'Communication Fundamentals',
        'Customer Service Principles',
        'Problem Solving Skills',
        'Handling Difficult Situations',
        'Cultural Sensitivity',
        'Service Excellence'
      ],
      startDate: '2024-04-01',
      enrollmentDeadline: '2024-03-28'
    }
  ];

  // Mock jobs data with added details
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Remote Data Entry Specialist',
      company: 'DataFirst Solutions',
      location: 'Remote',
      remote: true,
      salary: '₹12,000 - ₹18,000/month',
      category: 'Office Skills',
      match: 94,
      posted: '2 days ago',
      description: 'Looking for detail-oriented individuals to enter and validate data in our systems. Flexible hours with training provided.',
      requirements: [
        'Basic computer skills',
        'Good typing speed (minimum 30 WPM)',
        'Attention to detail',
        'Reliable internet connection',
        'Available for at least 4 hours per day'
      ],
      responsibilities: [
        'Data entry and validation',
        'Document processing',
        'Quality checking',
        'Basic report generation',
        'Meeting daily targets'
      ],
      applicationDeadline: '2024-03-31'
    },
    {
      id: '2',
      title: 'Customer Support Representative',
      company: 'ServiceConnect India',
      location: 'Remote / Delhi NCR',
      remote: true,
      salary: '₹15,000 - ₹22,000/month',
      category: 'Communication',
      match: 91,
      posted: '1 week ago',
      description: 'Provide customer support via chat and email. Training provided on products.',
      requirements: [
        'Excellent written communication in English/Hindi',
        'Basic computer skills',
        'Patient and empathetic attitude',
        'Available for shift work'
      ],
      responsibilities: [
        'Handling customer inquiries via chat/email',
        'Resolving customer issues',
        'Following up on pending cases',
        'Maintaining customer satisfaction metrics'
      ],
      applicationDeadline: '2024-03-25'
    }
  ];

  const toggleSaveItem = (id: string) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(itemId => itemId !== id));
    } else {
      setSavedItems([...savedItems, id]);
    }
  };

  const handleCourseEnroll = () => {
    if (selectedCourse) {
      // Handle course enrollment logic here
      alert(`Enrolled in ${selectedCourse.title}! You will receive confirmation via email.`);
      setSelectedCourse(null);
    }
  };

  const handleJobApply = (formData: JobApplicationData) => {
    if (selectedJob) {
      // Handle job application logic here
      console.log('Job application submitted:', formData);
      alert(`Application submitted for ${selectedJob.title}! You will receive confirmation via email.`);
      setSelectedJob(null);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {activeTab === 'courses' ? t('coursesTitle', 'Courses & Training') : t('jobsTitle', 'Job Opportunities')}
        </h1>
        <p className="text-gray-600">
          {activeTab === 'courses' 
            ? t('coursesSubtitle', 'Discover skills that can open new doors for your career') 
            : t('jobsSubtitle', 'Find flexible work opportunities that match your skills and situation')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'courses'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('courses')}
        >
          {t('courses', 'Courses')}
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'jobs'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('jobs')}
        >
          {t('jobs', 'Jobs')}
        </button>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder={activeTab === 'courses' 
                ? t('searchCoursesPlaceholder', 'Search courses by title, provider, or category...') 
                : t('searchJobsPlaceholder', 'Search jobs by title, company, or category...')}
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

        {/* Filter options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('category', 'Category')}
              </label>
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                <option value="">{t('allCategories', 'All Categories')}</option>
                <option value="digital">{t('digitalSkills', 'Digital Skills')}</option>
                <option value="office">{t('officeSkills', 'Office Skills')}</option>
                <option value="communication">{t('communication', 'Communication')}</option>
                <option value="marketing">{t('marketing', 'Marketing')}</option>
              </select>
            </div>
            
            {activeTab === 'courses' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('level', 'Level')}
                  </label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">{t('allLevels', 'All Levels')}</option>
                    <option value="beginner">{t('beginner', 'Beginner')}</option>
                    <option value="intermediate">{t('intermediate', 'Intermediate')}</option>
                    <option value="advanced">{t('advanced', 'Advanced')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('duration', 'Duration')}
                  </label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">{t('anyDuration', 'Any Duration')}</option>
                    <option value="short">{t('lessThan4Weeks', 'Less than 4 weeks')}</option>
                    <option value="medium">{t('4To8Weeks', '4-8 weeks')}</option>
                    <option value="long">{t('moreThan8Weeks', 'More than 8 weeks')}</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('workType', 'Work Type')}
                  </label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">{t('allTypes', 'All Types')}</option>
                    <option value="remote">{t('remoteOnly', 'Remote Only')}</option>
                    <option value="hybrid">{t('hybrid', 'Hybrid')}</option>
                    <option value="onsite">{t('onsite', 'On-site')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('postedWithin', 'Posted Within')}
                  </label>
                  <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                    <option value="">{t('anytime', 'Anytime')}</option>
                    <option value="day">{t('last24Hours', 'Last 24 hours')}</option>
                    <option value="week">{t('lastWeek', 'Last week')}</option>
                    <option value="month">{t('lastMonth', 'Last month')}</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content list */}
      <div className="space-y-6">
        {activeTab === 'courses' ? (
          filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h2>
                      <p className="text-gray-600 mb-2">{course.provider}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" /> {course.match}% {t('match', 'match')}
                      </div>
                      <div className="mt-2 text-primary-600 font-semibold">
                        ₹{course.price}
                      </div>
                      <button 
                        onClick={() => toggleSaveItem(course.id)}
                        className="mt-2 text-gray-400 hover:text-primary-600"
                        aria-label={savedItems.includes(course.id) ? 'Unsave course' : 'Save course'}
                      >
                        {savedItems.includes(course.id) ? (
                          <BookmarkCheck className="h-5 w-5" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full">{course.level}</div>
                    <div className="px-2 py-1 bg-primary-200 text-primary-800 rounded-full">{course.category}</div>
                    <div className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full">{course.language}</div>
                  </div>
                  
                  <p className="mt-4 text-gray-600">{course.description}</p>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {t('viewCourse', 'View Course')} <ExternalLink className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{t('noCoursesFound', 'No courses found matching your search.')}</p>
            </div>
          )
        ) : (
          filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" /> {job.match}% {t('match', 'match')}
                      </div>
                      <button 
                        onClick={() => toggleSaveItem(job.id)}
                        className="mt-2 text-gray-400 hover:text-primary-600"
                        aria-label={savedItems.includes(job.id) ? 'Unsave job' : 'Save job'}
                      >
                        {savedItems.includes(job.id) ? (
                          <BookmarkCheck className="h-5 w-5" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                    <div className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full">{job.location}</div>
                    <div className="px-2 py-1 bg-primary-200 text-primary-800 rounded-full">{job.category}</div>
                    <div className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full">{job.salary}</div>
                    <div className="px-2 py-1 bg-primary-200 text-primary-800 rounded-full">{job.posted}</div>
                  </div>
                  
                  <p className="mt-4 text-gray-600">{job.description}</p>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {t('applyNow', 'Apply Now')} <ExternalLink className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{t('noJobsFound', 'No jobs found matching your search.')}</p>
            </div>
          )
        )}
      </div>

      {/* Modals */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleCourseEnroll}
        />
      )}

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleJobApply}
        />
      )}
    </div>
  );
};

export default CoursesPage;