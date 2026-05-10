import { Link, useLocation } from 'react-router';
import { Home, Calendar, Bell, User } from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/patient/dashboard' },
    { icon: Calendar, label: 'Book', path: '/patient/services' },
    { icon: Bell, label: 'Alerts', path: '/patient/notifications' },
    { icon: User, label: 'Profile', path: '/patient/health-form' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
