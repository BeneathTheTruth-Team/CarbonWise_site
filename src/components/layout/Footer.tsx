import { Leaf, Mail, Linkedin } from 'lucide-react';

export default function Footer() {
  const linkGroups = [
    {
      title: '产品功能',
      links: ['碳核算工作台', '碳效报告中心', '绿色信贷对接', '行业对标分析'],
    },
    {
      title: '解决方案',
      links: ['纺织企业', '金融机构', '品牌采购商', '产业园区'],
    },
    {
      title: '资源中心',
      links: ['碳核算指南', '政策解读', '行业白皮书', 'API文档'],
    },
    {
      title: '关于我们',
      links: ['公司介绍', '团队', '联系我们', '加入我们'],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-500" />
            <span className="text-white font-medium">碳智评 CarbonWise</span>
            <span className="text-gray-500 text-sm ml-2">© 2026</span>
          </div>
          <div className="text-gray-500 text-sm">京ICP备XXXXXXXX号</div>
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
