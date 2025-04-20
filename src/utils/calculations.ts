import { Appliance, ApplianceUsage } from '../types/appliance';

// Constants
export const ELECTRICITY_RATE = 225; // ₦225 per kWh (Band A)
export const DAYS_IN_MONTH = 30; // Average days in a month

/**
 * Calculate monthly kWh usage for an appliance
 */
export const calculateMonthlyKWh = (appliance: Appliance): number => {
  const { powerWatts, hoursPerDay, quantity } = appliance;
  // (power in watts × hours × days × quantity) ÷ 1000
  return (powerWatts * hoursPerDay * DAYS_IN_MONTH * quantity) / 1000;
};

/**
 * Calculate monthly cost for an appliance
 */
export const calculateMonthlyCost = (monthlyKWh: number): number => {
  return monthlyKWh * ELECTRICITY_RATE;
};

/**
 * Get detailed usage information for an appliance
 */
export const getApplianceUsage = (appliance: Appliance): ApplianceUsage => {
  const monthlyKWh = calculateMonthlyKWh(appliance);
  const monthlyCost = calculateMonthlyCost(monthlyKWh);
  
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
export const calculateTotalMonthlyCost = (appliances: Appliance[]): number => {
  const totalKWh = calculateTotalMonthlyKWh(appliances);
  return calculateMonthlyCost(totalKWh);
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