/**
 * TypeScript type definitions for the AI Cost-Benefit Analysis Tool
 * 
 * This file contains all the interfaces and types used throughout the application
 * for type safety and better development experience.
 */

// =============================================================================
// PROJECT INPUT TYPES
// =============================================================================

/**
 * Interface for the project input data that users submit through the form
 * This matches the backend ProjectInput model structure
 */
export interface ProjectInput {
  project_name: string;            // Required project identifier
  project_type: string | null;     // Type of renewable energy project (Solar/Wind/Hybrid)
  region: string | null;           // Geographic region (Urban/Rural/Semi-Urban)
  capacity_mw: number | null;      // Project capacity in megawatts
  setup_cost: number | null;       // Initial investment cost in USD
  maintenance_cost: number | null; // Annual maintenance cost in USD
  duration_years: number | null;   // Project lifespan in years
  expected_generation_mwh: number | null; // Annual energy generation in MWh
  co2_saved_tons_per_year: number | null; // Annual CO2 emissions reduction
  beneficiary_count: number | null; // Number of people served
  risk_score: number | null;       // Project risk assessment (0-100)
  subsidy_eligible: boolean | null; // Government subsidy qualification
  job_creation_count: number | null; // Direct jobs created
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Interface for the cost-benefit analysis breakdown returned by the API
 */
export interface CostBenefitAnalysis {
  total_cost: number;              // Total project cost over lifetime
  total_benefit: number;           // Total calculated benefits
  cost_benefit_ratio: number;      // Ratio of benefits to costs
  breakdown: {
    setup_cost: number;            // Initial setup costs
    maintenance_cost: number;      // Total maintenance costs over lifetime
    energy_revenue: number;        // Revenue from energy generation
    environmental_benefit: number; // Monetary value of environmental benefits
    social_benefit: number;        // Monetary value of social benefits
  };
}

/**
 * Interface for ROI projection data points
 */
export interface ROIProjection {
  year: number;                    // Project year
  roi: number;                     // ROI percentage for that year
  cumulative_revenue: number;      // Total revenue up to that year
  cumulative_cost: number;         // Total cost up to that year
}

/**
 * Interface for the ROI analysis returned by the API
 */
export interface ROIAnalysis {
  annual_revenue: number;          // Annual revenue from energy generation
  total_revenue: number;           // Total revenue over project lifetime
  total_investment: number;        // Total investment required
  roi_percentage: number;          // Overall ROI percentage
  risk_adjusted_roi: number;       // ROI adjusted for risk factors
  projection: ROIProjection[];     // Year-by-year ROI projections
}

/**
 * Interface for risk analysis data
 */
export interface RiskAnalysis {
  risk_score: number;              // Risk score (0-100)
  risk_factor: number;             // Risk adjustment factor
  risk_level: string;              // Risk level classification (Low/Medium/High)
}

/**
 * Interface for social impact metrics
 */
export interface SocialImpact {
  beneficiaries: number;            // Number of people served
  job_creation: number;            // Number of jobs created
  co2_saved: number;               // Annual CO2 savings in tons
  social_impact_score: number;     // Calculated social impact score
}

/**
 * Interface for AI recommendations
 */
export interface Recommendation {
  funding_recommendation: string;   // AI recommendation (Strongly Recommend/Recommend/Consider/Not Recommended)
  confidence: number;               // Confidence level in the recommendation
  key_factors: string[];           // Key factors influencing the recommendation
}

/**
 * Main API response interface that combines all analysis results
 */
export interface AnalysisResponse {
  ml_score: number;                // Machine learning-based score (0-100)
  cost_benefit_analysis: CostBenefitAnalysis;
  roi_analysis: ROIAnalysis;
  risk_analysis: RiskAnalysis;
  social_impact: SocialImpact;
  recommendation: Recommendation;
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * Props for the main form component
 */
export interface ProjectFormProps {
  onSubmit: (data: ProjectInput) => void;  // Callback function when form is submitted
  isLoading: boolean;                       // Loading state for form submission
}

/**
 * Props for the results display component
 */
export interface ResultsProps {
  data: AnalysisResponse | null;            // Analysis results data
  isLoading: boolean;                       // Loading state for results
  error: string | null;                     // Error message if any
}

/**
 * Props for individual chart components
 */
export interface ChartProps {
  data: any;                               // Chart data
  title: string;                           // Chart title
  className?: string;                      // Optional CSS classes
}

/**
 * Props for metric cards
 */
export interface MetricCardProps {
  title: string;                           // Card title
  value: string | number;                  // Display value
  subtitle?: string;                       // Optional subtitle
  color?: 'green' | 'blue' | 'red' | 'yellow' | 'gray'; // Color theme
  icon?: string;                           // Optional icon
}

// =============================================================================
// FORM STATE TYPES
// =============================================================================

/**
 * Interface for form validation errors
 */
export interface FormErrors {
  [key: string]: string;                   // Field name to error message mapping
}

/**
 * Interface for form state management
 */
export interface FormState {
  data: ProjectInput;                      // Current form data
  errors: FormErrors;                      // Validation errors
  isSubmitting: boolean;                   // Submission state
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Type for API loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Type for chart data series
 */
export interface ChartDataPoint {
  name: string;                            // Data point name
  value: number;                           // Data point value
  [key: string]: any;                      // Additional properties
}

/**
 * Type for dropdown options
 */
export interface SelectOption {
  value: string;                           // Option value
  label: string;                           // Option display label
} 