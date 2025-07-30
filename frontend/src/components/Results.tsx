/**
 * Results Component - Compact User-Friendly Interface
 * 
 * Clean, compact results display with minimal scrolling.
 * Everything on one page with clear, readable fonts.
 */

import React from 'react';
import { ResultsProps } from '../types.ts';
import { formatCurrency, formatPercentage, formatLargeNumber } from '../services/api.ts';
import MetricCard from './MetricCard.tsx';
import { ROIProjectionChart, CostBenefitChart } from './Charts.tsx';

const Results: React.FC<ResultsProps> = ({ data, isLoading, error }) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-800 font-bold">Analyzing your project...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <div className="flex items-center">
            <span className="text-red-900 font-bold text-lg">Analysis Error</span>
          </div>
          <p className="mt-2 text-red-800 text-base">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Main Score - Compact and Prominent */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 border-2 border-blue-300">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Project Score</h3>
          <div className="text-6xl font-bold text-blue-700 mb-4 drop-shadow-lg">
            {Math.min(100, Math.max(0, data.ml_score)).toFixed(1)}
          </div>
          <p className="text-xl text-gray-800 mb-3 font-semibold">out of 100</p>
          <div className="bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg p-4 border border-blue-300 shadow-md">
            <p className="text-base text-blue-900 font-bold leading-relaxed">
              Based on investment, social impact, and long-term returns
            </p>
          </div>
        </div>
      </div>

      {/* Key Numbers - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-green-200">
          <p className="text-sm text-gray-700 mb-2 font-bold">Cost-Benefit Ratio</p>
          <p className="text-3xl font-bold text-green-600 mb-1">
            {data.cost_benefit_analysis.cost_benefit_ratio.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 font-semibold">Benefits vs Costs</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-blue-200">
          <p className="text-sm text-gray-700 mb-2 font-bold">ROI</p>
          <p className="text-3xl font-bold text-blue-600 mb-1">
            {Math.min(100, Math.max(-100, data.roi_analysis.roi_percentage)).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 font-semibold">Return on Investment</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-yellow-200">
          <p className="text-sm text-gray-700 mb-2 font-bold">Risk Level</p>
          <p className={`text-3xl font-bold mb-1 ${
            data.risk_analysis.risk_level === 'Low' ? 'text-green-600' : 
            data.risk_analysis.risk_level === 'Medium' ? 'text-yellow-600' : 
            'text-red-600'
          }`}>
            {data.risk_analysis.risk_level}
          </p>
          <p className="text-xs text-gray-600 font-semibold">Risk Score: {Math.min(100, Math.max(0, data.risk_analysis.risk_score))}/100</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-4 text-center border border-green-200">
          <p className="text-sm text-gray-700 mb-2 font-bold">Social Impact</p>
          <p className="text-3xl font-bold text-green-600 mb-1">
            {Math.min(100, Math.max(0, data.social_impact.social_impact_score)).toFixed(1)}/100
          </p>
          <p className="text-xs text-gray-600 font-semibold">Community Benefits</p>
        </div>
      </div>

      {/* Financial Summary - Compact Cards */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-300">
            <p className="text-sm text-gray-700 mb-2 font-bold">Total Investment</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(data.roi_analysis.total_investment)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-300">
            <p className="text-sm text-gray-700 mb-2 font-bold">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(data.roi_analysis.total_revenue)}
            </p>
          </div>
          
          <div className={`rounded-lg p-4 text-center border ${
            data.roi_analysis.total_revenue - data.roi_analysis.total_investment >= 0 
              ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
              : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
          }`}>
            <p className="text-sm text-gray-700 mb-2 font-bold">Net Profit</p>
            <p className={`text-2xl font-bold ${
              data.roi_analysis.total_revenue - data.roi_analysis.total_investment >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(data.roi_analysis.total_revenue - data.roi_analysis.total_investment)}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ROIProjectionChart
            data={data}
            title="ROI Projection"
          />
          <CostBenefitChart
            data={data}
            title="Cost-Benefit Breakdown"
          />
        </div>
      </div>

      {/* Social Impact - Compact Display */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Social Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-300">
            <p className="text-sm text-gray-700 mb-2 font-bold">People Served</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatLargeNumber(data.social_impact.beneficiaries)}
            </p>
            <p className="text-xs text-gray-600 font-semibold">Direct beneficiaries</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-300">
            <p className="text-sm text-gray-700 mb-2 font-bold">Jobs Created</p>
            <p className="text-2xl font-bold text-green-600">
              {data.social_impact.job_creation}
            </p>
            <p className="text-xs text-gray-600 font-semibold">Direct employment</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 text-center border border-emerald-300">
            <p className="text-sm text-gray-700 mb-2 font-bold">CO2 Saved (tons/year)</p>
            <p className="text-2xl font-bold text-emerald-600">
              {formatLargeNumber(data.social_impact.co2_saved)}
            </p>
            <p className="text-xs text-gray-600 font-semibold">Environmental impact</p>
          </div>
        </div>


      </div>

      {/* Key Factors - Compact List */}
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Key Factors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.recommendation.key_factors.slice(0, 5).map((factor, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-md p-3 border border-gray-300">
              <span className="text-xs text-gray-900 font-semibold">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation - Now at Bottom */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendation</h3>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">
            {data.recommendation.funding_recommendation}
          </h4>
          <p className="text-lg text-gray-700 mb-3 font-semibold">
            Confidence: {Math.min(100, Math.max(0, data.recommendation.confidence)).toFixed(1)}%
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            This recommendation is based on your project's financial viability, 
            social benefits, and risk assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results; 