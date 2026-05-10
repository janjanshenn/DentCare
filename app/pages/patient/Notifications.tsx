import { Link } from 'react-router';
import MobileNav from '../../components/MobileNav';
import { ArrowLeft, Bell, Calendar, CheckCircle, Clock, CreditCard } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'Appointment Confirmed',
      message: 'Your appointment for General Checkup on April 10, 2026 at 10:00 AM has been confirmed.',
      time: '2 hours ago',
      color: 'green'
    },
    {
      id: 2,
      type: 'warning',
      icon: Clock,
      title: 'Upcoming Appointment',
      message: 'Reminder: You have an appointment tomorrow at 10:00 AM. Please arrive 10 minutes early.',
      time: '5 hours ago',
      color: 'yellow'
    },
    {
      id: 3,
      type: 'info',
      icon: CreditCard,
      title: 'Payment Verified',
      message: 'Your initial payment of ₱750 has been verified. Your booking is now confirmed.',
      time: '1 day ago',
      color: 'blue'
    },
    {
      id: 4,
      type: 'info',
      icon: Calendar,
      title: 'Appointment Requested',
      message: 'Your appointment request has been received and is being processed.',
      time: '2 days ago',
      color: 'purple'
    },
    {
      id: 5,
      type: 'success',
      icon: Bell,
      title: 'Welcome to DentCare',
      message: 'Thank you for choosing DentCare. Book your first appointment to get started!',
      time: '3 days ago',
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/patient/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">{notifications.length} unread</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Mark all read
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            
            return (
              <div
                key={notification.id}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(notification.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (hidden when there are notifications) */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600 mb-6">
              You'll receive updates about your appointments here
            </p>
            <Link
              to="/patient/services"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}
