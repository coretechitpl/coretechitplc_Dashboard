import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const PredictiveChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('failure_risk');
  const [chartData, setChartData] = useState<any[]>([]);

  const metrics = [
    { id: 'failure_risk', label: 'Failure Risk', color: '#f4c951', icon: TrendingUp },
    { id: 'performance', label: 'Performance', color: '#84285b', icon: Activity },
    { id: 'capacity', label: 'Capacity', color: '#22c55e', icon: TrendingDown }
  ];

  // Generate mock chart data
  useEffect(() => {
    const generateData = () => {
      const data = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        let value;
        
        switch (selectedMetric) {
          case 'failure_risk':
            value = Math.max(0, Math.min(100, 30 + Math.sin(i * 0.3) * 20 + Math.random() * 10));
            break;
          case 'performance':
            value = Math.max(0, Math.min(100, 85 + Math.sin(i * 0.2) * 10 + Math.random() * 5));
            break;
          case 'capacity':
            value = Math.max(0, Math.min(100, 65 + Math.sin(i * 0.4) * 15 + Math.random() * 8));
            break;
          default:
            value = 50;
        }
        
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: Math.round(value),
          timestamp: time.getTime()
        });
      }
      
      return data;
    };

    setChartData(generateData());
  }, [selectedMetric]);

  const selectedMetricData = metrics.find(m => m.id === selectedMetric);
  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));

  return (
    <div className="space-y-4">
      {/* Metric Selector */}
      <div className="flex space-x-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.button
              key={metric.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-inter text-sm transition-all duration-200 ${
                selectedMetric === metric.id
                  ? 'bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 text-core-gold'
                  : 'bg-core-black/30 border border-core-highlight/20 text-core-light/70 hover:text-core-light'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{metric.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-core-black/30 rounded-lg border border-core-highlight/20 p-4">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <div>
            <h3 className="text-core-light font-inter font-medium">
              {selectedMetricData?.label} Prediction
            </h3>
            <p className="text-core-light/60 text-sm">Next 24 hours forecast</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-orbitron font-bold text-core-gold">
              {chartData.length > 0 ? chartData[chartData.length - 1].value : 0}%
            </div>
            <div className="text-core-light/60 text-sm">Current</div>
          </div>
        </div>

        {/* SVG Chart */}
        <svg className="w-full h-full mt-16" viewBox="0 0 800 160">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={selectedMetricData?.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={selectedMetricData?.color} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => {
            const y = 140 - (value / 100) * 120;
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

          {/* Chart line and area */}
          {chartData.length > 0 && (
            <>
              {/* Area */}
              <path
                d={`M 40 140 ${chartData.map((point, index) => {
                  const x = 40 + (index / (chartData.length - 1)) * 720;
                  const y = 140 - (point.value / 100) * 120;
                  return `L ${x} ${y}`;
                }).join(' ')} L 760 140 Z`}
                fill="url(#chartGradient)"
              />

              {/* Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d={`M ${chartData.map((point, index) => {
                  const x = 40 + (index / (chartData.length - 1)) * 720;
                  const y = 140 - (point.value / 100) * 120;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}`}
                stroke={selectedMetricData?.color}
                strokeWidth="2"
                fill="none"
              />

              {/* Data points */}
              {chartData.map((point, index) => {
                const x = 40 + (index / (chartData.length - 1)) * 720;
                const y = 140 - (point.value / 100) * 120;
                return (
                  <motion.circle
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={selectedMetricData?.color}
                    className="hover:r-5 transition-all duration-200 cursor-pointer"
                  >
                    <title>{`${point.time}: ${point.value}%`}</title>
                  </motion.circle>
                );
              })}
            </>
          )}

          {/* X-axis labels */}
          {chartData.filter((_, index) => index % 4 === 0).map((point, index) => {
            const x = 40 + (index * 4 / (chartData.length - 1)) * 720;
            return (
              <text
                key={index}
                x={x}
                y="155"
                fill="rgba(239, 237, 245, 0.6)"
                fontSize="10"
                textAnchor="middle"
              >
                {point.time}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 bg-core-black/30 rounded-lg border border-core-highlight/20 text-center">
          <div className="text-lg font-orbitron font-bold text-green-400">
            {minValue}%
          </div>
          <div className="text-core-light/60 text-sm font-inter">Min</div>
        </div>
        <div className="p-3 bg-core-black/30 rounded-lg border border-core-highlight/20 text-center">
          <div className="text-lg font-orbitron font-bold text-core-gold">
            {Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length) || 0}%
          </div>
          <div className="text-core-light/60 text-sm font-inter">Avg</div>
        </div>
        <div className="p-3 bg-core-black/30 rounded-lg border border-core-highlight/20 text-center">
          <div className="text-lg font-orbitron font-bold text-red-400">
            {maxValue}%
          </div>
          <div className="text-core-light/60 text-sm font-inter">Max</div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveChart;