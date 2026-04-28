import { Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const pageTitles: Record<string, string> = {
  '/dashboard': '仪表盘',
  '/calculator': '碳核算工作台',
  '/reports': '碳效报告中心',
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || '碳智评';

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 left-64 z-30 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索..."
            className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarFallback className="bg-emerald-100 text-emerald-700">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
