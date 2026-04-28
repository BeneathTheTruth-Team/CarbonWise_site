import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '功能', path: '/#features' },
  { label: '定价', path: '/pricing' },
  { label: '案例', path: '/cases' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">
              碳智评 <span className="text-emerald-600">CarbonWise</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              onClick={() => navigate('/login')}
            >
              登录
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => navigate('/register')}
            >
              免费试用
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2 text-gray-600 hover:text-emerald-600"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3">
            <Button
              variant="outline"
              className="flex-1 border-emerald-600 text-emerald-600"
              onClick={() => { navigate('/login'); setMobileOpen(false); }}
            >
              登录
            </Button>
            <Button
              className="flex-1 bg-emerald-600 text-white"
              onClick={() => { navigate('/register'); setMobileOpen(false); }}
            >
              免费试用
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
