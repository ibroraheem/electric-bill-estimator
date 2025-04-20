import { Appliance, ApplianceUsage, ElectricityBand, StandardAppliance } from '../types/appliance';

// Constants
export const ELECTRICITY_BANDS: ElectricityBand[] = [
  { id: 'a', name: 'Band A', rate: 225 },  // 209.5 + 7.5%
  { id: 'b', name: 'Band B', rate: 68.88 },   // 64.07 + 7.5%
  { id: 'c', name: 'Band C', rate: 55.95 },   // 52.05 + 7.5%
  { id: 'd', name: 'Band D', rate: 46.52 },   // 43.27 + 7.5%
  { id: 'e', name: 'Band E', rate: 34.87 },   // 32.44 + 7.5%
];

export const STANDARD_APPLIANCES: StandardAppliance[] = [
  { id: 'fridge', name: 'Refrigerator', powerWatts: 150 },
  { id: 'freezer', name: 'Deep Freezer', powerWatts: 200 },
  { id: 'ac', name: 'Air Conditioner (1.5HP)', powerWatts: 1200 },
  { id: 'ac2', name: 'Air Conditioner (1HP)', powerWatts: 750 },
  { id: 'tv-led', name: 'LED TV (32")', powerWatts: 50 },
  { id: 'tv-lcd', name: 'LCD TV (32")', powerWatts: 100 },
  { id: 'fan', name: 'Ceiling Fan', powerWatts: 75 },
  { id: 'iron', name: 'Electric Iron', powerWatts: 1000 },
  { id: 'microwave', name: 'Microwave Oven', powerWatts: 800 },
  { id: 'water-heater', name: 'Water Heater', powerWatts: 3000 },
  { id: 'washing-machine', name: 'Washing Machine', powerWatts: 500 },
  { id: 'laptop', name: 'Laptop Computer', powerWatts: 65 },
  { id: 'phone-charger', name: 'Phone Charger', powerWatts: 5 },
  { id: 'led-bulb', name: 'LED Bulb', powerWatts: 9 },
  { id: 'cfl-bulb', name: 'CFL Bulb', powerWatts: 15 },
];

export const DAYS_IN_MONTH = 30; // Average days in a month

/**
 * Calculate monthly kWh usage for an appliance
 */
export const calculateMonthlyKWh = (appliance: Appliance): number => {
  const { powerWatts, hoursPerDay, quantity } = appliance;
  return (powerWatts * hoursPerDay * DAYS_IN_MONTH * quantity) / 1000;
};

/**
 * Calculate monthly cost for an appliance
 */
export const calculateMonthlyCost = (monthlyKWh: number, rate: number): number => {
  return monthlyKWh * rate;
};

/**
 * Get detailed usage information for an appliance
 */
export const getApplianceUsage = (appliance: Appliance, rate: number): ApplianceUsage => {
  const monthlyKWh = calculateMonthlyKWh(appliance);
  const monthlyCost = calculateMonthlyCost(monthlyKWh, rate);
  
  return {
    appliance,
    monthlyKWh,
    monthlyCost
  };
};

/**
 * Calculate total monthly kWh for all appliances
 */
export const calculateTotalMonthlyKWh = (appliances: Appliance[]): number => {
  return appliances.reduce((total, appliance) => {
    return total + calculateMonthlyKWh(appliance);
  }, 0);
};

/**
 * Calculate total monthly cost for all appliances
 */
export const calculateTotalMonthlyCost = (appliances: Appliance[], rate: number): number => {
  const totalKWh = calculateTotalMonthlyKWh(appliances);
  return calculateMonthlyCost(totalKWh, rate);
};

/**
 * Format number as currency (Nigerian Naira)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number with 2 decimal places
 */
export const formatNumber = (num: number): string => {
  return num.toFixed(2);
};