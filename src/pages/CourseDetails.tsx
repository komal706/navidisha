// src/pages/CourseDetails.t
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  // For demo, replace with real course fetch by id if you want
  const course = {
    id,
    title: 'Example Course',
    provider: 'Example Provider',
    duration: '6 weeks',
    description: 'This is a detailed description of the course.',
    level: 'Beginner',
    language: 'English',
    price: 899,
    match: 92,
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-2"><strong>Provider:</strong> {course.provider}</p>
      <p className="mb-2"><strong>Duration:</strong> {course.duration}</p>
      <p className="mb-2"><strong>Description:</strong> {course.description}</p>
      <p className="mb-2"><strong>Level:</strong> {course.level}</p>
      <p className="mb-2"><strong>Language:</strong> {course.language}</p>
      <p className="mb-2 text-green-700 font-semibold">Price: ₹{course.price}</p>
      <p className="mb-4">Match: {course.match}%</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Enroll
      </button>
    </div>
  );
};

export default CourseDetails;
