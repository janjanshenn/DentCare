import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DentistSidebar from '../../components/DentistSidebar';
import { Users, Search, FileText, Heart } from 'lucide-react';

export default function DentistPatientRecords() {
  const { patients, appointments, treatments } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPatientTreatments = (patientId: string) => {
    return treatments.filter(t => {
      const appointment = appointments.find(a => a.id === t.appointmentId);
      return appointment?.patientId === patientId;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DentistSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
            <p className="text-gray-600 mt-1">View patient information and treatment history</p>
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
                placeholder="Search patients..."
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredPatients.map((patient) => {
              const patientTreatments = getPatientTreatments(patient.id);
              
              return (
                <div key={patient.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-600">{patient.email}</p>
                        <p className="text-sm text-gray-600">{patient.phone}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Age:</span>
                      <span className="text-gray-900">
                        {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Treatments:</span>
                      <span className="text-gray-900">{patientTreatments.length}</span>
                    </div>
                  </div>

                  {patient.medicalHistory.allergies.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-red-600 mb-1">
                        <Heart className="w-3 h-3" />
                        <span className="font-medium">Allergies:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {patient.medicalHistory.allergies.map((allergy, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredPatients.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Patient Record</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Full Name</div>
                      <div className="font-medium">{selectedPatient.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium">{selectedPatient.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium">{selectedPatient.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Date of Birth</div>
                      <div className="font-medium">{new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Medical History</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Allergies</div>
                      <div className="font-medium text-red-600">
                        {selectedPatient.medicalHistory.allergies.length > 0
                          ? selectedPatient.medicalHistory.allergies.join(', ')
                          : 'None'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Current Medications</div>
                      <div className="font-medium">
                        {selectedPatient.medicalHistory.medications.length > 0
                          ? selectedPatient.medicalHistory.medications.join(', ')
                          : 'None'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Medical Conditions</div>
                      <div className="font-medium">
                        {selectedPatient.medicalHistory.conditions.length > 0
                          ? selectedPatient.medicalHistory.conditions.join(', ')
                          : 'None'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Treatment History</h3>
                  {getPatientTreatments(selectedPatient.id).length > 0 ? (
                    <div className="space-y-2">
                      {getPatientTreatments(selectedPatient.id).map((treatment) => (
                        <div key={treatment.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(treatment.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600">{treatment.notes}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No treatment history</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
