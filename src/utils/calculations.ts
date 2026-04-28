import type { CarbonRating, Device, OperationData } from '@/types';

export const calculateRating = (intensity: number, benchmark: number): CarbonRating => {
  const ratio = intensity / benchmark;
  if (ratio < 0.6) return 'AAA';
  if (ratio < 0.8) return 'AA';
  if (ratio < 1.0) return 'A';
  if (ratio < 1.3) return 'BBB';
  return 'BB';
};

export const calculateAgingFactor = (years: number): number => {
  if (years <= 3) return 1.0;
  if (years <= 5) return 1.05;
  if (years <= 8) return 1.08;
  return 1.12;
};

export const calculateEmission = (
  devices: Device[],
  operation: OperationData
): number => {
  return devices.reduce((total, device) => {
    const dailyEnergy =
      device.ratedPower *
      device.quantity *
      operation.dailyRuntime *
      (operation.loadFactor / 100) *
      device.agingFactor;
    const annualEnergy = dailyEnergy * operation.workDaysPerYear;
    const emission = (annualEnergy * operation.gridFactor) / 1000;
    return total + emission;
  }, 0);
};

export const calculateIntensity = (
  totalEmission: number,
  annualOutput: number = 1000
): number => {
  return totalEmission / annualOutput;
};

export const calculateEnvironmentalCost = (
  totalEmission: number,
  carbonPrice: number = 60
): number => {
  return (totalEmission * carbonPrice) / 10000;
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatCurrency = (num: number): string => {
  return `¥${formatNumber(num)}`;
};

export const ratingColors: Record<CarbonRating, string> = {
  AAA: '#047857',
  AA: '#059669',
  A: '#10b981',
  BBB: '#f59e0b',
  BB: '#ef4444',
};

export const ratingLabels: Record<CarbonRating, string> = {
  AAA: '卓越',
  AA: '优秀',
  A: '良好',
  BBB: '合格',
  BB: '待改进',
};

export const gridFactors: Record<string, number> = {
  华东: 0.5703,
  华北: 0.5568,
  华南: 0.5257,
  西北: 0.4912,
};

export const shiftOptions = [
  { label: '一班', hours: 8 },
  { label: '两班', hours: 16 },
  { label: '三班', hours: 24 },
  { label: '连续生产', hours: 24 },
];

export const generateReportNumber = (
  standard: string,
  seq: number
): string => {
  const prefix = 'CW';
  const year = new Date().getFullYear();
  const stdMap: Record<string, string> = {
    ISO14067: 'ISO',
    PAS2050: 'PAS',
    CBAM: 'CBM',
    BANK: 'BNK',
    INTERNAL: 'INT',
  };
  return `${prefix}-${year}-${String(seq).padStart(3, '0')}-${stdMap[standard] || 'UNK'}`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
