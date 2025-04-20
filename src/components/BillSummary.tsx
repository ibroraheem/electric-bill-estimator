import React from 'react';
import { LightbulbIcon, Receipt, BatteryChargingIcon } from 'lucide-react';
import { Appliance } from '../types/appliance';
import { calculateTotalMonthlyKWh, calculateTotalMonthlyCost, formatCurrency, formatNumber } from '../utils/calculations';

interface BillSummaryProps {
  appliances: Appliance[];
  rate: number;
  bandName: string;
}

const BillSummary: React.FC<BillSummaryProps> = ({ appliances, rate, bandName }) => {
  const totalMonthlyKWh = calculateTotalMonthlyKWh(appliances);
  const totalMonthlyCost = calculateTotalMonthlyCost(appliances, rate);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Receipt className="mr-2 text-blue-500" size={20} />
        Monthly Bill Summary
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-700">Total Energy Usage</span>
            <BatteryChargingIcon size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">{formatNumber(totalMonthlyKWh)} kWh</div>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-amber-700">Electricity Rate</span>
            <LightbulbIcon size={16} className="text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900">₦{rate}/kWh</div>
          <div className="text-xs text-amber-800 mt-1">{bandName} Tariff</div>
        </div>
        
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-emerald-700">Total Monthly Bill</span>
            <Receipt size={16} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900">{formatCurrency(totalMonthlyCost)}</div>
        </div>
      </div>
      
      {appliances.length === 0 && (
        <div className="text-center mt-4 text-sm text-gray-500">
          Add appliances to see your estimated bill
        </div>
      )}
    </div>
  );
};

export default BillSummary;