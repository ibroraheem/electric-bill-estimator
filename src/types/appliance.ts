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