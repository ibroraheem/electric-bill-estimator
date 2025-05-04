import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { Appliance, ElectricityBand } from '../types/appliance';
import { calculateMonthlyKWh, calculateMonthlyCost, formatNumber, formatCurrency } from '../utils/calculations';

interface ApplianceListProps {
  appliances: Appliance[];
  onRemoveAppliance: (id: string) => void;
  onUpdateAppliance: (id: string, updatedAppliance: Partial<Appliance>) => void;
  selectedBand: ElectricityBand;
}

const ApplianceList: React.FC<ApplianceListProps> = ({
  appliances,
  onRemoveAppliance,
  onUpdateAppliance,
  selectedBand,
}) => {
  if (appliances.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center text-gray-500 dark:text-gray-400">
        No appliances added yet. Add some appliances to calculate your bill.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Your Appliances</h2>
      <div className="space-y-3">
        {appliances.map(appliance => {
          const monthlyKWh = calculateMonthlyKWh(appliance);
          const monthlyCost = calculateMonthlyCost(monthlyKWh, selectedBand.rate);
          return (
            <div
              key={appliance.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 dark:text-white text-sm">
                  {appliance.name}
                </h3>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 mt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                    <p>Power: {formatNumber(appliance.powerWatts)}W</p>
                    <p>Hours: {appliance.hoursPerDay}/day</p>
                    <p>Quantity: {appliance.quantity}</p>
                    <p>Usage: {formatNumber(monthlyKWh)} kWh</p>
                    <p className="col-span-2 sm:col-span-1 font-medium text-blue-600 dark:text-blue-400">
                      Cost: {formatCurrency(monthlyCost)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateAppliance(appliance.id, { hoursPerDay: appliance.hoursPerDay + 1 })}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Increase hours"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onRemoveAppliance(appliance.id)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Remove appliance"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplianceList;