import { useNavigate } from 'react-router';
import MobileNav from '../../components/MobileNav';
import { ArrowLeft, Receipt, CheckCircle, Clock } from 'lucide-react';

export default function PaymentHistory() {
  const navigate = useNavigate();

  const mockPayments = [
    {
      id: 'PAY-1029',
      date: '2026-04-15',
      service: 'Teeth Cleaning',
      amount: 2000,
      type: 'Full Payment',
      status: 'completed',
      method: 'GCash'
    },
    {
      id: 'PAY-1028',
      date: '2026-03-10',
      service: 'Tooth Extraction',
      amount: 1750,
      type: 'Initial Deposit',
      status: 'completed',
      method: 'Card'
    },
    {
      id: 'PAY-1027',
      date: '2026-03-10',
      service: 'Tooth Extraction',
      amount: 1750,
      type: 'Final Payment',
      status: 'completed',
      method: 'Cash'
    },
    {
      id: 'PAY-1035',
      date: '2026-05-05',
      service: 'Dental Filling',
      amount: 1250,
      type: 'Initial Deposit',
      status: 'pending',
      method: 'GCash'
    }
  ];

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
              <h1 className="text-xl font-bold text-gray-900">Payment History</h1>
              <p className="text-sm text-gray-600">Your recent transactions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <div key={payment.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{payment.service}</h3>
                    <p className="text-sm text-gray-500">{payment.id} • {payment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900">₱{payment.amount.toLocaleString()}</span>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {payment.status === 'completed' ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Clock className="w-3 h-3 text-yellow-500" />
                    )}
                    <span className={`text-xs font-medium capitalize ${
                      payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-3 text-sm text-gray-500">
                <span>{new Date(payment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1">Paid via {payment.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
