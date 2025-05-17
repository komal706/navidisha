const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true,
    maxLength: [100, 'Job title cannot be more than 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Please provide job location']
  },
  remote: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: [true, 'Please specify job type'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
  },
  category: {
    type: String,
    required: [true, 'Please specify job category'],
    enum: ['Digital Skills', 'Office Skills', 'Communication', 'Marketing', 'Technical', 'Other']
  },
  description: {
    type: String,
    required: [true, 'Please provide job description'],
    maxLength: [5000, 'Description cannot be more than 5000 characters']
  },
  requirements: [{
    type: String,
    required: [true, 'Please specify job requirements']
  }],
  responsibilities: [{
    type: String,
    required: [true, 'Please specify job responsibilities']
  }],
  salary: {
    type: String,
    required: [true, 'Please provide salary information']
  },
  experience: {
    type: String,
    required: [true, 'Please specify required experience']
  },
  skills: [{
    type: String,
    required: [true, 'Please specify required skills']
  }],
  applicationDeadline: {
    type: Date,
    required: [true, 'Please provide application deadline']
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  applications: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    resume: {
      type: String,
      required: true
    },
    coverLetter: String,
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Accepted'],
      default: 'Pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['Open', 'Closed', 'On Hold'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for searching
jobSchema.index({ 
  title: 'text', 
  description: 'text', 
  company: 'text',
  skills: 'text'
});

module.exports = mongoose.model('Job', jobSchema); 