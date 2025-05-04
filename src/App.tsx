import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import ApplianceForm from './components/ApplianceForm';
import ApplianceList from './components/ApplianceList';
import BillSummary from './components/BillSummary';
import UsageChart from './components/UsageChart';
import { Appliance, ElectricityBand } from './types/appliance';
import { ELECTRICITY_BANDS } from './utils/calculations';

function App() {
  const [appliances, setAppliances] = useState<Appliance[]>(() => {
    const saved = localStorage.getItem('appliances');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedBandId, setSelectedBandId] = useState<string>(() => {
    const saved = localStorage.getItem('selectedBandId');
    return saved || ELECTRICITY_BANDS[0].id;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const selectedBand = ELECTRICITY_BANDS.find(band => band.id === selectedBandId)!;

  useEffect(() => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
  }, [appliances]);

  useEffect(() => {
    localStorage.setItem('selectedBandId', selectedBandId);
  }, [selectedBandId]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const handleAddAppliance = (appliance: Appliance) => {
    setAppliances(prev => [...prev, appliance]);
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(prev => prev.filter(appliance => appliance.id !== id));
  };

  const handleUpdateAppliance = (id: string, updatedAppliance: Partial<Appliance>) => {
    setAppliances(prev =>
      prev.map(appliance =>
        appliance.id === id ? { ...appliance, ...updatedAppliance } : appliance
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 pb-16 pt-2">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex-1 mr-4">
            <label htmlFor="band" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Electricity Band
            </label>
            <select
              id="band"
              value={selectedBandId}
              onChange={(e) => setSelectedBandId(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {ELECTRICITY_BANDS.map(band => (
                <option key={band.id} value={band.id}>
                  {band.name} - ₦{band.rate}/kWh
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative group"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-amber-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </span>
          </button>
        </div>

        <ApplianceForm
          onAddAppliance={handleAddAppliance}
          selectedBandId={selectedBandId}
          onBandChange={setSelectedBandId}
        />
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <BillSummary
            appliances={appliances}
            selectedBand={selectedBand}
          />
          <UsageChart appliances={appliances} />
        </div>
        
        <ApplianceList
          appliances={appliances}
          onRemoveAppliance={handleRemoveAppliance}
          onUpdateAppliance={handleUpdateAppliance}
          selectedBand={selectedBand}
        />
      </main>
      
      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© 2025 ElectricBill Calculator By <a href='https://wa.me/2349066730744' className="text-blue-600 dark:text-blue-400 hover:underline">Ibroraheem</a> • {selectedBand.name} rate: ₦{selectedBand.rate}/kWh</p>
      </footer>
    </div>
  );
}

export default App;