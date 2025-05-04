import React, { useState } from 'react';
import { Zap, Plus, Info } from 'lucide-react';
import { Appliance, StandardAppliance } from '../types/appliance';
import { STANDARD_APPLIANCES, ELECTRICITY_BANDS } from '../utils/calculations';

interface ApplianceFormProps {
  onAddAppliance: (appliance: Appliance) => void;
  selectedBandId: string;
}

// Common combinations of appliances
const QUICK_ADD_COMBINATIONS = [
  {
    name: 'Basic Home Setup',
    appliances: [
      { name: 'LED TV (32")', powerWatts: 50, hoursPerDay: 4, quantity: 1 },
      { name: 'Ceiling Fan', powerWatts: 75, hoursPerDay: 8, quantity: 2 },
      { name: 'LED Bulb', powerWatts: 9, hoursPerDay: 6, quantity: 4 },
      { name: 'Refrigerator', powerWatts: 150, hoursPerDay: 24, quantity: 1 }
    ]
  },
  {
    name: 'Home Office Setup',
    appliances: [
      { name: 'Laptop Computer', powerWatts: 65, hoursPerDay: 8, quantity: 1 },
      { name: 'LED Bulb', powerWatts: 9, hoursPerDay: 8, quantity: 2 },
      { name: 'Ceiling Fan', powerWatts: 75, hoursPerDay: 8, quantity: 1 }
    ]
  },
  {
    name: 'Entertainment Setup',
    appliances: [
      { name: 'LED TV (32")', powerWatts: 50, hoursPerDay: 6, quantity: 1 },
      { name: 'LED Bulb', powerWatts: 9, hoursPerDay: 4, quantity: 2 },
      { name: 'Ceiling Fan', powerWatts: 75, hoursPerDay: 6, quantity: 1 }
    ]
  }
];

const ApplianceForm: React.FC<ApplianceFormProps> = ({ onAddAppliance, selectedBandId }) => {
  const [name, setName] = useState('');
  const [powerWatts, setPowerWatts] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const selectedBand = ELECTRICITY_BANDS.find(band => band.id === selectedBandId)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter an appliance name');
      return;
    }
    
    if (!powerWatts || parseFloat(powerWatts) <= 0) {
      setError('Please enter a valid power rating');
      return;
    }
    
    const hours = parseFloat(hoursPerDay);
    if (!hoursPerDay || hours <= 0 || hours > selectedBand.maxHours) {
      setError(`Hours must be between 1 and ${selectedBand.maxHours} for ${selectedBand.name}`);
      return;
    }
    
    if (!quantity || parseInt(quantity) <= 0) {
      setError('Quantity must be at least 1');
      return;
    }
    
    // Create new appliance
    const newAppliance: Appliance = {
      id: Date.now().toString(),
      name: name.trim(),
      powerWatts: parseFloat(powerWatts),
      hoursPerDay: hours,
      quantity: parseInt(quantity)
    };
    
    // Add appliance and reset form
    onAddAppliance(newAppliance);
    setName('');
    setPowerWatts('');
    setHoursPerDay('');
    setQuantity('1');
    setError('');
  };

  const handleStandardApplianceSelect = (appliance: StandardAppliance) => {
    setName(appliance.name);
    setPowerWatts(appliance.powerWatts.toString());
  };

  const handleQuickAdd = (combination: typeof QUICK_ADD_COMBINATIONS[0]) => {
    combination.appliances.forEach(appliance => {
      const newAppliance: Appliance = {
        id: Date.now().toString() + Math.random(),
        ...appliance
      };
      onAddAppliance(newAppliance);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
        <Zap className="mr-2 text-amber-500" size={20} />
        Add Appliance
      </h2>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <label htmlFor="standardAppliance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select from Common Appliances
          </label>
          <div className="relative ml-2">
            <Info
              size={16}
              className="text-gray-400 cursor-help"
              onMouseEnter={() => setShowTooltip('standard')}
              onMouseLeave={() => setShowTooltip(null)}
            />
            {showTooltip === 'standard' && (
              <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6">
                Choose from our list of common appliances with pre-configured power ratings
              </div>
            )}
          </div>
        </div>
        <select
          id="standardAppliance"
          onChange={(e) => {
            const selected = STANDARD_APPLIANCES.find(a => a.id === e.target.value);
            if (selected) handleStandardApplianceSelect(selected);
          }}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          value=""
        >
          <option value="">-- Select an appliance --</option>
          {STANDARD_APPLIANCES.map(appliance => (
            <option key={appliance.id} value={appliance.id}>
              {appliance.name} ({appliance.powerWatts}W)
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Add Common Combinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_ADD_COMBINATIONS.map((combination, index) => (
            <button
              key={index}
              onClick={() => handleQuickAdd(combination)}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">{combination.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {combination.appliances.length} appliances
              </p>
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Appliance Name
              </label>
              <div className="relative ml-2">
                <Info
                  size={16}
                  className="text-gray-400 cursor-help"
                  onMouseEnter={() => setShowTooltip('name')}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === 'name' && (
                  <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6">
                    Enter a descriptive name for your appliance
                  </div>
                )}
              </div>
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Television, Refrigerator"
            />
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="powerWatts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Power Rating (Watts)
              </label>
              <div className="relative ml-2">
                <Info
                  size={16}
                  className="text-gray-400 cursor-help"
                  onMouseEnter={() => setShowTooltip('power')}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === 'power' && (
                  <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6">
                    The power consumption of your appliance in watts. Usually found on the appliance label
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              id="powerWatts"
              value={powerWatts}
              onChange={(e) => setPowerWatts(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., 100"
              min="1"
            />
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="hoursPerDay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Hours Used Per Day (Max: {selectedBand.maxHours} for {selectedBand.name})
              </label>
              <div className="relative ml-2">
                <Info
                  size={16}
                  className="text-gray-400 cursor-help"
                  onMouseEnter={() => setShowTooltip('hours')}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === 'hours' && (
                  <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6">
                    Average number of hours the appliance is used per day. Maximum hours depend on your tariff band
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              id="hoursPerDay"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., 5"
              min="0.1"
              max={selectedBand.maxHours}
              step="0.1"
            />
          </div>
          
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <div className="relative ml-2">
                <Info
                  size={16}
                  className="text-gray-400 cursor-help"
                  onMouseEnter={() => setShowTooltip('quantity')}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === 'quantity' && (
                  <div className="absolute z-10 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6">
                    Number of identical appliances you have
                  </div>
                )}
              </div>
            </div>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., 1"
              min="1"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
        >
          <Plus size={18} className="mr-1" />
          Add Appliance
        </button>
      </form>
    </div>
  );
};

export default ApplianceForm;