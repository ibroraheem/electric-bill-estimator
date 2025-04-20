import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import BillSummary from './components/BillSummary';
import UsageChart from './components/UsageChart';
import { Appliance } from './types/appliance';
import { ELECTRICITY_BANDS } from './utils/calculations';

function App() {
  // Load appliances from localStorage or start with empty array
  const [appliances, setAppliances] = useState<Appliance[]>(() => {
    const savedAppliances = localStorage.getItem('appliances');
    return savedAppliances ? JSON.parse(savedAppliances) : [];
  });

  // Load selected band from localStorage or default to Band A
  const [selectedBandId, setSelectedBandId] = useState(() => {
    const savedBand = localStorage.getItem('selectedBand');
    return savedBand || 'a';
  });

  // Save appliances to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
  }, [appliances]);

  // Save selected band to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedBand', selectedBandId);
  }, [selectedBandId]);

  // Add a new appliance
  const handleAddAppliance = (appliance: Appliance) => {
    setAppliances([...appliances, appliance]);
  };

  // Delete an appliance
  const handleDeleteAppliance = (id: string) => {
    setAppliances(appliances.filter(appliance => appliance.id !== id));
  };

  const selectedBand = ELECTRICITY_BANDS.find(band => band.id === selectedBandId)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 pb-16 pt-2">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="band" className="block text-sm font-medium text-gray-700 mb-2">
            Select Electricity Band
          </label>
          <select
            id="band"
            value={selectedBandId}
            onChange={(e) => setSelectedBandId(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ELECTRICITY_BANDS.map(band => (
              <option key={band.id} value={band.id}>
                {band.name} - ₦{band.rate}/kWh
              </option>
            ))}
          </select>
        </div>

        <ApplianceForm onAddAppliance={handleAddAppliance} />
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <BillSummary appliances={appliances} rate={selectedBand.rate} bandName={selectedBand.name} />
          <UsageChart appliances={appliances} />
        </div>
        
        <ApplianceList 
          appliances={appliances} 
          onDeleteAppliance={handleDeleteAppliance}
          rate={selectedBand.rate}
        />
      </main>
      
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>© 2025 ElectricBill Calculator By <a href='https://wa.me/2349066730744'>Ibroraheem</a> • {selectedBand.name} rate: ₦{selectedBand.rate}/kWh</p>
      </footer>
    </div>
  );
}

export default App;