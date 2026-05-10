import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const appointmentData = [
    { name: 'Mon', appointments: 12 },
    { name: 'Tue', appointments: 15 },
    { name: 'Wed', appointments: 10 },
    { name: 'Thu', appointments: 18 },
    { name: 'Fri', appointments: 14 },
    { name: 'Sat', appointments: 8 }
  ];

  const revenueData = [
    { name: 'Week 1', revenue: 45000 },
    { name: 'Week 2', revenue: 52000 },
    { name: 'Week 3', revenue: 48000 },
    { name: 'Week 4', revenue: 58000 }
  ];

  const serviceData = [
    { name: 'General Checkup', value: 35, color: '#3b82f6' },
    { name: 'Cleaning', value: 25, color: '#10b981' },
    { name: 'Extraction', value: 15, color: '#f59e0b' },
    { name: 'Filling', value: 15, color: '#8b5cf6' },
    { name: 'Others', value: 10, color: '#6b7280' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-1">View clinic performance metrics</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Period Selector */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Period:</span>
              <div className="flex gap-2">
                {['daily', 'weekly', 'monthly'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      period === p
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">₱116,000</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-sm text-green-600 font-medium mt-2">+12.5%</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">77</div>
              <div className="text-sm text-gray-600">Total Appointments</div>
              <div className="text-sm text-green-600 font-medium mt-2">+8.3%</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">64</div>
              <div className="text-sm text-gray-600">New Patients</div>
              <div className="text-sm text-green-600 font-medium mt-2">+15.2%</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">92%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
              <div className="text-sm text-green-600 font-medium mt-2">+2.1%</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Appointments Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointments Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Services */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Services</h2>
              <div className="space-y-4">
                {serviceData.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold" style={{ backgroundColor: service.color }}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{service.name}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${service.value}%`, backgroundColor: service.color }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{service.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
