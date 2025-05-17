import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CourseDetailsModalProps {
  course: {
    id: string;
    title: string;
    provider: string;
    duration: string;
    level: string;
    category: string;
    price: number;
    language: string;
    description: string;
    syllabus: string[];
    startDate: string;
    enrollmentDeadline: string;
  };
  onClose: () => void;
  onEnroll: () => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ course, onClose, onEnroll }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                ₹{course.price}
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                {course.duration}
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {course.level}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('courseDescription', 'Course Description')}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('syllabus', 'Syllabus')}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900">{t('startDate', 'Start Date')}</h4>
                <p className="text-gray-600">{course.startDate}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{t('enrollmentDeadline', 'Enrollment Deadline')}</h4>
                <p className="text-gray-600">{course.enrollmentDeadline}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t('cancel', 'Cancel')}
              </button>
              <button
                onClick={onEnroll}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                {t('enrollNow', 'Enroll Now')} - ₹{course.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal; 