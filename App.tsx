
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Navbar';
import Hero from './components/Hero';
import CoursesSection from './components/CoursesSection';
import CourseDetail from './components/CourseDetail';
import RoadmapGenerator from './components/RoadmapGenerator';
import Quizzes from './components/Quizzes';
import Profile from './components/Profile';
import Community from './components/Community';
import Certificates from './components/Certificates';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
import DailyNews from './components/DailyNews';
import ChatAssistant from './components/ChatAssistant';
import { Page, Course, User, Certificate } from './types';
import { MOCK_COURSES, INITIAL_USER } from './constants';

const App: React.FC = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [session, setSession] = useState<{ isAuthenticated: boolean; role: 'user' | 'admin' | null }>({
    isAuthenticated: false,
    role: null,
  });
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set());
  const [enrollments, setEnrollments] = useState([
    { courseId: 'intro-ai-ml', progress: 45 },
    { courseId: 'mern-mongodb', progress: 12 },
  ]);
  
  const handleGetStarted = useCallback(() => {
    setShowLandingPage(false);
  }, []);

  const handleLoginSuccess = useCallback((role: 'user' | 'admin', username?: string) => {
    setSession({ isAuthenticated: true, role });
    setUser(prev => ({ ...prev, name: username || prev.name }));
    setActivePage('Dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setSession({ isAuthenticated: false, role: null });
  }, []);

  const handleUpdateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const handleUnlockCourse = useCallback((courseId: string) => {
    setUnlockedCourses(prev => new Set(prev).add(courseId));
  }, []);

  const handleAwardCertificate = useCallback((courseName: string) => {
    if (certificates.some(cert => cert.courseName === courseName)) return;
    const newCertificate: Certificate = {
      courseName,
      userName: user.name,
      date: new Date().toLocaleDateString('en-CA'),
    };
    setCertificates(prev => [...prev, newCertificate]);
  }, [certificates, user.name]);

  const handleNavClick = useCallback((page: Page) => {
    setSelectedCourse(null);
    setActivePage(page);
  }, []);

  const handleSelectCourse = useCallback((courseId: string) => {
    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setActivePage('Courses');
    }
  }, []);
  
  const handleBackToCourses = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  const renderContent = () => {
    if (activePage === 'Courses' && selectedCourse) {
      return (
        <CourseDetail 
          course={selectedCourse} 
          onBack={handleBackToCourses} 
          onAwardCertificate={handleAwardCertificate} 
          isUnlocked={unlockedCourses.has(selectedCourse.id)}
          onUnlock={() => handleUnlockCourse(selectedCourse.id)}
        />
      );
    }

    switch (activePage) {
      case 'Dashboard':
        return <Hero onSelectCourse={handleSelectCourse} onNavClick={handleNavClick} user={user} enrollments={enrollments} />;
      case 'Courses':
        return <CoursesSection onSelectCourse={handleSelectCourse} />;
      case 'Roadmap':
        return <RoadmapGenerator onNavClick={handleNavClick} user={user} />;
      case 'Daily News':
        return <DailyNews />;
      case 'Quizzes':
        return <Quizzes />;
      case 'Profile':
        return (
          <Profile 
            user={user} 
            onUpdateUser={handleUpdateUser} 
            enrollments={enrollments} 
            onNavClick={handleNavClick}
            onSelectCourse={handleSelectCourse}
          />
        );
      case 'Certificates':
         return <Certificates certificates={certificates} />;
      case 'Forum':
        return <Community user={user} />;
      default:
        return <Hero onSelectCourse={handleSelectCourse} onNavClick={handleNavClick} user={user} enrollments={enrollments} />;
    }
  };

  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }
  
  if (!session.isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (session.role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="flex min-h-screen text-gray-200 bg-transparent">
      <Sidebar activePage={activePage} onNavClick={handleNavClick} onLogout={handleLogout} />
      <main className="flex-grow md:pl-64 h-screen overflow-y-auto custom-scrollbar">
        <div key={activePage} className="page-transition">
          {renderContent()}
        </div>
      </main>
      <ChatAssistant />
    </div>
  );
};

export default App;
