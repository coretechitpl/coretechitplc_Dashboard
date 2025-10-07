import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Server } from 'lucide-react';

const SystemHealthCard: React.FC = () => {
  const [healthData, setHealthData] = useState({
    overall: 87,
    cpu: 45,
    memory: 67,
    storage: 34,
    network: 92
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        overall: Math.max(70, Math.min(100, prev.overall + (Math.random() - 0.5) * 4)),
        cpu: Math.max(20, Math.min(100, prev.cpu + (Math.random() - 0.5) * 8)),
        memory: Math.max(30, Math.min(100, prev.memory + (Math.random() - 0.5) * 6)),
        storage: Math.max(20, Math.min(100, prev.storage + (Math.random() - 0.5) * 3)),
        network: Math.max(80, Math.min(100, prev.network + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const healthMetrics = [
    {
      name: 'CPU Usage',
      value: healthData.cpu,
      icon: Cpu,
      color: healthData.cpu > 80 ? 'text-red-400' : healthData.cpu > 60 ? 'text-yellow-400' : 'text-green-400'
    },
    {
      name: 'Memory',
      value: healthData.memory,
      icon: Server,
      color: healthData.memory > 80 ? 'text-red-400' : healthData.memory > 60 ? 'text-yellow-400' : 'text-green-400'
    },
    {
      name: 'Storage',
      value: healthData.storage,
      icon: HardDrive,
      color: healthData.storage > 80 ? 'text-red-400' : healthData.storage > 60 ? 'text-yellow-400' : 'text-green-400'
    },
    {
      name: 'Network',
      value: healthData.network,
      icon: Wifi,
      color: healthData.network < 90 ? 'text-yellow-400' : 'text-green-400'
    }
  ];

  const getOverallColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-orbitron font-bold text-core-light">
          System Health
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-core-light/60 text-sm font-inter">Live</span>
        </div>
      </div>

      {/* Overall Health Score */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="rgba(132, 40, 91, 0.3)"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 50 * (1 - healthData.overall / 100)
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={getOverallColor(healthData.overall)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-orbitron font-bold ${getOverallColor(healthData.overall)}`}>
                {Math.round(healthData.overall)}%
              </div>
              <div className="text-core-light/60 text-xs font-inter">Health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="space-y-4">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-core-black/30 rounded-lg border border-core-highlight/20"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-core-light font-inter text-sm">{metric.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 bg-core-black/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-2 rounded-full bg-current ${metric.color}`}
                  />
                </div>
                <span className={`text-sm font-orbitron font-medium ${metric.color} min-w-[3rem] text-right`}>
                  {Math.round(metric.value)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status Indicator */}
      <div className="mt-6 p-3 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-inter text-sm font-medium">
            All Systems Operational
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthCard;