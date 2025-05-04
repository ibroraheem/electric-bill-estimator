import React, { useState, useMemo } from 'react';
import { Plus, Info } from 'lucide-react';
import { STANDARD_APPLIANCES, HOUSEHOLD_PRESETS, ELECTRICITY_BANDS, getBandSpecificPresets } from '../utils/calculations';
import { Appliance } from '../types/appliance';

interface ApplianceFormProps {
  onAddAppliance: (appliance: Appliance) => void;
  selectedBandId: string;
  onBandChange: (bandId: string) => void;
}

const ApplianceForm: React.FC<ApplianceFormProps> = ({ 
  onAddAppliance, 
  selectedBandId,
  onBandChange 
}) => {
  const [selectedAppliance, setSelectedAppliance] = useState<string>('');
  const [powerWatts, setPowerWatts] = useState<string>('');
  const [hoursPerDay, setHoursPerDay] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [error, setError] = useState<string | null>(null);

  const selectedBand = ELECTRICITY_BANDS.find(band => band.id === selectedBandId)!;
  const bandPresets = useMemo(() => getBandSpecificPresets(selectedBandId), [selectedBandId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!selectedAppliance) {
      setError('Please select an appliance');
      return;
    }

    const power = parseFloat(powerWatts);
    const hours = parseFloat(hoursPerDay);
    const qty = parseInt(quantity);

    if (isNaN(power) || power <= 0) {
      setError('Please enter a valid power rating');
      return;
    }

    if (isNaN(hours) || hours <= 0 || hours > selectedBand.maxHours) {
      setError(`Hours per day must be between 1 and ${selectedBand.maxHours} for ${selectedBand.name}`);
      return;
    }

    if (isNaN(qty) || qty <= 0) {
      setError('Quantity must be at least 1');
      return;
    }

    const appliance: Appliance = {
      id: selectedAppliance,
      name: STANDARD_APPLIANCES.find(a => a.id === selectedAppliance)?.name || selectedAppliance,
      powerWatts: power,
      hoursPerDay: hours,
      quantity: qty
    };

    onAddAppliance(appliance);
    resetForm();
  };

  const handleQuickAdd = (presetId: keyof typeof HOUSEHOLD_PRESETS) => {
    const preset = bandPresets[presetId];
    if (!preset) return;

    preset.appliances.forEach(appliance => {
      const standardAppliance = STANDARD_APPLIANCES.find(a => a.id === appliance.id);
      if (standardAppliance) {
        onAddAppliance({
          id: appliance.id,
          name: standardAppliance.name,
          powerWatts: standardAppliance.powerWatts,
          hoursPerDay: appliance.hoursPerDay,
          quantity: appliance.quantity
        });
      }
    });
  };

  const resetForm = () => {
    setSelectedAppliance('');
    setPowerWatts('');
    setHoursPerDay('');
    setQuantity('1');
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add Appliance</h2>

      {/* Quick Add Presets */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Add Presets</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Max {selectedBand.maxHours}h/day for {selectedBand.name}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.entries(bandPresets).map(([id, preset]) => (
            <button
              key={id}
              onClick={() => handleQuickAdd(id as keyof typeof HOUSEHOLD_PRESETS)}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={preset.name}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="appliance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Appliance
          </label>
          <select
            id="appliance"
            value={selectedAppliance}
            onChange={(e) => {
              setSelectedAppliance(e.target.value);
              const appliance = STANDARD_APPLIANCES.find(a => a.id === e.target.value);
              if (appliance) {
                setPowerWatts(appliance.powerWatts.toString());
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select an appliance</option>
            {STANDARD_APPLIANCES.map(appliance => (
              <option key={appliance.id} value={appliance.id}>
                {appliance.name} ({appliance.powerWatts}W)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="power" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Power Rating (Watts)
          </label>
          <div className="relative">
            <input
              type="number"
              id="power"
              value={powerWatts}
              onChange={(e) => setPowerWatts(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter power rating"
              min="1"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hours Used Per Day (max {selectedBand.maxHours}h)
          </label>
          <input
            type="number"
            id="hours"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder={`Enter hours per day (max ${selectedBand.maxHours})`}
            min="1"
            max={selectedBand.maxHours}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter quantity"
            min="1"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors dark:focus:ring-offset-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Appliance
        </button>
      </form>
    </div>
  );
};

export default ApplianceForm;