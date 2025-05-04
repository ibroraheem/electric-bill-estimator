export interface Appliance {
  id: string;
  name: string;
  powerWatts: number;
  hoursPerDay: number;
  quantity: number;
}

export interface ApplianceUsage {
  appliance: Appliance;
  monthlyKWh: number;
  monthlyCost: number;
}

export interface ElectricityBand {
  id: string;
  name: string;
  rate: number;
  maxHours: number;
}

export interface StandardAppliance {
  id: string;
  name: string;
  powerWatts: number;
}

export interface EnergySavingTip {
  title: string;
  tip: string;
  potentialSavings: number;
}