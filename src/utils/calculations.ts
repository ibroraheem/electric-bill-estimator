import { Appliance, ApplianceUsage, ElectricityBand, StandardAppliance, EnergySavingTip } from '../types/appliance';

// Constants
export const ELECTRICITY_BANDS: ElectricityBand[] = [
  { id: 'a', name: 'Band A', rate: 225, maxHours: 20 },  // 209.5 + 7.5%
  { id: 'b', name: 'Band B', rate: 68.88, maxHours: 16 },   // 64.07 + 7.5%
  { id: 'c', name: 'Band C', rate: 55.95, maxHours: 12 },   // 52.05 + 7.5%
  { id: 'd', name: 'Band D', rate: 46.52, maxHours: 8 },   // 43.27 + 7.5%
  { id: 'e', name: 'Band E', rate: 34.87, maxHours: 4 },   // 32.44 + 7.5%
];

export const STANDARD_APPLIANCES: StandardAppliance[] = [
  // Cooling Appliances
  { id: 'ac-1.5hp', name: 'Air Conditioner (1.5HP)', powerWatts: 1200 },
  { id: 'ac-1hp', name: 'Air Conditioner (1HP)', powerWatts: 750 },
  { id: 'ac-2hp', name: 'Air Conditioner (2HP)', powerWatts: 1800 },
  { id: 'fan-ceiling', name: 'Ceiling Fan', powerWatts: 75 },
  { id: 'fan-standing', name: 'Standing Fan', powerWatts: 60 },
  { id: 'fan-table', name: 'Table Fan', powerWatts: 45 },
  { id: 'fan-exhaust', name: 'Exhaust Fan', powerWatts: 40 },
  
  // Refrigeration
  { id: 'fridge-single', name: 'Single Door Refrigerator', powerWatts: 150 },
  { id: 'fridge-double', name: 'Double Door Refrigerator', powerWatts: 250 },
  { id: 'freezer-small', name: 'Small Deep Freezer', powerWatts: 150 },
  { id: 'freezer-large', name: 'Large Deep Freezer', powerWatts: 250 },
  
  // Entertainment
  { id: 'tv-led-32', name: 'LED TV (32")', powerWatts: 50 },
  { id: 'tv-led-43', name: 'LED TV (43")', powerWatts: 80 },
  { id: 'tv-led-55', name: 'LED TV (55")', powerWatts: 120 },
  { id: 'tv-lcd-32', name: 'LCD TV (32")', powerWatts: 100 },
  { id: 'tv-plasma-50', name: 'Plasma TV (50")', powerWatts: 300 },
  { id: 'decoder-dstv', name: 'DSTV Decoder', powerWatts: 15 },
  { id: 'decoder-startimes', name: 'StarTimes Decoder', powerWatts: 15 },
  { id: 'decoder-gotv', name: 'GOtv Decoder', powerWatts: 15 },
  { id: 'sound-system', name: 'Sound System', powerWatts: 100 },
  { id: 'gaming-console', name: 'Gaming Console', powerWatts: 150 },
  
  // Kitchen Appliances
  { id: 'blender-small', name: 'Small Blender', powerWatts: 300 },
  { id: 'blender-large', name: 'Large Blender', powerWatts: 500 },
  { id: 'microwave-small', name: 'Small Microwave', powerWatts: 800 },
  { id: 'microwave-large', name: 'Large Microwave', powerWatts: 1200 },
  { id: 'electric-kettle', name: 'Electric Kettle', powerWatts: 1500 },
  { id: 'electric-cooker', name: 'Electric Cooker', powerWatts: 2000 },
  { id: 'electric-oven', name: 'Electric Oven', powerWatts: 2500 },
  { id: 'toaster', name: 'Toaster', powerWatts: 800 },
  { id: 'coffee-maker', name: 'Coffee Maker', powerWatts: 1000 },
  
  // Laundry
  { id: 'washing-machine-small', name: 'Small Washing Machine', powerWatts: 500 },
  { id: 'washing-machine-large', name: 'Large Washing Machine', powerWatts: 800 },
  { id: 'dryer', name: 'Clothes Dryer', powerWatts: 3000 },
  { id: 'iron', name: 'Electric Iron', powerWatts: 1000 },
  
  // Lighting
  { id: 'led-bulb-5w', name: 'LED Bulb (5W)', powerWatts: 5 },
  { id: 'led-bulb-9w', name: 'LED Bulb (9W)', powerWatts: 9 },
  { id: 'led-bulb-12w', name: 'LED Bulb (12W)', powerWatts: 12 },
  { id: 'cfl-bulb-15w', name: 'CFL Bulb (15W)', powerWatts: 15 },
  { id: 'cfl-bulb-20w', name: 'CFL Bulb (20W)', powerWatts: 20 },
  { id: 'incandescent-40w', name: 'Incandescent Bulb (40W)', powerWatts: 40 },
  { id: 'incandescent-60w', name: 'Incandescent Bulb (60W)', powerWatts: 60 },
  { id: 'fluorescent-tube', name: 'Fluorescent Tube', powerWatts: 40 },
  
  // Electronics
  { id: 'laptop', name: 'Laptop Computer', powerWatts: 65 },
  { id: 'desktop', name: 'Desktop Computer', powerWatts: 200 },
  { id: 'printer', name: 'Printer', powerWatts: 50 },
  { id: 'router', name: 'WiFi Router', powerWatts: 10 },
  { id: 'modem', name: 'Internet Modem', powerWatts: 8 },
  { id: 'phone-charger', name: 'Phone Charger', powerWatts: 25 },
  { id: 'tablet-charger', name: 'Tablet Charger', powerWatts: 10 },
  
  // Backup Power
  { id: 'inverter-small', name: 'Small Inverter System', powerWatts: 1000 },
  { id: 'inverter-medium', name: 'Medium Inverter System', powerWatts: 1500 },
  { id: 'inverter-large', name: 'Large Inverter System', powerWatts: 2000 },
  { id: 'generator-small', name: 'Small Generator (1.5KVA)', powerWatts: 1500 },
  { id: 'generator-medium', name: 'Medium Generator (3KVA)', powerWatts: 3000 },
  { id: 'generator-large', name: 'Large Generator (5KVA)', powerWatts: 5000 },
  
  // Water Systems
  { id: 'water-pump-small', name: 'Small Water Pump', powerWatts: 750 },
  { id: 'water-pump-large', name: 'Large Water Pump', powerWatts: 1500 },
  { id: 'water-heater', name: 'Water Heater', powerWatts: 3000 },
  { id: 'water-dispenser', name: 'Water Dispenser', powerWatts: 100 },
  
  // Power Protection
  { id: 'stabilizer-small', name: 'Small Voltage Stabilizer', powerWatts: 100 },
  { id: 'stabilizer-medium', name: 'Medium Voltage Stabilizer', powerWatts: 500 },
  { id: 'stabilizer-large', name: 'Large Voltage Stabilizer', powerWatts: 1000 },
  { id: 'ups-small', name: 'Small UPS', powerWatts: 500 },
  { id: 'ups-medium', name: 'Medium UPS', powerWatts: 1000 },
  
  // Other Common Appliances
  { id: 'vacuum-cleaner', name: 'Vacuum Cleaner', powerWatts: 1000 },
  { id: 'hair-dryer', name: 'Hair Dryer', powerWatts: 1200 },
  { id: 'electric-shaver', name: 'Electric Shaver', powerWatts: 15 },
  { id: 'electric-toothbrush', name: 'Electric Toothbrush', powerWatts: 3 },
  { id: 'security-camera', name: 'Security Camera', powerWatts: 5 },
  { id: 'cctv-system', name: 'CCTV System', powerWatts: 50 }
];

export const DAYS_IN_MONTH = 30; // Average days in a month

/**
 * Calculate monthly kWh usage for an appliance
 */
export const calculateMonthlyKWh = (appliance: Appliance): number => {
  if (!appliance || typeof appliance.powerWatts !== 'number' || 
      typeof appliance.hoursPerDay !== 'number' || 
      typeof appliance.quantity !== 'number') {
    return 0;
  }
  const { powerWatts, hoursPerDay, quantity } = appliance;
  return (powerWatts * hoursPerDay * DAYS_IN_MONTH * quantity) / 1000;
};

/**
 * Calculate monthly cost for an appliance
 */
export const calculateMonthlyCost = (monthlyKWh: number, rate: number): number => {
  if (typeof monthlyKWh !== 'number' || typeof rate !== 'number' || isNaN(monthlyKWh) || isNaN(rate)) {
    return 0;
  }
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
  if (!Array.isArray(appliances)) return 0;
  return appliances.reduce((total, appliance) => {
    return total + calculateMonthlyKWh(appliance);
  }, 0);
};

/**
 * Calculate total monthly cost for all appliances
 */
export const calculateTotalMonthlyCost = (appliances: Appliance[], rate: number): number => {
  if (!Array.isArray(appliances) || typeof rate !== 'number' || isNaN(rate)) return 0;
  const totalKWh = calculateTotalMonthlyKWh(appliances);
  return calculateMonthlyCost(totalKWh, rate);
};

/**
 * Format number as currency (Nigerian Naira)
 */
export const formatCurrency = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) return 'NGN 0';
  return 'NGN ' + new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format number with 2 decimal places
 */
export const formatNumber = (num: number): string => {
  if (typeof num !== 'number' || isNaN(num)) return '0.0';
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(num);
};

/**
 * Generate energy-saving tips based on appliance usage
 */
export const generateEnergySavingTips = (appliances: Appliance[]): EnergySavingTip[] => {
  const tips: EnergySavingTip[] = [];
  
  // Check for high-power appliances
  const highPowerAppliances = appliances.filter(a => a.powerWatts > 1000);
  if (highPowerAppliances.length > 0) {
    const totalHighPower = highPowerAppliances.reduce((sum, a) => 
      sum + (a.powerWatts * a.hoursPerDay * a.quantity), 0);
    const potentialSavings = (totalHighPower * 0.2 * 30 * 0.1) / 1000; // 20% reduction, 30 days, ₦10/kWh
    
    tips.push({
      title: 'High Power Consumption Alert',
      tip: 'Consider using these appliances during off-peak hours (10 PM - 6 AM) to reduce your electricity bill. In Nigeria, some DISCOs offer lower rates during off-peak hours.',
      potentialSavings: potentialSavings * 10 // Convert to Naira
    });
  }
  
  // Check for air conditioners
  const acs = appliances.filter(a => a.name.toLowerCase().includes('ac') || a.name.toLowerCase().includes('air conditioner'));
  if (acs.length > 0) {
    const acSavings = acs.reduce((sum, ac) => 
      sum + (ac.powerWatts * ac.hoursPerDay * ac.quantity * 0.3 * 30 * 0.1), 0) / 1000;
    
    tips.push({
      title: 'Air Conditioner Optimization',
      tip: 'Set your AC temperature to 26°C or higher. Each degree increase can save up to 10% on cooling costs. Also, ensure regular maintenance and cleaning of filters.',
      potentialSavings: acSavings * 10
    });
  }
  
  // Check for refrigerators
  const fridges = appliances.filter(a => a.name.toLowerCase().includes('fridge') || a.name.toLowerCase().includes('refrigerator'));
  if (fridges.length > 0) {
    const fridgeSavings = fridges.reduce((sum, fridge) => 
      sum + (fridge.powerWatts * fridge.hoursPerDay * fridge.quantity * 0.2 * 30 * 0.1), 0) / 1000;
    
    tips.push({
      title: 'Refrigerator Efficiency',
      tip: 'Keep your refrigerator away from direct sunlight and heat sources. Ensure proper door seals and avoid leaving the door open. Regular defrosting can improve efficiency.',
      potentialSavings: fridgeSavings * 10
    });
  }
  
  // Check for lighting
  const lights = appliances.filter(a => a.name.toLowerCase().includes('bulb') || a.name.toLowerCase().includes('light'));
  if (lights.length > 0) {
    const lightSavings = lights.reduce((sum, light) => 
      sum + (light.powerWatts * light.hoursPerDay * light.quantity * 0.8 * 30 * 0.1), 0) / 1000;
    
    tips.push({
      title: 'Switch to LED Bulbs',
      tip: 'Replace traditional bulbs with LED bulbs. They use up to 80% less energy and last longer. Available at most Nigerian markets and electrical stores.',
      potentialSavings: lightSavings * 10
    });
  }
  
  // Check for standby power
  const standbyPower = appliances.reduce((sum, a) => 
    sum + (a.powerWatts * 0.1 * 24 * a.quantity), 0) / 1000; // 10% standby power
  
  if (standbyPower > 0) {
    tips.push({
      title: 'Reduce Standby Power',
      tip: 'Unplug appliances when not in use or use power strips with switches. Many Nigerian homes waste significant energy through standby power consumption.',
      potentialSavings: standbyPower * 30 * 10
    });
  }
  
  // Check for backup power systems
  const backupSystems = appliances.filter(a => 
    a.name.toLowerCase().includes('inverter') || 
    a.name.toLowerCase().includes('generator')
  );
  
  if (backupSystems.length > 0) {
    const backupSavings = backupSystems.reduce((sum, system) => 
      sum + (system.powerWatts * system.hoursPerDay * system.quantity * 0.3 * 30 * 0.1), 0) / 1000;
    
    tips.push({
      title: 'Backup Power Optimization',
      tip: 'Consider using solar panels with your inverter system to reduce fuel costs. For generators, maintain regular servicing and use only when necessary.',
      potentialSavings: backupSavings * 10
    });
  }
  
  // Check for water heating
  const waterHeaters = appliances.filter(a => 
    a.name.toLowerCase().includes('water heater') || 
    a.name.toLowerCase().includes('electric kettle')
  );
  
  if (waterHeaters.length > 0) {
    const heaterSavings = waterHeaters.reduce((sum, heater) => 
      sum + (heater.powerWatts * heater.hoursPerDay * heater.quantity * 0.5 * 30 * 0.1), 0) / 1000;
    
    tips.push({
      title: 'Water Heating Efficiency',
      tip: 'Consider using a gas cooker for water heating instead of electric appliances. If using electric, only heat the amount of water you need.',
      potentialSavings: heaterSavings * 10
    });
  }
  
  // Check for voltage stabilizers
  const stabilizers = appliances.filter(a => 
    a.name.toLowerCase().includes('stabilizer')
  );
  
  if (stabilizers.length > 0) {
    const stabilizerSavings = stabilizers.reduce((sum, stabilizer) => 
      sum + (stabilizer.powerWatts * stabilizer.hoursPerDay * stabilizer.quantity * 0.2 * 30 * 0.1), 0) / 1000;
    
    tips.push({
      title: 'Voltage Stabilizer Usage',
      tip: 'Only use voltage stabilizers for sensitive electronics. Unplug them when not in use to reduce standby power consumption.',
      potentialSavings: stabilizerSavings * 10
    });
  }
  
  return tips;
};

export const HOUSEHOLD_PRESETS = {
  'basic-home': {
    name: 'Basic Home Setup',
    description: 'Essential appliances for a basic Nigerian home',
    appliances: [
      { id: 'fridge-single', quantity: 1, hoursPerDay: 24 },
      { id: 'fan-ceiling', quantity: 2, hoursPerDay: 12 },
      { id: 'led-bulb-9w', quantity: 4, hoursPerDay: 6 },
      { id: 'tv-led-32', quantity: 1, hoursPerDay: 4 },
      { id: 'decoder-dstv', quantity: 1, hoursPerDay: 4 },
      { id: 'phone-charger', quantity: 2, hoursPerDay: 3 }
    ]
  },
  'home-office': {
    name: 'Home Office Setup',
    description: 'Ideal for remote work and business operations',
    appliances: [
      { id: 'laptop', quantity: 1, hoursPerDay: 8 },
      { id: 'desktop', quantity: 1, hoursPerDay: 8 },
      { id: 'printer', quantity: 1, hoursPerDay: 2 },
      { id: 'router', quantity: 1, hoursPerDay: 24 },
      { id: 'modem', quantity: 1, hoursPerDay: 24 },
      { id: 'fan-ceiling', quantity: 1, hoursPerDay: 8 },
      { id: 'led-bulb-9w', quantity: 2, hoursPerDay: 8 }
    ]
  },
  'entertainment': {
    name: 'Entertainment Setup',
    description: 'For homes with multiple entertainment devices',
    appliances: [
      { id: 'tv-led-55', quantity: 1, hoursPerDay: 6 },
      { id: 'sound-system', quantity: 1, hoursPerDay: 4 },
      { id: 'gaming-console', quantity: 1, hoursPerDay: 3 },
      { id: 'decoder-dstv', quantity: 1, hoursPerDay: 6 },
      { id: 'router', quantity: 1, hoursPerDay: 24 },
      { id: 'led-bulb-9w', quantity: 6, hoursPerDay: 6 }
    ]
  },
  'business': {
    name: 'Business Setup',
    description: 'For small businesses and shops',
    appliances: [
      { id: 'fridge-double', quantity: 1, hoursPerDay: 24 },
      { id: 'freezer-large', quantity: 1, hoursPerDay: 24 },
      { id: 'fan-ceiling', quantity: 2, hoursPerDay: 12 },
      { id: 'led-bulb-12w', quantity: 8, hoursPerDay: 12 },
      { id: 'water-dispenser', quantity: 1, hoursPerDay: 12 },
      { id: 'printer', quantity: 1, hoursPerDay: 4 },
      { id: 'router', quantity: 1, hoursPerDay: 24 }
    ]
  },
  'luxury': {
    name: 'Luxury Home Setup',
    description: 'High-end home with premium appliances',
    appliances: [
      { id: 'ac-1.5hp', quantity: 2, hoursPerDay: 8 },
      { id: 'fridge-double', quantity: 1, hoursPerDay: 24 },
      { id: 'freezer-large', quantity: 1, hoursPerDay: 24 },
      { id: 'tv-led-55', quantity: 1, hoursPerDay: 6 },
      { id: 'sound-system', quantity: 1, hoursPerDay: 4 },
      { id: 'washing-machine-large', quantity: 1, hoursPerDay: 2 },
      { id: 'water-heater', quantity: 1, hoursPerDay: 2 },
      { id: 'led-bulb-12w', quantity: 10, hoursPerDay: 8 },
      { id: 'inverter-medium', quantity: 1, hoursPerDay: 24 }
    ]
  }
};

export interface UsageAnalytics {
  totalKWh: number;
  totalCost: number;
  applianceBreakdown: {
    name: string;
    kwh: number;
    cost: number;
    percentage: number;
  }[];
  categoryBreakdown: {
    category: string;
    kwh: number;
    cost: number;
    percentage: number;
  }[];
  potentialSavings: {
    total: number;
    tips: EnergySavingTip[];
  };
}

export const calculateUsageAnalytics = (appliances: Appliance[], rate: number): UsageAnalytics => {
  const totalKWh = calculateTotalMonthlyKWh(appliances);
  const totalCost = calculateTotalMonthlyCost(appliances, rate);

  // Calculate appliance breakdown
  const applianceBreakdown = appliances.map(appliance => {
    const kwh = calculateMonthlyKWh(appliance);
    const cost = calculateMonthlyCost(kwh, rate);
    return {
      name: appliance.name,
      kwh,
      cost,
      percentage: (kwh / totalKWh) * 100
    };
  }).sort((a, b) => b.kwh - a.kwh);

  // Calculate category breakdown
  const categoryMap = new Map<string, { kwh: number; cost: number }>();
  
  appliances.forEach(appliance => {
    const category = getApplianceCategory(appliance.id);
    const kwh = calculateMonthlyKWh(appliance);
    const cost = calculateMonthlyCost(kwh, rate);
    
    const current = categoryMap.get(category) || { kwh: 0, cost: 0 };
    categoryMap.set(category, {
      kwh: current.kwh + kwh,
      cost: current.cost + cost
    });
  });

  const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, { kwh, cost }]) => ({
    category,
    kwh,
    cost,
    percentage: (kwh / totalKWh) * 100
  })).sort((a, b) => b.kwh - a.kwh);

  // Calculate potential savings
  const tips = generateEnergySavingTips(appliances);
  const totalSavings = tips.reduce((sum, tip) => sum + tip.potentialSavings, 0);

  return {
    totalKWh,
    totalCost,
    applianceBreakdown,
    categoryBreakdown,
    potentialSavings: {
      total: totalSavings,
      tips
    }
  };
};

const getApplianceCategory = (applianceId: string): string => {
  if (applianceId.startsWith('ac-') || applianceId.startsWith('fan-')) return 'Cooling';
  if (applianceId.startsWith('fridge-') || applianceId.startsWith('freezer-')) return 'Refrigeration';
  if (applianceId.startsWith('tv-') || applianceId.startsWith('decoder-') || applianceId.includes('gaming')) return 'Entertainment';
  if (applianceId.startsWith('blender-') || applianceId.startsWith('microwave-') || 
      applianceId.includes('cooker') || applianceId.includes('kettle')) return 'Kitchen';
  if (applianceId.includes('washing') || applianceId.includes('dryer') || applianceId.includes('iron')) return 'Laundry';
  if (applianceId.includes('bulb') || applianceId.includes('light')) return 'Lighting';
  if (applianceId.includes('laptop') || applianceId.includes('desktop') || 
      applianceId.includes('printer') || applianceId.includes('router')) return 'Electronics';
  if (applianceId.includes('inverter') || applianceId.includes('generator')) return 'Backup Power';
  if (applianceId.includes('water')) return 'Water Systems';
  if (applianceId.includes('stabilizer') || applianceId.includes('ups')) return 'Power Protection';
  return 'Other';
};

export const generatePDF = async (analytics: UsageAnalytics, appliances: Appliance[], rate: number) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  
  // Set up colors
  const primaryColor = '#2563eb'; // Blue
  const secondaryColor = '#64748b'; // Gray
  const accentColor = '#0ea5e9'; // Light Blue
  const successColor = '#22c55e'; // Green
  const warningColor = '#f59e0b'; // Amber
  
  // Add header with logo and title
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Add title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Electricity Bill Analysis', 20, 25);
  
  // Add date
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-NG')}`, 20, 35);
  
  // Reset text color for content
  doc.setTextColor(0, 0, 0);
  
  // Summary Section
  doc.setFillColor(240, 240, 240);
  doc.rect(10, 50, 190, 30, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Monthly Summary', 20, 65);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Usage: ${formatNumber(analytics.totalKWh)} kWh`, 20, 80);
  doc.text(`Total Cost: ${formatCurrency(analytics.totalCost)}`, 20, 90);
  doc.text(`Rate: ${formatCurrency(rate)}/kWh`, 20, 100);
  
  // Appliance Breakdown Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Appliance Usage Breakdown', 20, 120);
  
  // Create table header
  doc.setFillColor(primaryColor);
  doc.rect(20, 125, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Appliance', 25, 132);
  doc.text('Usage (kWh)', 100, 132);
  doc.text('Cost', 140, 132);
  doc.text('%', 180, 132);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Add table rows
  let y = 140;
  analytics.applianceBreakdown.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(20, y - 5, 170, 10, 'F');
    }
    
    doc.setFontSize(10);
    doc.text(item.name, 25, y);
    doc.text(formatNumber(item.kwh), 100, y);
    doc.text(formatCurrency(item.cost), 140, y);
    doc.text(`${formatNumber(item.percentage)}%`, 180, y);
    
    y += 10;
  });
  
  // Category Breakdown Section
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Category Breakdown', 20, 20);
  
  // Create category table
  doc.setFillColor(primaryColor);
  doc.rect(20, 25, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('Category', 25, 32);
  doc.text('Usage (kWh)', 100, 32);
  doc.text('Cost', 140, 32);
  doc.text('%', 180, 32);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  y = 40;
  analytics.categoryBreakdown.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Alternate row colors
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(20, y - 5, 170, 10, 'F');
    }
    
    doc.setFontSize(10);
    doc.text(item.category, 25, y);
    doc.text(formatNumber(item.kwh), 100, y);
    doc.text(formatCurrency(item.cost), 140, y);
    doc.text(`${formatNumber(item.percentage)}%`, 180, y);
    
    y += 10;
  });
  
  // Energy Saving Tips Section
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Energy Saving Tips', 20, 20);
  
  y = 30;
  analytics.potentialSavings.tips.forEach((tip, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Tip box
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(20, y - 5, 170, 35, 3, 3, 'F');
    
    // Tip title
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.text(tip.title, 25, y + 5);
    
    // Tip description
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const splitText = doc.splitTextToSize(tip.tip, 160);
    doc.text(splitText, 25, y + 15);
    
    // Potential savings
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(successColor);
    doc.text(`Potential Savings: ${formatCurrency(tip.potentialSavings)}`, 25, y + 30);
    
    y += 45;
  });
  
  // Total Potential Savings
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Total Potential Monthly Savings', 20, y + 10);
  doc.setTextColor(successColor);
  doc.text(formatCurrency(analytics.potentialSavings.total), 20, y + 20);
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor);
    doc.text(
      `Page ${i} of ${pageCount} • Generated by ElectricBill Calculator`,
      105,
      285,
      { align: 'center' }
    );
  }
  
  return doc;
};