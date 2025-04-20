import React from 'react';
import { Trash2, Clock, Zap } from 'lucide-react';
import { Appliance } from '../types/appliance';
import { calculateMonthlyKWh, calculateMonthlyCost, formatCurrency, formatNumber } from '../utils/calculations';

interface ApplianceListProps {
  appliances: Appliance[];
  onDeleteAppliance: (id: string) => void;
  rate: number;
}

const ApplianceList: React.FC<ApplianceListProps> = ({ appliances, onDeleteAppliance, rate }) => {
  if (appliances.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Appliances</h2>
        <p className="text-gray-500 text-center py-6">No appliances added yet. Add your first appliance above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Appliances</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appliance</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power (W)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours/Day</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly kWh</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Cost</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appliances.map((appliance) => {
              const monthlyKWh = calculateMonthlyKWh(appliance);
              const monthlyCost = calculateMonthlyCost(monthlyKWh, rate);
              
              return (
                <tr key={appliance.id} className="hover:bg-gray-50 animate-fade-in">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{appliance.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Zap size={14} className="text-amber-500 mr-1" />
                      {appliance.powerWatts}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Clock size={14} className="text-cyan-500 mr-1" />
                      {appliance.hoursPerDay}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appliance.quantity}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(monthlyKWh)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(monthlyCost)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onDeleteAppliance(appliance.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      aria-label="Delete appliance"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplianceList;