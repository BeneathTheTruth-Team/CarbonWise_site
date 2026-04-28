import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: '仪表盘', path: '/dashboard' },
  { icon: Calculator, label: '碳核算', path: '/calculator' },
  { icon: FileText, label: '报告中心', path: '/reports' },
  { icon: BarChart3, label: '行业对标', path: '/dashboard' },
  { icon: CreditCard, label: '绿色信贷', path: '/dashboard' },
  { icon: Settings, label: '系统设置', path: '/dashboard' },
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <Leaf className="w-7 h-7 text-emerald-600 flex-shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold text-gray-900 truncate">
              碳智评
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path + item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600 border-l-3 border-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
