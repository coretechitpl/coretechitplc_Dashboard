import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  Shield,
  Download,
  Eye,
  RefreshCw,
  Filter
} from 'lucide-react';
import RiskScoreCard from './components/RiskScoreCard';
import SystemHealthCard from './components/SystemHealthCard';
import PredictiveChart from './components/PredictiveChart';
import AlertsFeed from './components/AlertsFeed';

const DashboardOverview: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [systemData, setSystemData] = useState({
    overallHealth: 87,
    activeAlerts: 3,
    systemsOnline: 24,
    totalSystems: 26
  });

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => ({
        overallHealth: Math.max(70, Math.min(100, prev.overallHealth + (Math.random() - 0.5) * 4)),
        activeAlerts: Math.max(0, Math.min(10, prev.activeAlerts + Math.floor((Math.random() - 0.7) * 2))),
        systemsOnline: Math.max(20, Math.min(26, prev.systemsOnline + Math.floor((Math.random() - 0.3) * 2))),
        totalSystems: 26
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Create mock CSV data
    const csvData = [
      ['Component', 'Risk Score', 'Status', 'Last Updated'],
      ['Database Servers', '23%', 'Low', '2 min ago'],
      ['Web Servers', '67%', 'Medium', '1 min ago'],
      ['Storage Systems', '89%', 'High', '30 sec ago'],
      ['Network Infrastructure', '34%', 'Low', '3 min ago']
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  const riskComponents = [
    {
      name: 'Database Servers',
      riskScore: 23,
      status: 'low',
      trend: 'stable',
      lastUpdated: '2 min ago',
      icon: Server,
      details: {
        cpu: 45,
        memory: 67,
        disk: 34,
        network: 89
      }
    },
    {
      name: 'Web Servers',
      riskScore: 67,
      status: 'medium',
      trend: 'increasing',
      lastUpdated: '1 min ago',
      icon: Wifi,
      details: {
        cpu: 78,
        memory: 82,
        disk: 45,
        network: 92
      }
    },
    {
      name: 'Storage Systems',
      riskScore: 89,
      status: 'high',
      trend: 'critical',
      lastUpdated: '30 sec ago',
      icon: HardDrive,
      details: {
        cpu: 34,
        memory: 56,
        disk: 94,
        network: 87
      }
    },
    {
      name: 'Network Infrastructure',
      riskScore: 34,
      status: 'low',
      trend: 'decreasing',
      lastUpdated: '3 min ago',
      icon: Activity,
      details: {
        cpu: 23,
        memory: 45,
        disk: 67,
        network: 78
      }
    }
  ];

  const systemMetrics = [
    {
      title: 'System Health',
      value: systemData.overallHealth,
      unit: '%',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Active Alerts',
      value: systemData.activeAlerts,
      unit: '',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-500/30'
    },
    {
      title: 'Systems Online',
      value: systemData.systemsOnline,
      unit: `/${systemData.totalSystems}`,
      icon: Server,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Performance Score',
      value: 94,
      unit: '%',
      icon: TrendingUp,
      color: 'text-core-gold',
      bgColor: 'from-core-gold/20 to-core-highlight/20',
      borderColor: 'border-core-gold/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-core-light mb-1 sm:mb-2">
            AI System Monitoring Dashboard
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-core-light/70 font-inter leading-relaxed">
            Real-time insights and predictive analytics for your IT infrastructure
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter text-xs sm:text-sm focus:outline-none focus:border-core-gold/50 min-w-0"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light hover:bg-core-highlight/20 transition-all duration-200 disabled:opacity-50 min-w-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="font-inter font-medium text-xs sm:text-sm">Refresh</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 rounded-lg text-core-gold hover:from-core-gold/30 hover:to-core-highlight/30 transition-all duration-200 min-w-0"
          >
            <Download className="w-4 h-4" />
            <span className="font-inter font-medium text-xs sm:text-sm">Export</span>
          </motion.button>
        </div>
      </div>

      {/* System Metrics Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 sm:p-4 lg:p-6 bg-gradient-to-br ${metric.bgColor} backdrop-blur-xl border ${metric.borderColor} rounded-xl min-w-0`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className={`p-3 bg-core-black/30 rounded-lg border ${metric.borderColor}`}>
                <metric.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${metric.color}`} />
              </div>
              <div className="text-right">
                <div className={`text-lg sm:text-xl lg:text-2xl font-orbitron font-bold ${metric.color} truncate`}>
                  {metric.value}{metric.unit}
                </div>
              </div>
            </div>
            <h3 className="text-xs sm:text-sm lg:text-base text-core-light font-inter font-medium truncate">{metric.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Risk Scores */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-base sm:text-lg lg:text-xl font-orbitron font-bold text-core-light">
                System Failure Risk Scores
              </h2>
              <div className="flex items-center space-x-2 text-core-light/60 text-xs sm:text-sm font-inter">
                <div className="w-2 h-2 bg-core-gold rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {riskComponents.map((component, index) => (
                <RiskScoreCard key={component.name} component={component} index={index} />
              ))}
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6 min-w-0">
            <h2 className="text-base sm:text-lg lg:text-xl font-orbitron font-bold text-core-light mb-4 sm:mb-6">
              Predictive Analytics
            </h2>
            <PredictiveChart />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* System Health */}
          <SystemHealthCard />
          
          {/* Alerts Feed */}
          <AlertsFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;