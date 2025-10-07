import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-inter">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block text-center lg:text-left"
          >
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl xl:text-6xl font-orbitron font-bold text-core-light mb-6 leading-tight"
              >
                Core
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-gold to-core-highlight">
                  Tech
                </span>
                <br />
                <span className="text-3xl xl:text-4xl">IT PLC</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-core-light/80 mb-8 font-inter leading-relaxed"
              >
                AI-Powered IT System Monitoring Dashboard
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-4 text-core-light/70">
                  <div className="w-2 h-2 bg-core-gold rounded-full animate-pulse"></div>
                  <span className="font-inter">Real-time System Monitoring</span>
                </div>
                <div className="flex items-center space-x-4 text-core-light/70">
                  <div className="w-2 h-2 bg-core-highlight rounded-full animate-pulse"></div>
                  <span className="font-inter">Predictive Analytics & AI Insights</span>
                </div>
                <div className="flex items-center space-x-4 text-core-light/70">
                  <div className="w-2 h-2 bg-core-gold rounded-full animate-pulse"></div>
                  <span className="font-inter">Advanced Risk Assessment</span>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-core-gold">99.9%</div>
                <div className="text-core-light/60 text-sm font-inter">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-core-highlight">24/7</div>
                <div className="text-core-light/60 text-sm font-inter">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-core-gold">AI</div>
                <div className="text-core-light/60 text-sm font-inter">Powered</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Login Form */}
          <div className="w-full">
            <LoginForm isSignup={isSignup} onToggle={toggleMode} onLogin={handleLogin} />
          </div>
        </div>
      </div>

      {/* Mobile branding header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:hidden relative z-10 text-center pt-8 pb-4"
      >
        <h1 className="text-3xl font-orbitron font-bold text-core-light">
          Core
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-gold to-core-highlight">
            Tech
          </span>
          IT
        </h1>
        <p className="text-core-light/70 mt-2 font-inter">AI System Monitoring</p>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 left-0 right-0 z-10 text-center text-core-light/50 text-sm font-inter"
      >
        © 2025 CoreTechIT PLC. Advanced IT Infrastructure Monitoring Solutions.
      </motion.footer>
    </div>
  );
}

export default App;