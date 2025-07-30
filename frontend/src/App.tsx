/**
 * Main App Component - Compact User-Friendly Interface
 * 
 * Clean, compact interface with minimal scrolling.
 * Everything displayed efficiently with warm, welcoming colors.
 */

import React, { useState, useEffect } from 'react';
import { ProjectInput, AnalysisResponse } from './types.ts';
import { evaluateProject, checkHealth } from './services/api.ts';
import ProjectForm from './components/ProjectForm.tsx';
import Results from './components/Results.tsx';

const App: React.FC = () => {
  // State management
  const [analysisResults, setAnalysisResults] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  // Check backend health on mount
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const isHealthy = await checkHealth();
        setBackendHealthy(isHealthy);
        if (!isHealthy) {
          setError('Backend service is not available. Please ensure the FastAPI server is running.');
        }
      } catch (err) {
        setBackendHealthy(false);
        setError('Unable to connect to the analysis service.');
      }
    };
    checkBackendHealth();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (projectData: ProjectInput) => {
    setError(null);
    setIsLoading(true);
    setAnalysisResults(null);
    
    try {
      if (backendHealthy === false) {
        throw new Error('Backend service is not available.');
      }
      
      const results = await evaluateProject(projectData);
      setAnalysisResults(results);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setAnalysisResults(null);
    setError(null);
    
    // Scroll back to form
    const formElement = document.getElementById('form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header - Compact */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-1 text-white">
            AI Infrastructure Cost-Benefit Analysis
          </h1>
          <p className="text-xs text-center opacity-95 text-blue-100">
            Evaluate renewable energy projects with AI-powered analysis
          </p>
        </div>
      </div>
      
      {/* Backend Status - Compact */}
      <div className="max-w-7xl mx-auto px-4 py-1">
        {backendHealthy === null ? (
          <div className="text-center text-xs text-gray-600 font-medium bg-white rounded-full py-1 px-2 inline-block mx-auto shadow-sm">
            Checking service status...
          </div>
        ) : (
          <div className={`text-center text-xs font-semibold rounded-full py-1 px-2 inline-block mx-auto shadow-sm ${
            backendHealthy 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {backendHealthy ? '✓ Service Available' : '✗ Service Unavailable'}
          </div>
        )}
      </div>
      
      {/* Main Content - Compact */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="space-y-3">
          {/* Form Section */}
          <div id="form-section">
            <ProjectForm 
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
          
          {/* Loading State - Compact */}
          {isLoading && (
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100">
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500 mx-auto mb-3"></div>
                  <p className="text-base text-gray-800 font-semibold mb-1">Analyzing your project...</p>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Calculating cost-benefit score, social impact, and long-term returns
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Section - Compact */}
          {analysisResults && (
            <div id="results-section" className="space-y-3">
              <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-lg border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Analysis Results
                </h2>
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 text-xs shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Analyze New Project
                </button>
              </div>
              
              <Results 
                data={analysisResults}
                isLoading={isLoading}
                error={error}
              />
            </div>
          )}
          
          {/* Error Display - Compact */}
          {error && !analysisResults && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-4 shadow-lg">
              <div className="flex items-center mb-2">
                <span className="text-red-800 font-bold text-sm">Oops! Something went wrong</span>
              </div>
              <p className="text-red-700 text-xs mb-2">{error}</p>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-1 px-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-xs"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer - Compact */}
      <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 mt-4 py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-700">
          <p className="text-xs font-medium">
            AI Infrastructure Cost-Benefit Analysis Tool
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Making renewable energy projects easier to evaluate
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;