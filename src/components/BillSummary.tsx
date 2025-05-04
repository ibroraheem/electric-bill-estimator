import React, { useState } from 'react';
import { Zap, Download, TrendingDown, AlertCircle } from 'lucide-react';
import { formatCurrency, formatNumber, calculateUsageAnalytics, generatePDF } from '../utils/calculations';
import { Appliance, ElectricityBand } from '../types/appliance';
import EnergySavingTips from './EnergySavingTips';

interface BillSummaryProps {
  appliances: Appliance[];
  selectedBand: ElectricityBand;
}

const BillSummary: React.FC<BillSummaryProps> = ({ appliances, selectedBand }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Safely calculate analytics with error handling
  const analytics = React.useMemo(() => {
    try {
      return calculateUsageAnalytics(appliances, selectedBand.rate);
    } catch (err) {
      console.error('Error calculating analytics:', err);
      setError('Failed to calculate usage analytics. Please try again.');
      return null;
    }
  }, [appliances, selectedBand.rate]);

  const handleExportPDF = async () => {
    if (!analytics) return;
    
    try {
      setIsExporting(true);
      setError(null);
      const doc = await generatePDF(analytics, appliances, selectedBand.rate);
      doc.save('electricity-bill-analysis.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center text-red-500 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">Loading analytics...</p>
      </div>
    );
  }

  if (appliances.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">Add appliances to see your bill summary</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Summary Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Bill Summary</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Energy Usage</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  {formatNumber(analytics.totalKWh)} kWh
                </p>
              </div>
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 dark:text-blue-400" />
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Electricity Rate</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(selectedBand.rate)}/kWh
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedBand.name}
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Monthly Bill</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                  {formatCurrency(analytics.totalCost)}
                </p>
              </div>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className={`p-2 text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 ${
                  isExporting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                title={isExporting ? 'Generating PDF...' : 'Export to PDF'}
              >
                <Download className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Usage Breakdown</h3>
        
        <div className="space-y-3 sm:space-y-4">
          {analytics.categoryBreakdown.map((category) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{category.category}</span>
              </div>
              <div className="text-right">
                <p className="text-sm sm:text-base text-gray-800 dark:text-white font-medium">
                  {formatNumber(category.kwh)} kWh
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(category.cost)} ({formatNumber(category.percentage)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Saving Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Energy Saving Tips</h3>
          <div className="flex items-center text-green-500 dark:text-green-400">
            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
            <span className="text-sm sm:text-base font-medium">
              Potential Savings: {formatCurrency(analytics.potentialSavings.total)}
            </span>
          </div>
        </div>
        <EnergySavingTips tips={analytics.potentialSavings.tips} />
      </div>
    </div>
  );
};

export default BillSummary;