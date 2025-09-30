import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, AlertCircle, Clock } from 'lucide-react';
import { AlertItem } from '../types/dashboard';

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    severity: 'high',
    message: 'Database server CPU usage exceeds 90% threshold',
    timestamp: '2 minutes ago',
    component: 'DB-SERVER-01'
  },
  {
    id: '2',
    severity: 'medium',
    message: 'Memory usage warning on Web Server 3',
    timestamp: '5 minutes ago',
    component: 'WEB-SERVER-03'
  },
  {
    id: '3',
    severity: 'low',
    message: 'Scheduled maintenance reminder for Load Balancer',
    timestamp: '15 minutes ago',
    component: 'LOAD-BALANCER-01'
  }
];

export default function AlertsPanel() {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          icon: AlertTriangle,
          color: 'text-red-400',
          bg: 'bg-red-400/20',
          border: 'border-red-400/30'
        };
      case 'medium':
        return {
          icon: AlertCircle,
          color: 'text-[#f4c951]',
          bg: 'bg-[#f4c951]/20',
          border: 'border-[#f4c951]/30'
        };
      default:
        return {
          icon: Info,
          color: 'text-blue-400',
          bg: 'bg-blue-400/20',
          border: 'border-blue-400/30'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#84285b]/10 to-[#f4c951]/5 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl hover:border-[#84285b]/40 transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
            System Alerts
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#f4c951]/20 rounded-full">
            <div className="w-2 h-2 bg-[#f4c951] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#f4c951]">3 Active</span>
          </div>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert, index) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`p-4 bg-[#050303]/30 rounded-xl border ${config.border} hover:bg-[#050303]/50 transition-all duration-300 group/alert cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}>
                        {alert.severity} priority
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#efedf5]/60">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#efedf5] mb-2 group-hover/alert:text-[#efedf5] transition-colors">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#efedf5]/60 bg-[#27061c]/50 px-2 py-1 rounded-lg">
                        {alert.component}
                      </span>
                      <button className="text-xs text-[#84285b] hover:text-[#f4c951] transition-colors">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-[#84285b]/20 to-[#f4c951]/20 border border-[#84285b]/30 rounded-xl text-[#efedf5] hover:from-[#84285b]/30 hover:to-[#f4c951]/30 transition-all duration-300"
        >
          View All Alerts
        </motion.button>
      </div>
    </motion.div>
  );
}