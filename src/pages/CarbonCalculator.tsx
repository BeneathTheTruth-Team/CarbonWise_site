import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Settings, Download, Upload, Play,
  Save, FileText, Share2, TrendingUp, ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StepIndicator from '@/components/shared/StepIndicator';
import NumberCounter from '@/components/shared/NumberCounter';
import CarbonBadge from '@/components/shared/CarbonBadge';
import DonutChart from '@/components/charts/DonutChart';
import SankeyChart from '@/components/charts/SankeyChart';
import {
  defaultDevices, gridFactors, shiftOptions,
} from '@/data/mock';
import {
  calculateEmission, calculateIntensity, calculateEnvironmentalCost,
  calculateRating, calculateAgingFactor,
} from '@/utils/calculations';
import type { Device, OperationData, CarbonResult } from '@/types';

const steps = ['设备参数配置', '运行数据填报', '核算结果'];

const processes = ['纺纱', '织造前准备', '织造', '印染', '辅助'];

const defaultOpData: OperationData = {
  dailyRuntime: 16,
  loadFactor: 75,
  shiftType: '两班',
  workDaysPerYear: 300,
  gridRegion: '华东',
  gridFactor: 0.5703,
};

export default function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [devices, setDevices] = useState<Device[]>(defaultDevices);
  const [opData, setOpData] = useState<OperationData>(defaultOpData);
  const [result, setResult] = useState<CarbonResult | null>(null);

  const addDevice = () => {
    const newDevice: Device = {
      id: Date.now().toString(),
      process: '纺纱',
      name: '',
      model: '',
      quantity: 1,
      ratedPower: 0,
      usageYears: 1,
      agingFactor: 1.0,
    };
    setDevices([...devices, newDevice]);
  };

  const updateDevice = (id: string, field: keyof Device, value: string | number) => {
    setDevices(prev => prev.map(d => {
      if (d.id !== id) return d;
      const updated = { ...d, [field]: value };
      if (field === 'usageYears') {
        updated.agingFactor = calculateAgingFactor(Number(value));
      }
      return updated;
    }));
  };

  const removeDevice = (id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  const handleCalculate = () => {
    const totalEmission = calculateEmission(devices, opData);
    const intensity = calculateIntensity(totalEmission);
    const envCost = calculateEnvironmentalCost(totalEmission);
    const rating = calculateRating(intensity, 5.0);

    const processBreakdown = processes.map(p => {
      const procDevices = devices.filter(d => d.process === p || (p === '辅助' && d.process === '辅助'));
      const emission = procDevices.length > 0 ? calculateEmission(procDevices, opData) : totalEmission * 0.2;
      return {
        process: p,
        emission,
        percentage: (emission / totalEmission) * 100,
      };
    });

    const deviceBreakdown = devices.map(d => {
      const emission = calculateEmission([d], opData);
      return {
        deviceName: d.name || '未命名设备',
        emission,
        cost: (emission * 60) / 10000,
        deaScore: 0.6 + Math.random() * 0.4,
      };
    });

    const optimizationPlan = [
      {
        priority: 1,
        measure: '空压机余热回收',
        investment: 15,
        annualSaving: 12,
        annualCarbonReduction: 180,
        paybackPeriod: 1.25,
        applicableSubsidy: '浙江省节能技改补贴30%',
      },
      {
        priority: 2,
        measure: 'LED照明改造',
        investment: 8,
        annualSaving: 5,
        annualCarbonReduction: 45,
        paybackPeriod: 1.6,
        applicableSubsidy: '国家节能补贴',
      },
      {
        priority: 3,
        measure: '变频器改造',
        investment: 20,
        annualSaving: 10,
        annualCarbonReduction: 95,
        paybackPeriod: 2.0,
      },
    ];

    setResult({
      totalEmission,
      intensity,
      environmentalCost: envCost,
      rating,
      uncertainty: {
        mean: intensity,
        stdDev: 0.34,
        confidence90: [intensity - 0.34, intensity + 0.34],
        confidence95: [intensity - 0.52, intensity + 0.52],
      },
      processBreakdown,
      deviceBreakdown,
      optimizationPlan,
    });
    setCurrentStep(2);
  };

  const sankeyData = useMemo(() => {
    if (!result) return { nodes: [], links: [] };
    const nodes = [
      { name: '电网电力', itemStyle: { color: '#0ea5e9' } },
      ...result.processBreakdown.map((p, i) => ({
        name: p.process,
        itemStyle: { color: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#a7f3d0'][i] },
      })),
      { name: '碳排放', itemStyle: { color: '#374151' } },
    ];
    const links = [
      ...result.processBreakdown.map(p => ({
        source: '电网电力',
        target: p.process,
        value: Math.round(p.emission),
      })),
      ...result.processBreakdown.map(p => ({
        source: p.process,
        target: '碳排放',
        value: Math.round(p.emission),
      })),
    ];
    return { nodes, links };
  }, [result]);

  return (
    <div className="space-y-6">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-5 gap-6"
          >
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">设备清单</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-1" /> 导入
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" /> 模板
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={addDevice}>
                    <Plus className="w-4 h-4 mr-1" /> 添加
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 font-medium text-gray-500">工序</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-500">设备名称</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-500">型号</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-500">数量</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-500">功率(kW)</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-500">年限</th>
                      <th className="text-left py-2 px-2 font-medium text-gray-500">老化系数</th>
                      <th className="py-2 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map(device => (
                      <tr key={device.id} className="border-b border-gray-100">
                        <td className="py-2 px-2">
                          <select
                            value={device.process}
                            onChange={e => updateDevice(device.id, 'process', e.target.value)}
                            className="w-24 px-2 py-1 border border-gray-200 rounded text-xs"
                          >
                            {processes.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <input
                            value={device.name}
                            onChange={e => updateDevice(device.id, 'name', e.target.value)}
                            placeholder="设备名称"
                            className="w-24 px-2 py-1 border border-gray-200 rounded text-xs"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            value={device.model}
                            onChange={e => updateDevice(device.id, 'model', e.target.value)}
                            placeholder="型号"
                            className="w-24 px-2 py-1 border border-gray-200 rounded text-xs"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={device.quantity}
                            onChange={e => updateDevice(device.id, 'quantity', Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-200 rounded text-xs"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={device.ratedPower}
                            onChange={e => updateDevice(device.id, 'ratedPower', Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-200 rounded text-xs"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={device.usageYears}
                            onChange={e => updateDevice(device.id, 'usageYears', Number(e.target.value))}
                            className="w-14 px-2 py-1 border border-gray-200 rounded text-xs"
                          />
                        </td>
                        <td className="py-2 px-2 text-xs text-gray-500">{device.agingFactor.toFixed(2)}</td>
                        <td className="py-2 px-2">
                          <button onClick={() => removeDevice(device.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setCurrentStep(1)}>
                  下一步 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-4">设备功率分布</h4>
                <div className="space-y-2">
                  {devices.map(d => (
                    <div key={d.id} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-20 truncate">{d.name || '未命名'}</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${Math.min((d.ratedPower * d.quantity) / 500 * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 w-12 text-right">{d.ratedPower * d.quantity}kW</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="font-semibold text-gray-900 mb-4">工序能耗占比</h4>
                <DonutChart
                  data={processes.map((p, i) => ({
                    name: p,
                    value: [420, 280, 890, 1560, 890][i],
                  }))}
                  height={200}
                />
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6">运行数据填报</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日运行时间 (h)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={opData.dailyRuntime}
                      onChange={e => setOpData({ ...opData, dailyRuntime: Number(e.target.value) })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                    <select
                      value={opData.shiftType}
                      onChange={e => {
                        const shift = shiftOptions.find(s => s.label === e.target.value);
                        setOpData({
                          ...opData,
                          shiftType: e.target.value,
                          dailyRuntime: shift?.hours || opData.dailyRuntime,
                        });
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      {shiftOptions.map((s: { label: string }) => <option key={s.label}>{s.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    负载率: {opData.loadFactor}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opData.loadFactor}
                    onChange={e => setOpData({ ...opData, loadFactor: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">年工作天数</label>
                  <input
                    type="number"
                    value={opData.workDaysPerYear}
                    onChange={e => setOpData({ ...opData, workDaysPerYear: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">区域电网</label>
                  <select
                    value={opData.gridRegion}
                    onChange={e => {
                      const region = e.target.value;
                      setOpData({
                        ...opData,
                        gridRegion: region,
                        gridFactor: gridFactors[region] || 0.5703,
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    {Object.entries(gridFactors).map(([name, factor]) => (
                      <option key={name} value={name}>{name} ({factor} kgCO₂/kWh)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">蒸汽消耗 (t/年, 可选)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">天然气消耗 (m³/年, 可选)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> 上一步
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleCalculate}>
                  <Play className="w-4 h-4 mr-1" /> 开始核算
                </Button>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">实时预览</h4>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">公式</div>
                  <div className="text-sm font-mono text-gray-700">E = Σ(Pi × ti × λi × k_corr)</div>
                </div>
                <PreviewItem label="估算能耗" value={`${Math.round(devices.reduce((s, d) => s + d.ratedPower * d.quantity * opData.dailyRuntime * (opData.loadFactor/100) * d.agingFactor * opData.workDaysPerYear, 0)).toLocaleString()} kWh/年`} />
                <PreviewItem label="估算碳排放" value={`${Math.round(calculateEmission(devices, opData)).toLocaleString()} 吨CO₂e/年`} color="text-emerald-600" />
                <PreviewItem label="环境成本" value={`${calculateEnvironmentalCost(calculateEmission(devices, opData)).toFixed(1)} 万元/年`} color="text-amber-600" />
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">行业对比</span>
                    <span className="text-sm font-medium text-emerald-600">优于平均水平 15%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && result && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: '全厂年碳排放', value: result.totalEmission, unit: '吨CO₂e', decimals: 0, color: 'text-emerald-600' },
                { label: '吨产品碳排放', value: result.intensity, unit: 'tCO₂e/吨', decimals: 2, color: 'text-sky-600' },
                { label: '环境成本', value: result.environmentalCost, unit: '万元/年', decimals: 1, color: 'text-amber-600' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="text-sm text-gray-500 mb-2">{item.label}</div>
                  <div className={`text-3xl font-bold ${item.color}`}>
                    <NumberCounter end={item.value} decimals={item.decimals} duration={2000} />
                  </div>
                  <div className="text-sm text-gray-400">{item.unit}</div>
                </div>
              ))}
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-sm text-gray-500 mb-2">碳效评级</div>
                <CarbonBadge rating={result.rating} size="lg" />
              </div>
            </div>

            {/* Detail Tabs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Tabs defaultValue="process">
                <TabsList className="mb-4">
                  <TabsTrigger value="process">工序级分析</TabsTrigger>
                  <TabsTrigger value="device">设备级分析</TabsTrigger>
                  <TabsTrigger value="uncertainty">不确定性分析</TabsTrigger>
                  <TabsTrigger value="optimization">优化建议</TabsTrigger>
                </TabsList>

                <TabsContent value="process">
                  <div className="h-80">
                    <SankeyChart data={sankeyData} height={320} />
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-4">
                    {result.processBreakdown.map(p => (
                      <div key={p.process} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">{p.process}</div>
                        <div className="text-emerald-600 font-semibold">{Math.round(p.emission)} 吨</div>
                        <div className="text-xs text-gray-500">{p.percentage.toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="device">
                  <div className="space-y-3">
                    {result.deviceBreakdown.map((d, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium w-24">{d.deviceName}</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{Math.round(d.emission)} 吨CO₂e</span>
                            <span>DEA: {(d.deaScore * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${d.deaScore > 0.8 ? 'bg-emerald-500' : d.deaScore > 0.6 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${d.deaScore * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="uncertainty">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {result.uncertainty.mean.toFixed(2)} ± {result.uncertainty.stdDev.toFixed(2)}
                    </div>
                    <div className="text-gray-500 mb-4">tCO₂e/吨 (90%置信度)</div>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500">90% 置信区间</div>
                        <div className="text-lg font-semibold text-emerald-600">
                          [{result.uncertainty.confidence90[0].toFixed(2)}, {result.uncertainty.confidence90[1].toFixed(2)}]
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500">95% 置信区间</div>
                        <div className="text-lg font-semibold text-sky-600">
                          [{result.uncertainty.confidence95[0].toFixed(2)}, {result.uncertainty.confidence95[1].toFixed(2)}]
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="optimization">
                  <div className="space-y-3">
                    {result.optimizationPlan.map(opt => (
                      <div key={opt.priority} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          opt.priority === 1 ? 'bg-emerald-600' : opt.priority === 2 ? 'bg-amber-500' : 'bg-gray-400'
                        }`}>
                          {opt.priority}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium">{opt.measure}</div>
                          <div className="text-sm text-gray-500">
                            投资 {opt.investment}万 · 年节省 {opt.annualSaving}万 · 回收期 {opt.paybackPeriod}年
                          </div>
                        </div>
                        {opt.applicableSubsidy && (
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                            {opt.applicableSubsidy}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" /> 保存并生成报告
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" /> 申请绿色信贷
              </Button>
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" /> 对比历史
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" /> 分享结果
              </Button>
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                <Download className="w-4 h-4 mr-2" /> 重新核算
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PreviewItem({ label, value, color = 'text-gray-900' }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}
