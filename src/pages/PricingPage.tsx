import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, X, ChevronDown, ChevronUp, Calculator,
  ArrowRight, Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NumberCounter from '@/components/shared/NumberCounter';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const saasPlans = [
  {
    name: '基础版',
    price: 0,
    originalPrice: null,
    period: '年',
    target: '适合年营收<2,000万的小企业',
    highlighted: false,
    features: [
      { text: '单工序碳核算', included: true },
      { text: '基础碳排放报告', included: true },
      { text: '行业基准查询', included: true },
      { text: '全厂核算', included: false },
      { text: '环境成本分析', included: false },
      { text: '碳效评级', included: false },
      { text: '月度对标趋势', included: false },
      { text: '专家咨询', included: false },
    ],
    cta: '免费注册',
    ctaVariant: 'outline' as const,
  },
  {
    name: '专业版',
    price: 3600,
    originalPrice: 12000,
    period: '年',
    target: '适合年营收2,000万-2亿的企业',
    highlighted: true,
    badge: '推荐',
    savings: '仅为传统核查的1.6%',
    features: [
      { text: '全厂碳核算（多工序）', included: true },
      { text: '多标准报告（ISO/CBAM/银行）', included: true },
      { text: '环境成本穿透分析', included: true },
      { text: '碳效评级（AAA-BB）', included: true },
      { text: '月度对标趋势', included: true },
      { text: '2次/年专家咨询', included: true },
      { text: 'API数据接口', included: false },
      { text: '专属客户成功经理', included: false },
    ],
    cta: '立即订阅',
    ctaVariant: 'default' as const,
  },
  {
    name: '企业版',
    price: 18000,
    originalPrice: null,
    period: '年',
    target: '适合年营收>2亿的集团企业',
    highlighted: false,
    features: [
      { text: '全厂碳核算（多工序）', included: true },
      { text: '多标准报告（ISO/CBAM/银行）', included: true },
      { text: '环境成本穿透分析', included: true },
      { text: '碳效评级（AAA-BB）', included: true },
      { text: '月度对标趋势', included: true },
      { text: '无限次专家咨询', included: true },
      { text: 'API数据接口', included: true },
      { text: '专属客户成功经理', included: true },
    ],
    cta: '联系销售',
    ctaVariant: 'outline' as const,
  },
];

const dataServices = [
  { name: '碳效评估报告', price: '¥50,000', unit: '/份', desc: '全生命周期碳足迹 + 行业对标 + 碳效评级', target: '城商行、农商行' },
  { name: '绿色信贷尽调包', price: '¥150,000', unit: '/份', desc: '碳数据核实 + 减碳潜力评估 + 贷后监测方案', target: '股份制银行' },
  { name: '批量筛选服务', price: '¥500', unit: '/家', desc: '按银行需求筛选AA级以上企业名单', target: '省级分行' },
  { name: '贷后碳效监测', price: '¥20,000', unit: '/家/年', desc: '季度数据更新 + 异常预警 + 年度复核', target: '已放贷企业' },
];

const faqs = [
  { q: '免费版和专业版有什么区别？', a: '免费版仅支持单工序碳核算和基础报告，专业版支持全厂多工序核算、多标准报告生成、环境成本穿透分析等高级功能，适合有完整碳管理需求的企业。' },
  { q: '如何计算我们的碳排放？', a: '只需输入您的设备参数（功率、数量、运行时间等），我们的系统会基于设备参数估算法和环境成本会计法自动计算碳排放量，整个过程仅需3分钟。' },
  { q: '报告可以被银行认可吗？', a: '可以。我们的报告符合ISO 14067、PAS 2050、CBAM等国际标准，已与多家银行建立合作关系，报告可直接用于绿色信贷申请。' },
  { q: '数据安全如何保障？', a: '我们采用银行级数据加密技术，通过ISO 27001信息安全认证，所有数据传输采用TLS加密，存储采用AES-256加密，确保您的数据安全。' },
  { q: '可以退订吗？', a: '专业版和企业版支持30天无理由退款。您可以随时在设置中取消订阅，取消后服务将持续到当前计费周期结束。' },
  { q: '如何申请绿色信贷？', a: '在碳效评级达到A级以上后，您可以通过平台的"绿色信贷对接"功能，一键将碳效报告发送给合作银行，快速申请绿色信贷。' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [roiInputs, setRoiInputs] = useState({ companies: 100, traditional: 30000, carbonwise: 5000 });

  const annualSavings = (roiInputs.companies * (roiInputs.traditional - roiInputs.carbonwise)) / 10000;
  const efficiency = roiInputs.traditional / roiInputs.carbonwise;
  const roi = ((roiInputs.traditional - roiInputs.carbonwise) / roiInputs.carbonwise * 100);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-16">
        {/* SaaS Pricing */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">选择适合您的方案</h1>
              <p className="text-gray-500 text-lg">从免费基础版到企业定制，满足不同规模需求</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {saasPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                    plan.highlighted ? 'ring-2 ring-emerald-600 scale-105 md:scale-110' : ''
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {plan.badge}
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-emerald-600' : 'text-gray-700'}`}>
                      {plan.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ¥<NumberCounter end={plan.price} duration={1500} />
                      </span>
                      <span className="text-gray-500">/{plan.period}</span>
                    </div>

                    {plan.originalPrice && (
                      <div className="text-gray-400 line-through text-sm mb-2">
                        ¥{plan.originalPrice.toLocaleString()}/年
                      </div>
                    )}

                    {plan.savings && (
                      <div className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full mb-4">
                        {plan.savings}
                      </div>
                    )}

                    <p className="text-sm text-gray-500 mb-6">{plan.target}</p>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map(f => (
                        <li key={f.text} className="flex items-center gap-2 text-sm">
                          {f.included ? (
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          )}
                          <span className={f.included ? 'text-gray-700' : 'text-gray-400'}>{f.text}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/register">
                      <Button
                        className={`w-full py-3 ${
                          plan.highlighted
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        variant={plan.ctaVariant}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Anchor */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-white rounded-xl shadow-md px-8 py-4">
                <div>
                  <div className="text-gray-400 line-through text-lg">SGS第三方核查 ¥220,000/次</div>
                </div>
                <div className="text-gray-300 text-2xl">vs</div>
                <div>
                  <div className="text-emerald-600 font-bold text-xl">碳智评专业版 ¥3,600/年</div>
                </div>
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-full font-bold">
                  节省98.4%
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">金融机构数据服务</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {dataServices.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                  <div className="text-2xl font-bold text-sky-600 mb-2">
                    {service.price}<span className="text-sm font-normal text-gray-500">{service.unit}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {service.target}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                银行ROI计算器
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">年度尽调企业数</label>
                  <input
                    type="number"
                    value={roiInputs.companies}
                    onChange={e => setRoiInputs({ ...roiInputs, companies: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">传统成本/家</label>
                  <input
                    type="number"
                    value={roiInputs.traditional}
                    onChange={e => setRoiInputs({ ...roiInputs, traditional: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">碳智评成本/家</label>
                  <input
                    type="number"
                    value={roiInputs.carbonwise}
                    onChange={e => setRoiInputs({ ...roiInputs, carbonwise: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">{annualSavings.toFixed(1)}万</div>
                  <div className="text-sm text-gray-500">年度节省</div>
                </div>
                <div className="bg-sky-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-sky-600">{efficiency.toFixed(1)}倍</div>
                  <div className="text-sm text-gray-500">效率提升</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-amber-600">{roi.toFixed(0)}%</div>
                  <div className="text-sm text-gray-500">投资回报率</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">常见问题</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-gray-900">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-emerald-800 to-emerald-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">不确定哪个方案适合您？</h2>
            <p className="text-emerald-200 mb-8">我们的专家团队将为您提供免费咨询</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                预约免费咨询
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                下载完整报价单 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
