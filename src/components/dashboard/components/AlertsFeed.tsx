import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X,
  Clock,
  Server,
  Wifi,
  HardDrive
} from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  source: string;
  acknowledged: boolean;
}

const AlertsFeed: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'critical',
      title: 'Storage Critical',
      message: 'Disk usage at 94% on Server-03',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      source: 'Storage System',
      acknowledged: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage at 87% on Web-Server-01',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      source: 'Web Server',
      acknowledged: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      source: 'Backup System',
      acknowledged: true
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'Security patch available for installation',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      source: 'Update Manager',
      acknowledged: false
    },
    {
      id: 5,
      type: 'warning',
      title: 'Network Latency',
      message: 'Increased latency detected on network interface',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      source: 'Network Monitor',
      acknowledged: false
    }
  ]);

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert: Alert = {
          id: Date.now(),
          type: ['warning', 'info', 'critical'][Math.floor(Math.random() * 3)] as any,
          title: ['Memory Usage High', 'Network Spike', 'Service Restart'][Math.floor(Math.random() * 3)],
          message: 'Automated system alert generated',
          timestamp: new Date(),
          source: ['Database', 'Web Server', 'Network'][Math.floor(Math.random() * 3)],
          acknowledged: false
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'text-red-400',
          bg: 'from-red-500/20 to-red-600/20',
          border: 'border-red-500/30',
          glow: 'shadow-red-500/20'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-400',
          bg: 'from-yellow-500/20 to-yellow-600/20',
          border: 'border-yellow-500/30',
          glow: 'shadow-yellow-500/20'
        };
      case 'success':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          glow: 'shadow-green-500/20'
        };
      case 'info':
        return {
          icon: Info,
          color: 'text-blue-400',
          bg: 'from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/30',
          glow: 'shadow-blue-500/20'
        };
      default:
        return {
          icon: Info,
          color: 'text-core-light',
          bg: 'from-core-highlight/20 to-core-dark/20',
          border: 'border-core-highlight/30',
          glow: 'shadow-core-highlight/20'
        };
    }
  };

  const acknowledgeAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-orbitron font-bold text-core-light">
          Live Alerts
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-core-gold rounded-full animate-pulse"></div>
          <span className="text-core-light/60 text-sm font-inter">
            {alerts.filter(a => !a.acknowledged).length} Active
          </span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className={`p-4 bg-gradient-to-r ${config.bg} backdrop-blur-xl border ${config.border} rounded-lg ${config.glow} ${
                  alert.acknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 bg-core-black/30 rounded-lg border ${config.border} flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`text-sm font-inter font-medium ${config.color}`}>
                          {alert.title}
                        </h3>
                        {alert.type === 'critical' && !alert.acknowledged && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      
                      <p className="text-core-light/80 text-xs mb-2 line-clamp-2">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center space-x-3 text-xs text-core-light/60">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(alert.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Server className="w-3 h-3" />
                          <span>{alert.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    {!alert.acknowledged && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="p-1 rounded bg-core-black/30 border border-core-highlight/30 text-core-light/60 hover:text-core-gold transition-colors"
                        title="Acknowledge"
                      >
                        <CheckCircle className="w-3 h-3" />
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 rounded bg-core-black/30 border border-core-highlight/30 text-core-light/60 hover:text-red-400 transition-colors"
                      title="Dismiss"
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <p className="text-core-light/60 font-inter">No active alerts</p>
          <p className="text-core-light/40 text-sm font-inter">All systems running smoothly</p>
        </div>
      )}
    </div>
  );
};

export default AlertsFeed;