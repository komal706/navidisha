'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Bookmark, BookmarkCheck } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  duration: string;
  level: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const toggleSaveItem = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                    <p className="text-gray-600">
                      {course.provider} • {course.duration} • {course.level}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSaveItem(course.id)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {savedItems.includes(course.id) ? <BookmarkCheck /> : <Bookmark />}
                  </button>
                </div>
                <p className="mt-2 text-gray-700">{course.description}</p>
                <div className="flex justify-end mt-4">
                  <Link href={`/courses/${course.id}`}>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
