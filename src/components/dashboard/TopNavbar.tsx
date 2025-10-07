import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface TopNavbarProps {
  onLogout: () => void;
  isMobile?: boolean;
  onToggleSidebar?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onLogout, isMobile = false, onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.notification-dropdown') && !target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!target.closest('.profile-dropdown') && !target.closest('.profile-button')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfile(false);
    onLogout();
  };

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server-01 CPU usage at 87%',
      time: '2 min ago',
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      id: 2,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      time: '15 min ago',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'Security patch available',
      time: '1 hour ago',
      icon: Info,
      color: 'text-blue-400'
    }
  ];

  return (
    <header className={`h-14 sm:h-16 bg-gradient-to-r from-core-dark/80 to-core-black/80 backdrop-blur-xl border-b border-core-highlight/30 px-3 sm:px-4 lg:px-6 flex items-center justify-between min-w-0 ${
      isMobile ? 'pl-20' : ''
    }`}>
      {/* Search */}
      <div className={`flex-1 ${isMobile ? 'max-w-[120px]' : 'max-w-xs sm:max-w-md'}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-core-light/40" />
          <input
            type="text"
            placeholder={isMobile ? "Search" : "Search..."}
            className="w-full pl-10 pr-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light placeholder-core-light/40 font-inter text-sm focus:outline-none focus:border-core-gold/50 transition-all duration-200 min-w-0"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="notification-button relative p-2 rounded-lg bg-core-black/50 border border-core-highlight/30 text-core-light hover:bg-core-highlight/20 transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-core-gold rounded-full animate-pulse"></div>
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="notification-dropdown absolute right-0 top-12 w-72 md:w-80 bg-gradient-to-br from-core-dark/95 to-core-black/95 backdrop-blur-xl border border-core-highlight/30 rounded-xl shadow-2xl z-50"
              >
                <div className="p-3 sm:p-4 border-b border-core-highlight/20">
                  <h3 className="text-core-light font-orbitron font-semibold text-sm sm:text-base">Notifications</h3>
                </div>
                <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div key={notification.id} className="p-3 sm:p-4 border-b border-core-highlight/10 hover:bg-core-highlight/5 transition-colors">
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-5 h-5 mt-0.5 ${notification.color}`} />
                          <div className="flex-1">
                            <h4 className="text-core-light font-inter font-medium text-sm">{notification.title}</h4>
                            <p className="text-core-light/70 text-xs mt-1">{notification.message}</p>
                            <p className="text-core-light/50 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 text-center">
                  <button className="text-core-gold text-sm font-inter hover:text-core-gold/80 transition-colors">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(!showProfile)}
            className="profile-button flex items-center space-x-2 p-2 rounded-lg bg-core-black/50 border border-core-highlight/30 text-core-light hover:bg-core-highlight/20 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-core-gold/20 to-core-highlight/20 rounded-full flex items-center justify-center border border-core-gold/30">
              <User className="w-4 h-4 text-core-gold" />
            </div>
            <div className={`${isMobile ? 'hidden' : 'hidden sm:block'} text-left`}>
              <p className="text-sm font-inter font-medium">Admin User</p>
              <p className="text-xs text-core-light/60">Administrator</p>
            </div>
            <ChevronDown className={`w-4 h-4 ${isMobile ? 'hidden' : 'block'}`} />
          </motion.button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="profile-dropdown absolute right-0 top-12 w-48 bg-gradient-to-br from-core-dark/95 to-core-black/95 backdrop-blur-xl border border-core-highlight/30 rounded-xl shadow-2xl z-50"
              >
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 p-2 rounded-lg text-core-light hover:bg-core-highlight/20 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="font-inter text-sm">Profile Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                   
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;