#!/bin/bash
# =============================================================================
# AI Cost-Benefit Analysis System - Initialization Script (Mac/Linux)
# =============================================================================
# 
# This shell script initializes the complete development environment for the
# AI Cost-Benefit Analysis system by setting up virtual environments and
# installing all dependencies for both frontend and backend.
# 
# Features:
# - Creates Python virtual environment for backend
# - Installs Python dependencies from requirements.txt
# - Installs Node.js dependencies for frontend
# - Sets up development environment
# - Provides clear status messages and progress indicators
# 
# Usage: ./init.sh
# Prerequisites: Python 3.8+, Node.js 16+, and pip/npm installed
# 
# Author: AI Cost-Benefit Analysis Team
# Version: 1.0.0
# =============================================================================

echo
echo "=============================================================================="
echo "AI Cost-Benefit Analysis System - Initialization (Mac/Linux)"
echo "=============================================================================="
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ ERROR: Python is not installed or not in PATH"
    echo "Please install Python 3.8+ from https://python.org"
    echo "Make sure to add Python to your PATH"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js 16+ from https://nodejs.org"
    echo "Make sure to add Node.js to your PATH"
    exit 1
fi

echo "✅ Python and Node.js are installed"
echo

# =============================================================================
# BACKEND SETUP
# =============================================================================
echo "📦 Setting up Backend Environment..."
echo

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Check if virtual environment already exists
if [ -d "venv" ]; then
    echo "⚠  Virtual environment already exists in backend/venv"
    echo "   Skipping backend virtual environment creation..."
else
    echo "🔧 Creating Python virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ ERROR: Failed to create virtual environment"
        echo "Please ensure Python is properly installed and in PATH"
        exit 1
    fi
    echo "✅ Virtual environment created successfully"
fi

# Activate virtual environment and install dependencies
echo "🔧 Activating virtual environment and installing dependencies..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Failed to activate virtual environment"
    echo "Please check if the venv directory was created properly"
    exit 1
fi

# Upgrade pip
echo "📦 Upgrading pip..."
python -m pip install --upgrade pip

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ ERROR: Failed to install Python dependencies"
    echo "Please check your internet connection and try again"
    exit 1
fi

echo "✅ Backend setup completed successfully"
echo

# Deactivate virtual environment
deactivate

# =============================================================================
# FRONTEND SETUP
# =============================================================================
echo "📦 Setting up Frontend Environment..."
echo

# Navigate to frontend directory
cd "$(dirname "$0")/frontend"

# Check if node_modules already exists
if [ -d "node_modules" ]; then
    echo "⚠  Node modules already exist in frontend/node_modules"
    echo "   Skipping frontend dependency installation..."
else
    echo "📦 Installing Node.js dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ ERROR: Failed to install Node.js dependencies"
        echo "Please check your internet connection and try again"
        exit 1
    fi
    echo "✅ Node.js dependencies installed successfully"
fi

echo "✅ Frontend setup completed successfully"
echo

# =============================================================================
# VERIFICATION
# =============================================================================
echo "🔍 Verifying installation..."
echo

# Check backend
cd "$(dirname "$0")/backend"
if [ -d "venv" ]; then
    echo "✅ Backend virtual environment: OK"
else
    echo "❌ Backend virtual environment: MISSING"
fi

# Check frontend
cd "$(dirname "$0")/frontend"
if [ -d "node_modules" ]; then
    echo "✅ Frontend node_modules: OK"
else
    echo "❌ Frontend node_modules: MISSING"
fi

# Check critical files
cd "$(dirname "$0")"
if [ -f "start.sh" ]; then
    echo "✅ Startup script: OK"
else
    echo "❌ Startup script: MISSING"
fi

echo
echo "=============================================================================="
echo "🎉 INITIALIZATION COMPLETED SUCCESSFULLY!"
echo "=============================================================================="
echo
echo "📋 Next Steps:"
echo "   1. Run './start.sh' to launch the application"
echo "   2. Frontend will be available at: http://localhost:3000"
echo "   3. Backend API will be available at: http://localhost:8000"
echo "   4. API Documentation will be available at: http://localhost:8000/docs"
echo
echo "💡 Development Tips:"
echo "   - Backend virtual environment: backend/venv"
echo "   - Frontend dependencies: frontend/node_modules"
echo "   - To activate backend manually: cd backend && source venv/bin/activate"
echo "   - To install new Python packages: pip install package_name"
echo "   - To install new Node packages: npm install package_name"
echo "   - To run frontend manually: cd frontend && ./node_modules/.bin/react-scripts start"
echo
echo "🚀 Ready to develop! Run './start.sh' to begin."
echo 