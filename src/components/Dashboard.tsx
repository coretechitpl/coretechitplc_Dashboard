import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './dashboard/Sidebar';
import TopNavbar from './dashboard/TopNavbar';
import DashboardOverview from './dashboard/DashboardOverview';
import ComponentsView from './dashboard/ComponentsView';
import AnalyticsView from './dashboard/AnalyticsView';
import ReportsView from './dashboard/ReportsView';
import SettingsView from './dashboard/SettingsView';
import AnimatedBackground from './AnimatedBackground';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle mobile detection and sidebar auto-collapse
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileSidebar = () => {
    if (isMobile) {
      setSidebarCollapsed(!sidebarCollapsed);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleLogout = () => {
    onLogout();
  };
  
  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'components':
        return <ComponentsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-core-black font-inter overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-core-dark/95 to-core-black/95 backdrop-blur-xl border border-core-highlight/30 rounded-lg text-core-gold hover:bg-core-highlight/20 transition-all duration-200 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
      
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleMobileSidebar}
          isMobile={isMobile}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isMobile 
            ? 'ml-0' 
            : sidebarCollapsed 
              ? 'ml-16' 
              : 'ml-64'
        }`}>
          {/* Top Navbar */}
          <TopNavbar 
            onLogout={onLogout} 
            isMobile={isMobile}
            onToggleSidebar={toggleMobileSidebar}
          />

          {/* Main Dashboard Content */}
          <main className={`flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 min-w-0 ${
            isMobile ? 'pt-20' : ''
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="min-w-0"
              >
                {renderActiveView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;