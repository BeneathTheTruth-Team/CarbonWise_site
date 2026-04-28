import { ratingColors, ratingLabels } from '@/utils/calculations';
import type { CarbonRating } from '@/types';

interface CarbonBadgeProps {
  rating: CarbonRating;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-lg font-bold',
};

export default function CarbonBadge({ rating, size = 'md' }: CarbonBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: ratingColors[rating] }}
    >
      {rating}级
      {size === 'lg' && (
        <span className="ml-1 text-white/80 text-sm">{ratingLabels[rating]}</span>
      )}
    </span>
  );
}

export { ratingColors, ratingLabels };
