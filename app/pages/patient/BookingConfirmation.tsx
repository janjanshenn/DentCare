import { Link, useLocation } from 'react-router';
import MobileNav from '../../components/MobileNav';
import { CheckCircle, Calendar, Clock, CreditCard, Home } from 'lucide-react';

export default function BookingConfirmation() {
  const location = useLocation();
  const { appointment, payment, service } = location.state || {};

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking information found</p>
          <Link to="/patient/dashboard" className="text-blue-600 hover:text-blue-700">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Submitted!</h1>
          <p className="text-gray-600">
            Your appointment request has been received and is pending verification.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Service</div>
                <div className="font-semibold text-gray-900">{appointment.service}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Date & Time</div>
                <div className="font-semibold text-gray-900">
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-sm text-gray-600 mt-1">{appointment.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Payment Status</div>
                <div className="font-semibold text-yellow-600">Pending Verification</div>
                <div className="text-sm text-gray-600 mt-1">
                  Initial Payment: ₱{payment?.amount.toLocaleString()} ({payment?.method.toUpperCase()})
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📋 Booking Reference</h3>
              <div className="text-2xl font-mono font-bold text-blue-600">{appointment.id.toUpperCase()}</div>
              <p className="text-sm text-blue-800 mt-2">
                Save this reference number for your records
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                1
              </div>
              <div>
                <div className="font-medium text-gray-900">Payment Verification</div>
                <div className="text-sm text-gray-600">
                  Our staff will verify your payment within 1-2 hours
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                2
              </div>
              <div>
                <div className="font-medium text-gray-900">Appointment Confirmation</div>
                <div className="text-sm text-gray-600">
                  You'll receive a notification once your appointment is confirmed
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                3
              </div>
              <div>
                <div className="font-medium text-gray-900">Visit the Clinic</div>
                <div className="text-sm text-gray-600">
                  Arrive 10 minutes early with your booking reference
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">⏰ Reminder</h3>
          <p className="text-sm text-yellow-800">
            You will receive notifications about your appointment status. Make sure to check your notifications regularly.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to="/patient/dashboard"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </Link>
          <Link
            to="/patient/notifications"
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
          >
            View Notifications
          </Link>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
