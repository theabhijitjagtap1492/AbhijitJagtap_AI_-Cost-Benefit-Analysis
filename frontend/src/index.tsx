/**
 * React Application Entry Point
 * 
 * This file serves as the main entry point for the React application.
 * It initializes the React root and renders the main App component
 * with React StrictMode enabled for better development experience.
 * 
 * Key Features:
 * - React 18+ createRoot API for concurrent features
 * - StrictMode for detecting potential problems
 * - Global CSS imports for styling
 * - TypeScript support with proper type annotations
 * 
 * Author: AI Cost-Benefit Analysis Team
 * Version: 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
