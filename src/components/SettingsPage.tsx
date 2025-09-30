import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Monitor, 
  Database, 
  Wifi, 
  Save, 
  RefreshCw,
  Users,
  Settings as SettingsIcon,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)',
    department: 'IT Operations'
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    systemMaintenance: true,
    criticalAlerts: true
  });

  // System settings (admin only)
  const [systemSettings, setSystemSettings] = useState({
    monitoringInterval: '30',
    dataRetention: '90',
    alertThreshold: '80',
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
    ...(user?.role === 'admin' ? [
      { id: 'system', label: 'System', icon: Database },
      { id: 'users', label: 'User Management', icon: Users }
    ] : [])
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#efedf5] font-['Orbitron'] mb-2">
            Settings
          </h2>
          <p className="text-[#efedf5]/60">
            Manage your account and system preferences
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#84285b]/20 to-[#f4c951]/20 rounded-full border border-[#84285b]/30">
            <Shield className="w-4 h-4 text-[#f4c951]" />
            <span className="text-sm text-[#f4c951] font-medium">Admin Access</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl">
            <h3 className="text-lg font-bold text-[#efedf5] font-['Orbitron'] mb-4">
              Settings Menu
            </h3>
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/20 border border-[#84285b]/40 text-[#efedf5]'
                        : 'hover:bg-[#050303]/30 text-[#efedf5]/70 hover:text-[#efedf5]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl"
          >
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#84285b] to-[#f4c951] rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
                      Profile Information
                    </h3>
                    <p className="text-[#efedf5]/60">Update your personal details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/40" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/40" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#efedf5]/40" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                      className="w-full px-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                    >
                      <option value="PST (UTC-8)">PST (UTC-8)</option>
                      <option value="EST (UTC-5)">EST (UTC-5)</option>
                      <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                      <option value="CET (UTC+1)">CET (UTC+1)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/30 rounded-xl">
                    <Bell className="w-6 h-6 text-[#f4c951]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
                      Notification Preferences
                    </h3>
                    <p className="text-[#efedf5]/60">Configure how you receive alerts</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10">
                      <div>
                        <h4 className="text-[#efedf5] font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-[#efedf5]/60">
                          {key === 'emailAlerts' && 'Receive alerts via email'}
                          {key === 'smsAlerts' && 'Receive alerts via SMS'}
                          {key === 'pushNotifications' && 'Browser push notifications'}
                          {key === 'weeklyReports' && 'Weekly system reports'}
                          {key === 'systemMaintenance' && 'Maintenance notifications'}
                          {key === 'criticalAlerts' && 'Critical system alerts'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifications({...notifications, [key]: !value})}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          value ? 'bg-gradient-to-r from-[#84285b] to-[#f4c951]' : 'bg-[#050303]/50'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          value ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Settings (Admin Only) */}
            {activeSection === 'system' && user?.role === 'admin' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/30 rounded-xl">
                    <Database className="w-6 h-6 text-[#f4c951]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
                      System Configuration
                    </h3>
                    <p className="text-[#efedf5]/60">Advanced system settings</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Monitoring Interval (seconds)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.monitoringInterval}
                      onChange={(e) => setSystemSettings({...systemSettings, monitoringInterval: e.target.value})}
                      className="w-full px-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Data Retention (days)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.dataRetention}
                      onChange={(e) => setSystemSettings({...systemSettings, dataRetention: e.target.value})}
                      className="w-full px-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#efedf5]/80 mb-2">
                      Alert Threshold (%)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.alertThreshold}
                      onChange={(e) => setSystemSettings({...systemSettings, alertThreshold: e.target.value})}
                      className="w-full px-4 py-3 bg-[#050303]/50 border border-[#84285b]/20 rounded-xl text-[#efedf5] focus:border-[#84285b]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(systemSettings).filter(([key]) => typeof systemSettings[key as keyof typeof systemSettings] === 'boolean').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10">
                      <div>
                        <h4 className="text-[#efedf5] font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-[#efedf5]/60">
                          {key === 'autoBackup' && 'Automatic system backups'}
                          {key === 'maintenanceMode' && 'System maintenance mode'}
                          {key === 'debugMode' && 'Debug logging enabled'}
                        </p>
                      </div>
                      <button
                        onClick={() => setSystemSettings({...systemSettings, [key]: !value})}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          value ? 'bg-gradient-to-r from-[#84285b] to-[#f4c951]' : 'bg-[#050303]/50'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          value ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/30 rounded-xl">
                    <Shield className="w-6 h-6 text-[#f4c951]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
                      Security Settings
                    </h3>
                    <p className="text-[#efedf5]/60">Manage your account security</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10">
                    <h4 className="text-[#efedf5] font-medium mb-2">Change Password</h4>
                    <p className="text-sm text-[#efedf5]/60 mb-4">Update your account password</p>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#84285b] to-[#f4c951] rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300">
                      Change Password
                    </button>
                  </div>

                  <div className="p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10">
                    <h4 className="text-[#efedf5] font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-[#efedf5]/60 mb-4">Add an extra layer of security</p>
                    <button className="px-4 py-2 bg-[#050303]/50 border border-[#84285b]/30 rounded-lg text-[#efedf5] hover:bg-[#050303]/70 transition-all duration-300">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10">
                    <h4 className="text-[#efedf5] font-medium mb-2">Active Sessions</h4>
                    <p className="text-sm text-[#efedf5]/60 mb-4">Manage your active login sessions</p>
                    <button className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all duration-300">
                      View Sessions
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-between pt-6 border-t border-[#84285b]/20">
              <div className="flex items-center gap-2">
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-400"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Settings saved successfully!</span>
                  </motion.div>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#84285b] to-[#f4c951] rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-[#84285b]/20 transition-all duration-300 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}