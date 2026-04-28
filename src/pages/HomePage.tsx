import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Calculator, EyeOff, BarChart3, Landmark, ArrowRight,
  Star, Quote, ChevronLeft, ChevronRight,
  Database, Banknote, TrendingUp, Shield, Zap, Factory,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleCanvas from '@/components/shared/ParticleCanvas';
import NumberCounter from '@/components/shared/NumberCounter';
import SankeyChart from '@/components/charts/SankeyChart';
import DonutChart from '@/components/charts/DonutChart';
import { painPointsData, mockCaseStudies, mockTestimonials } from '@/data/mock';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const painIcons: Record<string, React.ElementType> = {
  calculator: Calculator,
  'eye-off': EyeOff,
  'bar-chart': BarChart3,
  bank: Landmark,
};

const painColors: Record<string, { bg: string; icon: string; text: string }> = {
  red: { bg: 'bg-red-50', icon: 'text-red-500', text: 'text-red-500' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-500', text: 'text-amber-500' },
  sky: { bg: 'bg-sky-50', icon: 'text-sky-500', text: 'text-sky-500' },
  gray: { bg: 'bg-gray-100', icon: 'text-gray-600', text: 'text-gray-600' },
};

const sankeyData = {
  nodes: [
    { name: '电网电力', itemStyle: { color: '#0ea5e9' } },
    { name: '蒸汽', itemStyle: { color: '#f59e0b' } },
    { name: '天然气', itemStyle: { color: '#ef4444' } },
    { name: '纺纱', itemStyle: { color: '#10b981' } },
    { name: '织造', itemStyle: { color: '#34d399' } },
    { name: '印染', itemStyle: { color: '#059669' } },
    { name: '辅助', itemStyle: { color: '#6ee7b7' } },
    { name: '碳排放', itemStyle: { color: '#374151' } },
  ],
  links: [
    { source: '电网电力', target: '纺纱', value: 420 },
    { source: '电网电力', target: '织造', value: 280 },
    { source: '电网电力', target: '印染', value: 1560 },
    { source: '电网电力', target: '辅助', value: 890 },
    { source: '蒸汽', target: '印染', value: 340 },
    { source: '天然气', target: '印染', value: 120 },
    { source: '纺纱', target: '碳排放', value: 420 },
    { source: '织造', target: '碳排放', value: 280 },
    { source: '印染', target: '碳排放', value: 2020 },
    { source: '辅助', target: '碳排放', value: 890 },
  ],
};

export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = dir === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 overflow-hidden">
        <ParticleCanvas />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-emerald-400 text-sm uppercase tracking-widest font-medium mb-4"
            >
              纺织业绿色金融 SaaS 平台
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              碳智评 <span className="text-emerald-400">CarbonWise</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-2xl md:text-3xl text-gray-200 mb-4 font-medium"
            >
              让每一吨减排量都成为可融资的资产
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-gray-400 text-lg mb-8 max-w-2xl"
            >
              基于设备参数估算与环境成本会计的纺织业碳效评估与绿色金融对接平台
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-8 mb-10"
            >
              {[
                { num: 3, unit: '分钟', label: '完成碳足迹核算' },
                { num: 98, unit: '%', label: '成本降幅' },
                { num: 95, unit: '%', label: '周期缩短' },
                { num: 30, unit: '万亿', label: '绿色信贷市场' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-sky-400">
                    <NumberCounter end={stat.num} duration={2000} suffix={stat.unit} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/register">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-emerald-600/25">
                  免费开始碳核算 <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
                onClick={() => alert('银行对接方案页面即将上线')}
              >
                查看银行对接方案
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex items-center gap-2 mt-8 text-gray-500 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>符合 ISO 14067 · PAS 2050 · CBAM 国际标准</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Pain Points */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              纺织企业碳管理四大痛点
            </h2>
            <p className="text-gray-500 text-lg">从核算到融资，每一步都是挑战</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPointsData.map((pain, index) => {
              const Icon = painIcons[pain.icon] || Calculator;
              const colors = painColors[pain.color];
              return (
                <motion.div
                  key={pain.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pain.title}</h3>
                  <div className={`text-3xl font-bold ${colors.text} mb-1`}>{pain.stat}</div>
                  <div className="text-sm text-gray-500 mb-3">{pain.statLabel}</div>
                  <p className="text-sm text-gray-600 italic">{pain.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Solution */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              碳效数据 + 金融网络 = 绿色信贷规模
            </h2>
          </AnimatedSection>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20">
            {[
              { icon: Database, label: '碳效数据', color: 'bg-emerald-600' },
              { label: '+', isSymbol: true },
              { icon: Banknote, label: '金融网络', color: 'bg-sky-500' },
              { label: '=', isSymbol: true },
              { icon: TrendingUp, label: '绿色信贷', color: 'bg-amber-500' },
            ].map((item, i) =>
              item.isSymbol ? (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                  className="text-3xl font-bold text-gray-400"
                >
                  {item.label}
                </motion.span>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className={`${item.color} text-white rounded-2xl p-6 flex flex-col items-center gap-3 min-w-[140px]`}
                >
                  {item.icon && <item.icon className="w-10 h-10" />}
                  <span className="font-semibold">{item.label}</span>
                </motion.div>
              )
            )}
          </div>

          <AnimatedSection className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              一个平台、两套算法、三类客户、四层价值
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: Factory, title: '一个平台', desc: '统一碳效数据平台，打通企业-银行-品牌方数据闭环' },
                { icon: Zap, title: '两套算法', desc: '设备参数估算法 + 环境成本会计法，双重验证确保精准' },
                { icon: UsersIcon, title: '三类客户', desc: '纺织企业、金融机构、品牌采购商，三方共赢' },
                { icon: TrendingUp, title: '四层价值', desc: '碳管理、成本优化、绿色信贷、供应链认证' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <item.icon className="w-8 h-8 text-emerald-600 mb-3 mx-auto" />
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4: Product Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">全工序碳流向可视化</h2>
            <p className="text-gray-500">从能源输入到各工序碳排放，一目了然</p>
          </AnimatedSection>

          <AnimatedSection className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <SankeyChart data={sankeyData} height={400} />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '细纱机', pct: '15%' },
              { name: '喷气织机', pct: '10%' },
              { name: '溢流染色机', pct: '55%' },
              { name: '空压机', pct: '20%' },
            ].map((device, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-4 shadow-md text-center"
              >
                <Factory className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">{device.name}</div>
                <div className="text-sm text-emerald-600">{device.pct}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Mini Calculator */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3分钟快速估算您的碳排放</h2>
            <p className="text-gray-500">输入设备参数，立即获得碳效评估</p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: '设备数量', default: 10 },
                { label: '平均功率(kW)', default: 50 },
                { label: '日运行时间(h)', default: 16 },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    defaultValue={field.default}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">年工作天数: 300天</label>
              <input type="range" min="250" max="350" defaultValue="300" className="w-full accent-emerald-600" />
            </div>
            <Link to="/register">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg">
                立即估算
              </Button>
            </Link>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
              {[
                { label: '年碳排放量', value: '1,247', unit: '吨CO₂e', color: 'text-emerald-600' },
                { label: '吨布碳排放强度', value: '1.25', unit: 'tCO₂e/吨', color: 'text-sky-600' },
                { label: '预估环境成本', value: '7.48', unit: '万元', color: 'text-amber-600' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-gray-400">{item.unit}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Case Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">标杆企业碳效提升案例</h2>
            <p className="text-gray-500">真实数据，可验证成果</p>
          </AnimatedSection>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none' }}
            >
              {mockCaseStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="min-w-[350px] md:min-w-[400px] snap-start bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="h-40 bg-gray-200 relative overflow-hidden">
                    <img src={study.image} alt={study.companyName} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">{study.industry}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{study.size}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{study.companyName}</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-lg font-bold text-emerald-600">{study.reduction.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">年减排(吨)</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-sky-600">{study.savings}</div>
                        <div className="text-xs text-gray-500">节省(万/年)</div>
                      </div>
                      <div>
                        <span className="inline-flex px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">
                          {study.rating}级
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{study.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: Market Analysis */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">绿色金融市场规模</h2>
            <p className="text-gray-500">三重增长引擎驱动碳智评发展</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'SaaS 订阅市场', value: '2,160万', sub: '年营收', desc: '300家付费企业 × ¥3,600/年', color: '#059669' },
              { label: '数据服务市场', value: '4,000万', sub: '年营收', desc: '20家银行 × 10份报告/年 × ¥2万', color: '#0ea5e9' },
              { label: '供应链咨询市场', value: '6,000万', sub: '年营收', desc: '6个项目 × ¥100万/项目', color: '#d97706' },
            ].map((market, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center"
              >
                <div className="w-40 h-40 mx-auto mb-6">
                  <DonutChart
                    data={[{ name: market.label, value: 100 }]}
                    colors={[market.color, '#f3f4f6']}
                    height={160}
                    centerLabel={market.value}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{market.label}</h3>
                <p className="text-sm text-gray-500 mb-2">{market.sub}</p>
                <p className="text-xs text-gray-400">{market.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">来自行业领袖的评价</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-emerald-200 mb-2" />
                <p className="text-gray-700 mb-6 italic leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.title} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: CTA */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-900 to-emerald-800 overflow-hidden">
        <ParticleCanvas />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              准备好让每一吨减排量都成为可融资的资产了吗？
            </h2>
            <p className="text-emerald-100 text-lg mb-8">
              加入300+纺织企业，开启您的碳管理之旅
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                  免费试用基础版
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => alert('演示预约功能即将上线')}
              >
                预约银行对接演示
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
