import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';

// Patient Routes
import AppointmentBooking from './pages/patient/AppointmentBooking';
import BookingConfirmation from './pages/patient/BookingConfirmation';
import HealthForm from './pages/patient/HealthForm';
import InitialPayment from './pages/patient/InitialPayment';
import Notifications from './pages/patient/Notifications';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientLogin from './pages/patient/PatientLogin';
import PaymentHistory from './pages/patient/PaymentHistory';
import ServiceSelection from './pages/patient/ServiceSelection';

// Admin Routes
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import Inventory from './pages/admin/Inventory';
import PatientRecords from './pages/admin/PatientRecords';
import PaymentVerification from './pages/admin/PaymentVerification';
import Reports from './pages/admin/Reports';

// Dentist Routes
import DentistLogin from './pages/dentist/DentistLogin';
import DentistPatientRecords from './pages/dentist/DentistPatientRecords';
import DentistSchedule from './pages/dentist/DentistSchedule';
import FinalPayment from './pages/dentist/FinalPayment';
import GenerateBilling from './pages/dentist/GenerateBilling';
import TreatmentRecord from './pages/dentist/TreatmentRecord';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage
  },
  {
    path: '/patient/login',
    Component: PatientLogin
  },
  {
    path: '/patient/dashboard',
    Component: PatientDashboard
  },
  {
    path: '/patient/health-form',
    Component: HealthForm
  },
  {
    path: '/patient/services',
    Component: ServiceSelection
  },
  {
    path: '/patient/booking',
    Component: AppointmentBooking
  },
  {
    path: '/patient/payment',
    Component: InitialPayment
  },
  {
    path: '/patient/confirmation',
    Component: BookingConfirmation
  },
  {
    path: '/patient/payments',
    Component: PaymentHistory
  },
  {
    path: '/patient/notifications',
    Component: Notifications
  },
  // Admin Routes
  {
    path: '/admin/login',
    Component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboard
  },
  {
    path: '/admin/appointments',
    Component: AppointmentManagement
  },
  {
    path: '/admin/payments',
    Component: PaymentVerification
  },
  {
    path: '/admin/patients',
    Component: PatientRecords
  },
  {
    path: '/admin/inventory',
    Component: Inventory
  },
  {
    path: '/admin/reports',
    Component: Reports
  },
  // Dentist Routes
  {
    path: '/dentist/login',
    Component: DentistLogin
  },
  {
    path: '/dentist/schedule',
    Component: DentistSchedule
  },
  {
    path: '/dentist/patients',
    Component: DentistPatientRecords
  },
  {
    path: '/dentist/treatment/:appointmentId',
    Component: TreatmentRecord
  },
  {
    path: '/dentist/billing/:appointmentId',
    Component: GenerateBilling
  },
  {
    path: '/dentist/final-payment/:appointmentId',
    Component: FinalPayment
  }
]);
