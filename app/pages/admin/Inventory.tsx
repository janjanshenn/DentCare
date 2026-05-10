import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { Package, Search, Plus, AlertTriangle } from 'lucide-react';

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryItems = [
    { id: 1, name: 'Dental Gloves (Box)', quantity: 45, unit: 'boxes', reorderLevel: 20, status: 'good' },
    { id: 2, name: 'Face Masks', quantity: 150, unit: 'pcs', reorderLevel: 50, status: 'good' },
    { id: 3, name: 'Anesthetic (Lidocaine)', quantity: 12, unit: 'vials', reorderLevel: 15, status: 'low' },
    { id: 4, name: 'Cotton Rolls', quantity: 200, unit: 'pcs', reorderLevel: 100, status: 'good' },
    { id: 5, name: 'Dental Mirrors', quantity: 30, unit: 'pcs', reorderLevel: 10, status: 'good' },
    { id: 6, name: 'Syringes', quantity: 8, unit: 'pcs', reorderLevel: 20, status: 'critical' },
    { id: 7, name: 'Composite Filling Material', quantity: 15, unit: 'units', reorderLevel: 10, status: 'good' },
    { id: 8, name: 'Dental Burs', quantity: 50, unit: 'pcs', reorderLevel: 30, status: 'good' }
  ];

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      good: 'bg-green-100 text-green-700',
      low: 'bg-yellow-100 text-yellow-700',
      critical: 'bg-red-100 text-red-700'
    };
    return badges[status as keyof typeof badges];
  };

  const getStatusText = (status: string) => {
    const texts = {
      good: 'In Stock',
      low: 'Low Stock',
      critical: 'Critical'
    };
    return texts[status as keyof typeof texts];
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-1">Track and manage dental supplies</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Alerts */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">In Stock</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {inventoryItems.filter(i => i.status === 'good').length}
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-900">Low Stock</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {inventoryItems.filter(i => i.status === 'low').length}
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-900">Critical</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {inventoryItems.filter(i => i.status === 'critical').length}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inventory..."
                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reorder Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{item.quantity}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.unit}</td>
                      <td className="px-6 py-4 text-gray-600">{item.reorderLevel}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
