import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8 px-4 md:px-6 rounded-b-lg shadow-md mb-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center md:justify-start">
          <Zap size={32} className="text-amber-300 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">ElectricBill Calculator</h1>
        </div>
        
        <p className="mt-2 text-center md:text-left text-blue-100 max-w-2xl">
          Estimate your monthly electricity costs based on appliance usage and power consumption.
        </p>
      </div>
    </header>
  );
};

export default Header;