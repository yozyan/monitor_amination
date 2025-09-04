import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface QueryAnimationProps {
  onComplete: () => void;
}

export const QueryAnimation: React.FC<QueryAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'input' | 'loading' | 'searching' | 'complete'>('input');
  const [searchPosition, setSearchPosition] = useState(0);
  const [highlightedRecords, setHighlightedRecords] = useState<number[]>([]);
  const [key, setKey] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleReplay = () => {
    setKey(prev => prev + 1);
    setPhase('input');
    setSearchPosition(0);
    setHighlightedRecords([]);
    setTimer(0);
    setIsRunning(true);
  };

  useEffect(() => {
    setIsRunning(true);
    setTimer(0);
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Input simulation (500ms)
    timers.push(setTimeout(() => {
      setPhase('loading');
    }, 500));

    // Phase 2: Records loading (1000ms)
    timers.push(setTimeout(() => {
      setPhase('searching');
    }, 1500));

    // Phase 3: Search animation (2000ms)
    const searchInterval = setInterval(() => {
      setSearchPosition(prev => {
        const next = (prev + 1) % 8;
        
        // Randomly highlight records during search
        if (Math.random() > 0.7) {
          setHighlightedRecords(prev => {
            const newHighlights = [...prev];
            if (!newHighlights.includes(next)) {
              newHighlights.push(next);
            }
            return newHighlights;
          });
        }
        
        return next;
      });
    }, 250);

    // Phase 4: Complete and transition (3500ms)
    timers.push(setTimeout(() => {
      clearInterval(searchInterval);
      setPhase('complete');
      setIsRunning(false);
      
      // Trigger slide transition after brief pause
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 3500));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(searchInterval);
    };
  }, [onComplete, key]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const records = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-2">
        <h3 className="text-sm font-medium text-gray-600">Data Query Process</h3>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
          {timer.toFixed(1)}s
        </span>
      </div>
      
      <div key={key} className="w-[300px] h-[200px] bg-gradient-to-br from-emerald-50/80 to-blue-50/80 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-xl relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-red-300 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-500 font-medium">Query</div>
      </div>

      {/* Search Input Area */}
      <div className="mb-3">
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 h-8 flex items-center">
          {phase === 'input' ? (
            <div className="flex items-center space-x-1">
              <div className="w-1 h-3 bg-blue-400 animate-pulse"></div>
              <div className="w-8 h-2 bg-blue-300/60 rounded animate-fade-in"></div>
            </div>
          ) : (
            <div className="w-12 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
          )}
        </div>
      </div>

      {/* Records Area */}
      <div className="space-y-1 h-[120px] overflow-hidden">
        {records.map((record) => {
          const isHighlighted = highlightedRecords.includes(record);
          const isSearching = phase === 'searching' && searchPosition === record;
          
          return (
            <div
              key={record}
              className={`
                h-4 rounded transition-all duration-300 flex items-center px-2
                ${phase === 'loading' 
                  ? 'bg-gray-200 animate-pulse' 
                  : isHighlighted
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-sm'
                    : 'bg-gray-300/60'
                }
                ${isSearching ? 'ring-2 ring-blue-400/50 animate-pulse-glow' : ''}
              `}
              style={{
                animationDelay: `${record * 100}ms`,
                opacity: phase === 'loading' ? 0.6 : 1
              }}
            >
              {phase !== 'loading' && (
                <div className="flex items-center space-x-1 w-full">
                  <div className={`w-2 h-2 rounded-full ${isHighlighted ? 'bg-white/80' : 'bg-gray-400/60'}`}></div>
                  <div className={`h-1 rounded flex-1 ${isHighlighted ? 'bg-white/60' : 'bg-gray-400/40'}`}></div>
                  <div className={`w-3 h-1 rounded ${isHighlighted ? 'bg-white/60' : 'bg-gray-400/40'}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Search Light Effect */}
      {phase === 'searching' && (
        <div 
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full transition-all duration-250"
          style={{
            top: `${85 + searchPosition * 16}px`,
            animation: 'pulse-glow 0.5s ease-in-out infinite'
          }}
        ></div>
      )}
      </div>

      <button
        onClick={handleReplay}
        className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg hover:bg-white/30 transition-all duration-200 text-gray-700 text-sm font-medium"
      >
        <RotateCcw size={14} />
        <span>Replay</span>
      </button>
    </div>
  );
};