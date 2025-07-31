#!/bin/bash
# =============================================================================
# AI Cost-Benefit Analysis System - Startup Script (Mac/Linux)
# =============================================================================
# 
# This shell script automates the startup process for the AI Cost-Benefit Analysis
# system by launching both the backend (FastAPI) and frontend (React) servers
# in separate terminal windows.
# 
# Features:
# - Kills any existing Python and Node.js processes to prevent conflicts
# - Starts backend server (FastAPI) on port 8000 with virtual environment
# - Starts frontend server (React) on port 3000 with direct react-scripts path
# - Provides clear status messages and URLs
# - Waits for user input before stopping servers
# 
# Usage: ./start.sh
# Prerequisites: Python 3.8+, Node.js 16+, and all dependencies installed
# 
# Author: AI Cost-Benefit Analysis Team
# Version: 1.0.0
# =============================================================================

echo "Starting AI Cost-Benefit Analysis System..."
echo

# Kill any existing processes
pkill -f "python.*app.py" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
pkill -f "node.*start" 2>/dev/null

echo "Starting Backend Server..."

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Start backend in a new terminal window
if command -v gnome-terminal &> /dev/null; then
    # Linux with GNOME
    gnome-terminal --title="Backend" -- bash -c "cd '$SCRIPT_DIR/backend' && source venv/bin/activate && python app.py; exec bash"
elif command -v xterm &> /dev/null; then
    # Linux with xterm
    xterm -title "Backend" -e "cd '$SCRIPT_DIR/backend' && source venv/bin/activate && python app.py; bash" &
elif command -v osascript &> /dev/null; then
    # macOS
    osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/backend' && source venv/bin/activate && python app.py\""
else
    # Fallback: start in background
    cd "$SCRIPT_DIR/backend" && source venv/bin/activate && python app.py &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
fi

echo "Starting Frontend Server..."

# Start frontend in a new terminal window
if command -v gnome-terminal &> /dev/null; then
    # Linux with GNOME
    gnome-terminal --title="Frontend" -- bash -c "cd '$SCRIPT_DIR/frontend' && ./node_modules/.bin/react-scripts start; exec bash"
elif command -v xterm &> /dev/null; then
    # Linux with xterm
    xterm -title "Frontend" -e "cd '$SCRIPT_DIR/frontend' && ./node_modules/.bin/react-scripts start; bash" &
elif command -v osascript &> /dev/null; then
    # macOS
    osascript -e "tell application \"Terminal\" to do script \"cd '$SCRIPT_DIR/frontend' && ./node_modules/.bin/react-scripts start\""
else
    # Fallback: start in background
    cd "$SCRIPT_DIR/frontend" && ./node_modules/.bin/react-scripts start &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
fi

echo
echo "Servers are starting..."
echo
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:8000"
echo
echo "Press any key to stop servers..."
read -n 1 -s

# Stop servers
pkill -f "python.*app.py" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
pkill -f "node.*start" 2>/dev/null

echo "Servers stopped." 