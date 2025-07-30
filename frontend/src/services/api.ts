/**
 * API Service for AI Cost-Benefit Analysis Tool
 * 
 * This file contains all the API communication logic using Axios for HTTP requests
 * to the FastAPI backend. It provides a clean interface for making API calls
 * and handling responses/errors consistently.
 */

import axios, { AxiosResponse, AxiosError } from 'axios';
import { ProjectInput, AnalysisResponse } from '../types';

// =============================================================================
// API CONFIGURATION
// =============================================================================

/**
 * Base URL for the FastAPI backend
 * In development, this points to the local FastAPI server
 * In production, this would be the deployed backend URL
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Axios instance configured with base URL and default headers
 * This ensures consistent API communication across the application
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 second timeout for API requests
});

// =============================================================================
// REQUEST/RESPONSE INTERCEPTORS
// =============================================================================

/**
 * Request interceptor to log API calls in development
 * This helps with debugging and monitoring API usage
 */
apiClient.interceptors.request.use(
  (config) => {
    // Log API requests in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    // Log request errors
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common response patterns
 * This provides consistent error handling and response processing
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful API responses in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Enhanced error handling with detailed error messages
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as any;
      
      switch (status) {
        case 400:
          errorMessage = data?.detail || 'Invalid request data';
          break;
        case 422:
          errorMessage = 'Validation error: Please check your input data';
          break;
        case 500:
          errorMessage = 'Server error: Please try again later';
          break;
        default:
          errorMessage = data?.detail || `Server error (${status})`;
      }
    } else if (error.request) {
      // Network error - no response received
      errorMessage = 'Network error: Please check your connection';
    } else {
      // Other error (e.g., request configuration)
      errorMessage = error.message || 'Request configuration error';
    }
    
    console.error('❌ API Error:', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

// =============================================================================
// API ENDPOINTS
// =============================================================================

/**
 * Health check endpoint to verify backend connectivity
 * This is useful for checking if the backend is running
 * 
 * @returns Promise<boolean> - True if backend is healthy, false otherwise
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

/**
 * Main project evaluation endpoint
 * Sends project data to the backend for AI-based cost-benefit analysis
 * 
 * @param projectData - The project input data to evaluate
 * @returns Promise<AnalysisResponse> - Comprehensive analysis results
 * @throws Error - If the API request fails or returns an error
 */
export const evaluateProject = async (projectData: ProjectInput): Promise<AnalysisResponse> => {
  try {
    // Validate that required fields are present
    if (!projectData.project_type || !projectData.region) {
      throw new Error('Missing required project data');
    }
    
    // Make POST request to the evaluate endpoint
    const response = await apiClient.post<AnalysisResponse>('/evaluate', projectData);
    
    // Validate response structure
    if (!response.data || typeof response.data.ml_score !== 'number') {
      throw new Error('Invalid response format from server');
    }
    
    return response.data;
  } catch (error) {
    // Re-throw the error with additional context
    if (error instanceof Error) {
      throw new Error(`Project evaluation failed: ${error.message}`);
    }
    throw new Error('Project evaluation failed: Unknown error');
  }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Formats currency values for display
 * Converts numbers to formatted currency strings
 * 
 * @param value - The numeric value to format
 * @param currency - The currency code (default: USD)
 * @returns string - Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats large numbers with appropriate suffixes (K, M, B)
 * Makes large numbers more readable in the UI
 * 
 * @param value - The numeric value to format
 * @returns string - Formatted number string
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Formats percentage values for display
 * Ensures consistent percentage formatting across the application
 * 
 * @param value - The numeric percentage value
 * @param decimals - Number of decimal places (default: 1)
 * @returns string - Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Validates project input data before sending to API
 * Performs client-side validation to catch errors early
 * 
 * @param data - The project input data to validate
 * @returns string[] - Array of validation error messages
 */
export const validateProjectData = (data: ProjectInput): string[] => {
  const errors: string[] = [];
  
  // Check required fields only
  if (!data.project_name || data.project_name.trim() === '') errors.push('Project name is required');
  if (!data.project_type) errors.push('Project type is required');
  if (!data.region) errors.push('Region is required');
  
  // No numeric field validation - allow any values
  
  return errors;
}; 