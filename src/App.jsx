import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { ROUTES, TOAST_DURATION } from './constants/index.js';
import { FullPageLoader } from './components/LoadingSpinner.jsx';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MarketWatch = lazy(() => import('./pages/MarketWatch'));
const Orders = lazy(() => import('./pages/Orders'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Tools = lazy(() => import('./pages/Tools'));
const Profile = lazy(() => import('./pages/Profile'));
const SplashScreen = lazy(() => import('./pages/SplashScreen'));
const OnboardingStep1 = lazy(() => import('./pages/OnboardingStep1'));
const OnboardingStep2 = lazy(() => import('./pages/OnboardingStep2'));
const Welcome = lazy(() => import('./pages/Welcome'));
const Registration = lazy(() => import('./pages/Registration'));
const OrderTrade = lazy(() => import('./pages/OrderTrade'));

// Loading fallback for authenticated routes only
const LoadingFallback = () => <FullPageLoader message="Loading..." />;

// Simple fallback for public routes (no loading spinner before login)
const PublicFallback = () => <div className="min-h-screen bg-slate-900"></div>;

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes - NO loading spinner */}
      <Route 
        path={ROUTES.ONBOARDING_STEP_1}
        element={
          <Suspense fallback={<PublicFallback />}>
            <OnboardingStep1 />
          </Suspense>
        } 
      />
      <Route 
        path={ROUTES.ONBOARDING_STEP_2}
        element={
          <Suspense fallback={<PublicFallback />}>
            <OnboardingStep2 />
          </Suspense>
        } 
      />
      <Route 
        path={ROUTES.WELCOME}
        element={
          <Suspense fallback={<PublicFallback />}>
            <Welcome />
          </Suspense>
        } 
      />
      <Route 
        path={ROUTES.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.DASHBOARD} />
          ) : (
            <Suspense fallback={<PublicFallback />}>
              <Login />
            </Suspense>
          )
        } 
      />
      <Route 
        path={ROUTES.REGISTRATION}
        element={
          isAuthenticated ? (
            <Navigate to={ROUTES.DASHBOARD} />
          ) : (
            <Suspense fallback={<PublicFallback />}>
              <Registration />
            </Suspense>
          )
        } 
      />
      
      {/* Authenticated routes - WITH loading spinner */}
      <Route 
        path={ROUTES.DASHBOARD}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.MARKET_WATCH}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <MarketWatch />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.ORDER_TRADE}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <OrderTrade />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.ORDERS}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <Orders />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.PORTFOLIO}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <Portfolio />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.TOOLS}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <Tools />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.PROFILE}
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
          ) : (
            <Navigate to={ROUTES.LOGIN} />
          )
        } 
      />
      <Route 
        path={ROUTES.ROOT}
        element={<Navigate to={ROUTES.ONBOARDING_STEP_1} />} 
      />
    </Routes>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setHasSeenSplash(true);
  };

  // Show splash screen only on first visit
  if (showSplash && !hasSeenSplash) {
    return (
      <Suspense fallback={<PublicFallback />}>
        <SplashScreen onFinish={handleSplashFinish} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <AppRoutes />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: TOAST_DURATION.MEDIUM,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    
  );
}

export default App;
