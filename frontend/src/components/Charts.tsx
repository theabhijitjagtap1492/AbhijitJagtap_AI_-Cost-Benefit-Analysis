/**
 * Charts Component - User-Friendly Visual Representations
 * 
 * Simple, clean charts that are easy to understand.
 * Visual representations that don't require complex analysis.
 */

import React from 'react';
import { AnalysisResponse, ChartProps } from '../types.ts';
import { formatCurrency, formatPercentage, formatLargeNumber } from '../services/api.ts';

// Simple Progress Bar Component
const ProgressBar: React.FC<{ value: number; max: number; color: string; label: string }> = ({ 
  value, 
  max, 
  color, 
  label 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
        <span>{label}</span>
        <span>{value.toLocaleString()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Simple Metric Cards
const MetricCard: React.FC<{ title: string; value: string; color: string; icon?: string }> = ({ 
  title, 
  value, 
  color, 
  icon 
}) => (
  <div className={`bg-gradient-to-br ${color} rounded-lg p-4 text-center border border-gray-200`}>
    <h4 className="text-sm font-bold text-gray-800 mb-2">{title}</h4>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

// ROI Projection - Simple Visual
export const ROIProjectionChart: React.FC<ChartProps> = ({ data, title }) => {
  const roi = data.roi_analysis?.roi_percentage || 0;
  const isPositive = roi >= 0;
  const projection = data.roi_analysis?.projection || [];
  
  // Add safety check for undefined/null data
  if (!data.roi_analysis || !projection || projection.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <div className="text-center text-gray-500">
          <p>No ROI projection data available</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold mb-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {Math.min(100, Math.max(-100, roi)).toFixed(1)}%
        </div>
        <p className="text-sm text-gray-600">
          {isPositive ? 'Positive' : 'Negative'} Return on Investment
        </p>
      </div>
      
      {/* Line Graph Visualization */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">ROI Over Time</h4>
        <div className="relative h-48 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <svg className="w-full h-full" viewBox="0 0 400 160">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="32" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Y-axis labels */}
            <text x="15" y="20" className="text-xs fill-gray-500">50%</text>
            <text x="15" y="52" className="text-xs fill-gray-500">25%</text>
            <text x="15" y="84" className="text-xs fill-gray-500">0%</text>
            <text x="15" y="116" className="text-xs fill-gray-500">-25%</text>
            <text x="15" y="148" className="text-xs fill-gray-500">-50%</text>
            
            {/* Zero line for reference */}
            <line x1="50" y1="80" x2="350" y2="80" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Line graph */}
            <polyline
              points={projection.map((item, index) => {
                const x = 50 + (index * 300 / (projection.length - 1));
                const y = 80 - (item.roi * 0.8); // Scale ROI to fit graph
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {projection.map((item, index) => {
              const x = 50 + (index * 300 / (projection.length - 1));
              const y = 80 - (item.roi * 0.8);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={isPositive ? "#22c55e" : "#ef4444"}
                />
              );
            })}
            
            {/* X-axis labels */}
            {projection.filter((_, index) => index % 4 === 0).map((item, index) => {
              const x = 50 + (index * 4 * 300 / (projection.length - 1));
              return (
                <text key={index} x={x} y="155" className="text-xs fill-gray-500" textAnchor="middle">
                  Y{item.year}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Investment</span>
          <span className="font-semibold">{formatCurrency(data.roi_analysis.total_investment)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Revenue</span>
          <span className="font-semibold">{formatCurrency(data.roi_analysis.total_revenue)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Net Result</span>
          <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(data.roi_analysis.total_revenue - data.roi_analysis.total_investment)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Cost-Benefit - Simple Visual
export const CostBenefitChart: React.FC<ChartProps> = ({ data, title }) => {
  const setupCost = data.roi_analysis?.total_investment || 0;
  const maintenanceCost = (data.roi_analysis?.total_investment || 0) * 0.02; // 2% of setup cost
  const energyRevenue = data.roi_analysis?.total_revenue || 0;
  const environmentalBenefit = (data.social_impact?.co2_saved_tons_per_year || 0) * 50; // CO2 value at $50/ton
  const socialBenefit = (data.social_impact?.beneficiaries || 0) * 0.1; // Social value at $0.1/person
  
  const totalCosts = setupCost + maintenanceCost;
  const totalBenefits = energyRevenue + environmentalBenefit + socialBenefit;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard 
          title="Total Costs" 
          value={formatCurrency(totalCosts)} 
          color="from-red-50 to-red-100" 
        />
        <MetricCard 
          title="Total Benefits" 
          value={formatCurrency(totalBenefits)} 
          color="from-green-50 to-green-100" 
        />
      </div>
      
      <div className="space-y-3">
        <ProgressBar 
          value={setupCost} 
          max={totalCosts} 
          color="bg-red-500" 
          label="Setup Cost" 
        />
        <ProgressBar 
          value={maintenanceCost} 
          max={totalCosts} 
          color="bg-orange-500" 
          label="Maintenance Cost" 
        />
        <ProgressBar 
          value={energyRevenue} 
          max={totalBenefits} 
          color="bg-green-500" 
          label="Energy Revenue" 
        />
        <ProgressBar 
          value={environmentalBenefit} 
          max={totalBenefits} 
          color="bg-teal-500" 
          label="Environmental Benefit" 
        />
        <ProgressBar 
          value={socialBenefit} 
          max={totalBenefits} 
          color="bg-blue-500" 
          label="Social Benefit" 
        />
      </div>
    </div>
  );
};

// Social Impact - Simple Visual
export const SocialImpactChart: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {formatLargeNumber(data.social_impact.beneficiaries)}
          </div>
          <div className="text-xs text-gray-600">People Served</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {data.social_impact.job_creation}
          </div>
          <div className="text-xs text-gray-600">Jobs Created</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">
            {formatLargeNumber(data.social_impact.co2_saved)}
          </div>
          <div className="text-xs text-gray-600">CO2 Saved (tons)</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
        <div className="text-center">
                     <div className="text-3xl font-bold text-gray-900 mb-1">
             {Math.min(100, Math.max(0, data.social_impact.social_impact_score)).toFixed(1)}/100
           </div>
          <div className="text-sm text-gray-600">Social Impact Score</div>
        </div>
      </div>
    </div>
  );
};

// Risk Analysis - Simple Visual
export const RiskAnalysisChart: React.FC<ChartProps> = ({ data, title }) => {
  const riskScore = data.risk_analysis.risk_score;
  const riskLevel = data.risk_analysis.risk_level;
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold mb-2 ${getRiskColor(riskLevel)}`}>
          {riskLevel}
        </div>
        <p className="text-sm text-gray-600">Risk Level</p>
      </div>
      
      <div className="space-y-3">
        <ProgressBar 
          value={riskScore} 
          max={100} 
          color={riskLevel === 'Low' ? 'bg-green-500' : riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} 
          label="Risk Score" 
        />
        
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div className="text-center">
            <div className="font-semibold">0-30</div>
            <div>Low Risk</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">31-60</div>
            <div>Medium Risk</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">61-100</div>
            <div>High Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Revenue vs Cost - Simple Visual
export const RevenueCostChart: React.FC<ChartProps> = ({ data, title }) => {
  const investment = data.roi_analysis.total_investment;
  const revenue = data.roi_analysis.total_revenue;
  const profit = revenue - investment;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl font-bold text-red-600 mb-1">
            {formatCurrency(investment)}
          </div>
          <div className="text-xs text-gray-600">Investment</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-600 mb-1">
            {formatCurrency(revenue)}
          </div>
          <div className="text-xs text-gray-600">Revenue</div>
        </div>
        <div className="text-center">
          <div className={`text-xl font-bold mb-1 ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(profit)}
          </div>
          <div className="text-xs text-gray-600">Profit/Loss</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <ProgressBar 
          value={investment} 
          max={Math.max(investment, revenue)} 
          color="bg-red-500" 
          label="Investment" 
        />
        <ProgressBar 
          value={revenue} 
          max={Math.max(investment, revenue)} 
          color="bg-green-500" 
          label="Revenue" 
        />
      </div>
    </div>
  );
};

// Chart Container - Simple Wrapper
export const ChartContainer: React.FC<{ children: React.ReactNode; title?: string }> = ({ 
  children, 
  title 
}) => (
  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
    {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
    {children}
  </div>
); 