const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide course title'],
    trim: true,
    maxLength: [100, 'Course title cannot be more than 100 characters']
  },
  provider: {
    type: String,
    required: [true, 'Please provide course provider'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide course description'],
    maxLength: [2000, 'Description cannot be more than 2000 characters']
  },
  duration: {
    type: String,
    required: [true, 'Please provide course duration']
  },
  level: {
    type: String,
    required: [true, 'Please specify course level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  category: {
    type: String,
    required: [true, 'Please specify course category'],
    enum: ['Digital Skills', 'Office Skills', 'Communication', 'Marketing', 'Technical', 'Soft Skills']
  },
  price: {
    type: Number,
    required: [true, 'Please provide course price']
  },
  language: {
    type: String,
    required: [true, 'Please specify course language']
  },
  syllabus: [{
    type: String,
    required: [true, 'Please provide course syllabus']
  }],
  startDate: {
    type: Date,
    required: [true, 'Please provide course start date']
  },
  enrollmentDeadline: {
    type: Date,
    required: [true, 'Please provide enrollment deadline']
  },
  prerequisites: [{
    type: String
  }],
  skills: [{
    type: String,
    required: [true, 'Please specify skills that will be learned']
  }],
  image: {
    type: String,
    default: 'default-course.jpg'
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  enrolledStudents: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating
courseSchema.methods.getAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / this.reviews.length;
};

module.exports = mongoose.model('Course', courseSchema); 