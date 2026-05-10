import { Link } from 'react-router';
import { Calendar, Shield, Clock, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/dentcare.png" alt="DentCare Logo" className="w-8 h-8 object-contain" />
              <h1 className="text-2xl font-bold text-blue-600">DentCare</h1>
            </div>
            <div className="flex gap-4">
              <Link
                to="/patient/login"
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Patient Login
              </Link>
              <Link
                to="/admin/login"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Your Smile, Our Priority
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience modern dental care with easy online booking, professional treatment,
            and comprehensive patient management.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/patient/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book Appointment
            </Link>
            <Link
              to="/patient/services"
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">
              Schedule appointments online 24/7 with real-time availability
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">
              Multiple payment options with secure transaction processing
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quick Service</h3>
            <p className="text-gray-600 text-sm">
              Minimal wait times with efficient appointment management
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Expert Care</h3>
            <p className="text-gray-600 text-sm">
              Professional dentists with years of experience
            </p>
          </div>
        </div>
      </section>

      {/* Access Portals */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Access Your Portal</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              to="/patient/login"
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Patient Portal</h4>
                <p className="text-gray-600 mb-4">
                  Book appointments, view records, and manage your dental care
                </p>
                <span className="text-blue-600 font-medium">Login →</span>
              </div>
            </Link>
            <Link
              to="/admin/login"
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Admin Portal</h4>
                <p className="text-gray-600 mb-4">
                  Manage appointments, verify payments, and oversee operations
                </p>
                <span className="text-blue-600 font-medium">Login →</span>
              </div>
            </Link>
            <Link
              to="/dentist/login"
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">Dentist Portal</h4>
                <p className="text-gray-600 mb-4">
                  View schedule, record treatments, and manage patient care
                </p>
                <span className="text-blue-600 font-medium">Login →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">DentCare</h2>
          <p className="text-gray-400">Dental Clinic Management System</p>
          <p className="text-gray-500 text-sm mt-4">© 2026 DentCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
