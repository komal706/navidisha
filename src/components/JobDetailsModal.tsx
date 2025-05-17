import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface JobDetailsModalProps {
  job: {
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
  };
  onClose: () => void;
  onApply: (formData: JobApplicationData) => void;
}

interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  resume?: File;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose, onApply }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<JobApplicationData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {job.salary}
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                {job.location}
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                {job.category}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('jobDescription', 'Job Description')}</h3>
              <p className="text-gray-600">{job.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('requirements', 'Requirements')}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('responsibilities', 'Responsibilities')}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-2">{t('applicationForm', 'Application Form')}</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('fullName', 'Full Name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email', 'Email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('phone', 'Phone')}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('experience', 'Experience')}
                </label>
                <textarea
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('resume', 'Resume (Optional)')}
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  {t('cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {t('submitApplication', 'Submit Application')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal; 