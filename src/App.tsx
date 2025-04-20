import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import BillSummary from './components/BillSummary';
import UsageChart from './components/UsageChart';
import { Appliance } from './types/appliance';

function App() {
  // Load appliances from localStorage or start with empty array
  const [appliances, setAppliances] = useState<Appliance[]>(() => {
    const savedAppliances = localStorage.getItem('appliances');
    return savedAppliances ? JSON.parse(savedAppliances) : [];
  });

  // Save appliances to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
  }, [appliances]);

  // Add a new appliance
  const handleAddAppliance = (appliance: Appliance) => {
    setAppliances([...appliances, appliance]);
  };

  // Delete an appliance
  const handleDeleteAppliance = (id: string) => {
    setAppliances(appliances.filter(appliance => appliance.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 pb-16 pt-2">
        <ApplianceForm onAddAppliance={handleAddAppliance} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BillSummary appliances={appliances} />
          <UsageChart appliances={appliances} />
        </div>
        
        <ApplianceList 
          appliances={appliances} 
          onDeleteAppliance={handleDeleteAppliance} 
        />
      </main>
      
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>© 2025 ElectriBill Calculator • Band A rate: ₦225/kWh</p>
      </footer>
    </div>
  );
}

export default App;