/**
 * MetricCard Component - Simple Interface
 * 
 * Clean metric display card without icons.
 * Simple and easy to understand.
 */

import React from 'react';
import { MetricCardProps } from '../types.ts';

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color = 'blue'
}) => {
  // Color themes
  const colorThemes = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      valueColor: 'text-green-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      valueColor: 'text-blue-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      valueColor: 'text-red-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      valueColor: 'text-yellow-600'
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-800',
      valueColor: 'text-gray-600'
    }
  };

  return (
    <div className={`${colorThemes[color].bg} ${colorThemes[color].border} border rounded-lg p-4`}>
      <div className="text-center">
        <h3 className={`text-sm font-medium ${colorThemes[color].text} mb-2`}>
          {title}
        </h3>
        
        <div className="mb-2">
          <p className={`text-2xl font-bold ${colorThemes[color].valueColor}`}>
            {typeof value === 'number' && value >= 1000 
              ? value.toLocaleString() 
              : value}
          </p>
        </div>
        
        {subtitle && (
          <p className={`text-sm ${colorThemes[color].text} opacity-75`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MetricCard; 