export type UserRole = 'ADMIN' | 'INVESTIGATOR' | 'ANALYST' | 'VISITOR';

export interface StatisticMetric {
  id: string;
  label: string;
  value: string | number;
  subtext: string;
  highlight?: boolean;
}

export interface ModuleInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'ACTIVE' | 'DEVELOPMENT' | 'PLANNED';
  path?: string;
}