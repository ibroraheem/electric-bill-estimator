import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PieChart, Info } from 'lucide-react';
import { Appliance } from '../types/appliance';
import { calculateMonthlyKWh, formatNumber } from '../utils/calculations';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface UsageChartProps {
  appliances: Appliance[];
}

const UsageChart: React.FC<UsageChartProps> = ({ appliances }) => {
  if (appliances.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <PieChart className="mr-2 text-cyan-500" size={20} />
          Energy Usage Breakdown
        </h2>
        <div className="flex flex-col items-center justify-center py-8">
          <Info size={24} className="text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Add appliances to see your energy usage breakdown</p>
        </div>
      </div>
    );
  }

  // Generate chart colors
  const generateColors = (count: number) => {
    const baseColors = [
      'rgba(59, 130, 246, 0.8)',    // Blue
      'rgba(6, 182, 212, 0.8)',     // Cyan
      'rgba(245, 158, 11, 0.8)',    // Amber
      'rgba(16, 185, 129, 0.8)',    // Emerald
      'rgba(99, 102, 241, 0.8)',    // Indigo
      'rgba(236, 72, 153, 0.8)',    // Pink
      'rgba(249, 115, 22, 0.8)',    // Orange
      'rgba(139, 92, 246, 0.8)',    // Violet
    ];
    
    // If we have more appliances than base colors, generate additional colors
    const colors = [...baseColors];
    while (colors.length < count) {
      colors.push(baseColors[colors.length % baseColors.length]);
    }
    
    return {
      backgroundColor: colors,
      borderColor: colors.map(color => color.replace('0.8', '1')),
    };
  };

  // Prepare chart data
  const applianceData = appliances.map(appliance => ({
    name: appliance.name,
    monthlyKWh: calculateMonthlyKWh(appliance),
  }));
  
  // Sort by highest energy usage
  applianceData.sort((a, b) => b.monthlyKWh - a.monthlyKWh);
  
  const { backgroundColor, borderColor } = generateColors(applianceData.length);
  
  const chartData = {
    labels: applianceData.map(item => `${item.name} (${formatNumber(item.monthlyKWh)} kWh)`),
    datasets: [
      {
        data: applianceData.map(item => item.monthlyKWh),
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value * 100) / total).toFixed(1);
            return `${label}: ${percentage}% of total`;
          },
        },
      },
    },
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
        <PieChart className="mr-2 text-cyan-500" size={20} />
        Energy Usage Breakdown
      </h2>
      
      <div className="h-[300px]">
        <Pie data={chartData} options={chartOptions} />
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Hover/tap on chart segments for detailed information
      </div>
    </div>
  );
};

export default UsageChart;