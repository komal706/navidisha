
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChatbotPage from './pages/ChatbotPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from './pages/CourseDetails';         // <-- import added
import ApplyJobsPage from './pages/ApplyJobsPage';         // <-- import added
import MentorPage from './pages/MentorPage';
import LoginPage from './pages/LoginPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow">
              <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/courses/:id" element={<CourseDetails />} />

  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/chatbot" 
    element={
      <ProtectedRoute>
        <ChatbotPage />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/courses" 
    element={
      <ProtectedRoute>
        <CoursesPage />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/courses/:id" 
    element={
      <ProtectedRoute>
        <CourseDetails />
      </ProtectedRoute>
    }
  />
  <Route 
    path="/apply" 
    element={
      <ProtectedRoute>
        <ApplyJobsPage />
      </ProtectedRoute>
    }
  />
  <Route 
    path="/mentors" 
    element={
      <ProtectedRoute>
        <MentorPage />
      </ProtectedRoute>
    } 
  />
</Routes>

              
                
            </div>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
