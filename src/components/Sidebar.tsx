import React, { useState } from 'react';
import {
  Monitor,
  BarChart3,
  FileText,
  Settings,
  Layers,
  AlertTriangle,
  Menu as MenuIcon,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Monitor },
  { id: 'components', label: 'Components', icon: Layers },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-5 left-5 z-50 p-2 rounded-md bg-[#84285b]/80 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#050303]/95 to-[#27061c]/95 backdrop-blur-xl border-r border-[#84285b]/20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static
          z-40
        `}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <a href="https://coretechitplc.com/">
              <img
                src="/Logo.svg"
                alt="CoreTech Logo"
                className="w-30 h-12 object-contain"
              />
            </a>
          </div>

          {/* Menu */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false); // close sidebar on mobile after click
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${activeTab === item.id
                      ? 'bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/20 border border-[#84285b]/40 shadow-lg shadow-[#84285b]/20'
                      : 'hover:bg-[#27061c]/50 hover:border-[#84285b]/20 border border-transparent'
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300
                      ${activeTab === item.id ? 'text-[#f4c951]' : 'text-[#efedf5]/70 group-hover:text-[#efedf5]'}
                    `}
                  />
                  <span
                    className={`transition-all duration-300 font-medium
                      ${activeTab === item.id ? 'text-[#efedf5]' : 'text-[#efedf5]/70 group-hover:text-[#efedf5]'}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
