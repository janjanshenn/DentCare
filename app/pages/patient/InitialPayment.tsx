import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../../context/AppContext';
import MobileNav from '../../components/MobileNav';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function InitialPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, addAppointment, addPayment } = useApp();
  const { service, date, time } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'cash' | 'card' | null>(null);
  const [gcashNumber, setGcashNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  if (!service || !date || !time) {
    navigate('/patient/services');
    return null;
  }

  const initialAmount = service.price * 0.5;
  const remainingAmount = service.price * 0.5;

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (paymentMethod === 'gcash' && (!gcashNumber || !referenceNumber)) {
      toast.error('Please provide GCash details');
      return;
    }

    // Create appointment
    const appointmentId = `a${Date.now()}`;
    const appointment = {
      id: appointmentId,
      patientId: currentUser?.id || 'p1',
      patientName: currentUser?.name || 'Patient',
      service: service.name,
      date,
      time,
      status: 'pending' as const
    };

    // Create payment record
    const payment = {
      id: `pay${Date.now()}`,
      appointmentId,
      amount: initialAmount,
      method: paymentMethod,
      status: 'pending' as const,
      date: new Date().toISOString(),
      type: 'initial' as const
    };

    addAppointment(appointment);
    addPayment(payment);

    toast.success('Payment submitted for verification!');
    navigate('/patient/confirmation', {
      state: {
        appointment,
        payment,
        service
      }
    });
  };

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
              <h1 className="text-xl font-bold text-gray-900">Initial Payment</h1>
              <p className="text-sm text-gray-600">50% required to confirm booking</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Payment Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium">₱{service.price.toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-900 font-medium">Initial Payment (50%)</span>
                <span className="text-blue-600 font-bold text-xl">₱{initialAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Remaining Balance</span>
                <span>₱{remainingAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              The remaining balance will be paid after your treatment is completed.
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('gcash')}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                paymentMethod === 'gcash'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                paymentMethod === 'gcash' ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <Smartphone className={`w-6 h-6 ${
                  paymentMethod === 'gcash' ? 'text-white' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">GCash</div>
                <div className="text-sm text-gray-600">Mobile payment</div>
              </div>
              {paymentMethod === 'gcash' && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                paymentMethod === 'card'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                paymentMethod === 'card' ? 'bg-blue-600' : 'bg-purple-100'
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  paymentMethod === 'card' ? 'text-white' : 'text-purple-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard</div>
              </div>
              {paymentMethod === 'card' && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('cash')}
              className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                paymentMethod === 'cash'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                paymentMethod === 'cash' ? 'bg-blue-600' : 'bg-green-100'
              }`}>
                <Wallet className={`w-6 h-6 ${
                  paymentMethod === 'cash' ? 'text-white' : 'text-green-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">Cash</div>
                <div className="text-sm text-gray-600">Pay at clinic</div>
              </div>
              {paymentMethod === 'cash' && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* GCash Details */}
        {paymentMethod === 'gcash' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">GCash Payment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GCash Number
                </label>
                <input
                  type="tel"
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  placeholder="09XX XXX XXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter GCash reference number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  📱 Send ₱{initialAmount.toLocaleString()} to GCash number: <strong>0917-123-4567</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Card Payment (Demo)</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                This is a demo payment interface. In production, this would integrate with a payment gateway.
              </p>
            </div>
          </div>
        )}

        {/* Cash Payment Note */}
        {paymentMethod === 'cash' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cash Payment Instructions</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 mb-2">
                💵 Please pay ₱{initialAmount.toLocaleString()} at the clinic reception before your appointment.
              </p>
              <p className="text-sm text-green-800">
                Our staff will verify your payment and confirm your booking.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handlePayment}
          disabled={!paymentMethod}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {paymentMethod === 'cash' ? 'Submit Booking Request' : 'Submit Payment'}
        </button>
      </div>

      <MobileNav />
    </div>
  );
}
