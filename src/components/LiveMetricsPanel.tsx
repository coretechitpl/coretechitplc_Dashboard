import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Wifi, Zap } from 'lucide-react';

const mockData = [
  { time: '00:00', cpu: 45, memory: 62, network: 78, response: 23 },
  { time: '04:00', cpu: 52, memory: 58, network: 82, response: 28 },
  { time: '08:00', cpu: 73, memory: 71, network: 76, response: 45 },
  { time: '12:00', cpu: 81, memory: 85, network: 68, response: 52 },
  { time: '16:00', cpu: 69, memory: 74, network: 89, response: 38 },
  { time: '20:00', cpu: 56, memory: 63, network: 84, response: 31 },
];

const metrics = [
  { label: 'CPU Usage', value: 73, icon: Cpu, color: '#f4c951' },
  { label: 'Memory', value: 85, icon: HardDrive, color: '#84285b' },
  { label: 'Network', value: 68, icon: Wifi, color: '#10b981' },
  { label: 'Response', value: 52, icon: Zap, color: '#ef4444' },
];

export default function LiveMetricsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#84285b]/10 to-[#f4c951]/5 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl hover:border-[#84285b]/40 transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
            Real-Time System Metrics
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#f4c951] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#efedf5]/80">Live Data</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10 hover:border-[#84285b]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                  <span className="text-sm text-[#efedf5]/80">{metric.label}</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-[#efedf5] font-['Orbitron']">
                    {metric.value}
                  </span>
                  <span className="text-sm text-[#efedf5]/60">%</span>
                </div>
                <div className="mt-2 w-full bg-[#050303]/50 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#84285b20" />
              <XAxis 
                dataKey="time" 
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
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#f4c951" 
                strokeWidth={2}
                dot={{ fill: '#f4c951', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#f4c951' }}
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#84285b" 
                strokeWidth={2}
                dot={{ fill: '#84285b', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#84285b' }}
              />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}