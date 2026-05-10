import { Link } from 'react-router';
import { useApp } from '../../context/AppContext';
import DentistSidebar from '../../components/DentistSidebar';
import { Calendar, Clock, User, FileText } from 'lucide-react';

export default function DentistSchedule() {
  const { appointments, currentUser } = useApp();

  const myAppointments = appointments.filter(
    a => a.dentistId === currentUser?.id && a.status === 'approved'
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const todayAppointments = myAppointments.filter(
    a => a.date === new Date().toISOString().split('T')[0]
  );

  const upcomingAppointments = myAppointments.filter(
    a => new Date(a.date) > new Date()
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DentistSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
            <p className="text-gray-600 mt-1">Welcome, {currentUser?.name}</p>
          </div>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{todayAppointments.length}</div>
                  <div className="text-sm text-gray-600">Today's Appointments</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{upcomingAppointments.length}</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{myAppointments.length}</div>
                  <div className="text-sm text-gray-600">Total Patients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
            
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {appointment.patientName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{appointment.service}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                        <span className="text-xs text-gray-500">ID: {appointment.patientId}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/dentist/treatment/${appointment.id}`}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                      >
                        Record Treatment
                      </Link>
                      <Link
                        to={`/dentist/patients`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        View Record
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{appointment.patientName}</div>
                        <div className="text-sm text-gray-600">{appointment.service}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{new Date(appointment.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">{appointment.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
