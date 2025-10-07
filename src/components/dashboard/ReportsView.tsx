import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  Eye,
  Trash2,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  TrendingUp,
  Server,
  Activity
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'performance' | 'security' | 'capacity' | 'compliance' | 'custom';
  status: 'completed' | 'generating' | 'scheduled' | 'failed';
  createdAt: Date;
  size: string;
  format: 'PDF' | 'CSV' | 'JSON' | 'Excel';
  description: string;
  schedule?: string;
}

const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 'rpt-001',
      name: 'System Performance Report',
      type: 'performance',
      status: 'completed',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      size: '2.4 MB',
      format: 'PDF',
      description: 'Comprehensive analysis of system performance metrics over the last 30 days',
      schedule: 'Weekly'
    },
    {
      id: 'rpt-002',
      name: 'Security Audit Report',
      type: 'security',
      status: 'completed',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      size: '1.8 MB',
      format: 'PDF',
      description: 'Security vulnerabilities and compliance status assessment',
      schedule: 'Monthly'
    },
    {
      id: 'rpt-003',
      name: 'Capacity Planning Report',
      type: 'capacity',
      status: 'generating',
      createdAt: new Date(),
      size: 'Generating...',
      format: 'Excel',
      description: 'Resource utilization trends and capacity forecasting',
      schedule: 'Quarterly'
    },
    {
      id: 'rpt-004',
      name: 'Compliance Report',
      type: 'compliance',
      status: 'scheduled',
      createdAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      size: 'Pending',
      format: 'PDF',
      description: 'Regulatory compliance status and audit trail',
      schedule: 'Monthly'
    },
    {
      id: 'rpt-005',
      name: 'Custom Analytics Export',
      type: 'custom',
      status: 'failed',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      size: 'Failed',
      format: 'JSON',
      description: 'Custom data export with specific metrics and timeframes'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-green-400',
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          icon: CheckCircle
        };
      case 'generating':
        return {
          color: 'text-blue-400',
          bg: 'from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/30',
          icon: Clock
        };
      case 'scheduled':
        return {
          color: 'text-yellow-400',
          bg: 'from-yellow-500/20 to-yellow-600/20',
          border: 'border-yellow-500/30',
          icon: Calendar
        };
      case 'failed':
        return {
          color: 'text-red-400',
          bg: 'from-red-500/20 to-red-600/20',
          border: 'border-red-500/30',
          icon: AlertTriangle
        };
      default:
        return {
          color: 'text-core-light',
          bg: 'from-core-highlight/20 to-core-dark/20',
          border: 'border-core-highlight/30',
          icon: FileText
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return TrendingUp;
      case 'security': return AlertTriangle;
      case 'capacity': return BarChart3;
      case 'compliance': return CheckCircle;
      case 'custom': return PieChart;
      default: return FileText;
    }
  };

  const handleDownload = (report: Report) => {
    if (report.status !== 'completed') return;
    
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.name.replace(/\s+/g, '_')}.${report.format.toLowerCase()}`;
    link.click();
  };

  const handleDelete = (reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const reportTemplates = [
    {
      name: 'System Health Report',
      type: 'performance',
      description: 'Overall system health and performance metrics',
      icon: Activity
    },
    {
      name: 'Security Assessment',
      type: 'security',
      description: 'Security vulnerabilities and threat analysis',
      icon: AlertTriangle
    },
    {
      name: 'Resource Utilization',
      type: 'capacity',
      description: 'CPU, memory, and storage utilization trends',
      icon: Server
    },
    {
      name: 'Custom Report',
      type: 'custom',
      description: 'Build a custom report with specific metrics',
      icon: PieChart
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-core-light mb-1 sm:mb-2">
            Reports & Analytics
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-core-light/70 font-inter">
            Generate, schedule, and manage comprehensive system reports
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 rounded-lg text-core-gold hover:from-core-gold/30 hover:to-core-highlight/30 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span className="font-inter font-medium">Create Report</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-core-light/40" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light placeholder-core-light/40 font-inter text-sm focus:outline-none focus:border-core-gold/50 transition-all duration-200"
            />
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-1 lg:col-span-1">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter text-sm focus:outline-none focus:border-core-gold/50"
          >
            <option value="all">All Types</option>
            <option value="performance">Performance</option>
            <option value="security">Security</option>
            <option value="capacity">Capacity</option>
            <option value="compliance">Compliance</option>
            <option value="custom">Custom</option>
          </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2 lg:col-span-1">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter text-sm focus:outline-none focus:border-core-gold/50"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="generating">Generating</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
          </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredReports.map((report, index) => {
          const statusConfig = getStatusConfig(report.status);
          const TypeIcon = getTypeIcon(report.type);
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 sm:p-4 lg:p-6 bg-gradient-to-br ${statusConfig.bg} backdrop-blur-xl border ${statusConfig.border} rounded-xl`}
            >
              <div className="flex flex-col gap-4">
                {/* Header Section */}
                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                  <div className={`p-2 sm:p-3 bg-core-black/30 rounded-lg border ${statusConfig.border} flex-shrink-0`}>
                    <TypeIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${statusConfig.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 gap-1 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-orbitron font-bold text-core-light">
                        {report.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                        <span className={`text-xs font-inter font-medium ${statusConfig.color} uppercase`}>
                          {report.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-core-light/70 text-xs sm:text-sm mb-3 font-inter line-clamp-2">
                      {report.description}
                    </p>

                    {/* Metadata - Mobile Optimized */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 text-xs text-core-light/60">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="truncate">Created: {formatDate(report.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-3 h-3" />
                        <span>Format: {report.format}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span className="truncate">Size: {report.size}</span>
                      </div>
                      {report.schedule && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">Schedule: {report.schedule}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-core-highlight/10 sm:border-t-0 sm:pt-0">
                  {report.status === 'completed' && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-core-black/30 border border-core-highlight/30 rounded-lg text-core-light hover:bg-core-highlight/20 transition-all duration-200 touch-manipulation"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(report)}
                        className="p-2 bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 rounded-lg text-core-gold hover:from-core-gold/30 hover:to-core-highlight/30 transition-all duration-200 touch-manipulation"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}

                  {report.status === 'generating' && (
                    <div className="flex items-center space-x-2 px-2 sm:px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                      <span className="text-blue-400 text-xs font-inter hidden sm:inline">Generating...</span>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(report.id)}
                    className="p-2 bg-core-black/30 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 touch-manipulation"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-core-light/30 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-orbitron font-bold text-core-light/60 mb-2">No Reports Found</h3>
          <p className="text-sm sm:text-base text-core-light/40 font-inter px-4">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-core-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-core-dark/95 to-core-black/95 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-orbitron font-bold text-core-light">Create New Report</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg bg-core-black/50 border border-core-highlight/30 text-core-light hover:bg-core-highlight/20 transition-all duration-200 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {reportTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <motion.button
                    key={template.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 sm:p-4 bg-gradient-to-br from-core-gold/10 to-core-highlight/10 border border-core-gold/30 rounded-xl text-left hover:from-core-gold/20 hover:to-core-highlight/20 transition-all duration-200 touch-manipulation"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <div className="p-2 bg-core-black/30 rounded-lg border border-core-gold/30">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-core-gold" />
                      </div>
                      <h3 className="text-sm sm:text-base text-core-light font-inter font-medium">{template.name}</h3>
                    </div>
                    <p className="text-core-light/70 text-xs sm:text-sm font-inter line-clamp-2">{template.description}</p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;