@echo off
REM =============================================================================
REM AI Cost-Benefit Analysis System - Startup Script
REM =============================================================================
REM 
REM This batch script automates the startup process for the AI Cost-Benefit Analysis
REM system by launching both the backend (FastAPI) and frontend (React) servers
REM in separate command windows.
REM 
REM Features:
REM - Kills any existing Python and Node.js processes to prevent conflicts
REM - Verifies dependencies are properly installed
REM - Starts backend server (FastAPI) on port 8000 with virtual environment
REM - Starts frontend server (React) on port 3000 with direct react-scripts path
REM - Provides clear status messages and URLs
REM - Waits for user input before stopping servers
REM 
REM Usage: Double-click start.bat or run from command line
REM Prerequisites: Python 3.8+, Node.js 16+, and all dependencies installed
REM 
REM Author: AI Cost-Benefit Analysis Team
REM Version: 1.0.0
REM =============================================================================

echo Starting AI Cost-Benefit Analysis System...
echo.

REM =============================================================================
REM DEPENDENCY VERIFICATION
REM =============================================================================
echo 🔍 Verifying dependencies...

REM Check if backend virtual environment exists
cd /d "%~dp0backend"
if not exist "venv" (
    echo ❌ ERROR: Backend virtual environment not found
    echo Please run '.\init.bat' first to set up the environment
    pause
    exit /b 1
)

REM Check if frontend node_modules exists
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo ❌ ERROR: Frontend node_modules not found
    echo Please run '.\init.bat' first to set up the environment
    pause
    exit /b 1
)

REM Check if react-scripts is available
if not exist "node_modules\.bin\react-scripts.cmd" (
    echo ❌ ERROR: react-scripts not found in frontend dependencies
    echo Please run '.\init.bat' first to set up the environment
    pause
    exit /b 1
)

echo ✅ Dependencies verified successfully
echo.

REM =============================================================================
REM START SERVERS
REM =============================================================================

REM Kill any existing processes
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo Starting Backend Server...
start "Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\activate && python app.py"

echo Starting Frontend Server...
start "Frontend" cmd /k "cd /d %~dp0frontend && .\node_modules\.bin\react-scripts start"

echo.
echo Servers are starting...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:8000
echo.
echo Press any key to stop servers...
pause >nul

taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo Servers stopped. 