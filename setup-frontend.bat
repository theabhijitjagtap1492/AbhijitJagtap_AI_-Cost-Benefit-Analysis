@echo off
REM =============================================================================
REM Frontend Setup Script - Manual Installation
REM =============================================================================
REM 
REM This script sets up the frontend dependencies manually.
REM Use this if the main init.bat script fails to complete frontend setup.
REM 
REM Author: AI Cost-Benefit Analysis Team
REM Version: 1.0.0
REM =============================================================================

echo.
echo =============================================================================
echo Frontend Setup - Manual Installation
echo =============================================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Navigate to frontend directory
cd /d "%~dp0frontend"
echo 📁 Current directory: %CD%

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ ERROR: package.json not found in frontend directory
    echo Please ensure the frontend directory contains a valid React project
    echo Current directory contents:
    dir
    pause
    exit /b 1
)

echo ✅ package.json found in frontend directory

REM Remove existing node_modules if it exists
if exist "node_modules" (
    echo 🔧 Removing existing node_modules for clean installation...
    rmdir /s /q node_modules 2>nul
    echo ✅ Existing node_modules removed
)

REM Remove package-lock.json if it exists
if exist "package-lock.json" (
    echo 🔧 Removing existing package-lock.json for clean installation...
    del package-lock.json 2>nul
    echo ✅ Existing package-lock.json removed
)

REM Install Node.js dependencies
echo 📦 Installing Node.js dependencies...
echo    This may take a few minutes...
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
    echo Checking node_modules contents:
    dir node_modules\.bin\ 2>nul
    pause
    exit /b 1
)

echo ✅ Node.js dependencies installed successfully
echo ✅ Frontend setup completed successfully
echo.

REM Verify installation
echo 🔍 Verifying frontend installation...
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

echo.
echo =============================================================================
echo 🎉 FRONTEND SETUP COMPLETED SUCCESSFULLY!
echo =============================================================================
echo.
echo 📋 Next Steps:
echo    1. Run '.\start.bat' to launch the application
echo    2. Frontend will be available at: http://localhost:3000
echo.
pause 