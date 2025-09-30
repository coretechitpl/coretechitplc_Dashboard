import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import RiskScoreCard from './components/RiskScoreCard';
import LiveMetricsPanel from './components/LiveMetricsPanel';
import AlertsPanel from './components/AlertsPanel';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import ExportPanel from './components/ExportPanel';
import SettingsPage from './components/SettingsPage';
import { mockSystemComponents } from './data/mockData';

function AuthWrapper() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050303] via-[#050303] to-[#27061c] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#84285b]/30 border-t-[#f4c951] rounded-full animate-spin"></div>
          <span className="text-[#efedf5] font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginPage onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupPage onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  return <Dashboard />;
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050303] via-[#050303] to-[#27061c] flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)} />

        {/* Main Content */}
        <main className="pt-16 p-4 md:p-6 lg:p-8 w-full">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Risk Score Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSystemComponents.map((component, index) => (
                  <RiskScoreCard key={component.id} component={component} index={index} />
                ))}
              </div>

              {/* Main Analytics Section */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <LiveMetricsPanel />
                </div>
                <div>
                  <AlertsPanel />
                </div>
              </div>

              {/* Predictive Analytics and Export */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <PredictiveAnalytics />
                </div>
                <div>
                  <ExportPanel />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'components' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#efedf5] font-['Orbitron'] mb-4">
                  System Components
                </h2>
                <p className="text-[#efedf5]/60 mb-8">
                  Detailed view of all monitored system components
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockSystemComponents.map((component, index) => (
                    <RiskScoreCard key={component.id} component={component} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#efedf5] font-['Orbitron'] mb-4">
                  Advanced Analytics
                </h2>
                <p className="text-[#efedf5]/60 mb-8">
                  Deep insights into system performance and predictions
                </p>
              </div>
              <PredictiveAnalytics />
              <LiveMetricsPanel />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#efedf5] font-['Orbitron'] mb-4">
                  Reports & Export
                </h2>
                <p className="text-[#efedf5]/60 mb-8">
                  Generate and export comprehensive system reports
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ExportPanel />
                <ExportPanel />
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#efedf5] font-['Orbitron'] mb-4">
                  System Alerts
                </h2>
                <p className="text-[#efedf5]/60 mb-8">
                  Monitor and manage system alerts and notifications
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AlertsPanel />
                <AlertsPanel />
              </div>
            </div>
          )}

          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthWrapper />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
