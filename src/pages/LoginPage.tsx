import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Smartphone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleCanvas from '@/components/shared/ParticleCanvas';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const [mode, setMode] = useState<'password' | 'code'>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({ id: '1', name: '测试用户', role: 'enterprise', company: '蓝天纺织' });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const sendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) clearInterval(timer);
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-800 to-emerald-900 items-center justify-center overflow-hidden">
        <ParticleCanvas />
        <div className="relative z-10 text-center px-12">
          <h1 className="text-4xl font-bold text-white mb-4">碳智评 CarbonWise</h1>
          <p className="text-emerald-200 text-lg mb-12">让每一吨减排量都成为可融资的资产</p>
          <div className="space-y-4">
            {[
              { num: '300+', label: '服务企业' },
              { num: '¥30万亿', label: '市场规模' },
              { num: '98%', label: '成本降幅' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-left"
              >
                <div className="text-2xl font-bold text-white">{stat.num}</div>
                <div className="text-emerald-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-gray-900">碳智评 CarbonWise</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">欢迎回来</h2>

            {/* Tab Switcher */}
            <div className="flex mb-6 border-b border-gray-200">
              {[
                { key: 'password' as const, label: '密码登录' },
                { key: 'code' as const, label: '验证码登录' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMode(tab.key)}
                  className={`flex-1 py-3 text-center font-medium transition-colors relative ${
                    mode === tab.key ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                  {mode === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: mode === 'password' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'password' ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {mode === 'password' ? (
                  <>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="手机号/邮箱"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="密码"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded accent-emerald-600" />
                        记住我
                      </label>
                      <span className="text-emerald-600 hover:underline cursor-pointer">忘记密码？</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="手机号"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="验证码"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={sendCode}
                        disabled={countdown > 0}
                        className={`px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                          countdown > 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        {countdown > 0 ? `${countdown}s` : '获取验证码'}
                      </button>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-medium"
                >
                  {loading ? '登录中...' : '登录'}
                </Button>
              </motion.form>
            </AnimatePresence>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">或</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">企业微信登录</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Landmark className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">银行OA登录</span>
              </button>
            </div>

            <p className="text-center mt-6 text-gray-500">
              还没有账号？{' '}
              <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landmark({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );
}
