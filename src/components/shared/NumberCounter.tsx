import { useCountUp } from '@/hooks/useCountUp';

interface NumberCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function NumberCounter({
  end,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: NumberCounterProps) {
  const count = useCountUp(end, duration, 0, decimals);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString('zh-CN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
