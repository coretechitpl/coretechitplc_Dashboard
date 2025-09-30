export interface SystemComponent {
  id: string;
  name: string;
  riskScore: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
  metrics: {
    cpu: number;
    memory: number;
    uptime: number;
  };
}

export interface AlertItem {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  component: string;
}

export interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
  response: number;
}