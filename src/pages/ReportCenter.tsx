import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Eye, Download, Share2, Trash2, Clock,
  X, FileText, CheckCircle, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CarbonBadge from '@/components/shared/CarbonBadge';
import { mockReports } from '@/data/mock';
import type { CarbonStandard, ReportStatus } from '@/types';

const standardFilters: { label: string; value: CarbonStandard | 'all' }[] = [
  { label: '全部', value: 'all' },
  { label: 'ISO 14067', value: 'ISO14067' },
  { label: 'PAS 2050', value: 'PAS2050' },
  { label: 'CBAM', value: 'CBAM' },
  { label: '银行碳效评估', value: 'BANK' },
];

const statusConfig: Record<ReportStatus, { label: string; color: string; icon: React.ElementType }> = {
  generating: { label: '生成中', color: 'bg-sky-100 text-sky-700', icon: Clock },
  completed: { label: '已完成', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  reviewing: { label: '审核中', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  expired: { label: '已过期', color: 'bg-gray-100 text-gray-500', icon: X },
};

export default function ReportCenter() {
  const [search, setSearch] = useState('');
  const [activeStandard, setActiveStandard] = useState<CarbonStandard | 'all'>('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newStep, setNewStep] = useState(0);

  const filtered = mockReports.filter(r => {
    if (activeStandard !== 'all' && r.standard !== activeStandard) return false;
    if (search && !r.companyName.includes(search) && !r.reportNumber.includes(search)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {standardFilters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveStandard(f.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeStandard === f.value
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索企业、报告编号..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 w-56"
          />
        </div>

        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowNewModal(true)}>
          <Plus className="w-4 h-4 mr-1" /> 新建报告
        </Button>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((report, i) => {
          const status = statusConfig[report.status];
          const StatusIcon = status.icon;
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                report.status === 'expired' ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">
                    {report.standard}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {report.language === 'zh' ? 'CN' : 'EN'}
                  </span>
                  <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{report.companyName}</h3>
                <p className="text-xs text-gray-500 font-mono mb-1">{report.reportNumber}</p>
                <p className="text-xs text-gray-400 mb-4">
                  {report.period[0]} 至 {report.period[1]}
                </p>

                {/* Data */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {report.totalEmission > 0 ? report.totalEmission.toLocaleString() : '--'}
                    </div>
                    <div className="text-xs text-gray-500">碳排放(吨)</div>
                  </div>
                  <div>
                    <CarbonBadge rating={report.rating} size="sm" />
                    <div className="text-xs text-gray-500 mt-1">碳效评级</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {report.environmentalCost > 0 ? report.environmentalCost : '--'}
                    </div>
                    <div className="text-xs text-gray-500">环境成本(万)</div>
                  </div>
                </div>

                {/* Mini Chart Placeholder */}
                <div className="h-20 bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-300" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{report.createdAt} 生成</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="预览">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors" title="下载">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors" title="分享">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="删除">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的报告</h3>
          <p className="text-gray-500 mb-4">请调整筛选条件或创建新报告</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowNewModal(true)}>
            <Plus className="w-4 h-4 mr-1" /> 创建报告
          </Button>
        </div>
      )}

      {/* New Report Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>新建碳效报告</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 mb-6">
            {['选择标准', '配置参数', '确认生成'].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  i <= newStep ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < newStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs ${i <= newStep ? 'text-emerald-600' : 'text-gray-400'}`}>{s}</span>
                {i < 2 && <div className={`w-8 h-0.5 ${i < newStep ? 'bg-emerald-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {newStep === 0 && (
            <div className="grid grid-cols-1 gap-3">
              {[
                { std: 'ISO 14067', desc: '产品碳足迹国际标准', icon: '🌍' },
                { std: 'PAS 2050', desc: '商品和服务生命周期标准', icon: '📋' },
                { std: 'CBAM', desc: '欧盟碳边境调节机制', icon: '🏛️' },
                { std: '银行碳效评估', desc: '绿色信贷尽职调查', icon: '🏦' },
                { std: '企业内部管理', desc: '内部碳排放管理报告', icon: '🏭' },
              ].map(item => (
                <button
                  key={item.std}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                  onClick={() => setNewStep(1)}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-medium">{item.std}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {newStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">关联企业</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <option>浙江蓝天纺织有限公司</option>
                  <option>江苏阳光集团有限公司</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">核算周期</label>
                <div className="flex gap-2">
                  <input type="date" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" defaultValue="2026-01-01" />
                  <span className="py-2 text-gray-400">至</span>
                  <input type="date" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" defaultValue="2026-03-31" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品范围</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <option>全厂核算</option>
                  <option>单产品核算</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">核算边界</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                  <option>摇篮到大门</option>
                  <option>摇篮到坟墓</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setNewStep(0)}>上一步</Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => setNewStep(2)}>下一步</Button>
              </div>
            </div>
          )}

          {newStep === 2 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">核算标准</span><span className="font-medium">ISO 14067</span></div>
                <div className="flex justify-between"><span className="text-gray-500">关联企业</span><span className="font-medium">浙江蓝天纺织有限公司</span></div>
                <div className="flex justify-between"><span className="text-gray-500">核算周期</span><span className="font-medium">2026-01-01 至 2026-03-31</span></div>
                <div className="flex justify-between"><span className="text-gray-500">产品范围</span><span className="font-medium">全厂核算</span></div>
                <div className="flex justify-between"><span className="text-gray-500">核算边界</span><span className="font-medium">摇篮到大门</span></div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setNewStep(1)}>上一步</Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => { setShowNewModal(false); setNewStep(0); }}
                >
                  确认生成
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
