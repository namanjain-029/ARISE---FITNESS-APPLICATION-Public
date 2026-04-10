import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LevelingProvider } from './context/LevelingContext';


// Pages placeholders
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import LogMeal from './pages/LogMeal';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

import Inventory from './pages/Inventory';
import Payment from './pages/Payment';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <LevelingProvider>
        <Router>
          <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            {/* We will add Navbar here later */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/log-workout" element={<ProtectedRoute><LogWorkout /></ProtectedRoute>} />
                <Route path="/log-meal" element={<ProtectedRoute><LogMeal /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                <Route path="/premium/checkout" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </Router>
      </LevelingProvider>
    </AuthProvider>

  );
};

export default App;
