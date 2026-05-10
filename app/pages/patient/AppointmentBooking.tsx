import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../../context/AppContext';
import MobileNav from '../../components/MobileNav';
import { ArrowLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useApp();
  const service = location.state?.service;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 30 days
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => addDays(today, i + 1));

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate('/patient/payment', {
        state: {
          service,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime
        }
      });
    }
  };

  if (!service) {
    navigate('/patient/services');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Schedule Appointment</h1>
              <p className="text-sm text-gray-600">{service.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Service Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-blue-900">{service.name}</h3>
              <p className="text-sm text-blue-800 mt-1">{service.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-blue-700">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration}
                </span>
                <span className="font-semibold">₱{service.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Select Date */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            Select Date
          </h2>
          
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {dates.map((date, index) => {
              const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              const dayName = format(date, 'EEE');
              const dayNum = format(date, 'd');
              const monthName = format(date, 'MMM');
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg text-center transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-xs mb-1">{dayName}</div>
                  <div className="font-semibold text-lg">{dayNum}</div>
                  <div className="text-[10px] mt-1 font-medium opacity-80">{monthName}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Select Time */}
        {selectedDate && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Select Time
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const isSelected = selectedTime === time;
                
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg text-center transition-all font-medium ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{service.duration}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-gray-900 font-semibold">Total Amount</span>
                <span className="text-blue-600 font-bold text-lg">₱{service.price.toLocaleString()}</span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  💡 Initial payment of 50% (₱{(service.price * 0.5).toLocaleString()}) required to confirm booking
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedDate && selectedTime && (
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            Continue to Payment
          </button>
        )}
      </div>

      <MobileNav />
    </div>
  );
}
