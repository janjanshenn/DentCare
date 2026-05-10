import { Link, useLocation } from 'react-router';
import { 
  Calendar, 
  Users, 
  FileText, 
  DollarSign,
  LogOut
} from 'lucide-react';

export default function DentistSidebar() {
  const location = useLocation();
  
  const navItems = [
    { icon: Calendar, label: 'My Schedule', path: '/dentist/schedule' },
    { icon: Users, label: 'Patient Records', path: '/dentist/patients' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">DentCare</h1>
        <p className="text-sm text-gray-500 mt-1">Dentist Portal</p>
      </div>
      
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/dentist/login"
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
