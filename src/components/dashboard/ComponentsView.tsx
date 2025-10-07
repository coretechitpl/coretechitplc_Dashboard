import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Database,
  Monitor,
  Router,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Power,
  Activity,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

interface Component {
  id: string;
  name: string;
  type: 'server' | 'database' | 'network' | 'storage' | 'security';
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: string;
  lastUpdate: Date;
  location: string;
  ip: string;
}

const ComponentsView: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Initialize components data
  useEffect(() => {
    const initialComponents: Component[] = [
      {
        id: 'srv-001',
        name: 'Web Server 01',
        type: 'server',
        status: 'online',
        cpu: 45,
        memory: 67,
        disk: 34,
        network: 89,
        uptime: '15d 4h 23m',
        lastUpdate: new Date(),
        location: 'Data Center A',
        ip: '192.168.1.10'
      },
      {
        id: 'srv-002',
        name: 'Web Server 02',
        type: 'server',
        status: 'warning',
        cpu: 87,
        memory: 92,
        disk: 45,
        network: 78,
        uptime: '8d 12h 45m',
        lastUpdate: new Date(),
        location: 'Data Center A',
        ip: '192.168.1.11'
      },
      {
        id: 'db-001',
        name: 'Primary Database',
        type: 'database',
        status: 'online',
        cpu: 23,
        memory: 56,
        disk: 78,
        network: 95,
        uptime: '45d 2h 12m',
        lastUpdate: new Date(),
        location: 'Data Center B',
        ip: '192.168.2.10'
      },
      {
        id: 'db-002',
        name: 'Backup Database',
        type: 'database',
        status: 'maintenance',
        cpu: 12,
        memory: 34,
        disk: 67,
        network: 88,
        uptime: '0d 0h 0m',
        lastUpdate: new Date(),
        location: 'Data Center B',
        ip: '192.168.2.11'
      },
      {
        id: 'net-001',
        name: 'Core Router',
        type: 'network',
        status: 'online',
        cpu: 34,
        memory: 45,
        disk: 23,
        network: 98,
        uptime: '89d 15h 30m',
        lastUpdate: new Date(),
        location: 'Network Room',
        ip: '192.168.0.1'
      },
      {
        id: 'stor-001',
        name: 'Storage Array 01',
        type: 'storage',
        status: 'warning',
        cpu: 56,
        memory: 78,
        disk: 94,
        network: 87,
        uptime: '23d 8h 15m',
        lastUpdate: new Date(),
        location: 'Data Center A',
        ip: '192.168.3.10'
      },
      {
        id: 'sec-001',
        name: 'Firewall Primary',
        type: 'security',
        status: 'online',
        cpu: 28,
        memory: 42,
        disk: 15,
        network: 96,
        uptime: '67d 3h 45m',
        lastUpdate: new Date(),
        location: 'Security Zone',
        ip: '192.168.0.2'
      },
      {
        id: 'srv-003',
        name: 'Application Server',
        type: 'server',
        status: 'offline',
        cpu: 0,
        memory: 0,
        disk: 0,
        network: 0,
        uptime: '0d 0h 0m',
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
        location: 'Data Center C',
        ip: '192.168.1.12'
      }
    ];

    setComponents(initialComponents);
    setFilteredComponents(initialComponents);
  }, []);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setComponents(prev => prev.map(comp => ({
        ...comp,
        cpu: comp.status === 'online' ? Math.max(10, Math.min(100, comp.cpu + (Math.random() - 0.5) * 10)) : comp.cpu,
        memory: comp.status === 'online' ? Math.max(20, Math.min(100, comp.memory + (Math.random() - 0.5) * 8)) : comp.memory,
        network: comp.status === 'online' ? Math.max(70, Math.min(100, comp.network + (Math.random() - 0.5) * 5)) : comp.network,
        lastUpdate: comp.status === 'online' ? new Date() : comp.lastUpdate
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter components
  useEffect(() => {
    let filtered = components;

    if (searchTerm) {
      filtered = filtered.filter(comp => 
        comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.ip.includes(searchTerm) ||
        comp.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(comp => comp.type === filterType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(comp => comp.status === filterStatus);
    }

    setFilteredComponents(filtered);
  }, [components, searchTerm, filterType, filterStatus]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return {
          color: 'text-green-400',
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          icon: CheckCircle
        };
      case 'warning':
        return {
          color: 'text-yellow-400',
          bg: 'from-yellow-500/20 to-yellow-600/20',
          border: 'border-yellow-500/30',
          icon: AlertTriangle
        };
      case 'offline':
        return {
          color: 'text-red-400',
          bg: 'from-red-500/20 to-red-600/20',
          border: 'border-red-500/30',
          icon: Power
        };
      case 'maintenance':
        return {
          color: 'text-blue-400',
          bg: 'from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/30',
          icon: Settings
        };
      default:
        return {
          color: 'text-core-light',
          bg: 'from-core-highlight/20 to-core-dark/20',
          border: 'border-core-highlight/30',
          icon: CheckCircle
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'server': return Server;
      case 'database': return Database;
      case 'network': return Router;
      case 'storage': return HardDrive;
      case 'security': return Shield;
      default: return Monitor;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const formatLastUpdate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-orbitron font-bold text-core-light mb-1 sm:mb-2">
            System Components
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-core-light/70 font-inter">
            Detailed monitoring of all IT infrastructure components
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-core-gold/20 to-core-highlight/20 border border-core-gold/30 rounded-lg text-core-gold hover:from-core-gold/30 hover:to-core-highlight/30 transition-all duration-200 disabled:opacity-50 min-w-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="font-inter font-medium text-xs sm:text-sm hidden xs:inline">Refresh</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-core-dark/80 to-core-black/80 backdrop-blur-xl border border-core-highlight/30 rounded-xl p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-core-light/40" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light placeholder-core-light/40 font-inter text-sm focus:outline-none focus:border-core-gold/50 transition-all duration-200 min-w-0"
            />
          </div>

          {/* Type Filter */}
          <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 bg-core-black/50 border border-core-highlight/30 rounded-lg text-core-light font-inter text-sm focus:outline-none focus:border-core-gold/50"
          >
            <option value="all">All Types</option>
            <option value="server">Servers</option>
            <option value="database">Databases</option>
            <option value="network">Network</option>
            <option value="storage">Storage</option>
            <option value="security">Security</option>
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
            <option value="online">Online</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
            <option value="maintenance">Maintenance</option>
          </select>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence>
          {filteredComponents.map((component, index) => {
            const statusConfig = getStatusConfig(component.status);
            const TypeIcon = getTypeIcon(component.type);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 sm:p-6 bg-gradient-to-br ${statusConfig.bg} backdrop-blur-xl border ${statusConfig.border} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-0`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-core-black/30 rounded-lg border ${statusConfig.border}`}>
                      <TypeIcon className={`w-5 h-5 ${statusConfig.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-core-light font-inter font-medium text-sm sm:text-base truncate">{component.name}</h3>
                      <p className="text-core-light/60 text-xs sm:text-sm truncate">{component.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                    <span className={`text-xs font-inter font-medium ${statusConfig.color} uppercase hidden sm:inline`}>
                      {component.status}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-core-light/70 text-xs sm:text-sm">CPU</span>
                    <span className="text-core-light text-xs sm:text-sm font-medium">{component.cpu}%</span>
                  </div>
                  <div className="w-full bg-core-black/30 rounded-full h-1.5 sm:h-2">
                    <div 
                      className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${statusConfig.bg.replace('/20', '/60')}`}
                      style={{ width: `${component.cpu}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-core-light/70 text-xs sm:text-sm">Memory</span>
                    <span className="text-core-light text-xs sm:text-sm font-medium">{component.memory}%</span>
                  </div>
                  <div className="w-full bg-core-black/30 rounded-full h-1.5 sm:h-2">
                    <div 
                      className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${statusConfig.bg.replace('/20', '/60')}`}
                      style={{ width: `${component.memory}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-core-light/70 text-xs sm:text-sm">Network</span>
                    <span className="text-core-light text-xs sm:text-sm font-medium">{component.network}%</span>
                  </div>
                  <div className="w-full bg-core-black/30 rounded-full h-1.5 sm:h-2">
                    <div 
                      className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${statusConfig.bg.replace('/20', '/60')}`}
                      style={{ width: `${component.network}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 sm:pt-4 border-t border-core-highlight/20">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs text-core-light/60 gap-1 xs:gap-0">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span className="truncate">Uptime: {component.uptime}</span>
                    </div>
                    <span className="truncate">Updated: {formatLastUpdate(component.lastUpdate)}</span>
                  </div>
                  <div className="mt-1 sm:mt-2 text-xs text-core-light/60 truncate">
                    Location: {component.location}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <Server className="w-16 h-16 text-core-light/30 mx-auto mb-4" />
          <h3 className="text-xl font-orbitron font-bold text-core-light/60 mb-2">No Components Found</h3>
          <p className="text-core-light/40 font-inter">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ComponentsView;