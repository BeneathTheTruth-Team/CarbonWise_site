import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface SankeyData {
  nodes: { name: string; itemStyle?: { color: string } }[];
  links: { source: string; target: string; value: number }[];
}

interface SankeyChartProps {
  data: SankeyData;
  height?: number;
}

export default function SankeyChart({ data, height = 400 }: SankeyChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);
    chartInstance.current.setOption({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'sankey',
          layout: 'none',
          emphasis: { focus: 'adjacency' },
          nodeAlign: 'left',
          data: data.nodes,
          links: data.links,
          lineStyle: {
            color: 'gradient',
            curveness: 0.5,
            opacity: 0.4,
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: '#aaa',
          },
          label: {
            color: '#374151',
            fontSize: 12,
            fontFamily: 'Inter, PingFang SC, Microsoft YaHei',
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
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height }} />;
}
