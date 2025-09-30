import { SystemComponent } from '../types/dashboard';

export const mockSystemComponents: SystemComponent[] = [
  {
    id: 'WEB-001',
    name: 'Web Server Cluster',
    riskScore: 23,
    status: 'healthy',
    lastUpdated: '2 min ago',
    metrics: {
      cpu: 45,
      memory: 62,
      uptime: 99.8
    }
  },
  {
    id: 'DB-001',
    name: 'Database Primary',
    riskScore: 67,
    status: 'warning',
    lastUpdated: '1 min ago',
    metrics: {
      cpu: 78,
      memory: 84,
      uptime: 99.2
    }
  },
  {
    id: 'LB-001',
    name: 'Load Balancer',
    riskScore: 15,
    status: 'healthy',
    lastUpdated: '30 sec ago',
    metrics: {
      cpu: 32,
      memory: 41,
      uptime: 99.9
    }
  },
  {
    id: 'CDN-001',
    name: 'CDN Gateway',
    riskScore: 89,
    status: 'critical',
    lastUpdated: '45 sec ago',
    metrics: {
      cpu: 91,
      memory: 95,
      uptime: 97.3
    }
  },
  {
    id: 'API-001',
    name: 'API Gateway',
    riskScore: 41,
    status: 'warning',
    lastUpdated: '3 min ago',
    metrics: {
      cpu: 56,
      memory: 68,
      uptime: 99.5
    }
  },
  {
    id: 'CACHE-001',
    name: 'Redis Cache',
    riskScore: 8,
    status: 'healthy',
    lastUpdated: '1 min ago',
    metrics: {
      cpu: 23,
      memory: 34,
      uptime: 99.9
    }
  }
];