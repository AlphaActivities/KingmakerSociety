import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import SEOHead from './components/SEOHead';
import AnalyticsScripts from './components/AnalyticsScripts';
import ChatWidget from './components/ChatWidget';
import Navbar from './components/Navbar';
import MembersOnlyModal from './components/ui/MembersOnlyModal';
import Hero from './components/sections/Hero';
import WhoThisIsFor from './components/sections/WhoThisIsFor';
import Problem from './components/sections/Problem';
import Solution from './components/sections/Solution';
import Schedule from './components/sections/Schedule';
import Proof from './components/sections/Proof';
import Mentors from './components/sections/Mentors';
import Questionnaire from './components/sections/Questionnaire';
import BookCall from './components/sections/BookCall';
import Pricing from './components/sections/Pricing';
import SocialProof from './components/sections/SocialProof';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ApplyPage from './pages/ApplyPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function LandingPage() {
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  return (
    <ApplicationProvider>
      <SEOHead />
      <AnalyticsScripts />
      <ChatWidget />
      <MembersOnlyModal
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
      />
      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Navbar />
        <Hero />
        <WhoThisIsFor />
        <Problem />
        <Solution />
        <Schedule />
        <Proof />
        <Mentors />
        <Questionnaire />
        <BookCall />
        <Pricing />
        <SocialProof onMembersClick={() => setIsMembersModalOpen(true)} />
        <FinalCTA />
        <Footer onMembersClick={() => setIsMembersModalOpen(true)} />
      </div>
    </ApplicationProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
