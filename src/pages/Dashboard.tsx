import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingDown, Award, DollarSign, CreditCard,
  ChevronRight, CheckCircle2, AlertCircle, Clock, Zap,
  Calculator, FileText, HandCoins, BarChart3,
} from 'lucide-react';
import { mockDashboardData } from '@/data/mock';
import CarbonBadge from '@/components/shared/CarbonBadge';
import NumberCounter from '@/components/shared/NumberCounter';
import TrendChart from '@/components/charts/TrendChart';
import RadarChart from '@/components/charts/RadarChart';
import { ratingColors } from '@/utils/calculations';

function AnimatedCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const taskIcons: Record<string, React.ElementType> = {
  urgent: AlertCircle,
  important: Clock,
  normal: Zap,
  completed: CheckCircle2,
};

const taskColors: Record<string, string> = {
  urgent: 'text-red-500',
  important: 'text-amber-500',
  normal: 'text-sky-500',
  completed: 'text-emerald-500',
};

export default function Dashboard() {
  const data = mockDashboardData;
  const months = data.trend.map(d => d.month);
  const emissions = data.trend.map(d => d.emission);
  const costs = data.trend.map(d => d.cost);

  const quickActions = [
    { icon: Calculator, title: '开始碳核算', desc: '快速估算碳排放', path: '/calculator' },
    { icon: FileText, title: '查看报告', desc: '管理碳效报告', path: '/reports' },
    { icon: HandCoins, title: '申请信贷', desc: '绿色信贷对接', path: '#' },
    { icon: BarChart3, title: '行业对标', desc: '对比行业基准', path: '#' },
  ];

  return (
    <div className="space-y-6">
      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AnimatedCard delay={0} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">本月碳排放</span>
            <TrendingDown className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            <NumberCounter end={data.summary.monthlyEmission} decimals={2} />
          </div>
          <div className="text-sm text-gray-500">吨CO₂e</div>
          <div className="flex items-center gap-1 mt-3">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">{Math.abs(data.summary.emissionChange)}%</span>
            <span className="text-xs text-gray-400">较上月</span>
          </div>
          <svg className="w-full h-12 mt-3" viewBox="0 0 120 40">
            <polyline
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              points={data.trend.slice(-12).map((d, i) => `${i * 10},${40 - (d.emission - 400) * 40 / 250}`).join(' ')}
            />
          </svg>
        </AnimatedCard>

        <AnimatedCard delay={0.1} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">碳效评级</span>
            <Award className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mb-3">
            <CarbonBadge rating={data.summary.rating} size="lg" />
          </div>
          <div className="text-sm text-gray-500 mb-3">
            近6个月: BB→BBB→A→AA
          </div>
          <div className="text-sm text-gray-600">
            距AAA级还需减排 <span className="font-semibold text-emerald-600">124</span> 吨
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: '75%', backgroundColor: ratingColors[data.summary.rating] }}
            />
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">环境成本</span>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            <NumberCounter end={data.summary.environmentalCost} decimals={1} />
          </div>
          <div className="text-sm text-gray-500">万元</div>
          <div className="text-sm text-gray-500 mt-1">占营收 2.1%</div>
          <div className="flex items-center gap-1 mt-3">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">{Math.abs(data.summary.costChange)}%</span>
            <span className="text-xs text-gray-400">节省 2.6万</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }} />
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">绿色信贷额度</span>
            <CreditCard className="w-5 h-5 text-sky-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            <NumberCounter end={data.summary.creditLimit} />
          </div>
          <div className="text-sm text-gray-500">万元</div>
          <div className="text-sm text-gray-500 mt-1">已获批 · 利率 3.65%</div>
          <span className="inline-block mt-3 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
            已接入绍兴农商行
          </span>
        </AnimatedCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <AnimatedCard delay={0} className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">碳排放与环境成本趋势</h3>
            <div className="flex gap-2">
              {['近3月', '近6月', '近12月'].map(period => (
                <button
                  key={period}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    period === '近12月' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <TrendChart months={months} emissions={emissions} costs={costs} height={320} />
        </AnimatedCard>

        <AnimatedCard delay={0.1} className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">碳效六维评分</h3>
          <RadarChart
            dimensions={data.radar.dimensions}
            current={data.radar.current}
            average={data.radar.average}
            height={280}
          />
          <div className="text-center mt-4">
            <div className="text-2xl font-bold text-gray-900">
              综合评分 <span className="text-emerald-600">78</span>
            </div>
            <p className="text-sm text-red-500 mt-1">需关注: 可再生能源占比</p>
          </div>
        </AnimatedCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task List */}
        <AnimatedCard delay={0} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              待办任务
              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                {data.tasks.filter(t => !t.completed).length}
              </span>
            </h3>
          </div>
          <div className="space-y-3">
            {data.tasks.map(task => {
              const Icon = taskIcons[task.type] || Clock;
              return (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50 ${
                    task.completed ? 'opacity-60' : ''
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <Icon className={`w-4 h-4 flex-shrink-0 ${taskColors[task.type]}`} />
                  <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs text-gray-400">{task.dueDate}</span>
                  )}
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Quick Actions */}
        <AnimatedCard delay={0.1} className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷入口</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <a
                key={i}
                href={action.path}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <action.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
