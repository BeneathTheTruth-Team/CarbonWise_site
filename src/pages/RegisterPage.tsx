import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleCanvas from '@/components/shared/ParticleCanvas';
import StepIndicator from '@/components/shared/StepIndicator';
import { useApp } from '@/context/AppContext';

const steps = ['账号信息', '企业信息', '需求确认'];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { login } = useApp();

  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);

  const painOptions = ['算不准', '看不见', '比不了', '贷不到'];
  const standardOptions = ['ISO 14067', 'PAS 2050', 'CBAM', '绿色信贷'];

  const togglePain = (pain: string) => {
    setSelectedPains(prev =>
      prev.includes(pain) ? prev.filter(p => p !== pain) : [...prev, pain]
    );
  };

  const toggleStandard = (std: string) => {
    setSelectedStandards(prev =>
      prev.includes(std) ? prev.filter(s => s !== std) : [...prev, std]
    );
  };

  const getPasswordStrength = (pwd: string): number => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['弱', '中', '强', '非常强'];
  const strengthColors = ['bg-red-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-600'];

  const sendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) clearInterval(timer);
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      login({ id: '1', name: '新用户', role: 'enterprise' });
      setTimeout(() => navigate('/dashboard'), 3000);
    }, 1500);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Check className="w-10 h-10 text-emerald-600" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-emerald-600 mb-4">欢迎加入碳智评!</h2>
          <p className="text-gray-500">注册成功，3秒后自动跳转到仪表盘...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-800 to-emerald-900 items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <div className="relative z-10 text-center px-12">
          <Leaf className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">碳智评 CarbonWise</h1>
          <p className="text-emerald-200 text-lg">开启您的碳管理之旅</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">创建账号</h2>

            <StepIndicator steps={steps} currentStep={currentStep} />

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                      <div className="flex">
                        <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
                          +86
                        </span>
                        <input
                          type="tel"
                          placeholder="请输入手机号"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">验证码</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="6位验证码"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={sendCode}
                          disabled={countdown > 0}
                          className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap ${
                            countdown > 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                        >
                          {countdown > 0 ? `${countdown}s` : '获取验证码'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">设置密码</label>
                      <input
                        type="password"
                        placeholder="至少8位，含大小写字母+数字+特殊字符"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      {password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map(i => (
                              <div
                                key={i}
                                className={`flex-1 h-2 rounded-full transition-colors ${
                                  i <= strength ? strengthColors[strength - 1] : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">
                            密码强度: {strength > 0 ? strengthLabels[strength - 1] : '请输入密码'}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">企业名称</label>
                      <input
                        type="text"
                        placeholder="请输入企业全称"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">统一社会信用代码</label>
                      <input
                        type="text"
                        placeholder="18位信用代码"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">所属行业</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                        <option>纺织业</option>
                        <option>服装制造</option>
                        <option>化纤</option>
                        <option>其他</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">企业规模</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                        <option>小型企业 (&lt;50人)</option>
                        <option>中型企业 (50-300人)</option>
                        <option>大型企业 (300-1000人)</option>
                        <option>集团企业 (&gt;1000人)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">主要痛点 (多选)</label>
                      <div className="flex flex-wrap gap-2">
                        {painOptions.map(pain => (
                          <button
                            key={pain}
                            type="button"
                            onClick={() => togglePain(pain)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                              selectedPains.includes(pain)
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400'
                            }`}
                          >
                            {pain}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">关注标准 (多选)</label>
                      <div className="flex flex-wrap gap-2">
                        {standardOptions.map(std => (
                          <button
                            key={std}
                            type="button"
                            onClick={() => toggleStandard(std)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                              selectedStandards.includes(std)
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-emerald-400'
                            }`}
                          >
                            {std}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">预计使用时间</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white">
                        <option>1个月内</option>
                        <option>1-3个月</option>
                        <option>3-6个月</option>
                        <option>半年以上</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 py-3"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    上一步
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                >
                  {loading ? '处理中...' : currentStep === 2 ? '完成注册' : '下一步'}
                  {!loading && currentStep < 2 && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </form>

            <p className="text-center mt-6 text-gray-500">
              已有账号？{' '}
              <Link to="/login" className="text-emerald-600 font-medium hover:underline">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
