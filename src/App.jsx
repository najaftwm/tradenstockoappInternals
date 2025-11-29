import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { ROUTES, TOAST_DURATION } from './constants';
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

// Loading fallback component
const LoadingFallback = () => <FullPageLoader message="Loading..." />;

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route 
          path={ROUTES.ONBOARDING_STEP_1}
          element={<OnboardingStep1 />} 
        />
        <Route 
          path={ROUTES.ONBOARDING_STEP_2}
          element={<OnboardingStep2 />} 
        />
        <Route 
          path={ROUTES.WELCOME}
          element={<Welcome />} 
        />
        <Route 
          path={ROUTES.LOGIN}
          element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />} 
        />
        <Route 
          path={ROUTES.REGISTRATION}
          element={isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} /> : <Registration />} 
        />
        <Route 
          path={ROUTES.DASHBOARD}
          element={isAuthenticated ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.MARKET_WATCH}
          element={isAuthenticated ? <MarketWatch /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.ORDER_TRADE}
          element={isAuthenticated ? <OrderTrade /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.ORDERS}
          element={isAuthenticated ? <Orders /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.PORTFOLIO}
          element={isAuthenticated ? <Portfolio /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.TOOLS}
          element={isAuthenticated ? <Tools /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.PROFILE}
          element={isAuthenticated ? <Profile /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        <Route 
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.ONBOARDING_STEP_1} />} 
        />
      </Routes>
    </Suspense>
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
      <Suspense fallback={<LoadingFallback />}>
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
