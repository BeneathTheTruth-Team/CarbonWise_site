export type CarbonRating = 'AAA' | 'AA' | 'A' | 'BBB' | 'BB';
export type CarbonStandard = 'ISO14067' | 'PAS2050' | 'CBAM' | 'BANK' | 'INTERNAL';
export type UserRole = 'enterprise' | 'bank' | 'admin';
export type EnterpriseSize = 'small' | 'medium' | 'large' | 'group';
export type TaskType = 'urgent' | 'important' | 'normal' | 'completed';
export type ReportStatus = 'generating' | 'completed' | 'reviewing' | 'expired';

export interface Device {
  id: string;
  process: string;
  name: string;
  model: string;
  quantity: number;
  ratedPower: number;
  usageYears: number;
  agingFactor: number;
}

export interface OperationData {
  dailyRuntime: number;
  loadFactor: number;
  shiftType: string;
  workDaysPerYear: number;
  gridRegion: string;
  gridFactor: number;
  steamConsumption?: number;
  gasConsumption?: number;
}

export interface CarbonResult {
  totalEmission: number;
  intensity: number;
  environmentalCost: number;
  rating: CarbonRating;
  uncertainty: {
    mean: number;
    stdDev: number;
    confidence90: [number, number];
    confidence95: [number, number];
  };
  processBreakdown: ProcessEmission[];
  deviceBreakdown: DeviceEmission[];
  optimizationPlan: OptimizationItem[];
}

export interface ProcessEmission {
  process: string;
  emission: number;
  percentage: number;
}

export interface DeviceEmission {
  deviceName: string;
  emission: number;
  cost: number;
  deaScore: number;
}

export interface OptimizationItem {
  priority: number;
  measure: string;
  investment: number;
  annualSaving: number;
  annualCarbonReduction: number;
  paybackPeriod: number;
  applicableSubsidy?: string;
}

export interface Report {
  id: string;
  standard: CarbonStandard;
  language: 'zh' | 'en';
  status: ReportStatus;
  companyName: string;
  reportNumber: string;
  period: [string, string];
  totalEmission: number;
  rating: CarbonRating;
  environmentalCost: number;
  thumbnail?: string;
  createdAt: string;
  pdfUrl?: string;
}

export interface DashboardData {
  summary: {
    monthlyEmission: number;
    emissionChange: number;
    rating: CarbonRating;
    ratingHistory: { date: string; rating: CarbonRating }[];
    environmentalCost: number;
    costChange: number;
    creditLimit: number;
    creditUsed: number;
  };
  trend: MonthlyData[];
  radar: {
    dimensions: string[];
    current: number[];
    average: number[];
  };
  tasks: Task[];
}

export interface MonthlyData {
  month: string;
  emission: number;
  cost: number;
  energy: number;
  intensity: number;
}

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  dueDate?: string;
  link: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  company?: string;
}

export interface CaseStudy {
  id: string;
  companyName: string;
  industry: string;
  size: string;
  type: string;
  image: string;
  reduction: number;
  savings: number;
  rating: CarbonRating;
  credit?: number;
  quote: string;
  quoteAuthor: string;
  quoteTitle: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface PainPoint {
  id: string;
  title: string;
  icon: string;
  stat: string;
  statLabel: string;
  description: string;
  color: string;
}
