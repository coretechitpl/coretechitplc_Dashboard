import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BarChart, Calendar, Share } from 'lucide-react';

const exportOptions = [
  {
    title: 'Risk Assessment Report',
    description: 'Complete system risk analysis with predictions',
    format: 'PDF',
    icon: FileText,
    size: '2.3 MB'
  },
  {
    title: 'Performance Analytics',
    description: 'Historical data and trend analysis',
    format: 'CSV',
    icon: BarChart,
    size: '856 KB'
  },
  {
    title: 'Executive Summary',
    description: 'High-level overview for stakeholders',
    format: 'PDF',
    icon: Calendar,
    size: '1.1 MB'
  }
];

export default function ExportPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#84285b]/10 to-[#f4c951]/5 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
      
      <div className="relative p-6 bg-[#27061c]/40 backdrop-blur-xl border border-[#84285b]/20 rounded-2xl hover:border-[#84285b]/40 transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#84285b]/30 to-[#f4c951]/30 rounded-xl">
              <Share className="w-5 h-5 text-[#f4c951]" />
            </div>
            <h3 className="text-xl font-bold text-[#efedf5] font-['Orbitron']">
              Export Reports
            </h3>
          </div>
          <div className="text-xs text-[#efedf5]/60 bg-[#050303]/30 px-2 py-1 rounded-lg">
            Last updated: 5 min ago
          </div>
        </div>

        <div className="space-y-4">
          {exportOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="group/item p-4 bg-[#050303]/30 rounded-xl border border-[#84285b]/10 hover:border-[#84285b]/30 hover:bg-[#050303]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-[#27061c]/50 rounded-lg group-hover/item:bg-[#84285b]/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#84285b] group-hover/item:text-[#f4c951] transition-colors duration-300" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#efedf5] mb-1">
                        {option.title}
                      </h4>
                      <p className="text-xs text-[#efedf5]/60 mb-2">
                        {option.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#f4c951] bg-[#f4c951]/20 px-2 py-1 rounded-lg font-medium">
                          {option.format}
                        </span>
                        <span className="text-xs text-[#efedf5]/50">
                          {option.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gradient-to-r from-[#84285b] to-[#f4c951] rounded-lg hover:shadow-lg hover:shadow-[#84285b]/20 transition-all duration-300"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-6 p-4 bg-gradient-to-r from-[#84285b]/10 to-[#f4c951]/10 rounded-xl border border-[#84285b]/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-4 h-4 text-[#f4c951]" />
            <span className="text-sm font-medium text-[#efedf5]">Scheduled Reports</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="p-2 bg-[#050303]/30 rounded-lg text-xs text-[#efedf5]/80 hover:text-[#efedf5] hover:bg-[#050303]/50 transition-all duration-300">
              Weekly Summary
            </button>
            <button className="p-2 bg-[#050303]/30 rounded-lg text-xs text-[#efedf5]/80 hover:text-[#efedf5] hover:bg-[#050303]/50 transition-all duration-300">
              Monthly Report
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}