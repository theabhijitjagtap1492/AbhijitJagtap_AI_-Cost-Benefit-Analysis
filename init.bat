@echo off
REM =============================================================================
REM AI Cost-Benefit Analysis System - Initialization Script
REM =============================================================================
REM 
REM This batch script initializes the complete development environment for the
REM AI Cost-Benefit Analysis system by setting up virtual environments and
REM installing all dependencies for both frontend and backend.
REM 
REM Features:
REM - Creates Python virtual environment for backend
REM - Installs Python dependencies from requirements.txt
REM - Installs Node.js dependencies for frontend
REM - Sets up development environment
REM - Provides clear status messages and progress indicators
REM 
REM Usage: Double-click init.bat or run from command line
REM Prerequisites: Python 3.8+, Node.js 16+, and pip/npm installed
REM 
REM Author: AI Cost-Benefit Analysis Team
REM Version: 1.0.0
REM =============================================================================

echo.
echo =============================================================================
echo AI Cost-Benefit Analysis System - Initialization
echo =============================================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    echo Make sure to check "Add to PATH" during installation
    pause
    exit /b 1
)

echo ✅ Python and Node.js are installed
echo.

REM =============================================================================
REM BACKEND SETUP
REM =============================================================================
echo 📦 Setting up Backend Environment...
echo.

REM Navigate to backend directory
cd /d "%~dp0backend"

REM Check if virtual environment already exists
if exist "venv" (
    echo ⚠  Virtual environment already exists in backend/venv
    echo    Skipping backend virtual environment creation...
) else (
    echo 🔧 Creating Python virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ❌ ERROR: Failed to create virtual environment
        echo Please ensure Python is properly installed and in PATH
        pause
        exit /b 1
    )
    echo ✅ Virtual environment created successfully
)

REM Activate virtual environment and install dependencies
echo 🔧 Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ❌ ERROR: Failed to activate virtual environment
    echo Please check if the venv directory was created properly
    pause
    exit /b 1
)

REM Upgrade pip
echo 📦 Upgrading pip...
python -m pip install --upgrade pip

REM Install Python dependencies
echo 📦 Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ ERROR: Failed to install Python dependencies
    echo Please check your internet connection and try again
    pause
    exit /b 1
)

echo ✅ Backend setup completed successfully
echo.

REM Deactivate virtual environment
deactivate

REM =============================================================================
REM FRONTEND SETUP
REM =============================================================================
echo 📦 Setting up Frontend Environment...
echo.

REM Navigate to frontend directory
cd /d "%~dp0frontend"

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ ERROR: package.json not found in frontend directory
    echo Please ensure the frontend directory contains a valid React project
    pause
    exit /b 1
)

REM Force reinstall Node.js dependencies to ensure they are properly installed
echo 📦 Installing Node.js dependencies...
echo    This may take a few minutes...

REM Remove existing node_modules if it exists (to ensure clean install)
if exist "node_modules" (
    echo 🔧 Removing existing node_modules for clean installation...
    rmdir /s /q node_modules 2>nul
)

REM Remove package-lock.json if it exists (to ensure clean install)
if exist "package-lock.json" (
    echo 🔧 Removing existing package-lock.json for clean installation...
    del package-lock.json 2>nul
)

REM Install Node.js dependencies
echo 📦 Installing fresh Node.js dependencies...
npm install
if errorlevel 1 (
    echo ❌ ERROR: Failed to install Node.js dependencies
    echo Please check your internet connection and try again
    echo You can also try: npm cache clean --force
    pause
    exit /b 1
)

REM Verify that react-scripts is installed
if not exist "node_modules\.bin\react-scripts.cmd" (
    echo ❌ ERROR: react-scripts not found after installation
    echo Please check if the installation completed successfully
    pause
    exit /b 1
)

echo ✅ Node.js dependencies installed successfully
echo ✅ Frontend setup completed successfully
echo.

REM =============================================================================
REM VERIFICATION
REM =============================================================================
echo 🔍 Verifying installation...
echo.

REM Check backend
cd /d "%~dp0backend"
if exist "venv" (
    echo ✅ Backend virtual environment: OK
) else (
    echo ❌ Backend virtual environment: MISSING
)

REM Check frontend
cd /d "%~dp0frontend"
if exist "node_modules" (
    echo ✅ Frontend node_modules: OK
    if exist "node_modules\.bin\react-scripts.cmd" (
        echo ✅ Frontend react-scripts: OK
    ) else (
        echo ❌ Frontend react-scripts: MISSING
    )
) else (
    echo ❌ Frontend node_modules: MISSING
)

REM Check critical files
cd /d "%~dp0"
if exist "start.bat" (
    echo ✅ Startup script: OK
) else (
    echo ❌ Startup script: MISSING
)

echo.
echo =============================================================================
echo 🎉 INITIALIZATION COMPLETED SUCCESSFULLY!
echo =============================================================================
echo.
echo 📋 Next Steps:
echo    1. Run '.\start.bat' to launch the application
echo    2. Frontend will be available at: http://localhost:3000
echo    3. Backend API will be available at: http://localhost:8000
echo    4. API Documentation will be available at: http://localhost:8000/docs
echo.
echo 💡 Development Tips:
echo    - Backend virtual environment: backend/venv
echo    - Frontend dependencies: frontend/node_modules
echo    - To activate backend manually: cd backend && venv\Scripts\activate
echo    - To install new Python packages: pip install package_name
echo    - To install new Node packages: npm install package_name
echo    - To run frontend manually: cd frontend && .\node_modules\.bin\react-scripts start
echo.
echo 🚀 Ready to develop! Run '.\start.bat' to begin.
echo.
pause