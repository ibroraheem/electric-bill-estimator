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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-500 dark:text-gray-400">
        No appliances added yet. Add some appliances to calculate your bill.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Appliances</h2>
      <div className="space-y-3 sm:space-y-4">
        {appliances.map(appliance => {
          const monthlyKWh = calculateMonthlyKWh(appliance);
          const monthlyCost = calculateMonthlyCost(monthlyKWh, selectedBand.rate);
          return (
            <div
              key={appliance.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">
                  {appliance.name}
                </h3>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-1">
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
              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <button
                  onClick={() => onUpdateAppliance(appliance.id, { hoursPerDay: appliance.hoursPerDay + 1 })}
                  className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Increase hours"
                >
                  <Edit2 size={16} className="sm:hidden" />
                  <Edit2 size={18} className="hidden sm:block" />
                </button>
                <button
                  onClick={() => onRemoveAppliance(appliance.id)}
                  className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="Remove appliance"
                >
                  <Trash2 size={16} className="sm:hidden" />
                  <Trash2 size={18} className="hidden sm:block" />
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