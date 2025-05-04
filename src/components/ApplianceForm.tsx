import React, { useState } from 'react';
import { Zap, Plus } from 'lucide-react';
import { Appliance, StandardAppliance } from '../types/appliance';
import { STANDARD_APPLIANCES, ELECTRICITY_BANDS } from '../utils/calculations';

interface ApplianceFormProps {
  onAddAppliance: (appliance: Appliance) => void;
  selectedBandId: string;
}

const ApplianceForm: React.FC<ApplianceFormProps> = ({ onAddAppliance, selectedBandId }) => {
  const [name, setName] = useState('');
  const [powerWatts, setPowerWatts] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Zap className="mr-2 text-amber-500" size={20} />
        Add Appliance
      </h2>

      <div className="mb-6">
        <label htmlFor="standardAppliance" className="block text-sm font-medium text-gray-700 mb-2">
          Select from Common Appliances
        </label>
        <select
          id="standardAppliance"
          onChange={(e) => {
            const selected = STANDARD_APPLIANCES.find(a => a.id === e.target.value);
            if (selected) handleStandardApplianceSelect(selected);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Appliance Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Television, Refrigerator"
            />
          </div>
          
          <div>
            <label htmlFor="powerWatts" className="block text-sm font-medium text-gray-700 mb-1">
              Power Rating (Watts)
            </label>
            <input
              type="number"
              id="powerWatts"
              value={powerWatts}
              onChange={(e) => setPowerWatts(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 100"
              min="1"
            />
          </div>
          
          <div>
            <label htmlFor="hoursPerDay" className="block text-sm font-medium text-gray-700 mb-1">
              Hours Used Per Day (Max: {selectedBand.maxHours} for {selectedBand.name})
            </label>
            <input
              type="number"
              id="hoursPerDay"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5"
              min="0.1"
              max={selectedBand.maxHours}
              step="0.1"
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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