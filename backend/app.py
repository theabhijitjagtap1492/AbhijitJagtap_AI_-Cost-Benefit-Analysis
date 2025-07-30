
"""
AI Cost-Benefit Analysis API - Main Application

This module contains the FastAPI application for the AI Cost-Benefit Analysis system.
It provides RESTful API endpoints for evaluating renewable energy infrastructure projects
using machine learning and rule-based analysis.

Key Features:
- Project evaluation with ML-based scoring
- Comprehensive cost-benefit analysis
- ROI calculation with regional pricing
- Risk assessment and social impact analysis
- Real-time recommendations

Author: AI Cost-Benefit Analysis Team
Version: 1.0.0
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import Optional
import pandas as pd
import os

from model import load_ml_pipeline

# =============================================================================
# FASTAPI APPLICATION CONFIGURATION
# =============================================================================

# Create FastAPI app with metadata
app = FastAPI(
    title="Renewable Energy Cost-Benefit Analysis API",
    description="Evaluate renewable energy projects via rule-based and ML-based scoring",
    version="1.0.0",
)

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# DATASET LOADING AND ML PIPELINE INITIALIZATION
# =============================================================================

# Path to renewable energy projects dataset
DATA_DIR = os.path.join(os.path.dirname(__file__), "dataset")
DATA_PATH = os.path.join(DATA_DIR, "renewable_energy_projects_500.csv")

# Load dataset for ML model training
try:
    df = pd.read_csv(DATA_PATH)
    print(f"✅ Dataset loaded successfully: {len(df)} projects")
except FileNotFoundError:
    raise RuntimeError(f"❌ Dataset not found at {DATA_PATH}")

# Train / load ML pipeline on startup
print("🔄 Training ML pipeline...")
ml_pipeline = load_ml_pipeline(df)
print("✅ ML pipeline ready for predictions")

# =============================================================================
# DATA MODELS AND VALIDATION
# =============================================================================

class ProjectInput(BaseModel):
    """
    Pydantic model for project input validation.
    
    This model defines the structure and validation rules for project data
    submitted to the evaluation API. It ensures data integrity and provides
    clear error messages for invalid inputs.
    
    Attributes:
        project_name: Optional project identifier
        project_type: Type of renewable energy project (Solar/Wind/Hybrid)
        region: Geographic region (Urban/Rural/Semi-Urban)
        capacity_mw: Project capacity in megawatts
        setup_cost: Initial investment cost in USD
        maintenance_cost: Annual maintenance cost in USD
        duration_years: Project lifespan in years
        expected_generation_mwh: Annual energy generation in MWh
        co2_saved_tons_per_year: Annual CO2 emissions reduction
        beneficiary_count: Number of people served
        risk_score: Project risk assessment (0-100)
        subsidy_eligible: Government subsidy qualification
        job_creation_count: Direct jobs created
    """
    project_name: Optional[str] = None
    project_type: str
    region: str
    capacity_mw: float
    setup_cost: float
    maintenance_cost: float
    duration_years: int
    expected_generation_mwh: float
    co2_saved_tons_per_year: float
    beneficiary_count: int
    risk_score: float
    subsidy_eligible: bool
    job_creation_count: int

    @validator('project_type')
    def validate_project_type(cls, v):
        """Validate project type is one of the supported types."""
        valid_types = ['Solar', 'Wind', 'Hybrid']
        if v not in valid_types:
            raise ValueError(f'project_type must be one of: {valid_types}')
        return v

    @validator('region')
    def validate_region(cls, v):
        """Validate region is one of the supported regions."""
        valid_regions = ['Urban', 'Rural', 'Semi-Urban']
        if v not in valid_regions:
            raise ValueError(f'region must be one of: {valid_regions}')
        return v

    @validator('capacity_mw', 'setup_cost', 'maintenance_cost', 'expected_generation_mwh', 
               'co2_saved_tons_per_year', 'beneficiary_count', 'job_creation_count')
    def validate_positive_numbers(cls, v):
        """Ensure all numeric values are positive."""
        if v <= 0:
            raise ValueError('Value must be greater than 0')
        return v

    @validator('duration_years')
    def validate_duration(cls, v):
        """Validate project duration is within realistic bounds."""
        if v <= 0 or v > 50:
            raise ValueError('duration_years must be between 1 and 50')
        return v

    @validator('risk_score')
    def validate_risk_score(cls, v):
        """Validate risk score is within 0-100 range."""
        if v < 0 or v > 100:
            raise ValueError('risk_score must be between 0 and 100')
        return v

# =============================================================================
# API ENDPOINTS
# =============================================================================

@app.get("/health", summary="Health check", tags=["System"])
async def health_check():
    """
    Health check endpoint to verify the API is running.
    
    Returns:
        dict: Status information including timestamp
    """
    return {
        "status": "healthy",
        "message": "AI Cost-Benefit Analysis API is running",
        "timestamp": pd.Timestamp.now().isoformat()
    }

@app.post("/evaluate", summary="Evaluate a project", tags=["Scoring"])
async def evaluate_project(project: ProjectInput):
    """
    Main project evaluation endpoint.
    
    This endpoint accepts project data and returns comprehensive analysis including:
    - ML-based scoring (0-100)
    - Cost-benefit analysis with breakdown
    - ROI analysis with projections
    - Risk assessment
    - Social impact analysis
    - Funding recommendations
    
    Args:
        project (ProjectInput): Validated project data
        
    Returns:
        dict: Comprehensive analysis results
        
    Raises:
        HTTPException: For ML scoring errors or internal server errors
    """
    try:
        # Convert to dict & DataFrame for ML pipeline consistency
        proj_dict = project.dict()
        X = pd.DataFrame([proj_dict])

        # =============================================================================
        # MACHINE LEARNING SCORING
        # =============================================================================
        
        # Compute ML-based score using trained pipeline
        try:
            ml_score = float(ml_pipeline.predict(X)[0])
            # Ensure ML score doesn't exceed 100
            ml_score = min(100.0, max(0.0, ml_score))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"ML scoring error: {str(e)}")

        # =============================================================================
        # COMPREHENSIVE ANALYSIS CALCULATIONS
        # =============================================================================
        
        # Extract project parameters for analysis
        setup_cost = project.setup_cost
        maintenance_cost = project.maintenance_cost
        duration_years = project.duration_years
        expected_generation = project.expected_generation_mwh
        co2_saved = project.co2_saved_tons_per_year
        beneficiaries = project.beneficiary_count
        job_creation = project.job_creation_count
        risk_score = project.risk_score

        # =============================================================================
        # COST-BENEFIT ANALYSIS
        # =============================================================================
        
        # Calculate total project cost
        total_cost = setup_cost + (maintenance_cost * duration_years)
        
        # Dynamic energy pricing based on project type and region
        energy_price_per_mwh = 0.12  # Base price $120 per MWh
        
        # Adjust pricing by project type
        if project.project_type == "Solar":
            energy_price_per_mwh = 0.15  # Solar typically commands premium pricing
        elif project.project_type == "Wind":
            energy_price_per_mwh = 0.13  # Wind pricing
        elif project.project_type == "Hybrid":
            energy_price_per_mwh = 0.14  # Hybrid pricing
            
        # Regional pricing adjustments
        if project.region == "Urban":
            energy_price_per_mwh *= 1.2  # Higher demand in urban areas
        elif project.region == "Rural":
            energy_price_per_mwh *= 0.9  # Lower demand in rural areas
            
        # Subsidy adjustments
        if project.subsidy_eligible:
            energy_price_per_mwh *= 1.1  # Subsidies increase effective revenue
            
        # Calculate total benefits including energy revenue, environmental benefits, and social impact
        total_benefit = (expected_generation * energy_price_per_mwh * duration_years) + \
                       (co2_saved * 50 * duration_years) + \
                       (beneficiaries * 0.01)
        
        # Calculate cost-benefit ratio with realistic cap
        cost_benefit_ratio = total_benefit / total_cost if total_cost > 0 else 0
        cost_benefit_ratio = min(2.0, cost_benefit_ratio)  # Cap at 2.0 for realistic scoring

        # =============================================================================
        # ROI ANALYSIS
        # =============================================================================
        
        # Calculate annual and total revenue
        annual_revenue = expected_generation * energy_price_per_mwh
        total_revenue = annual_revenue * duration_years
        total_investment = total_cost
        
        # Calculate ROI percentage with realistic constraints
        if total_investment > 0:
            roi_percentage = ((total_revenue - total_investment) / total_investment) * 100
            # Cap ROI at realistic levels for infrastructure projects
            roi_percentage = max(-20, min(50, roi_percentage))
        else:
            roi_percentage = 0

        # Risk-adjusted ROI calculation
        risk_factor = (100 - risk_score) / 100  # Lower risk score = higher risk factor
        risk_adjusted_roi = roi_percentage * risk_factor

        # =============================================================================
        # SOCIAL IMPACT ANALYSIS
        # =============================================================================
        
        # Calculate social impact score based on beneficiaries, jobs, and environmental benefits
        social_impact_score = min(100, (beneficiaries / 1000) + (job_creation * 2) + (co2_saved / 1000))

        # =============================================================================
        # ROI PROJECTION CALCULATION
        # =============================================================================
        
        # Generate year-by-year ROI projection
        roi_projection = []
        for year in range(1, duration_years + 1):
            cumulative_revenue = annual_revenue * year
            cumulative_cost = setup_cost + (maintenance_cost * year)
            
            if cumulative_cost > 0:
                yearly_roi = ((cumulative_revenue - cumulative_cost) / cumulative_cost) * 100
                # Ensure realistic ROI values
                yearly_roi = max(-20, min(50, yearly_roi))
            else:
                yearly_roi = 0
                
            roi_projection.append({
                "year": year,
                "roi": yearly_roi,
                "cumulative_revenue": cumulative_revenue,
                "cumulative_cost": cumulative_cost
            })

        # =============================================================================
        # COMPREHENSIVE RESPONSE ASSEMBLY
        # =============================================================================
        
        return {
            # ML-based scoring
            "ml_score": ml_score,
            
            # Cost-benefit analysis with detailed breakdown
            "cost_benefit_analysis": {
                "total_cost": total_cost,
                "total_benefit": total_benefit,
                "cost_benefit_ratio": cost_benefit_ratio,
                "breakdown": {
                    "setup_cost": setup_cost,
                    "maintenance_cost": maintenance_cost * duration_years,
                    "energy_revenue": expected_generation * energy_price_per_mwh * duration_years,
                    "environmental_benefit": co2_saved * 50 * duration_years,
                    "social_benefit": beneficiaries * 0.01
                }
            },
            
            # ROI analysis with projections
            "roi_analysis": {
                "annual_revenue": annual_revenue,
                "total_revenue": total_revenue,
                "total_investment": total_investment,
                "roi_percentage": roi_percentage,
                "risk_adjusted_roi": risk_adjusted_roi,
                "projection": roi_projection
            },
            
            # Risk assessment
            "risk_analysis": {
                "risk_score": risk_score,
                "risk_factor": risk_factor,
                "risk_level": "High" if risk_score > 70 else "Medium" if risk_score > 40 else "Low"
            },
            
            # Social impact metrics
            "social_impact": {
                "beneficiaries": beneficiaries,
                "job_creation": job_creation,
                "co2_saved": co2_saved,
                "social_impact_score": social_impact_score
            },
            
            # AI-powered recommendations
            "recommendation": {
                "funding_recommendation": "Strongly Recommend" if ml_score > 80 else "Recommend" if ml_score > 60 else "Consider" if ml_score > 40 else "Not Recommended",
                "confidence": min(100, ml_score + (cost_benefit_ratio * 10)),
                "key_factors": [
                    # ROI Analysis factors
                    "High ROI potential" if roi_percentage > 15 else "Moderate ROI" if roi_percentage > 5 else "Low ROI potential",
                    
                    # Risk Assessment factors
                    "Low risk profile" if risk_score < 30 else "Moderate risk" if risk_score < 60 else "High risk profile",
                    
                    # Social Impact factors
                    "Strong social impact" if social_impact_score > 70 else "Moderate social impact" if social_impact_score > 40 else "Limited social impact",
                    
                    # Environmental Impact factors
                    "Significant environmental benefits" if co2_saved > 1000 else "Moderate environmental benefits" if co2_saved > 500 else "Limited environmental impact",
                    
                    # Job Creation factors
                    "High job creation potential" if job_creation > 100 else "Moderate job creation" if job_creation > 50 else "Limited job creation",
                    
                    # Regional Benefits factors
                    "Urban development focus" if project.region == "Urban" else "Rural development focus" if project.region == "Rural" else "Semi-urban development",
                    
                    # Project Type Benefits factors
                    "Solar energy benefits" if project.project_type == "Solar" else "Wind energy benefits" if project.project_type == "Wind" else "Hybrid energy benefits",
                    
                    # Subsidy Benefits factors
                    "Government subsidy eligible" if project.subsidy_eligible else "No subsidy benefits",
                    
                    # Beneficiary Impact factors
                    "Large beneficiary base" if beneficiaries > 10000 else "Moderate beneficiary base" if beneficiaries > 5000 else "Limited beneficiary reach",
                    
                    # Cost Efficiency factors
                    "Cost-effective investment" if cost_benefit_ratio > 1.5 else "Moderate cost efficiency" if cost_benefit_ratio > 1.0 else "High cost investment"
                ]
            }
        }
        
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# =============================================================================
# APPLICATION ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    """
    Development server entry point.
    
    Runs the FastAPI application using uvicorn for local development.
    """
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)