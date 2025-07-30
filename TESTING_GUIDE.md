# Testing Guide for Reviewers

## 🎯 Overview

This guide provides comprehensive testing instructions for the AI Cost-Benefit Analysis system. Reviewers can use this guide to verify all functionality, test different scenarios, and validate the AI/ML components.

## 🚀 Quick Start Testing

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Git (for cloning repository)

### Step 1: Setup and Installation

1. **Clone and navigate to project**
   ```bash
   git clone <repository-url>
   cd ai-cost-benefit-project
   ```

2. **Start the application**
   ```bash
   # Windows
   start.bat
   
   # Or manually start each server
   ```

3. **Verify services are running**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 🧪 Comprehensive Testing Scenarios

### Test Case 1: Basic Functionality

#### Objective
Verify the core workflow functions correctly with standard input.

#### Steps
1. **Open the application** at http://localhost:3000
2. **Fill the form** with these test values:
   ```
   Project Name: Test Solar Project
   Project Type: Solar
   Region: Urban
   Capacity: 100 MW
   Setup Cost: $50,000,000
   Maintenance Cost: $2,000,000/year
   Duration: 25 years
   Expected Generation: 150,000 MWh/year
   CO2 Saved: 75,000 tons/year
   Beneficiaries: 100,000
   Risk Score: 30 (drag slider to 30)
   Job Creation: 200
   Subsidy Eligible: Yes
   ```
3. **Click "Get Cost-Benefit Score"**
4. **Verify results appear** with:
   - Main score display (0-100)
   - Cost-benefit breakdown charts
   - ROI projection chart
   - Risk analysis section
   - Social impact metrics
   - Key decision factors

#### Expected Results
- ✅ Score calculation completes successfully
- ✅ Visual charts render properly
- ✅ All metrics display realistic values
- ✅ No error messages

### Test Case 2: Different Project Types

#### Objective
Test how different project types affect scoring and analysis.

#### Steps
**Test Solar Project:**
```
Project Type: Solar
Region: Urban
Capacity: 80 MW
Setup Cost: $40,000,000
Maintenance Cost: $1,500,000/year
Duration: 25 years
Expected Generation: 120,000 MWh/year
CO2 Saved: 60,000 tons/year
Beneficiaries: 80,000
Risk Score: 25
Job Creation: 150
Subsidy Eligible: Yes
```

**Test Wind Project:**
```
Project Type: Wind
Region: Rural
Capacity: 120 MW
Setup Cost: $60,000,000
Maintenance Cost: $2,500,000/year
Duration: 20 years
Expected Generation: 200,000 MWh/year
CO2 Saved: 100,000 tons/year
Beneficiaries: 50,000
Risk Score: 40
Job Creation: 300
Subsidy Eligible: True
```

**Test Hybrid Project:**
```
Project Type: Hybrid
Region: Semi-Urban
Capacity: 150 MW
Setup Cost: $75,000,000
Maintenance Cost: $3,000,000/year
Duration: 30 years
Expected Generation: 250,000 MWh/year
CO2 Saved: 125,000 tons/year
Beneficiaries: 120,000
Risk Score: 35
Job Creation: 400
Subsidy Eligible: False
```

#### Expected Results
- ✅ Different project types show different scores
- ✅ Solar projects typically score higher in urban areas
- ✅ Wind projects show different cost structures
- ✅ Hybrid projects show balanced characteristics

### Test Case 3: Risk Assessment Testing

#### Objective
Verify that risk scores properly affect project evaluation.

#### Steps
**Low Risk Project:**
```
Risk Score: 20 (very low risk)
All other parameters: Use standard values
```

**Medium Risk Project:**
```
Risk Score: 50 (medium risk)
All other parameters: Use standard values
```

**High Risk Project:**
```
Risk Score: 80 (high risk)
All other parameters: Use standard values
```

#### Expected Results
- ✅ Lower risk scores result in higher overall scores
- ✅ Risk analysis section shows appropriate risk levels
- ✅ Recommendations change based on risk assessment
- ✅ Risk-adjusted ROI calculations are accurate

### Test Case 4: Regional Impact Testing

#### Objective
Test how different regions affect project evaluation.

#### Steps
**Urban Project:**
```
Region: Urban
Capacity: 100 MW
Setup Cost: $60,000,000
Maintenance Cost: $2,500,000/year
Expected Generation: 150,000 MWh/year
CO2 Saved: 75,000 tons/year
Beneficiaries: 200,000
Risk Score: 40
Job Creation: 250
Subsidy Eligible: True
```

**Rural Project:**
```
Region: Rural
Capacity: 80 MW
Setup Cost: $40,000,000
Maintenance Cost: $1,800,000/year
Expected Generation: 120,000 MWh/year
CO2 Saved: 60,000 tons/year
Beneficiaries: 30,000
Risk Score: 30
Job Creation: 120
Subsidy Eligible: True
```

**Semi-Urban Project:**
```
Region: Semi-Urban
Capacity: 90 MW
Setup Cost: $45,000,000
Maintenance Cost: $2,000,000/year
Expected Generation: 135,000 MWh/year
CO2 Saved: 67,500 tons/year
Beneficiaries: 80,000
Risk Score: 35
Job Creation: 180
Subsidy Eligible: False
```

#### Expected Results
- ✅ Urban projects show higher energy pricing
- ✅ Rural projects may have lower costs but fewer beneficiaries
- ✅ Semi-urban projects show balanced characteristics
- ✅ Regional factors affect ROI calculations

### Test Case 5: Edge Cases and Validation

#### Objective
Test form validation and edge case handling.

#### Steps
1. **Test Empty Form Submission**
   - Leave all fields empty
   - Click "Get Cost-Benefit Score"
   - Verify error message appears

2. **Test Invalid Numeric Inputs**
   - Enter negative values for costs
   - Enter zero for capacity
   - Enter very large numbers
   - Verify validation messages

3. **Test Boundary Values**
   - Minimum capacity: 0.1 MW
   - Maximum duration: 50 years
   - Risk score: 0 and 100
   - Verify system handles boundaries

4. **Test Missing Subsidy Selection**
   - Fill all fields except subsidy eligibility
   - Submit form
   - Verify error message

#### Expected Results
- ✅ Form validation prevents invalid submissions
- ✅ Clear error messages guide users
- ✅ System handles edge cases gracefully
- ✅ No crashes or undefined behavior

### Test Case 6: API Testing

#### Objective
Test the backend API directly.

#### Steps
1. **Test Health Endpoint**
   ```bash
   curl http://localhost:8000/health
   ```
   Expected: JSON response with status "healthy"

2. **Test Evaluation Endpoint**
   ```bash
   curl -X POST http://localhost:8000/evaluate \
     -H "Content-Type: application/json" \
     -d '{
       "project_type": "Solar",
       "region": "Urban",
       "capacity_mw": 100,
       "setup_cost": 50000000,
       "maintenance_cost": 2000000,
       "duration_years": 25,
       "expected_generation_mwh": 150000,
       "co2_saved_tons_per_year": 75000,
       "beneficiary_count": 100000,
       "risk_score": 30,
       "subsidy_eligible": true,
       "job_creation_count": 200
     }'
   ```

3. **Test API Documentation**
   - Visit http://localhost:8000/docs
   - Verify all endpoints are documented
   - Test endpoints through the interactive interface

#### Expected Results
- ✅ Health endpoint returns proper status
- ✅ Evaluation endpoint returns comprehensive analysis
- ✅ API documentation is complete and functional
- ✅ All response fields are properly formatted

### Test Case 7: Visual Analytics Testing

#### Objective
Verify that charts and visualizations work correctly.

#### Steps
1. **Submit a project** with the test data from Test Case 1
2. **Examine each chart:**
   - **Pie Chart**: Investment vs. Returns breakdown
   - **Line Chart**: ROI projection over time
   - **Metrics Display**: All numerical values

3. **Test Chart Interactions:**
   - Hover over chart elements
   - Check tooltips display correct values
   - Verify legends are accurate

#### Expected Results
- ✅ All charts render without errors
- ✅ Chart data matches calculated values
- ✅ Interactive elements work properly
- ✅ Visualizations are clear and informative

### Test Case 8: Performance Testing

#### Objective
Test system performance and responsiveness.

#### Steps
1. **Test Response Time**
   - Submit multiple projects in succession
   - Measure time from submission to results
   - Verify consistent performance

2. **Test Concurrent Users**
   - Open multiple browser tabs
   - Submit projects simultaneously
   - Verify no conflicts or errors

3. **Test Large Data Inputs**
   - Use maximum capacity values
   - Test with very large cost figures
   - Verify system handles large numbers

#### Expected Results
- ✅ Response time under 5 seconds
- ✅ No errors with concurrent usage
- ✅ System handles large inputs gracefully
- ✅ Consistent performance across tests

## 🔍 Advanced Testing

### Test Case 9: AI/ML Model Testing

#### Objective
Verify the machine learning model performs correctly.

#### Steps
1. **Test Score Consistency**
   - Submit identical projects multiple times
   - Verify scores are consistent
   - Check for any random variations

2. **Test Score Range**
   - Submit various project configurations
   - Verify scores stay within 0-100 range
   - Check for realistic score distributions

3. **Test Feature Sensitivity**
   - Vary individual parameters while keeping others constant
   - Verify scores change appropriately
   - Check that important features have more impact

#### Expected Results
- ✅ Scores are consistent for identical inputs
- ✅ All scores within valid range (0-100)
- ✅ Score changes reflect parameter importance
- ✅ Model provides realistic evaluations

### Test Case 10: Error Handling

#### Objective
Test system error handling and recovery.

#### Steps
1. **Test Backend Disconnection**
   - Stop the backend server
   - Try to submit a project
   - Verify appropriate error message
   - Restart backend and test again

2. **Test Invalid API Calls**
   - Send malformed JSON to API
   - Test missing required fields
   - Verify proper error responses

3. **Test Network Issues**
   - Simulate slow network conditions
   - Test timeout scenarios
   - Verify graceful error handling

#### Expected Results
- ✅ Clear error messages for users
- ✅ System recovers from temporary issues
- ✅ No crashes or undefined behavior
- ✅ Proper HTTP status codes

## 📊 Testing Checklist

### ✅ Core Functionality
- [ ] Form submission works
- [ ] AI scoring completes
- [ ] Results display correctly
- [ ] Charts render properly
- [ ] No JavaScript errors

### ✅ Data Validation
- [ ] Form validation works
- [ ] Error messages are clear
- [ ] Edge cases handled
- [ ] Boundary values accepted

### ✅ API Testing
- [ ] Health endpoint responds
- [ ] Evaluation endpoint works
- [ ] API documentation accessible
- [ ] Error handling works

### ✅ Visual Analytics
- [ ] Charts display correctly
- [ ] Interactive elements work
- [ ] Data accuracy verified
- [ ] Responsive design

### ✅ Performance
- [ ] Response time acceptable
- [ ] Concurrent usage works
- [ ] Large inputs handled
- [ ] Consistent performance

### ✅ AI/ML Components
- [ ] Scores are realistic
- [ ] Model consistency verified
- [ ] Feature sensitivity tested
- [ ] Score range validated

## 🐛 Common Issues and Solutions

### Issue: Backend Connection Failed
**Solution**: 
1. Check if Python is installed
2. Verify all dependencies are installed: `pip install -r backend/requirements.txt`
3. Check if port 8000 is available
4. Restart the backend server

### Issue: Frontend Not Loading
**Solution**:
1. Check if Node.js is installed
2. Install dependencies: `cd frontend && npm install`
3. Check if port 3000 is available
4. Restart the frontend server

### Issue: Charts Not Displaying
**Solution**:
1. Check browser console for JavaScript errors
2. Verify custom SVG charts are rendering properly
3. Check if data is properly formatted
4. Try refreshing the page

### Issue: API Errors
**Solution**:
1. Check backend server is running
2. Verify API endpoint URLs
3. Check request format and headers
4. Review backend logs for errors

## 📝 Testing Report Template

### Test Results Summary
- **Date**: [Date of testing]
- **Tester**: [Name]
- **Environment**: [OS, Browser, etc.]

### Test Cases Results
- [ ] Test Case 1: Basic Functionality
- [ ] Test Case 2: Different Project Types
- [ ] Test Case 3: Risk Assessment
- [ ] Test Case 4: Regional Impact
- [ ] Test Case 5: Edge Cases
- [ ] Test Case 6: API Testing
- [ ] Test Case 7: Visual Analytics
- [ ] Test Case 8: Performance
- [ ] Test Case 9: AI/ML Model
- [ ] Test Case 10: Error Handling

### Issues Found
- [List any issues discovered during testing]

### Recommendations
- [Suggestions for improvements]

---

**Note**: This testing guide ensures comprehensive evaluation of all system components. Reviewers should complete all test cases to verify the system meets all requirements. 