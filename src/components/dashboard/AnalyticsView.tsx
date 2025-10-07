import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface AnalyticsData {
  performanceScore: number;
  systemEfficiency: number;
  predictedFailures: number;
  costOptimization: number;
  trends: {
    cpu: number[];
    memory: number[];
    network: number[];
    storage: number[];
  };
  predictions: {
    nextWeek: { risk: number; confidence: number };
    nextMonth: { risk: number; confidence: number };
    nextQuarter: { risk: number; confidence: number };
  };
}

const AnalyticsView: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    performanceScore: 87,
    systemEfficiency: 92,
    predictedFailures: 3,
    costOptimization: 78,
    trends: {
      cpu: [],
      memory: [],
      network: [],
      storage: []
    },
    predictions: {
      nextWeek: { risk: 15, confidence: 94 },
      nextMonth: { risk: 28, confidence: 87 },
      nextQuarter: { risk: 45, confidence: 72 }
    }
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [refreshing, setRefreshing] = useState(false);

  // Generate trend data
  useEffect(() => {
    const generateTrendData = () => {
      const dataPoints = selectedTimeframe === '24h' ? 24 : selectedTimeframe === '7d' ? 7 : 30;
      
      const trends = {
        cpu: Array.from({ length: dataPoints }, (_, i) => 
          Math.max(20, Math.min(90, 50 + Math.sin(i * 0.3) * 20 + Math.random() * 10))
        ),
        memory: Array.from({ length: dataPoints }, (_, i) => 
          Math.max(30, Math.min(95, 60 + Math.sin(i * 0.2) * 15 + Math.random() * 8))
        ),
        network: Array.from({ length: dataPoints }, (_, i) => 
          Math.max(70, Math.min(100, 85 + Math.sin(i * 0.4) * 10 + Math.random() * 5))
        ),
        storage: Array.from({ length: dataPoints }, (_, i) => 
          Math.max(40, Math.min(85, 65 + Math.sin(i * 0.25) * 12 + Math.random() * 6))
        )
      };

      setAnalyticsData(prev => ({ ...prev, trends }));
    };

    generateTrendData();
  }, [selectedTimeframe]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        performanceScore: Math.max(70, Math.min(100, prev.performanceScore + (Math.random() - 0.5) * 4)),
        systemEfficiency: Math.max(80, Math.min(100, prev.systemEfficiency + (Math.random() - 0.5) * 3)),
        predictedFailures: Math.max(0, Math.min(10, prev.predictedFailures + Math.floor((Math.random() - 0.7) * 2))),
        costOptimization: Math.max(60, Math.min(100, prev.costOptimization + (Math.random() - 0.5) * 5))
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleExport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      timeframe: selectedTimeframe,
      metrics: {
        performanceScore: analyticsData.performanceScore,
        systemEfficiency: analyticsData.systemEfficiency,
        predictedFailures: analyticsData.predictedFailures,
        costOptimization: analyticsData.costOptimization
      },
      predictions: analyticsData.predictions
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const kpiCards = [
    {
      title: 'Performance Score',
      value: analyticsData.performanceScore,
      unit: '%',
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      trend: '+2.3%'
    },
    {
      title: 'System Efficiency',
      value: analyticsData.systemEfficiency,
      unit: '%',
      icon: Zap,
      color: 'text-blue-400',
      bg: 'from-blue-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      trend: '+1.8%'
    },
    {
      title: 'Predicted Failures',
      value: analyticsData.predictedFailures,
      unit: '',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bg: 'from-yellow-500/20 to-yellow-600/20',
      border: 'border-yellow-500/30',
      trend: '-0.5'
    },
    {
      title: 'Cost Optimization',
      value: analyticsData.costOptimization,
      unit: '%',
      icon: TrendingDown,
      color: 'text-core-gold',
      bg: 'from-core-gold/20 to-core-highlight/20',
      border: 'border-core-gold/30',
      trend: '+5.2%'
    }
  ];

  const chartData = analyticsData.trends[selectedMetric as keyof typeof analyticsData.trends] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-core-light mb-1 sm:mb-2">
            Advanced Analytics
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-core-light/70 font-inter">
            AI-powered insights and predictive analytics for optimal system performance
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter text-xs sm:text-sm focus:outline-none focus:border-core-gold/50 min-w-0"
          >
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
            <span className="font-inter font-medium text-xs sm:text-sm hidden xs:inline">Refresh</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 rounded-lg text-core-gold hover:from-core-gold/30 hover:to-core-highlight/30 transition-all duration-200 min-w-0"
          >
            <Download className="w-4 h-4" />
            <span className="font-inter font-medium text-xs sm:text-sm hidden xs:inline">Export</span>
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 sm:p-4 lg:p-6 bg-gradient-to-br ${kpi.bg} backdrop-blur-xl border ${kpi.border} rounded-xl min-w-0`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`p-3 bg-core-black/30 rounded-lg border ${kpi.border}`}>
                <kpi.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${kpi.color}`} />
              </div>
              <div className="text-right">
                <div className={`text-lg sm:text-xl lg:text-2xl font-orbitron font-bold ${kpi.color} truncate`}>
                  {Math.round(kpi.value)}{kpi.unit}
                </div>
                <div className="text-xs text-core-light/60 truncate">{kpi.trend}</div>
              </div>
            </div>
            <h3 className="text-xs sm:text-sm lg:text-base text-core-light font-inter font-medium truncate">{kpi.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Performance Trends */}
        <div className="xl:col-span-2 bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-orbitron font-bold text-core-light">
              Performance Trends
            </h2>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {['cpu', 'memory', 'network', 'storage'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-inter font-medium transition-all duration-200 ${
                    selectedMetric === metric
                      ? 'bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 text-core-gold'
                      : 'bg-core-black/30 border border-core-highlight/20 text-core-light/70 hover:text-core-light'
                  }`}
                >
                  {metric.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative h-48 sm:h-64 bg-core-black/30 rounded-lg border border-core-highlight/20 p-2 sm:p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f4c951" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f4c951" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((value) => {
                const y = 180 - (value / 100) * 160;
                return (
                  <g key={value}>
                    <line
                      x1="40"
                      y1={y}
                      x2="760"
                      y2={y}
                      stroke="rgba(132, 40, 91, 0.2)"
                      strokeWidth="1"
                    />
                    <text
                      x="30"
                      y={y + 4}
                      fill="rgba(239, 237, 245, 0.6)"
                      fontSize="10"
                      textAnchor="end"
                    >
                      {value}%
                    </text>
                  </g>
                );
              })}

              {/* Chart area and line */}
              {chartData.length > 0 && (
                <>
                  <path
                    d={`M 40 180 ${chartData.map((point, index) => {
                      const x = 40 + (index / (chartData.length - 1)) * 720;
                      const y = 180 - (point / 100) * 160;
                      return `L ${x} ${y}`;
                    }).join(' ')} L 760 180 Z`}
                    fill="url(#trendGradient)"
                  />

                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d={`M ${chartData.map((point, index) => {
                      const x = 40 + (index / (chartData.length - 1)) * 720;
                      const y = 180 - (point / 100) * 160;
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}`}
                    stroke="#f4c951"
                    strokeWidth="2"
                    fill="none"
                  />

                  {chartData.map((point, index) => {
                    const x = 40 + (index / (chartData.length - 1)) * 720;
                    const y = 180 - (point / 100) * 160;
                    return (
                      <motion.circle
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#f4c951"
                        className="hover:r-5 transition-all duration-200 cursor-pointer"
                      >
                        <title>{`${selectedMetric.toUpperCase()}: ${Math.round(point)}%`}</title>
                      </motion.circle>
                    );
                  })}
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Predictions Panel */}
        <div className="space-y-4 sm:space-y-6">
          {/* AI Predictions */}
          <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-orbitron font-bold text-core-light mb-4 sm:mb-6">
              AI Predictions
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {Object.entries(analyticsData.predictions).map(([period, data]) => (
                <div key={period} className="p-3 sm:p-4 bg-core-black/30 rounded-lg border border-core-highlight/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-core-light font-inter font-medium capitalize text-sm sm:text-base truncate">
                      {period.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        data.risk < 30 ? 'bg-green-400' : data.risk < 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <span className={`text-sm font-orbitron font-bold ${
                        data.risk < 30 ? 'text-green-400' : data.risk < 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {data.risk}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-core-black/50 rounded-full h-1.5 sm:h-2 mb-2">
                    <div 
                      className={`h-1.5 sm:h-2 rounded-full ${
                        data.risk < 30 ? 'bg-green-400' : data.risk < 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${data.risk}%` }}
                    />
                  </div>
                  <div className="text-xs text-core-light/60">
                    Confidence: {data.confidence}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Insights */}
          <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6">
            <h2 className="text-base sm:text-lg lg:text-xl font-orbitron font-bold text-core-light mb-4 sm:mb-6">
              AI Insights
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-green-400 font-inter font-medium text-xs sm:text-sm">Optimization Opportunity</h4>
                  <p className="text-core-light/80 text-xs mt-1 line-clamp-2">
                    CPU utilization can be optimized by 15% through load balancing
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-400 font-inter font-medium text-xs sm:text-sm">Attention Required</h4>
                  <p className="text-core-light/80 text-xs mt-1 line-clamp-2">
                    Storage usage trending upward, consider capacity planning
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Activity className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-inter font-medium text-xs sm:text-sm">Performance Trend</h4>
                  <p className="text-core-light/80 text-xs mt-1 line-clamp-2">
                    Network performance improved by 8% over the last week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;