import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, Trash2 } from 'lucide-react';
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

  const handleBandChange = (id: string) => {
    setSelectedBandId(id);
  };

  const handleDownloadPDF = () => {
    // Implementation of handleDownloadPDF function
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                ElectricBill Calculator
              </h1>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Appliance Form */}
          <div className="mb-6 sm:mb-8">
            <ApplianceForm 
              onAddAppliance={handleAddAppliance} 
              selectedBandId={selectedBandId}
              onBandChange={handleBandChange}
            />
          </div>

          {/* Bill Summary and Appliance List Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
            {/* Bill Summary */}
            <div className="order-2 lg:order-1">
              <BillSummary 
                appliances={appliances} 
                selectedBandId={selectedBandId}
                onBandChange={handleBandChange}
              />
            </div>

            {/* Appliance List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 order-1 lg:order-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Your Appliances</h2>
                {appliances.length > 0 && (
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors dark:focus:ring-offset-gray-800 w-full sm:w-auto shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </button>
                )}
              </div>
              {appliances.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No appliances added yet. Add some appliances to see your bill estimate.
                </p>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {appliances.map((appliance, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <h3 className="font-medium text-gray-800 dark:text-white truncate">
                          {appliance.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {appliance.powerWatts}W × {appliance.hoursPerDay}h/day × {appliance.quantity} units
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveAppliance(appliance.id)}
                        className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 -m-1"
                        aria-label={`Remove ${appliance.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Energy Saving Tips */}
          {appliances.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Energy Saving Tips</h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <UsageChart appliances={appliances} />
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p>© 2024 ElectricBill Calculator • {selectedBand.name} rate: ₦{selectedBand.rate}/kWh</p>
        </footer>
      </div>
    </div>
  );
}

export default App;