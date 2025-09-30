import React from 'react';
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SystemComponent } from '../types/dashboard';

interface RiskScoreCardProps {
  component: SystemComponent;
  index: number;
}

export default function RiskScoreCard({ component, index }: RiskScoreCardProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-400 bg-red-400/20';
    if (score >= 60) return 'text-[#f4c951] bg-[#f4c951]/20';
    return 'text-green-400 bg-green-400/20';
  };

  const getRiskIcon = (score: number) => {
    if (score >= 80) return AlertTriangle;
    if (score >= 60) return Clock;
    return CheckCircle;
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return 'HIGH RISK';
    if (score >= 60) return 'MEDIUM RISK';
    return 'LOW RISK';
  };

  const Icon = getRiskIcon(component.riskScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#84285b]/10 to-[#f4c951]/5 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl hover:border-[#84285b]/40 transition-all duration-500 group-hover:bg-[#27061c]/60">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#efedf5] font-['Orbitron'] mb-1">
              {component.name}
            </h3>
            <p className="text-sm text-[#efedf5]/60">Component ID: {component.id}</p>
          </div>
          
          <div className={`p-2 rounded-xl ${getRiskColor(component.riskScore)}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-[#efedf5] font-['Orbitron']">
              {component.riskScore}%
            </span>
            <span className={`text-sm font-medium px-2 py-1 rounded-lg ${getRiskColor(component.riskScore)}`}>
              {getRiskLevel(component.riskScore)}
            </span>
          </div>
          
          <div className="w-full bg-[#050303]/50 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${component.riskScore}%` }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${
                component.riskScore >= 80
                  ? 'from-red-500 to-red-400'
                  : component.riskScore >= 60
                  ? 'from-[#f4c951] to-yellow-400'
                  : 'from-green-500 to-green-400'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-[#efedf5]/60">CPU</p>
            <p className="text-lg font-bold text-[#efedf5]">{component.metrics.cpu}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#efedf5]/60">Memory</p>
            <p className="text-lg font-bold text-[#efedf5]">{component.metrics.memory}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#efedf5]/60">Uptime</p>
            <p className="text-lg font-bold text-[#efedf5]">{component.metrics.uptime}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-[#efedf5]/60">
            Updated: {component.lastUpdated}
          </p>
          <TrendingUp className="w-4 h-4 text-[#84285b] group-hover:text-[#f4c951] transition-colors duration-300" />
        </div>
      </div>
    </motion.div>
  );
}