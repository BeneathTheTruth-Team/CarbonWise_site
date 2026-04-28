import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface TrendChartProps {
  months: string[];
  emissions: number[];
  costs: number[];
  height?: number;
}

export default function TrendChart({ months, emissions, costs, height = 350 }: TrendChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
      },
      legend: {
        data: ['碳排放量(吨CO₂e)', '环境成本(万元)'],
        bottom: 0,
        textStyle: { fontSize: 12, color: '#6b7280' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#6b7280', fontSize: 11 },
      },
      yAxis: [
        {
          type: 'value',
          name: '碳排放量(吨)',
          nameTextStyle: { color: '#6b7280', fontSize: 11 },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f3f4f6' } },
          axisLabel: { color: '#6b7280', fontSize: 11 },
        },
        {
          type: 'value',
          name: '环境成本(万元)',
          nameTextStyle: { color: '#6b7280', fontSize: 11 },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { color: '#6b7280', fontSize: 11 },
        },
      ],
      series: [
        {
          name: '碳排放量(吨CO₂e)',
          type: 'bar',
          data: emissions,
          itemStyle: { color: '#059669', borderRadius: [4, 4, 0, 0] },
          barWidth: '40%',
        },
        {
          name: '环境成本(万元)',
          type: 'line',
          yAxisIndex: 1,
          data: costs,
          smooth: true,
          lineStyle: { color: '#0ea5e9', width: 2 },
          itemStyle: { color: '#0ea5e9' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(14, 165, 233, 0.2)' },
                { offset: 1, color: 'rgba(14, 165, 233, 0.02)' },
              ],
            },
          },
        },
      ],
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [months, emissions, costs]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
}
