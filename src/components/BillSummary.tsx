import React from 'react';
import { LightbulbIcon, Receipt, BatteryChargingIcon, Download } from 'lucide-react';
import { Appliance } from '../types/appliance';
import { calculateTotalMonthlyKWh, calculateTotalMonthlyCost, formatCurrency, formatNumber } from '../utils/calculations';
import { generatePDF } from '../utils/pdfExport';
import EnergySavingTips from './EnergySavingTips';

interface BillSummaryProps {
  appliances: Appliance[];
  rate: number;
  bandName: string;
}

const BillSummary: React.FC<BillSummaryProps> = ({ appliances, rate, bandName }) => {
  const totalMonthlyKWh = calculateTotalMonthlyKWh(appliances);
  const totalMonthlyCost = calculateTotalMonthlyCost(appliances, rate);
  
  const handleExportPDF = () => {
    const doc = generatePDF(appliances, rate, bandName);
    doc.save('electricity-bill-summary.pdf');
  };
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Receipt className="mr-2 text-blue-500" size={20} />
            Monthly Bill Summary
          </h2>
          
          {appliances.length > 0 && (
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center dark:focus:ring-offset-gray-800"
            >
              <Download size={16} className="mr-2" />
              Export PDF
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Energy Usage</span>
              <BatteryChargingIcon size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{formatNumber(totalMonthlyKWh)} kWh</div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Electricity Rate</span>
              <LightbulbIcon size={16} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">₦{rate}/kWh</div>
            <div className="text-xs text-amber-800 dark:text-amber-200 mt-1">{bandName} Tariff</div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Monthly Bill</span>
              <Receipt size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{formatCurrency(totalMonthlyCost)}</div>
          </div>
        </div>
        
        {appliances.length === 0 && (
          <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            Add appliances to see your estimated bill
          </div>
        )}
      </div>
      
      <EnergySavingTips appliances={appliances} />
    </>
  );
};

export default BillSummary;