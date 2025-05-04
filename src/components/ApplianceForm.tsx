import React, { useState, useMemo } from 'react';
import { Plus, Info, Zap, Search } from 'lucide-react';
import { STANDARD_APPLIANCES, ELECTRICITY_BANDS } from '../utils/calculations';
import { Appliance } from '../types/appliance';

interface ApplianceFormProps {
  onAddAppliance: (appliance: Appliance) => void;
  selectedBandId: string;
  onBandChange: (bandId: string) => void;
}

const BASE_PRESETS = {
  basic: {
    name: 'Basic Home',
    appliances: [
      { id: 'fridge', hoursPerDay: 12, quantity: 1 },
      { id: 'lighting', hoursPerDay: 6, quantity: 5 },
      { id: 'fan', hoursPerDay: 8, quantity: 2 },
      { id: 'tv', hoursPerDay: 4, quantity: 1 }
    ]
  },
  comfort: {
    name: 'Comfort Home',
    appliances: [
      { id: 'fridge', hoursPerDay: 12, quantity: 1 },
      { id: 'lighting', hoursPerDay: 8, quantity: 8 },
      { id: 'fan', hoursPerDay: 12, quantity: 3 },
      { id: 'tv', hoursPerDay: 6, quantity: 2 },
      { id: 'ac', hoursPerDay: 8, quantity: 1 }
    ]
  },
  luxury: {
    name: 'Luxury Home',
    appliances: [
      { id: 'fridge', hoursPerDay: 12, quantity: 2 },
      { id: 'lighting', hoursPerDay: 10, quantity: 12 },
      { id: 'fan', hoursPerDay: 12, quantity: 4 },
      { id: 'tv', hoursPerDay: 8, quantity: 3 },
      { id: 'ac', hoursPerDay: 12, quantity: 2 },
      { id: 'washing_machine', hoursPerDay: 2, quantity: 1 }
    ]
  }
};

const CATEGORIES = {
  essential: { name: 'Essential', icon: '🏠', description: 'Basic household needs' },
  comfort: { name: 'Comfort', icon: '🛋️', description: 'Comfort and convenience' },
  luxury: { name: 'Luxury', icon: '✨', description: 'Premium appliances' },
  other: { name: 'Other', icon: '🔌', description: 'Additional appliances' }
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPowerInfo, setShowPowerInfo] = useState(false);

  const selectedBand = ELECTRICITY_BANDS.find(band => band.id === selectedBandId)!;

  // Filter appliances based on search and category
  const filteredAppliances = useMemo(() => {
    return STANDARD_APPLIANCES.filter(appliance => {
      const matchesSearch = appliance.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || appliance.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calculate estimated monthly cost for selected appliance
  const estimatedMonthlyCost = useMemo(() => {
    if (!selectedAppliance || !powerWatts || !hoursPerDay || !quantity) return null;
    
    const power = parseFloat(powerWatts);
    const hours = parseFloat(hoursPerDay);
    const qty = parseInt(quantity);
    
    if (isNaN(power) || isNaN(hours) || isNaN(qty)) return null;
    
    const dailyKWh = (power * hours * qty) / 1000;
    const monthlyKWh = dailyKWh * 30;
    const cost = monthlyKWh * selectedBand.rate;
    
    return cost;
  }, [selectedAppliance, powerWatts, hoursPerDay, quantity, selectedBand.rate]);

  // Dynamically adjust presets based on selected band
  const smartPresets = useMemo(() => {
    const maxHours = selectedBand.maxHours;
    const adjustedPresets = { ...BASE_PRESETS };

    // Adjust hours for each preset based on band max hours
    Object.keys(adjustedPresets).forEach(presetKey => {
      const preset = adjustedPresets[presetKey as keyof typeof BASE_PRESETS];
      preset.appliances = preset.appliances.map(appliance => ({
        ...appliance,
        hoursPerDay: Math.min(appliance.hoursPerDay, maxHours)
      }));
    });

    return adjustedPresets;
  }, [selectedBandId]);

  const handleSmartPreset = (presetId: keyof typeof BASE_PRESETS) => {
    const preset = smartPresets[presetId];
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

      {/* Smart Presets */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Presets</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Max {selectedBand.maxHours}h/day for {selectedBand.name}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Object.entries(smartPresets).map(([id, preset]) => (
            <button
              key={id}
              onClick={() => handleSmartPreset(id as keyof typeof BASE_PRESETS)}
              className="flex items-center justify-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={`${preset.name} (Max ${selectedBand.maxHours}h/day)`}
            >
              <Zap className="h-4 w-4 mr-2" />
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Search and Filter */}
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search appliances..."
              className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All
            </button>
            {Object.entries(CATEGORIES).map(([id, category]) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                  selectedCategory === id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                title={category.description}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="band" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Band
          </label>
          <select
            id="band"
            value={selectedBandId}
            onChange={(e) => onBandChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {ELECTRICITY_BANDS.map(band => (
              <option key={band.id} value={band.id}>
                {band.name} (₦{band.rate}/kWh)
              </option>
            ))}
          </select>
        </div>

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
            {filteredAppliances.map(appliance => (
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

        {/* Power Info Tooltip */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPowerInfo(!showPowerInfo)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <Info className="h-4 w-4" />
          </button>
          {showPowerInfo && (
            <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Power rating is usually found on the appliance's label or manual. It's measured in watts (W) or kilowatts (kW).
              </p>
            </div>
          )}
        </div>

        {/* Estimated Cost */}
        {estimatedMonthlyCost !== null && (
          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Estimated monthly cost: ₦{estimatedMonthlyCost.toFixed(2)}
            </p>
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