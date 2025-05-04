import React from 'react';
import { Lightbulb, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import { EnergySavingTip } from '../types/appliance';

interface EnergySavingTipsProps {
  tips: EnergySavingTip[];
}

const EnergySavingTips: React.FC<EnergySavingTipsProps> = ({ tips }) => {
  if (!tips || tips.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        No energy saving tips available for your current setup.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                {tip.title}
              </h4>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                {tip.tip}
              </p>
              {tip.potentialSavings > 0 && (
                <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span>Potential monthly savings: {formatCurrency(tip.potentialSavings)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnergySavingTips; 