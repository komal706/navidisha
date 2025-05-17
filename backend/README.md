# Navidisha Career Guidance Platform - Backend

## Description
Backend API for the Navidisha Career Guidance Platform, providing career guidance, course recommendations, and job opportunities.

## Features
- User Authentication & Authorization
- Course Management
- Job Listings & Applications
- Career Guidance Chatbot
- Profile Management

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites
- Node.js >= 14.0.0
- MongoDB Atlas account
- npm or yarn

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run the server:
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## API Documentation
- Auth Routes:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me

- Course Routes:
  - GET /api/courses
  - POST /api/courses
  - GET /api/courses/:id

- Job Routes:
  - GET /api/jobs
  - POST /api/jobs
  - GET /api/jobs/:id

## Deployment
1. Create an account on your preferred hosting platform (Render/Heroku/DigitalOcean)
2. Connect your GitHub repository
3. Set up environment variables in the hosting platform
4. Deploy the main branch

## Production Checklist
- [ ] Set up proper environment variables
- [ ] Configure CORS for production frontend URL
- [ ] Set up MongoDB Atlas production cluster
- [ ] Enable security features (helmet, rate limiting, etc.)
- [ ] Set up logging and monitoring
- [ ] Configure SSL/HTTPS
- [ ] Set up CI/CD pipeline 