import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  medicalHistory: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  dentistId?: string;
  dentistName?: string;
  initialPayment?: Payment;
  finalPayment?: Payment;
  treatment?: Treatment;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  method: 'gcash' | 'cash' | 'card';
  status: 'pending' | 'verified' | 'completed';
  date: string;
  type: 'initial' | 'final';
}

export interface Treatment {
  id: string;
  appointmentId: string;
  notes: string;
  procedures: string[];
  medications: string[];
  followUp?: string;
  date: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface AppContextType {
  // User
  currentUser: { id: string; name: string; role: 'patient' | 'admin' | 'dentist' } | null;
  setCurrentUser: (user: any) => void;
  
  // Patients
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  
  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  
  // Payments
  payments: Payment[];
  addPayment: (payment: Payment) => void;
  updatePayment: (id: string, updates: Partial<Payment>) => void;
  
  // Services
  services: Service[];
  
  // Treatments
  treatments: Treatment[];
  addTreatment: (treatment: Treatment) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialServices: Service[] = [
  {
    id: '1',
    name: 'General Checkup',
    description: 'Comprehensive oral examination and cleaning',
    price: 1500,
    duration: '30 mins'
  },
  {
    id: '2',
    name: 'Teeth Cleaning',
    description: 'Professional cleaning and polishing',
    price: 2000,
    duration: '45 mins'
  },
  {
    id: '3',
    name: 'Tooth Extraction',
    description: 'Safe removal of damaged teeth',
    price: 3500,
    duration: '1 hour'
  },
  {
    id: '4',
    name: 'Dental Filling',
    description: 'Cavity treatment with composite filling',
    price: 2500,
    duration: '45 mins'
  },
  {
    id: '5',
    name: 'Root Canal',
    description: 'Advanced endodontic treatment',
    price: 8000,
    duration: '1.5 hours'
  },
  {
    id: '6',
    name: 'Teeth Whitening',
    description: 'Professional bleaching treatment',
    price: 5000,
    duration: '1 hour'
  },
  {
    id: '7',
    name: 'Braces Consultation',
    description: 'Orthodontic assessment and planning',
    price: 1000,
    duration: '30 mins'
  },
  {
    id: '8',
    name: 'Dental Crown',
    description: 'Custom tooth restoration',
    price: 10000,
    duration: '2 hours'
  }
];

const initialPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '09171234567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, Manila',
    medicalHistory: {
      allergies: ['Penicillin'],
      medications: ['Aspirin'],
      conditions: ['Hypertension']
    }
  },
  {
    id: 'p2',
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '09187654321',
    dateOfBirth: '1985-08-20',
    address: '456 Oak Ave, Quezon City',
    medicalHistory: {
      allergies: [],
      medications: [],
      conditions: []
    }
  }
];

const initialAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Maria Santos',
    service: 'General Checkup',
    date: '2026-04-10',
    time: '10:00 AM',
    status: 'approved',
    dentistId: 'd1',
    dentistName: 'Dr. Rodriguez'
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Juan Dela Cruz',
    service: 'Teeth Cleaning',
    date: '2026-04-08',
    time: '2:00 PM',
    status: 'pending'
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [services] = useState<Service[]>(initialServices);

  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(patients.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const addPayment = (payment: Payment) => {
    setPayments([...payments, payment]);
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setPayments(payments.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addTreatment = (treatment: Treatment) => {
    setTreatments([...treatments, treatment]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        patients,
        addPatient,
        updatePatient,
        appointments,
        addAppointment,
        updateAppointment,
        payments,
        addPayment,
        updatePayment,
        services,
        treatments,
        addTreatment
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
