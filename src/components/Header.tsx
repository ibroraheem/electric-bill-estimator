import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-6 px-4 rounded-b-lg shadow-md mb-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center">
          <Zap size={24} className="text-amber-300 mr-2" />
          <h1 className="text-xl font-bold">ElectricBill Calculator</h1>
        </div>
        
        <p className="mt-2 text-center text-sm text-blue-100 max-w-2xl mx-auto">
          Estimate your monthly electricity costs based on appliance usage and power consumption.
        </p>
      </div>
    </header>
  );
};

export default Header;