"""
AI Cost-Benefit Analysis - Machine Learning Pipeline

This module contains the machine learning pipeline for the AI Cost-Benefit Analysis system.
It includes the target score calculation algorithm, model training, and evaluation functions.

Key Components:
- Target score calculation with realistic constraints
- XGBoost-based ML pipeline with feature engineering
- Comprehensive model evaluation metrics
- Train/test split for proper validation

Author: AI Cost-Benefit Analysis Team
Version: 1.0.0
"""

import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from xgboost import XGBRegressor

# =============================================================================
# TARGET SCORE CALCULATION
# =============================================================================

def calculate_target_score(row):
    """
    Calculate target score for ML model training with realistic constraints.
    
    This function computes a comprehensive project viability score (0-100) based on:
    - ROI calculation (50% weight): Financial return on investment
    - Social impact (30% weight): Beneficiaries, jobs, and environmental benefits
    - Risk assessment (20% weight): Project risk evaluation
    
    The scoring algorithm uses realistic constraints to ensure scores are meaningful
    for infrastructure project evaluation.
    
    Args:
        row (pd.Series): Single project row from the dataset
        
    Returns:
        float: Target score between 0 and 100
        
    Formula:
        Final Score = (0.5 × ROI_Score) + (0.3 × Social_Score) + (0.2 × Risk_Score)
        
    Where:
        - ROI_Score: Capped at 30% for realistic infrastructure returns
        - Social_Score: Based on beneficiaries, jobs, and CO2 savings
        - Risk_Score: Inverted risk (lower risk = higher score)
    """
    # =============================================================================
    # 1. ROI CALCULATION (50% weight)
    # =============================================================================
    
    # Calculate total project cost
    total_cost = row['setup_cost'] + (row['maintenance_cost'] * row['duration_years'])
    
    # Calculate energy revenue using realistic pricing
    annual_revenue = row['expected_generation_mwh'] * 0.12  # $0.12 per kWh = $120 per MWh
    total_revenue = annual_revenue * row['duration_years']
    
    # Calculate ROI with realistic constraints
    if total_cost > 0:
        roi = ((total_revenue - total_cost) / total_cost) * 100
        # Cap ROI at 30% for realistic infrastructure project returns
        roi = min(roi, 30)
    else:
        roi = 0
    
    # Ensure ROI score is non-negative
    roi_score = max(0, roi)
    
    # =============================================================================
    # 2. SOCIAL IMPACT CALCULATION (30% weight)
    # =============================================================================
    
    # Beneficiaries score (max 40 points)
    # Normalize to 50,000 beneficiaries = 100% score
    beneficiaries_score = min(row['beneficiary_count'] / 50000, 1.0) * 40
    
    # Job creation score (max 30 points)
    # Normalize to 1,000 jobs = 100% score
    jobs_score = min(row['job_creation_count'] / 1000, 1.0) * 30
    
    # CO2 savings score (max 30 points)
    # Normalize to 50,000 tons/year = 100% score
    co2_score = min(row['co2_saved_tons_per_year'] / 50000, 1.0) * 30
    
    # Total social impact score
    social_score = beneficiaries_score + jobs_score + co2_score
    
    # =============================================================================
    # 3. RISK ASSESSMENT (20% weight)
    # =============================================================================
    
    # Invert risk score: lower risk = higher score
    # Risk score of 0 = highest risk, 100 = lowest risk
    risk_score = 100 - row['risk_score']
    
    # =============================================================================
    # 4. FINAL WEIGHTED SCORE CALCULATION
    # =============================================================================
    
    # Apply weights and ensure final score is within 0-100 range
    final_score = (0.5 * roi_score) + (0.3 * social_score) + (0.2 * risk_score)
    return max(0, min(100, final_score))

# =============================================================================
# MODEL EVALUATION
# =============================================================================

def evaluate_model(pipeline, X_test, y_test):
    """
    Comprehensive model evaluation with multiple metrics.
    
    This function evaluates the trained ML pipeline using standard regression metrics
    to assess model performance and provide insights into prediction accuracy.
    
    Args:
        pipeline (Pipeline): Trained scikit-learn pipeline
        X_test (pd.DataFrame): Test features
        y_test (pd.Series): True target values
        
    Returns:
        tuple: (r2_score, mae, rmse) - Model performance metrics
        
    Metrics Explained:
        - R² Score: Coefficient of determination (0-1, higher is better)
        - MAE: Mean Absolute Error (lower is better)
        - RMSE: Root Mean Square Error (lower is better)
    """
    # Generate predictions on test set
    y_pred = pipeline.predict(X_test)
    
    # Calculate evaluation metrics
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    # Print comprehensive evaluation report
    print("\n" + "="*50)
    print("MODEL PERFORMANCE EVALUATION")
    print("="*50)
    print(f"R² Score: {r2:.3f} ({r2*100:.1f}% accuracy)")
    print(f"Mean Absolute Error: {mae:.3f}")
    print(f"Root Mean Square Error: {rmse:.3f}")
    print(f"Test samples: {len(y_test)}")
    print("="*50)
    
    return r2, mae, rmse

# =============================================================================
# MACHINE LEARNING PIPELINE
# =============================================================================

def load_ml_pipeline(df: pd.DataFrame) -> Pipeline:
    """
    Build and train the complete ML pipeline for project scoring.
    
    This function creates a comprehensive machine learning pipeline that includes:
    - Feature preprocessing (scaling and encoding)
    - XGBoost regressor for prediction
    - Proper train/test split for validation
    - Model evaluation and performance reporting
    
    The pipeline is designed to predict project viability scores (0-100) based on
    comprehensive project metrics including financial, social, and risk factors.
    
    Args:
        df (pd.DataFrame): Training dataset with project features
        
    Returns:
        Pipeline: Trained scikit-learn pipeline ready for predictions
        
    Raises:
        Exception: If pipeline training fails or dataset is invalid
        
    Pipeline Components:
        1. Feature Engineering:
           - Numerical features: StandardScaler for normalization
           - Categorical features: OneHotEncoder for encoding
        2. Model: XGBoost Regressor with optimized hyperparameters
        3. Validation: 80/20 train/test split
    """
    try:
        # =============================================================================
        # 1. TARGET SCORE GENERATION
        # =============================================================================
        
        # Calculate target scores for all projects in the dataset
        print("🔄 Calculating target scores for all projects...")
        y = df.apply(calculate_target_score, axis=1)
        X = df.drop(columns=["project_name"])  # Remove non-feature column
        
        print(f"✅ Target scores calculated: {len(y)} projects")
        print(f"📊 Score range: {y.min():.1f} - {y.max():.1f}")
        
        # =============================================================================
        # 2. TRAIN/TEST SPLIT
        # =============================================================================
        
        # Split data for proper model validation
        print("🔄 Splitting data into training and test sets...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        print(f"📈 Training set: {len(X_train)} samples")
        print(f"🧪 Test set: {len(X_test)} samples")
        
        # =============================================================================
        # 3. FEATURE DEFINITIONS
        # =============================================================================
        
        # Define numerical features for scaling
        numeric_features = [
            "capacity_mw",           # Project capacity in MW
            "setup_cost",            # Initial investment cost
            "maintenance_cost",      # Annual maintenance cost
            "duration_years",        # Project lifespan
            "expected_generation_mwh", # Annual energy generation
            "co2_saved_tons_per_year", # Annual CO2 savings
            "beneficiary_count",     # Number of beneficiaries
            "risk_score",            # Project risk assessment
            "job_creation_count"     # Direct jobs created
        ]
        
        # Define categorical features for encoding
        categorical_features = [
            "project_type",          # Solar/Wind/Hybrid
            "region",                # Urban/Rural/Semi-Urban
            "subsidy_eligible"       # Boolean subsidy qualification
        ]
        
        print(f"🔢 Numerical features: {len(numeric_features)}")
        print(f"🏷️  Categorical features: {len(categorical_features)}")
        
        # =============================================================================
        # 4. PIPELINE CONSTRUCTION
        # =============================================================================
        
        # Create feature preprocessing pipeline
        preprocessor = ColumnTransformer([
            # Scale numerical features to zero mean and unit variance
            ("num", StandardScaler(), numeric_features),
            # Encode categorical features (drop first to avoid multicollinearity)
            ("cat", OneHotEncoder(drop="first"), categorical_features),
        ])
        
        # Build complete pipeline with XGBoost regressor
        pipeline = Pipeline([
            ("preprocessor", preprocessor),
            ("regressor", XGBRegressor(
                n_estimators=300,      # Number of boosting rounds
                max_depth=8,           # Maximum tree depth
                learning_rate=0.1,     # Learning rate for gradient boosting
                subsample=0.8,         # Fraction of samples for each tree
                colsample_bytree=0.8,  # Fraction of features for each tree
                random_state=42        # For reproducible results
            ))
        ])
        
        # =============================================================================
        # 5. MODEL TRAINING
        # =============================================================================
        
        print("🔄 Training XGBoost model...")
        pipeline.fit(X_train, y_train)
        print("✅ Model training completed")
        
        # =============================================================================
        # 6. MODEL EVALUATION
        # =============================================================================
        
        # Evaluate model performance on test set
        print("🔄 Evaluating model performance...")
        evaluate_model(pipeline, X_test, y_test)
        
        return pipeline
        
    except Exception as e:
        # Provide detailed error information for debugging
        print(f"❌ Error loading ML pipeline: {e}")
        print(f"📋 Available columns: {list(df.columns)}")
        print(f"📊 Dataset shape: {df.shape}")
        raise