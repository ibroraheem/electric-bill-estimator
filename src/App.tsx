import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
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

  // Load dark mode preference from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return savedMode === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Save appliances to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appliances', JSON.stringify(appliances));
  }, [appliances]);

  // Save selected band to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedBand', selectedBandId);
  }, [selectedBandId]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-amber-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <ApplianceForm onAddAppliance={handleAddAppliance} selectedBandId={selectedBandId} />
        
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
      
      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© 2025 ElectricBill Calculator By <a href='https://wa.me/2349066730744' className="text-blue-600 dark:text-blue-400 hover:underline">Ibroraheem</a> • {selectedBand.name} rate: ₦{selectedBand.rate}/kWh</p>
      </footer>
    </div>
  );
}

export default App;