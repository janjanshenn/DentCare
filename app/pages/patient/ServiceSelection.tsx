import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import MobileNav from '../../components/MobileNav';
import { ArrowLeft, Clock, Search } from 'lucide-react';

export default function ServiceSelection() {
  const navigate = useNavigate();
  const { services } = useApp();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleContinue = () => {
    if (selectedService) {
      const service = services.find(s => s.id === selectedService);
      navigate('/patient/booking', { state: { service } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Select Treatment</h1>
              <p className="text-sm text-gray-600">Choose a dental service</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => handleSelectService(service.id)}
              className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left ${
                selectedService === service.id
                  ? 'ring-2 ring-blue-600 shadow-md'
                  : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                {selectedService === service.id && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration}</span>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ₱{service.price.toLocaleString()}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        {selectedService && (
          <div className="fixed bottom-20 md:bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}
