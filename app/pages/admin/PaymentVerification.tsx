import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AdminSidebar from '../../components/AdminSidebar';
import { CreditCard, CheckCircle, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentVerification() {
  const { payments, updatePayment, appointments } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const pendingPayments = payments.filter(p => p.status === 'pending');

  const getAppointmentDetails = (appointmentId: string) => {
    return appointments.find(a => a.id === appointmentId);
  };

  const handleVerify = (paymentId: string) => {
    updatePayment(paymentId, { status: 'verified' });
    toast.success('Payment verified successfully!');
  };

  const handleReject = (paymentId: string) => {
    toast.error('Payment rejected');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>
            <p className="text-gray-600 mt-1">Review and verify patient payments</p>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search payments..."
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {pendingPayments.map((payment) => {
              const appointment = getAppointmentDetails(payment.appointmentId);
              
              return (
                <div key={payment.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment?.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment?.service}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-gray-600">Amount: <strong>₱{payment.amount.toLocaleString()}</strong></span>
                          <span className="text-gray-600">Method: <strong className="uppercase">{payment.method}</strong></span>
                          <span className="text-gray-600">Type: <strong className="capitalize">{payment.type}</strong></span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleVerify(payment.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Verify Payment
                    </button>
                    <button
                      onClick={() => handleReject(payment.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
            
            {pendingPayments.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending payments</h3>
                <p className="text-gray-600">All payments have been verified</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
