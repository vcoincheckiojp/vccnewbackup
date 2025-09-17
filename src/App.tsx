import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import { SupabaseProvider } from './contexts/supabaseContext';


// Import layout components
import { AppShell } from './components/layout/AppShell';

// Import page components
import { Home } from './components/pages/Home';
import { News } from './components/pages/News';
import { CreateNews } from './components/pages/CreateNews';
import { Project } from './components/pages/Project';
import { ProjectDetail } from './components/pages/ProjectDetail';
import { ProjectSubmit } from './components/pages/ProjectSubmit';

import { MarketInfo } from './components/pages/MarketInfo';
import { Library } from './components/pages/Library';
import { LibraryOverview } from './components/pages/library/LibraryOverview';
import { Dictionary } from './components/pages/library/Dictionary';
import { CardanoKnowledge } from './components/pages/library/CardanoKnowledge';
import { BlockchainKnowledge } from './components/pages/library/BlockchainKnowledge';
import { CatalystKnowledge } from './components/pages/library/CatalystKnowledge';
import { NewKnowledge } from './components/pages/library/NewKnowledge';
import { NewTerm } from './components/pages/library/NewTerm';
import { NewArticle } from './components/pages/library/NewArticle';
import { Community } from './components/pages/Community';
import { NewThread } from './components/pages/NewThread';
import { Events } from './components/pages/Events';
import { SubmitEvent } from './components/pages/SubmitEvent';
import { UserProfile } from './components/pages/UserProfile';

// Import dashboard components
import { AdminDashboard } from './components/pages/dashboards/AdminDashboard';
import { SuperModeratorDashboard } from './components/pages/dashboards/SuperModeratorDashboard';
import { ProjectModeratorDashboard } from './components/pages/dashboards/ProjectModeratorDashboard';
import { LibraryModeratorDashboard } from './components/pages/dashboards/LibraryModeratorDashboard';
import { CommunityModeratorDashboard } from './components/pages/dashboards/CommunityModeratorDashboard';

// Import auth components
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { OTPVerification } from './components/auth/OTPVerification';
import { LockScreen } from './components/auth/LockScreen';
import { FaceAuth } from './components/auth/FaceAuth';
import { useAuth } from './contexts/AuthContext';

// Import error components
import { Error403 } from './components/errors/Error403';

// Protected Route Component for role-based access
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Error403 />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  console.log('AppRoutes rendering, current path:', window.location.pathname);
  
  return (
    <Routes>
      {/* Root route - redirect to home */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      
      {/* Auth Routes (without AppShell) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTPVerification />} />
      <Route path="/lock" element={<LockScreen />} />
      <Route path="/face-auth" element={<FaceAuth />} />
      
      {/* Error Pages */}
      <Route path="/error/403" element={<Error403 />} />
      
      {/* Main App Routes (with AppShell) */}
      <Route path="/home" element={
        <AppShell>
          <Home />
        </AppShell>
      } />
      <Route path="/news" element={
        <AppShell>
          <News />
        </AppShell>
      } />
      <Route path="/news/create" element={
        <ProtectedRoute allowedRoles={['admin', 'super_moderator', 'project_moderator', 'library_moderator', 'community_moderator']}>
          <AppShell>
            <CreateNews />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/project" element={
        <AppShell>
          <Project />
        </AppShell>
      } />
      <Route path="/project/:id" element={
        <AppShell>
          <ProjectDetail />
        </AppShell>
      } />
      <Route path="/project/submit" element={
        <AppShell>
          <ProjectSubmit />
        </AppShell>
      } />

      <Route path="/market-info" element={
        <AppShell>
          <MarketInfo />
        </AppShell>
      } />
      <Route path="/library" element={
        <AppShell>
          <Library />
        </AppShell>
      } />
      <Route path="/library/overview" element={
        <AppShell>
          <LibraryOverview />
        </AppShell>
      } />
      <Route path="/library/dictionary" element={
        <AppShell>
          <Dictionary />
        </AppShell>
      } />
      <Route path="/library/cardano-knowledge" element={
        <AppShell>
          <CardanoKnowledge />
        </AppShell>
      } />
      <Route path="/library/blockchain-knowledge" element={
        <AppShell>
          <BlockchainKnowledge />
        </AppShell>
      } />
      <Route path="/library/catalyst-knowledge" element={
        <AppShell>
          <CatalystKnowledge />
        </AppShell>
      } />
      <Route path="/library/new" element={
        <ProtectedRoute allowedRoles={['admin', 'library_moderator', 'super_moderator']}>
          <AppShell>
            <NewKnowledge />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/library/dictionary/new" element={
        <ProtectedRoute allowedRoles={['admin', 'library_moderator', 'super_moderator']}>
          <AppShell>
            <NewTerm />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/library/articles/new" element={
        <ProtectedRoute allowedRoles={['admin', 'library_moderator', 'super_moderator']}>
          <AppShell>
            <NewArticle />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/community" element={
        <AppShell>
          <Community />
        </AppShell>
      } />
      <Route path="/community/new-thread" element={
        <AppShell>
          <NewThread />
        </AppShell>
      } />
      <Route path="/events" element={
        <AppShell>
          <Events />
        </AppShell>
      } />
      <Route path="/events/submit" element={
        <AppShell>
          <SubmitEvent />
        </AppShell>
      } />
      <Route path="/profile" element={
        <AppShell>
          <UserProfile />
        </AppShell>
      } />
      
      {/* Dashboard Routes - Role-based access */}
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppShell>
            <AdminDashboard />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/super-moderator" element={
        <ProtectedRoute allowedRoles={['admin', 'super_moderator']}>
          <AppShell>
            <SuperModeratorDashboard />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/project-moderator" element={
        <ProtectedRoute allowedRoles={['admin', 'super_moderator', 'project_moderator']}>
          <AppShell>
            <ProjectModeratorDashboard />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/library-moderator" element={
        <ProtectedRoute allowedRoles={['admin', 'super_moderator', 'library_moderator']}>
          <AppShell>
            <LibraryModeratorDashboard />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/community-moderator" element={
        <ProtectedRoute allowedRoles={['admin', 'super_moderator', 'community_moderator']}>
          <AppShell>
            <CommunityModeratorDashboard />
          </AppShell>
        </ProtectedRoute>
      } />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  console.log('App component rendering');
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <SupabaseProvider>
        <Router>
          <div className="min-h-screen relative overflow-hidden">
            {/* Main Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/30 to-background"></div>
            
            {/* Secondary Gradient Overlay */}
            <div className="fixed inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/10"></div>
            
            {/* Subtle Pattern Overlay */}
            <div className="fixed inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-metallic-silver/10 via-transparent to-metallic-gray/10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
            </div>
            
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              {/* Top Right Gradient Orb */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Bottom Left Gradient Orb */}
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-metallic-silver/20 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Center Accent */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-primary/5 to-transparent rounded-full blur-2xl"></div>
            </div>
            
            {/* Content Container */}
            <div className="relative z-10">
              <AppRoutes />
              <Toaster />
            </div>
          </div>
        </Router>
        </SupabaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
