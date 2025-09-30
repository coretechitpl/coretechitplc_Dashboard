import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Target, Zap } from 'lucide-react';

const mockPredictionData = [
  { date: 'Jan', actual: 23, predicted: 25, confidence: 85 },
  { date: 'Feb', actual: 31, predicted: 32, confidence: 88 },
  { date: 'Mar', actual: 45, predicted: 43, confidence: 92 },
  { date: 'Apr', actual: 52, predicted: 54, confidence: 89 },
  { date: 'May', actual: 67, predicted: 68, confidence: 94 },
  { date: 'Jun', actual: null, predicted: 75, confidence: 87 },
  { date: 'Jul', actual: null, predicted: 82, confidence: 83 },
];

const predictions = [
  {
    title: 'System Failure Risk',
    current: 23,
    predicted: 31,
    trend: 'up',
    confidence: 87,
    icon: Target
  },
  {
    title: 'Performance Degradation',
    current: 45,
    predicted: 52,
    trend: 'up',
    confidence: 92,
    icon: TrendingUp
  },
  {
    title: 'Resource Optimization',
    current: 78,
    predicted: 85,
    trend: 'up',
    confidence: 89,
    icon: Zap
  }
];

export default function PredictiveAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#84285b]/10 to-[#f4c951]/5 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl hover:border-[#84285b]/40 transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/30 rounded-xl">
              <Brain className="w-6 h-6 text-[#f4c951]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
                AI Predictive Analytics
              </h3>
              <p className="text-sm text-[#efedf5]/60">Next 30 days forecast</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#efedf5]/60">Model Accuracy</p>
            <p className="text-xl font-bold text-[#f4c951] font-['Orbitron']">94.2%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {predictions.map((prediction, index) => {
            const Icon = prediction.icon;
            return (
              <motion.div
                key={prediction.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-[#84285b]" />
                  <span className="text-sm text-[#efedf5]/80 font-medium">
                    {prediction.title}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#efedf5]/60">Current</span>
                    <span className="text-sm font-bold text-[#efedf5]">
                      {prediction.current}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#efedf5]/60">Predicted</span>
                    <span className="text-sm font-bold text-[#f4c951]">
                      {prediction.predicted}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#efedf5]/60">Confidence</span>
                    <span className="text-sm font-bold text-green-400">
                      {prediction.confidence}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockPredictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#84285b20" />
              <XAxis 
                dataKey="date" 
                stroke="#efedf5" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#efedf5" 
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#27061c',
                  border: '1px solid #84285b40',
                  borderRadius: '12px',
                  color: '#efedf5'
                }}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#f4c951"
                strokeWidth={2}
                fill="url(#predictedGradient)"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#84285b"
                strokeWidth={2}
                fill="url(#actualGradient)"
                fillOpacity={0.6}
              />
              <defs>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f4c951" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f4c951" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84285b" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#84285b" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}