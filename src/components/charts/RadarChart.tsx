import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface RadarChartProps {
  dimensions: string[];
  current: number[];
  average?: number[];
  height?: number;
}

export default function RadarChart({ dimensions, current, average, height = 350 }: RadarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const radarData: echarts.RadarSeriesOption['data'] = [
      {
        value: current,
        name: '当前企业',
        areaStyle: { color: 'rgba(5, 150, 105, 0.2)' },
        lineStyle: { color: '#059669', width: 2 },
        itemStyle: { color: '#059669' },
      },
    ];

    if (average) {
      radarData.push({
        value: average,
        name: '行业平均',
        areaStyle: { color: 'rgba(156, 163, 175, 0.1)' },
        lineStyle: { color: '#9ca3af', width: 1, type: 'dashed' },
        itemStyle: { color: '#9ca3af' },
      });
    }

    const series: echarts.SeriesOption[] = [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 6,
        data: radarData,
      },
    ];

    chartInstance.current.setOption({
      tooltip: {},
      legend: {
        bottom: 0,
        data: ['当前企业', '行业平均'],
        textStyle: { fontSize: 12, color: '#6b7280' },
      },
      radar: {
        indicator: dimensions.map(d => ({ name: d, max: 100 })),
        radius: '65%',
        axisName: {
          color: '#6b7280',
          fontSize: 12,
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(5, 150, 105, 0.02)', 'rgba(5, 150, 105, 0.05)'],
          },
        },
      },
      series,
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [dimensions, current, average]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
}
