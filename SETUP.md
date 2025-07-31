# Quick Setup Guide

## 🚀 5-Minute Setup

### Prerequisites Check
Before starting, ensure you have:
- ✅ **Python 3.8+** installed
- ✅ **Node.js 16+** installed
- ✅ **Git** installed

### Step 1: Clone and Navigate
```bash
git clone <repository-url>
cd ai-cost-benefit-project
```

### Step 2: Initialize the Project (First Time Only)
```bash
# Windows PowerShell
.\init.bat

# Mac/Linux
chmod +x init.sh
./init.sh
```

This will:
- Create Python virtual environment
- Install all backend dependencies
- Install all frontend dependencies
- Set up the complete development environment

### Step 3: Manual Frontend Setup (If Needed)
If the initialization script stops after backend setup, use the manual frontend setup:

```bash
# Windows PowerShell
.\setup-frontend.bat

# Mac/Linux
cd frontend
npm install
```

### Step 4: Start the Application

#### Option A: Automated Startup (Recommended)
```bash
# Windows PowerShell
.\start.bat

# Mac/Linux
chmod +x start.sh
./start.sh
```

#### Option B: Manual Startup
```bash
# Terminal 1 - Start Backend
cd backend
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
python app.py

# Terminal 2 - Start Frontend
cd frontend
# Windows
.\node_modules\.bin\react-scripts start
# Mac/Linux
./node_modules/.bin/react-scripts start
```

### Step 5: Access the Application
- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:8000
- 📚 **API Docs**: http://localhost:8000/docs

## 🧪 Quick Test

1. **Open** http://localhost:3000
2. **Fill the form** with test data:
   ```
   Project Type: Solar
   Region: Urban
   Capacity: 100 MW
   Setup Cost: 50000000
   Maintenance Cost: 2000000
   Duration: 25
   Expected Generation: 150000
   CO2 Saved: 75000
   Beneficiaries: 100000
   Risk Score: 30
   Job Creation: 200
   Subsidy Eligible: Yes
   ```
3. **Click "Get Cost-Benefit Score"**
4. **Verify results appear** with charts and analysis

## 🔧 Troubleshooting

### Common Issues

#### "Python not found"
```bash
# Install Python from python.org
# Or use conda/miniconda
conda install python=3.9
```

#### "Node.js not found"
```bash
# Install Node.js from nodejs.org
# Or use nvm
nvm install 16
nvm use 16
```

#### "Port already in use"
```bash
# Kill processes using ports
# Windows PowerShell
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# For port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

#### "Dependencies not found"
```bash
# Reinstall dependencies
# Windows
cd backend && .\venv\Scripts\activate && pip install -r requirements.txt
cd ../frontend && npm install

# Mac/Linux
cd backend && source venv/bin/activate && pip install -r requirements.txt
cd ../frontend && npm install
```

#### "Frontend modules missing"
```bash
# Use the manual frontend setup script
# Windows
.\setup-frontend.bat

# Mac/Linux
cd frontend
npm install
```

#### "react-scripts not found"
```bash
# Run with direct path
cd frontend
# Windows
.\node_modules\.bin\react-scripts start
# Mac/Linux
./node_modules/.bin/react-scripts start
```

#### "Initialization script fails"
```bash
# If init.bat stops after backend setup:
.\setup-frontend.bat

# If init.bat fails completely:
# Check Python and Node.js installation
# Try running setup scripts individually
```

#### "PowerShell command issues"
```bash
# Use proper PowerShell syntax
.\init.bat  # instead of init.bat
.\start.bat # instead of start.bat
.\setup-frontend.bat  # for manual frontend setup
```

#### "Mac/Linux script permission issues"
```bash
# Make scripts executable
chmod +x init.sh start.sh
./init.sh
./start.sh
```

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 1GB free space
- **Network**: Internet connection for initial setup

## 📊 What to Expect

### First Run
- Backend will train ML model (30-60 seconds)
- Frontend will compile and start
- Browser will open automatically

### Performance
- **Initial load**: 30-60 seconds
- **Subsequent requests**: 2-5 seconds
- **Memory usage**: ~500MB total

### Features Available
- ✅ AI-powered project evaluation
- ✅ Interactive visualizations
- ✅ Real-time scoring
- ✅ Comprehensive analysis
- ✅ API documentation

## 🎯 Next Steps

After successful setup:
1. **Read the README.md** for detailed documentation
2. **Follow TESTING_GUIDE.md** for comprehensive testing
3. **Review DATASET.md** for dataset information
4. **Explore the API** at http://localhost:8000/docs

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review console logs for error messages
3. Verify all prerequisites are installed
4. Try the manual frontend setup script if needed
5. Use appropriate commands for your OS (PowerShell for Windows, bash for Mac/Linux)

---

**Ready to test!** 🚀 