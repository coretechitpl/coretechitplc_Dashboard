import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Server,
  TrendingUp,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  Menu,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobile?: boolean;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  collapsed,
  onToggleCollapse,
  isMobile = false,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'components', label: 'Components', icon: Server },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (viewId: string) => {
    onViewChange(viewId);
    // Auto-close sidebar on mobile after selection
    if (isMobile) {
      onToggleCollapse();
    }
  };

  // Mobile overlay backdrop
  if (isMobile) {
    return (
      <>
        {/* Mobile Backdrop Overlay */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onToggleCollapse}
              className="fixed inset-0 bg-core-black/60 backdrop-blur-sm z-40"
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-core-dark/98 to-core-black/98 backdrop-blur-xl border-r border-core-highlight/30 z-50 shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Mobile Header */}
                <div className="p-4 border-b border-core-highlight/20 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex justify-center items-center">
                      <a href="https://coretechitplc.com/">
                        <img
                          src="/logo.png"
                          alt="CoreTechIT Logo"
                          className="w-40 h-22 object-contain"
                        />
                      </a>
                    </div>
                    
                    <button
                      onClick={onToggleCollapse}
                      className="p-2 rounded-lg bg-core-black/50 border border-core-highlight/30 text-core-gold hover:bg-core-highlight/20 transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 text-core-gold'
                            : 'text-core-light/70 hover:bg-core-highlight/10 hover:text-core-light border border-transparent hover:border-core-highlight/20'
                        }`}
                      >
                        <Icon className="w-6 h-6 flex-shrink-0" />
                        <span className="font-inter font-medium text-base">
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Mobile Status & Logout */}
                <div className="p-4 border-t border-core-highlight/20 flex-shrink-0 space-y-3">
                  <div className="p-4 rounded-lg bg-core-black/50 border border-green-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-inter font-medium">
                        System Online
                      </span>
                    </div>
                  </div>

                  {onLogout && (
                    <motion.button
                      onClick={onLogout}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center space-x-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-inter font-medium">Logout</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <motion.div
      initial={false}
      animate={{ 
        width: collapsed ? '64px' : '256px'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-core-dark/95 to-core-black/95 backdrop-blur-xl border-r border-core-highlight/30 z-30 overflow-hidden"
    >
      <div className="h-full flex flex-col">
        {/* Desktop Header */}
        <div className="p-4 border-b border-core-highlight/20 flex-shrink-0">
          <div className="flex items-center justify-between">
           <div className="flex justify-center items-center">
              <a href="https://coretechitplc.com/">
                <img
                  src="/logo.png"
                  alt="CoreTechIT Logo"
                  className="w-40 h-22 object-contain"
                />
              </a>
            </div>
            
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg bg-core-black/50 border border-core-highlight/30 text-core-gold hover:bg-core-highlight/20 transition-all duration-200 flex-shrink-0"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <div key={item.id} className="relative">
                <motion.button
                  onClick={() => onViewChange(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 text-core-gold'
                      : 'text-core-light/70 hover:bg-core-highlight/10 hover:text-core-light border border-transparent hover:border-core-highlight/20'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-inter font-medium text-sm truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                {/* Desktop Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-core-dark/95 backdrop-blur-xl border border-core-highlight/30 rounded-lg px-3 py-2 text-sm font-inter text-core-light opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Status & Logout */}
        <div className="p-4 border-t border-core-highlight/20 flex-shrink-0 space-y-3">
          <div className={`p-3 rounded-lg bg-core-black/50 border border-green-500/30 ${
            collapsed ? 'text-center' : ''
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-green-400 text-sm font-inter truncate"
                  >
                    System Online
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {onLogout && (
            <div className="relative group">
              <motion.button
                onClick={onLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all duration-200 ${
                  collapsed ? 'justify-center' : ''
                }`}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-inter font-medium text-sm truncate"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Desktop Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-core-dark/95 backdrop-blur-xl border border-core-highlight/30 rounded-lg px-3 py-2 text-sm font-inter text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                  Logout
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;