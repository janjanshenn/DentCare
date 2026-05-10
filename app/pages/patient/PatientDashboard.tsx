import { Link, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import MobileNav from '../../components/MobileNav';
import { Calendar, FileText, Bell, CreditCard, Clock, MapPin, LogOut } from 'lucide-react';

export default function PatientDashboard() {
  const { currentUser, appointments, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };
  
  const upcomingAppointments = appointments.filter(
    a => a.status === 'approved' && new Date(a.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const quickActions = [
    {
      icon: Calendar,
      label: 'Book Appointment',
      path: '/patient/services',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FileText,
      label: 'Health Form',
      path: '/patient/health-form',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: CreditCard,
      label: 'Payments',
      path: '/patient/payments',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">DentCare</h1>
              <p className="text-sm text-gray-600">Welcome, {currentUser?.name || 'Patient'}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/patient/notifications"
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.path}
                  to={action.path}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center w-44"
                >
                  <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-base font-semibold text-gray-900">{action.label}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link to="/patient/services" className="text-sm text-blue-600 hover:text-blue-700">
              Book New
            </Link>
          </div>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        with {appointment.dentistName || 'Dr. Rodriguez'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'approved' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appointment.status === 'approved' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No upcoming appointments</p>
              <Link
                to="/patient/services"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          )}
        </section>

        {/* Health Tips */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Tips</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2">🦷 Brush Twice Daily</h3>
              <p className="text-sm text-blue-800">
                Brush for 2 minutes, twice a day with fluoride toothpaste
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-green-900 mb-2">🧵 Floss Daily</h3>
              <p className="text-sm text-green-800">
                Regular flossing prevents gum disease and tooth decay
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="font-semibold text-purple-900 mb-2">📅 Regular Checkups</h3>
              <p className="text-sm text-purple-800">
                Visit your dentist every 6 months for preventive care
              </p>
            </div>
          </div>
        </section>
      </div>

      <MobileNav />
    </div>
  );
}
