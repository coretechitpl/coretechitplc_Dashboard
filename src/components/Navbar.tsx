import React, { useState } from 'react';
import { Bell, User, Search, Wifi, Shield, Zap, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#050303]/90 backdrop-blur-xl border-b border-[#84285b]/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-[#efedf5]/80 hover:text-white transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <h2 className="text-lg sm:text-xl font-bold text-[#efedf5] font-['Orbitron']">
            AI Monitoring
          </h2>

          {/* Live Indicator - hide on very small screens */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#27061c]/50 rounded-full border border-[#84285b]/30">
            <div className="w-2 h-2 bg-[#f4c951] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#efedf5]/80">Live</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Status indicators */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-lg">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Online</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-[#f4c951]/20 rounded-lg">
              <Shield className="w-4 h-4 text-[#f4c951]" />
              <span className="text-xs text-[#f4c951]">Secure</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 hover:bg-[#27061c]/50 rounded-lg transition-all duration-300">
              <Bell className="w-5 h-5 text-[#efedf5]/70" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f4c951] rounded-full flex items-center justify-center">
                <span className="text-[10px] text-black font-bold">3</span>
              </div>
            </button>
          </div>

          {/* Logout & User Info */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>

            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#27061c]/50 rounded-xl border border-[#84285b]/20">
              <div className="w-8 h-8 bg-gradient-to-r from-[#84285b] to-[#f4c951] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:flex flex-col">
                <p className="text-sm font-medium text-[#efedf5]">{user?.name}</p>
                <p className="text-xs text-[#efedf5]/60 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu (slide down) */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-[#84285b]/20 bg-[#050303]/90 backdrop-blur-xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2 py-1 bg-green-500/20 rounded-lg">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Online</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-[#f4c951]/20 rounded-lg">
              <Shield className="w-4 h-4 text-[#f4c951]" />
              <span className="text-xs text-[#f4c951]">Secure</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      )}
    </nav>
  );
}
