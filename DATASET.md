# Dataset Documentation

## 📊 Renewable Energy Projects Dataset

### Dataset Overview

The AI Cost-Benefit Analysis system uses a **synthetic renewable energy projects dataset** containing 500+ infrastructure projects with realistic parameters. This dataset was specifically designed for training machine learning models to evaluate infrastructure project viability.

### 📁 Dataset Location

**File Path**: `backend/dataset/renewable_energy_projects_500.csv`

### 🎯 Dataset Purpose

This dataset serves as the training foundation for the AI/ML model that evaluates infrastructure projects by providing:
- **Training Data**: 500+ labeled examples for supervised learning
- **Feature Engineering**: Comprehensive project metrics for analysis
- **Realistic Parameters**: Industry-standard values for renewable energy projects
- **Diverse Scenarios**: Various project types, regions, and risk profiles

### 📋 Dataset Structure

#### Columns Description

| Column | Type | Description | Range/Values |
|--------|------|-------------|--------------|
| `project_name` | String | Unique project identifier | "Project_1" to "Project_500" |
| `project_type` | Categorical | Type of renewable energy project | Solar, Wind, Hybrid |
| `region` | Categorical | Geographic region classification | Urban, Rural, Semi-Urban |
| `capacity_mw` | Float | Project capacity in megawatts | 5-150 MW |
| `setup_cost` | Float | Initial investment cost in USD | $5M-$200M |
| `maintenance_cost` | Float | Annual maintenance cost in USD | $100K-$7M/year |
| `duration_years` | Integer | Project lifespan in years | 15-30 years |
| `expected_generation_mwh` | Float | Annual energy generation in MWh | 10K-500K MWh/year |
| `co2_saved_tons_per_year` | Float | Annual CO2 emissions reduction | 5K-250K tons/year |
| `beneficiary_count` | Integer | Number of people served | 5K-750K people |
| `risk_score` | Float | Project risk assessment (0-100) | 0-100 (lower = higher risk) |
| `subsidy_eligible` | Boolean | Government subsidy qualification | True/False |
| `job_creation_count` | Integer | Direct jobs created | 10-500 jobs |

### 📈 Dataset Statistics

#### Project Type Distribution
- **Solar Projects**: ~34% (168 projects)
- **Wind Projects**: ~33% (167 projects)  
- **Hybrid Projects**: ~33% (165 projects)

#### Regional Distribution
- **Urban Projects**: ~37% (187 projects)
- **Rural Projects**: ~32% (159 projects)
- **Semi-Urban Projects**: ~31% (154 projects)

#### Capacity Distribution
- **Small Projects** (< 50 MW): ~30%
- **Medium Projects** (50-100 MW): ~45%
- **Large Projects** (> 100 MW): ~25%

### 🔍 Feature Analysis

#### Financial Metrics
- **Setup Cost Range**: $5M - $200M
- **Maintenance Cost Range**: $100K - $7M/year
- **Project Duration**: 15-30 years
- **Cost per MW**: $400K - $1.4M (realistic industry range)

#### Performance Metrics
- **Energy Generation**: 10K - 500K MWh/year
- **Capacity Factor**: 15-35% (realistic for renewable energy)
- **CO2 Savings**: 5K - 250K tons/year
- **Efficiency**: Optimized for realistic renewable energy performance

#### Social Impact Metrics
- **Beneficiary Count**: 5K - 750K people
- **Job Creation**: 10-500 direct jobs
- **Regional Impact**: Varied by project type and location

#### Risk Assessment
- **Risk Score Distribution**: 0-100 scale
- **Risk Categories**: Low (0-30), Medium (31-60), High (61-100)
- **Risk Factors**: Location, project type, size, subsidy eligibility

### 🎯 Target Variable

The dataset includes a **calculated target score** (0-100) that represents the overall project viability based on:

#### Scoring Components
1. **ROI Score** (50% weight): Financial return on investment
2. **Social Impact Score** (30% weight): Community benefits and job creation
3. **Risk Score** (20% weight): Project risk assessment

#### Target Score Calculation
```python
def calculate_target_score(row):
    # ROI calculation with realistic constraints
    total_cost = setup_cost + (maintenance_cost * duration_years)
    annual_revenue = expected_generation * energy_price
    roi = min(((total_revenue - total_cost) / total_cost) * 100, 30)
    
    # Social impact calculation
    beneficiaries_score = min(beneficiary_count / 50000, 1.0) * 40
    jobs_score = min(job_creation_count / 1000, 1.0) * 30
    co2_score = min(co2_saved_tons_per_year / 50000, 1.0) * 30
    
    # Risk adjustment
    risk_score = 100 - risk_score  # Lower risk = higher score
    
    # Final weighted score
    final_score = (0.5 * roi_score) + (0.3 * social_score) + (0.2 * risk_score)
    return max(0, min(100, final_score))
```

### 🔧 Data Quality

#### Data Validation
- **No Missing Values**: All fields are populated
- **Realistic Ranges**: Values within industry standards
- **Logical Relationships**: Correlations between related metrics
- **Consistent Units**: Standardized measurement units

#### Data Preprocessing
- **Feature Scaling**: StandardScaler for numerical features
- **Categorical Encoding**: OneHotEncoder for categorical variables
- **Train-Test Split**: 80/20 split for model validation

### 📊 Model Training

#### Feature Engineering
- **Numerical Features**: 9 continuous variables
- **Categorical Features**: 3 categorical variables
- **Feature Selection**: All features used in ML pipeline

#### Model Performance
- **Algorithm**: XGBoost Regressor
- **Hyperparameters**: Optimized for regression task
- **Validation**: Cross-validation and test set evaluation
- **Metrics**: R² score, MAE, RMSE

### 🎨 Dataset Visualization

The dataset supports various visualizations in the frontend:
- **Cost-Benefit Pie Charts**: Investment vs. returns breakdown
- **ROI Projection Charts**: Long-term financial projections
- **Risk Analysis**: Risk score distributions
- **Social Impact Metrics**: Beneficiary and job creation analysis

### 📚 Usage in the System

#### Training Phase
1. **Data Loading**: CSV file loaded into pandas DataFrame
2. **Target Calculation**: Target scores computed for each project
3. **Feature Preparation**: Features prepared for ML pipeline
4. **Model Training**: XGBoost model trained on processed data

#### Inference Phase
1. **New Project Input**: User submits project details
2. **Feature Processing**: Input processed through same pipeline
3. **Model Prediction**: Trained model predicts project score
4. **Analysis Generation**: Comprehensive analysis based on prediction

### 🔄 Dataset Updates

#### Version Control
- **Current Version**: v1.0 (500 projects)
- **Update Frequency**: As needed for model improvements
- **Backup**: Original dataset preserved for reproducibility

#### Future Enhancements
- **Additional Projects**: Expand to 1000+ projects
- **New Features**: Additional project metrics
- **Real Data**: Integration with real infrastructure projects
- **Regional Data**: Location-specific project parameters

### 📖 References

#### Industry Standards
- **Renewable Energy Costs**: Based on industry benchmarks
- **Project Lifespans**: Standard renewable energy project durations
- **Capacity Factors**: Realistic renewable energy performance metrics
- **Cost Structures**: Industry-standard cost breakdowns

#### Data Sources
- **Synthetic Generation**: Created for educational/demonstration purposes
- **Industry Benchmarks**: Based on renewable energy industry standards
- **Government Guidelines**: Aligned with infrastructure project requirements
- **Academic Research**: Informed by renewable energy studies

---

**Note**: This dataset is designed for educational and demonstration purposes. For production use, real infrastructure project data should be used with appropriate data governance and privacy considerations. 