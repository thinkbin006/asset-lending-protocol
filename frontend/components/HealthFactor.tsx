"use client";

import React from 'react';

interface HealthFactorProps {
  collateralValue: number; // e.g., $1000
  borrowedAmount: number;   // e.g., $500
  ltv: number;             // e.g., 0.8 (80%)
}

export const HealthFactor = ({ collateralValue, borrowedAmount, ltv }: HealthFactorProps) => {
  // Prevent division by zero
  const healthFactor = borrowedAmount === 0 
    ? Infinity 
    : (collateralValue * ltv) / borrowedAmount;

  // Determine color and label
  let color = "text-green-500";
  let barColor = "bg-green-500";
  let status = "Healthy";

  if (healthFactor < 1.1) {
    color = "text-red-500";
    barColor = "bg-red-500";
    status = "LIQUIDATION RISK";
  } else if (healthFactor < 1.5) {
    color = "text-yellow-500";
    barColor = "bg-yellow-500";
    status = "Moderate Risk";
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 font-medium text-sm">Account Health</span>
        <span className={`font-bold ${color}`}>{status}</span>
      </div>
      
      <div className="text-3xl font-mono mb-4">
        {healthFactor === Infinity ? "∞" : healthFactor.toFixed(2)}
      </div>

      {/* Visual Progress Bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${barColor}`} 
          style={{ width: `${Math.min((healthFactor / 3) * 100, 100)}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-500 mt-2 italic">
        Liquidation occurs if Health Factor drops below 1.0
      </p>
    </div>
  );
};