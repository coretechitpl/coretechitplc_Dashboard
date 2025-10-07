import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface RiskScoreCardProps {
  component: {
    name: string;
    riskScore: number;
    status: 'low' | 'medium' | 'high';
    trend: 'increasing' | 'decreasing' | 'stable' | 'critical';
    lastUpdated: string;
    icon: React.ComponentType<any>;
    details: {
      cpu: number;
      memory: number;
      disk: number;
      network: number;
    };
  };
  index: number;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ component, index }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return {
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          text: 'text-green-400',
          glow: 'shadow-green-500/20'
        };
      case 'medium':
        return {
          bg: 'from-yellow-500/20 to-yellow-600/20',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          glow: 'shadow-yellow-500/20'
        };
      case 'high':
        return {
          bg: 'from-red-500/20 to-red-600/20',
          border: 'border-red-500/30',
          text: 'text-red-400',
          glow: 'shadow-red-500/20'
        };
      default:
        return {
          bg: 'from-core-gold/20 to-core-highlight/20',
          border: 'border-core-gold/30',
          text: 'text-core-gold',
          glow: 'shadow-core-gold/20'
        };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
      case 'critical':
        return <TrendingUp className="w-4 h-4 text-red-400" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-400" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-core-light/60" />;
      default:
        return <Minus className="w-4 h-4 text-core-light/60" />;
    }
  };

  const statusColors = getStatusColor(component.status);
  const Icon = component.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 bg-gradient-to-br ${statusColors.bg} backdrop-blur-xl border ${statusColors.border} rounded-xl shadow-lg ${statusColors.glow} hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`p-2 bg-core-black/30 rounded-lg border ${statusColors.border}`}>
            <Icon className={`w-5 h-5 ${statusColors.text}`} />
          </div>
          <div>
            <h3 className="text-core-light font-inter font-medium text-sm">{component.name}</h3>
            <p className="text-core-light/60 text-xs">{component.lastUpdated}</p>
          </div>
        </div>
        {component.trend === 'critical' && (
          <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
        )}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-orbitron font-bold ${statusColors.text}`}>
            {component.riskScore}%
          </span>
          {getTrendIcon(component.trend)}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-inter font-medium ${statusColors.text} bg-core-black/30`}>
          {component.status.toUpperCase()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-core-black/30 rounded-full h-2 mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${component.riskScore}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          className={`h-2 rounded-full bg-gradient-to-r ${statusColors.bg.replace('/20', '/60')}`}
        />
      </div>

      {/* System Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-core-light/60">CPU:</span>
          <span className="text-core-light">{component.details.cpu}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-core-light/60">Memory:</span>
          <span className="text-core-light">{component.details.memory}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-core-light/60">Disk:</span>
          <span className="text-core-light">{component.details.disk}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-core-light/60">Network:</span>
          <span className="text-core-light">{component.details.network}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskScoreCard;