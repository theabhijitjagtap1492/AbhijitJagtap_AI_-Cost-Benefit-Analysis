# AI Cost-Benefit Analysis of Infrastructure Projects

## 📋 Project Overview

This project is a **digital solution for government infrastructure project evaluation** that uses AI and machine learning to analyze the cost-benefit ratio of renewable energy infrastructure projects. The system provides comprehensive scoring based on estimated investment, social impact, and long-term returns.

### 🎯 Core Features

- **AI-Powered Analysis**: Machine learning model trained on renewable energy project data
- **Comprehensive Evaluation**: Analyzes investment costs, social impact, environmental benefits, and ROI
- **Visual Analytics**: Interactive charts and graphs showing cost-benefit breakdown
- **Real-time Scoring**: Instant evaluation with detailed recommendations
- **Government Focus**: Designed for infrastructure project funding decisions

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **npm** or **yarn** (for frontend dependencies)

### Installation & Setup

#### Option 1: Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-cost-benefit-project
   ```

2. **Run the automated startup script**
   ```bash
   # Windows
   start.bat
   
   # Or manually start each server
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

#### Option 2: Manual Setup

1. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🛠️ Tech Stack

### Backend Technologies
- **FastAPI**: Modern Python web framework for API development
- **scikit-learn**: Machine learning library for ML pipeline
- **XGBoost**: Gradient boosting algorithm for project scoring
- **pandas**: Data manipulation and analysis
- **numpy**: Numerical computing
- **uvicorn**: ASGI server for FastAPI

### Frontend Technologies
- **React 19**: Modern JavaScript library for UI
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Custom SVG Charts**: Interactive chart library for data visualization
- **Create React App**: Fast build tool and development server

### AI/ML Components
- **XGBoost Regressor**: Main ML model for project scoring
- **Feature Engineering**: Comprehensive feature preprocessing
- **Model Pipeline**: End-to-end ML pipeline with preprocessing
- **Real-time Prediction**: Instant scoring of new projects
- **Custom Chart Visualization**: SVG-based interactive charts

## 🔧 Configuration

### Environment Variables
- `PORT`: Backend server port (default: 8000)
- `PYTHONPATH`: Python path for backend modules

### Model Configuration
- **Training Data**: 500+ renewable energy projects
- **Features**: 12 comprehensive project metrics
- **Algorithm**: XGBoost with hyperparameter optimization
- **Validation**: 80/20 train-test split

## 📊 Dataset Information

### Dataset Source
The system uses a **synthetic renewable energy projects dataset** containing 500+ infrastructure projects with realistic parameters for:
- Solar energy projects
- Wind energy projects  
- Hybrid energy projects

### Dataset Features
- **Project Details**: Name, type, region, capacity
- **Financial Metrics**: Setup cost, maintenance cost, duration
- **Performance Metrics**: Expected generation, CO2 savings
- **Social Impact**: Beneficiary count, job creation
- **Risk Assessment**: Risk scores and subsidy eligibility

## 📈 Key Metrics Evaluated

### Investment Analysis
- **Setup Costs**: Initial infrastructure investment
- **Maintenance Costs**: Ongoing operational expenses
- **Total Investment**: Complete financial commitment

### Social Impact
- **Beneficiary Count**: Number of people served
- **Job Creation**: Employment opportunities generated
- **Environmental Benefits**: CO2 emissions reduction

### Financial Returns
- **ROI Calculation**: Return on investment percentage
- **Energy Revenue**: Revenue from energy generation
- **Risk-Adjusted Returns**: Returns considering risk factors

### AI Scoring Components
- **ML Score**: Machine learning model prediction (0-100)
- **Cost-Benefit Ratio**: Benefits vs. costs analysis
- **Risk Assessment**: Project risk evaluation
- **Social Impact Score**: Community benefit quantification

## 📝 API Documentation

### Endpoints

#### `GET /health`
Health check endpoint to verify API status.

#### `POST /evaluate`
Main evaluation endpoint for project analysis.

**Request Body:**
```json
{
  "project_name": "string (optional)",
  "project_type": "Solar|Wind|Hybrid",
  "region": "Urban|Rural|Semi-Urban",
  "capacity_mw": "float",
  "setup_cost": "float",
  "maintenance_cost": "float",
  "duration_years": "integer",
  "expected_generation_mwh": "float",
  "co2_saved_tons_per_year": "float",
  "beneficiary_count": "integer",
  "risk_score": "float (0-100)",
  "subsidy_eligible": "boolean",
  "job_creation_count": "integer"
}
```

**Response:**
```json
{
  "ml_score": "float",
  "cost_benefit_analysis": {
    "total_cost": "float",
    "total_benefit": "float",
    "cost_benefit_ratio": "float",
    "breakdown": {...}
  },
  "roi_analysis": {
    "roi_percentage": "float",
    "projection": [...]
  },
  "risk_analysis": {...},
  "social_impact": {...},
  "recommendation": {...}
}
```

## 🧪 Testing

For comprehensive testing instructions, see [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is developed for educational and demonstration purposes.

## 🆘 Support

For issues or questions:
1. Check the API documentation at http://localhost:8000/docs
2. Review the console logs for error messages
3. Verify all dependencies are properly installed

---

**Built with ❤️ for AI-powered infrastructure project evaluation** 