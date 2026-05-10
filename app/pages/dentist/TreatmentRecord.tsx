import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import DentistSidebar from '../../components/DentistSidebar';
import { ArrowLeft, FileText, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function TreatmentRecord() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const { appointments, addTreatment, updateAppointment } = useApp();
  
  const appointment = appointments.find(a => a.id === appointmentId);
  
  const [formData, setFormData] = useState({
    notes: '',
    procedures: [''],
    medications: [''],
    followUp: ''
  });

  const addProcedure = () => {
    setFormData({ ...formData, procedures: [...formData.procedures, ''] });
  };

  const removeProcedure = (index: number) => {
    setFormData({
      ...formData,
      procedures: formData.procedures.filter((_, i) => i !== index)
    });
  };

  const updateProcedure = (index: number, value: string) => {
    const newProcedures = [...formData.procedures];
    newProcedures[index] = value;
    setFormData({ ...formData, procedures: newProcedures });
  };

  const addMedication = () => {
    setFormData({ ...formData, medications: [...formData.medications, ''] });
  };

  const removeMedication = (index: number) => {
    setFormData({
      ...formData,
      medications: formData.medications.filter((_, i) => i !== index)
    });
  };

  const updateMedication = (index: number, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = value;
    setFormData({ ...formData, medications: newMedications });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const treatment = {
      id: `t${Date.now()}`,
      appointmentId: appointmentId!,
      notes: formData.notes,
      procedures: formData.procedures.filter(p => p.trim() !== ''),
      medications: formData.medications.filter(m => m.trim() !== ''),
      followUp: formData.followUp,
      date: new Date().toISOString()
    };

    addTreatment(treatment);
    updateAppointment(appointmentId!, { status: 'completed' });
    
    toast.success('Treatment recorded successfully!');
    navigate(`/dentist/billing/${appointmentId}`);
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
                <h1 className="text-2xl font-bold text-gray-900">Record Treatment</h1>
                <p className="text-gray-600 mt-1">{appointment.patientName} - {appointment.service}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Patient</div>
                    <div className="font-medium">{appointment.patientName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Service</div>
                    <div className="font-medium">{appointment.service}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Time</div>
                    <div className="font-medium">{appointment.time}</div>
                  </div>
                </div>
              </div>

              {/* Treatment Notes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Treatment Notes</h2>
                <textarea
                  required
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter detailed treatment notes..."
                />
              </div>

              {/* Procedures */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Procedures Performed</h2>
                  <button
                    type="button"
                    onClick={addProcedure}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.procedures.map((procedure, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={procedure}
                        onChange={(e) => updateProcedure(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter procedure..."
                      />
                      {formData.procedures.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProcedure(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Medications Prescribed</h2>
                  <button
                    type="button"
                    onClick={addMedication}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.medications.map((medication, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={medication}
                        onChange={(e) => updateMedication(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter medication and dosage..."
                      />
                      {formData.medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedication(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow-up */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow-up Recommendations</h2>
                <textarea
                  value={formData.followUp}
                  onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter follow-up instructions (optional)..."
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save & Generate Billing
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
