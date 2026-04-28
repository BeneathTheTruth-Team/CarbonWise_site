import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface DonutChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
  centerLabel?: string;
}

const defaultColors = ['#059669', '#0ea5e9', '#d97706', '#ef4444', '#8b5cf6', '#6b7280'];

export default function DonutChart({ data, colors = defaultColors, height = 300, centerLabel }: DonutChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      color: colors,
      series: [
        {
          type: 'pie',
          radius: ['55%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 11,
            color: '#374151',
          },
          labelLine: {
            length: 10,
            length2: 8,
          },
          emphasis: {
            label: { show: true, fontSize: 14, fontWeight: 'bold' },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
            },
          },
          data,
        },
      ],
      graphic: centerLabel
        ? [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: centerLabel,
                textAlign: 'center',
                fill: '#374151',
                fontSize: 16,
                fontWeight: 600,
              },
            },
          ]
        : undefined,
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [data, colors, centerLabel]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
}
