import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import DentistSidebar from '../../components/DentistSidebar';
import { ArrowLeft, DollarSign, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function GenerateBilling() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const { appointments, services } = useApp();
  
  const appointment = appointments.find(a => a.id === appointmentId);
  const service = services.find(s => s.name === appointment?.service);
  
  const [additionalCharges, setAdditionalCharges] = useState([
    { description: '', amount: 0 }
  ]);

  const addCharge = () => {
    setAdditionalCharges([...additionalCharges, { description: '', amount: 0 }]);
  };

  const removeCharge = (index: number) => {
    setAdditionalCharges(additionalCharges.filter((_, i) => i !== index));
  };

  const updateCharge = (index: number, field: 'description' | 'amount', value: string | number) => {
    const newCharges = [...additionalCharges];
    newCharges[index] = { ...newCharges[index], [field]: value };
    setAdditionalCharges(newCharges);
  };

  const baseAmount = service?.price || 0;
  const additionalTotal = additionalCharges.reduce((sum, charge) => sum + Number(charge.amount || 0), 0);
  const subtotal = baseAmount + additionalTotal;
  const initialPayment = baseAmount * 0.5;
  const remainingBalance = subtotal - initialPayment;

  const handleGenerateBilling = () => {
    toast.success('Billing generated successfully!');
    navigate(`/dentist/final-payment/${appointmentId}`);
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
                <h1 className="text-2xl font-bold text-gray-900">Generate Billing</h1>
                <p className="text-gray-600 mt-1">{appointment.patientName}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            {/* Patient Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Patient Name</div>
                  <div className="font-medium">{appointment.patientName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Patient ID</div>
                  <div className="font-medium">{appointment.patientId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date of Service</div>
                  <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Appointment ID</div>
                  <div className="font-medium">{appointment.id}</div>
                </div>
              </div>
            </div>

            {/* Base Service */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Charges</h2>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{appointment.service}</div>
                  <div className="text-sm text-gray-600">Base service fee</div>
                </div>
                <div className="text-xl font-bold text-blue-600">₱{baseAmount.toLocaleString()}</div>
              </div>
            </div>

            {/* Additional Charges */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Additional Charges</h2>
                <button
                  type="button"
                  onClick={addCharge}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Charge
                </button>
              </div>
              <div className="space-y-3">
                {additionalCharges.map((charge, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={charge.description}
                      onChange={(e) => updateCharge(index, 'description', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description (e.g., Additional materials)"
                    />
                    <div className="relative w-48">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                      <input
                        type="number"
                        value={charge.amount || ''}
                        onChange={(e) => updateCharge(index, 'amount', parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {additionalCharges.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCharge(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-900">
                  <span>Base Service Fee</span>
                  <span>₱{baseAmount.toLocaleString()}</span>
                </div>
                
                {additionalCharges.filter(c => c.description && c.amount > 0).map((charge, index) => (
                  <div key={index} className="flex justify-between text-gray-900">
                    <span>{charge.description}</span>
                    <span>₱{charge.amount.toLocaleString()}</span>
                  </div>
                ))}
                
                {additionalTotal > 0 && (
                  <div className="flex justify-between text-gray-900 pt-3 border-t border-gray-200">
                    <span>Additional Charges Total</span>
                    <span>₱{additionalTotal.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Initial Payment (50%)</span>
                  <span>- ₱{initialPayment.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-2xl font-bold text-blue-600 pt-3 border-t-2 border-gray-200">
                  <span>Remaining Balance</span>
                  <span>₱{remainingBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
              <button
                onClick={handleGenerateBilling}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                Generate Billing
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
