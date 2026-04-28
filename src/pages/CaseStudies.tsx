import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Factory, TrendingDown, Coins, Award, ChevronRight,
  Star, Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarbonBadge from '@/components/shared/CarbonBadge';
import { mockCaseStudies, mockTestimonials } from '@/data/mock';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const stats = [
  { icon: Factory, value: '300+', label: '服务企业' },
  { icon: TrendingDown, value: '15万', label: '总减排量(吨CO₂e)' },
  { icon: Coins, value: '2.8亿', label: '总节省成本' },
  { icon: Award, value: '8.5亿', label: '总获批信贷' },
];

const filters = [
  { label: '全部', value: 'all' },
  { label: '棉纺', value: '棉纺' },
  { label: '化纤', value: '化纤' },
  { label: '印染', value: '印染' },
  { label: '服装制造', value: '服装制造' },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCases = activeFilter === 'all'
    ? mockCaseStudies
    : mockCaseStudies.filter(c => c.industry.includes(activeFilter));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-16">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-emerald-800 to-emerald-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">客户成功案例</h1>
              <p className="text-emerald-200 text-lg">真实数据，可验证成果</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-emerald-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-6 bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === f.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Case Cards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((study, i) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.companyName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">{study.industry}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{study.size}</span>
                      <span className="px-2 py-1 bg-sky-50 text-sky-700 text-xs rounded-full">{study.type}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{study.companyName}</h3>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-emerald-600">{study.reduction.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">年减排(吨)</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-sky-600">{study.savings}万</div>
                        <div className="text-xs text-gray-500">节省/年</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <CarbonBadge rating={study.rating} size="sm" />
                        <div className="text-xs text-gray-500 mt-1">碳效评级</div>
                      </div>
                    </div>

                    {study.credit && (
                      <div className="mb-4 px-3 py-2 bg-amber-50 rounded-lg">
                        <span className="text-sm text-amber-700">
                          获批绿色信贷: <strong>{study.credit}万元</strong>
                        </span>
                      </div>
                    )}

                    <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 text-sm mb-4">
                      "{study.quote}"
                    </blockquote>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-700 font-bold text-sm">
                            {study.quoteAuthor[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{study.quoteAuthor}</div>
                          <div className="text-xs text-gray-500">{study.quoteTitle}</div>
                        </div>
                      </div>
                      <button className="text-emerald-600 text-sm font-medium hover:underline flex items-center">
                        详情 <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">来自行业领袖的评价</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {mockTestimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-gray-50 rounded-xl p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{t.author}</div>
                      <div className="text-sm text-gray-500">{t.title} · {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-emerald-800 to-emerald-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">成为下一个成功案例</h2>
            <p className="text-emerald-200 mb-8">加入300+纺织企业，开启碳管理转型之路</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 px-8">
                  免费开始核算
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                预约专家咨询
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
