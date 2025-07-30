/**
 * ProjectForm Component - Compact User-Friendly Interface
 * 
 * Clean, compact form with minimal scrolling.
 * Easy to fill out and understand with warm, welcoming colors.
 */

import React, { useState } from 'react';
import { ProjectInput, ProjectFormProps } from '../types.ts';
import { validateProjectData } from '../services/api.ts';

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading }) => {
  // Form data state
  const [formData, setFormData] = useState<ProjectInput>({
    project_name: '',
    project_type: '',
    region: '',
    capacity_mw: null,
    setup_cost: null,
    maintenance_cost: null,
    duration_years: null,
    expected_generation_mwh: null,
    co2_saved_tons_per_year: null,
    beneficiary_count: null,
    risk_score: null,
    subsidy_eligible: null,
    job_creation_count: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number | boolean | null = value;
    
    if (type === 'number') {
      parsedValue = value === '' ? null : parseFloat(value);
    } else if (name === 'subsidy_eligible') {
      parsedValue = value === '' ? null : value === 'true';
    } else if (value === '') {
      parsedValue = null;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validationErrors = validateProjectData(formData);
      
      if (validationErrors.length > 0) {
        const fieldErrors: { [key: string]: string } = {};
        validationErrors.forEach(error => {
          if (error.includes('Project name')) fieldErrors.project_name = error;
          else if (error.includes('Project type')) fieldErrors.project_type = error;
          else if (error.includes('Region')) fieldErrors.region = error;
          else if (error.includes('Capacity')) fieldErrors.capacity_mw = error;
          else if (error.includes('Setup cost')) fieldErrors.setup_cost = error;
          else if (error.includes('Maintenance cost')) fieldErrors.maintenance_cost = error;
          else if (error.includes('Duration')) fieldErrors.duration_years = error;
          else if (error.includes('Expected generation')) fieldErrors.expected_generation_mwh = error;
          else if (error.includes('CO2 savings')) fieldErrors.co2_saved_tons_per_year = error;
          else if (error.includes('Beneficiary count')) fieldErrors.beneficiary_count = error;
          else if (error.includes('Risk score')) fieldErrors.risk_score = error;
          else if (error.includes('Job creation')) fieldErrors.job_creation_count = error;
          else fieldErrors.general = error;
        });
        
        setErrors(fieldErrors);
        return;
      }
      
      setErrors({});
      await onSubmit(formData);
      
    } catch (error) {
      setErrors({ general: 'Failed to submit form. Please try again.' });
    }
  };

  // Render form field
  const renderField = (
    name: keyof ProjectInput,
    label: string,
    type: string = 'text',
    placeholder?: string,
    options?: { value: string; label: string }[],
    min?: number,
    max?: number,
    step?: number
  ) => {
    const value = formData[name];
    const error = errors[name];
    
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-base font-semibold text-gray-800 mb-2">
          {label}
        </label>
        
        {type === 'select' && options ? (
          <select
            id={name}
            name={name}
            value={name === 'subsidy_eligible' ? (value === null ? '' : (value as boolean).toString()) : (value as string) || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all duration-200 hover:border-blue-300 ${error ? 'border-red-400' : ''}`}
          >
            <option value="">Select...</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value === null ? '' : value as string | number}
            onChange={handleInputChange}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            required={name === 'project_name'}
            className={`w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base transition-all duration-200 hover:border-blue-300 ${error ? 'border-red-400' : ''}`}
          />
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg p-4 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
        Project Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General error */}
        {errors.general && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-base text-red-700 font-semibold">{errors.general}</p>
          </div>
        )}
        
        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
            {renderField(
              'project_name',
              'Project Name *',
              'text',
              'Enter project name'
            )}
            
            {renderField(
              'project_type',
              'Project Type',
              'select',
              undefined,
              [
                { value: 'Solar', label: 'Solar Energy' },
                { value: 'Wind', label: 'Wind Energy' },
                { value: 'Hybrid', label: 'Hybrid Energy' }
              ]
            )}
            
            {renderField(
              'region',
              'Region',
              'select',
              undefined,
              [
                { value: 'Urban', label: 'Urban' },
                { value: 'Semi-Urban', label: 'Semi-Urban' },
                { value: 'Rural', label: 'Rural' }
              ]
            )}
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
            {renderField(
              'capacity_mw',
              'Capacity (MW)',
              'number',
              'Enter capacity'
            )}
            
            {renderField(
              'expected_generation_mwh',
              'Expected Generation (MWh/year)',
              'number',
              'Enter annual generation'
            )}
            
            {renderField(
              'duration_years',
              'Project Duration (years)',
              'number',
              'Enter duration'
            )}
          </div>
        </div>
        
        {/* Financial Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            {renderField(
              'setup_cost',
              'Setup Cost (USD)',
              'number',
              'Enter setup cost'
            )}
            
            {renderField(
              'maintenance_cost',
              'Annual Maintenance Cost (USD)',
              'number',
              'Enter maintenance cost'
            )}
            
            {renderField(
              'subsidy_eligible',
              'Eligible for Government Subsidies',
              'select',
              undefined,
              [
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' }
              ]
            )}
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
            {renderField(
              'co2_saved_tons_per_year',
              'CO2 Savings (tons/year)',
              'number',
              'Enter CO2 savings'
            )}
            
            {renderField(
              'beneficiary_count',
              'Number of Beneficiaries',
              'number',
              'Enter beneficiary count'
            )}
            
            {renderField(
              'job_creation_count',
              'Jobs Created',
              'number',
              'Enter jobs created'
            )}
          </div>
        </div>
        
        {/* Risk Assessment */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
          {renderField(
            'risk_score',
            'Risk Score',
            'number',
            'Enter risk score'
          )}
          
          <p className="text-sm text-gray-700 mt-2 font-medium">
            Risk Guide: 0-30 (Low), 31-60 (Medium), 61-100 (High)
          </p>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Analyzing...
              </div>
            ) : (
              'Analyze Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 