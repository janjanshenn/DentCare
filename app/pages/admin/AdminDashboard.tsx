import { Link } from 'react-router';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/AdminSidebar';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const { appointments, patients, payments } = useApp();

  // Calculate stats
  const totalPatients = patients.length;
  const todayAppointments = appointments.filter(
    a => a.date === new Date().toISOString().split('T')[0]
  ).length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', appointments: 12, revenue: 18000 },
    { day: 'Tue', appointments: 15, revenue: 22500 },
    { day: 'Wed', appointments: 10, revenue: 15000 },
    { day: 'Thu', appointments: 18, revenue: 27000 },
    { day: 'Fri', appointments: 14, revenue: 21000 },
    { day: 'Sat', appointments: 8, revenue: 12000 }
  ];

  const stats = [
    {
      label: 'Total Patients',
      value: totalPatients,
      icon: Users,
      color: 'blue',
      change: '+12%'
    },
    {
      label: "Today's Appointments",
      value: todayAppointments,
      icon: Calendar,
      color: 'green',
      change: '+5%'
    },
    {
      label: 'Pending Requests',
      value: pendingAppointments,
      icon: Clock,
      color: 'yellow',
      change: '-3%'
    },
    {
      label: 'Revenue (This Month)',
      value: `₱${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'purple',
      change: '+18%'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Admin</p>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Appointments Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Appointments</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Appointments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
                <Link to="/admin/appointments" className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      appointment.status === 'approved' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {appointment.status === 'approved' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{appointment.patientName}</div>
                      <div className="text-sm text-gray-600">{appointment.service}</div>
                    </div>
                    <div className="text-sm text-gray-500">{appointment.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link
                  to="/admin/appointments"
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Manage Appointments</div>
                    <div className="text-sm text-gray-600">{pendingAppointments} pending requests</div>
                  </div>
                </Link>

                <Link
                  to="/admin/payments"
                  className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Verify Payments</div>
                    <div className="text-sm text-gray-600">Check pending payments</div>
                  </div>
                </Link>

                <Link
                  to="/admin/patients"
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">Patient Records</div>
                    <div className="text-sm text-gray-600">{totalPatients} total patients</div>
                  </div>
                </Link>

                <Link
                  to="/admin/reports"
                  className="flex items-center gap-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-gray-900">View Reports</div>
                    <div className="text-sm text-gray-600">Analytics and insights</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
