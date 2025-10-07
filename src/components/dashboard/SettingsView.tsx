import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  Database,
  Wifi,
  Monitor,
  User,
  Key,
  Mail,
  Clock,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Download,
  Upload
} from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
}

const SettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    general: {
      companyName: 'CoreTechIT PLC',
      timezone: 'UTC',
      language: 'en',
      theme: 'dark',
      refreshInterval: 30
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      alertThreshold: 80,
      maintenanceNotifications: true,
      weeklyReports: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 60,
      passwordExpiry: 90,
      loginAttempts: 5,
      ipWhitelist: '192.168.1.0/24',
      encryptionLevel: 'AES-256'
    },
    monitoring: {
      dataRetention: 365,
      samplingRate: 60,
      alertDelay: 5,
      autoScaling: true,
      predictiveAnalytics: true,
      realTimeUpdates: true
    },
    integrations: {
      apiKey: 'ct-api-key-****-****-****-1234',
      webhookUrl: 'https://api.coretechit.com/webhooks',
      slackIntegration: false,
      teamsIntegration: true,
      emailIntegration: true
    }
  });

  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: Settings,
      description: 'Basic system configuration and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Alert preferences and notification settings'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Authentication and security configurations'
    },
    {
      id: 'monitoring',
      title: 'Monitoring',
      icon: Monitor,
      description: 'Data collection and monitoring parameters'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Database,
      description: 'Third-party integrations and API settings'
    }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
  };

  const handleExportSettings = () => {
    const settingsData = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coretechit-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Company Name</label>
          <input
            type="text"
            value={settings.general.companyName}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, companyName: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, timezone: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
          </select>
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, language: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Refresh Interval (seconds)</label>
          <input
            type="number"
            value={settings.general.refreshInterval}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              general: { ...prev.general, refreshInterval: parseInt(e.target.value) }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
            <div>
              <h4 className="text-core-light font-inter font-medium">Email Alerts</h4>
              <p className="text-core-light/60 text-sm">Receive alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, emailAlerts: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
            <div>
              <h4 className="text-core-light font-inter font-medium">Push Notifications</h4>
              <p className="text-core-light/60 text-sm">Browser push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.pushNotifications}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, pushNotifications: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Alert Threshold (%)</label>
          <input
            type="range"
            min="50"
            max="100"
            value={settings.notifications.alertThreshold}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: { ...prev.notifications, alertThreshold: parseInt(e.target.value) }
            }))}
            className="w-full h-2 bg-core-black/50 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-core-gold text-sm mt-2">{settings.notifications.alertThreshold}%</div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
          <div>
            <h4 className="text-core-light font-inter font-medium">Two-Factor Authentication</h4>
            <p className="text-core-light/60 text-sm">Enhanced security with 2FA</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, twoFactorAuth: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
          </label>
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">IP Whitelist</label>
          <input
            type="text"
            value={settings.security.ipWhitelist}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, ipWhitelist: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Encryption Level</label>
          <select
            value={settings.security.encryptionLevel}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              security: { ...prev.security, encryptionLevel: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          >
            <option value="AES-128">AES-128</option>
            <option value="AES-256">AES-256</option>
            <option value="RSA-2048">RSA-2048</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderMonitoringSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Data Retention (days)</label>
          <input
            type="number"
            value={settings.monitoring.dataRetention}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              monitoring: { ...prev.monitoring, dataRetention: parseInt(e.target.value) }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Sampling Rate (seconds)</label>
          <input
            type="number"
            value={settings.monitoring.samplingRate}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              monitoring: { ...prev.monitoring, samplingRate: parseInt(e.target.value) }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
          <div>
            <h4 className="text-core-light font-inter font-medium">Auto Scaling</h4>
            <p className="text-core-light/60 text-sm">Automatic resource scaling</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.monitoring.autoScaling}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                monitoring: { ...prev.monitoring, autoScaling: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
          <div>
            <h4 className="text-core-light font-inter font-medium">Predictive Analytics</h4>
            <p className="text-core-light/60 text-sm">AI-powered predictions</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.monitoring.predictiveAnalytics}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                monitoring: { ...prev.monitoring, predictiveAnalytics: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-core-light font-inter font-medium mb-2">API Key</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={settings.integrations.apiKey}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                integrations: { ...prev.integrations, apiKey: e.target.value }
              }))}
              className="w-full px-4 py-2 pr-12 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-core-light/60 hover:text-core-light"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-core-light font-inter font-medium mb-2">Webhook URL</label>
          <input
            type="url"
            value={settings.integrations.webhookUrl}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              integrations: { ...prev.integrations, webhookUrl: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter focus:outline-none focus:border-core-gold/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
            <div>
              <h4 className="text-core-light font-inter font-medium">Slack</h4>
              <p className="text-core-light/60 text-xs">Team notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.integrations.slackIntegration}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  integrations: { ...prev.integrations, slackIntegration: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
            <div>
              <h4 className="text-core-light font-inter font-medium">Teams</h4>
              <p className="text-core-light/60 text-xs">Microsoft Teams</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.integrations.teamsIntegration}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  integrations: { ...prev.integrations, teamsIntegration: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
            <div>
              <h4 className="text-core-light font-inter font-medium">Email</h4>
              <p className="text-core-light/60 text-xs">SMTP integration</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.integrations.emailIntegration}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  integrations: { ...prev.integrations, emailIntegration: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-core-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-core-gold"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'monitoring': return renderMonitoringSettings();
      case 'integrations': return renderIntegrationsSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-core-light mb-1 sm:mb-2">
            System Settings
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-core-light/70 font-inter">
            Configure monitoring parameters and system preferences
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportSettings}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light hover:bg-core-highlight/20 transition-all duration-200 min-w-0"
          >
            <Download className="w-4 h-4" />
            <span className="font-inter font-medium text-xs sm:text-sm">Export</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 rounded-lg text-core-gold hover:from-core-gold/30 hover:to-core-highlight/30 transition-all duration-200 disabled:opacity-50 min-w-0"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="font-inter font-medium text-xs sm:text-sm">
              {saving ? 'Saving...' : 'Save Changes'}
            </span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4">
            <nav className="space-y-1 sm:space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-all duration-200 text-left ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 text-core-gold'
                        : 'text-core-light/70 hover:bg-core-highlight/10 hover:text-core-light border border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="hidden lg:block">
                      <div className="font-inter font-medium text-xs sm:text-sm">{section.title}</div>
                      <div className="text-xs opacity-70 line-clamp-2">{section.description}</div>
                    </div>
                    <div className="lg:hidden">
                      <div className="font-inter font-medium text-xs sm:text-sm">{section.title}</div>
                    </div>
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6 min-w-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-core-light mb-1 sm:mb-2">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-core-light/70 font-inter text-xs sm:text-sm">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;