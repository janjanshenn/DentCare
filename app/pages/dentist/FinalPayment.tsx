import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import DentistSidebar from '../../components/DentistSidebar';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { toast } from 'sonner';

export default function FinalPayment() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const { appointments, services, addPayment } = useApp();
  
  const appointment = appointments.find(a => a.id === appointmentId);
  const service = services.find(s => s.name === appointment?.service);
  
  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'cash' | 'card' | null>(null);
  const [paymentReceived, setPaymentReceived] = useState(false);

  const baseAmount = service?.price || 0;
  const initialPayment = baseAmount * 0.5;
  const remainingBalance = baseAmount - initialPayment;

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    const payment = {
      id: `pay${Date.now()}`,
      appointmentId: appointmentId!,
      amount: remainingBalance,
      method: paymentMethod,
      status: 'completed' as const,
      date: new Date().toISOString(),
      type: 'final' as const
    };

    addPayment(payment);
    setPaymentReceived(true);
    toast.success('Payment confirmed successfully!');
  };

  if (!appointment) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DentistSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Appointment not found</p>
            <button
              onClick={() => navigate('/dentist/schedule')}
              className="text-blue-600 hover:text-blue-700"
            >
              Back to Schedule
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (paymentReceived) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DentistSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="min-h-full flex items-center justify-center p-8">
            <div className="max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Complete!</h1>
              <p className="text-gray-600 mb-8">
                Final payment of ₱{remainingBalance.toLocaleString()} has been received and recorded.
              </p>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient</span>
                    <span className="font-medium">{appointment.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="font-medium">{appointment.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium uppercase">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="font-semibold">Amount Paid</span>
                    <span className="font-bold text-green-600">₱{remainingBalance.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/dentist/schedule')}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Back to Schedule
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DentistSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Collect Final Payment</h1>
                <p className="text-gray-600 mt-1">{appointment.patientName}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Service Cost</span>
                  <span className="font-medium">₱{baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Initial Payment (50%)</span>
                  <span className="font-medium">₱{initialPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-blue-600 pt-3 border-t-2 border-gray-200">
                  <span>Amount Due</span>
                  <span>₱{remainingBalance.toLocaleString()}</span>
                </div>
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
                    <div className="text-sm text-gray-600">Cash payment</div>
                  </div>
                  {paymentMethod === 'cash' && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={!paymentMethod}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Confirm Payment Received
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
