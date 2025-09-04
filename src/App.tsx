import React, { useState, useCallback } from 'react';
import { AnimationContainer } from './components/AnimationContainer';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Processing Animations</h1>
        <p className="text-gray-600">Watch data query, table scanning, and dashboard loading with glassmorphism effects</p>
      </div>
      
      <AnimationContainer />
    </div>
  );
}

export default App;