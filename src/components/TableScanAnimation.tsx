import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface TableScanAnimationProps {
  onReset: () => void;
}

export const TableScanAnimation: React.FC<TableScanAnimationProps> = ({ onReset }) => {
  const [phase, setPhase] = useState<'input' | 'loading' | 'scanning' | 'complete'>('input');
  const [scanPosition, setScanPosition] = useState(0);
  const [finalHighlightedTable, setFinalHighlightedTable] = useState<number | null>(null);
  const [key, setKey] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleReplay = () => {
    setKey(prev => prev + 1);
    setPhase('input');
    setScanPosition(0);
    setFinalHighlightedTable(null);
    setTimer(0);
    setIsRunning(true);
  };

  useEffect(() => {
    setIsRunning(true);
    setTimer(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Input simulation (500ms)
    timers.push(setTimeout(() => {
      setPhase('loading');
    }, 500));

    // Phase 2: Tables loading (1000ms)
    timers.push(setTimeout(() => {
      setPhase('scanning');
    }, 1500));

    // Phase 3: Scanning animation (2500ms)
    const scanInterval = setInterval(() => {
      setScanPosition(prev => {
        return (prev + 1) % 12;
      });
    }, 200);

    // Phase 4: Complete (4000ms)
    timers.push(setTimeout(() => {
      clearInterval(scanInterval);
      setPhase('complete');
      // Highlight one final table (table 5 for example)
      setFinalHighlightedTable(5);
      setIsRunning(false);
    }, 4000));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(scanInterval);
    };
  }, [key]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const tables = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-2">
        <h3 className="text-sm font-medium text-gray-600">Database Table Scan</h3>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
          {timer.toFixed(1)}s
        </span>
      </div>
      
      {/* 原始背景: bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-md */}
      <div className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-300 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          </div>

        </div>

        {/* Query Input Area */}
        <div className="mb-3">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-2 h-8 flex items-center">
            {phase === 'input' ? (
              <div className="flex items-center space-x-1">
                <div className="w-1 h-3 bg-purple-400 animate-pulse"></div>
                <div className="w-16 h-2 bg-purple-300/60 rounded animate-fade-in"></div>
              </div>
            ) : (
              <div className="w-20 h-2 bg-purple-400 rounded"></div>
            )}
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-4 gap-2 h-[120px]">
          {tables.map((table) => {
            const isHighlighted = finalHighlightedTable === table;
            const isScanning = phase === 'scanning' && scanPosition === table;
            
            return (
              <div
                key={table}
                className={`
                  w-full h-6 rounded transition-all duration-300 flex items-center justify-center relative
                  ${phase === 'loading' 
                    ? 'bg-gray-200 animate-pulse' 
                    : isHighlighted
                      ? 'bg-purple-400 shadow-sm'
                      : 'bg-gray-300/60'
                  }
                  ${isScanning ? 'ring-2 ring-purple-400/50 animate-pulse-glow' : ''}
                `}
                style={{
                  animationDelay: `${table * 80}ms`,
                  opacity: phase === 'loading' ? 0.6 : 1
                }}
              >

              </div>
            );
          })}
        </div>

        {/* Scanning Light Effect */}
        {/* {phase === 'scanning' && (
          <div 
            className="absolute rounded transition-all duration-200 pointer-events-none"
            style={{
              top: `${82 + Math.floor(scanPosition / 4) * 32}px`,
              left: '8px',
              right: '8px',
              height: '40px',
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.4), 0 0 60px rgba(147, 51, 234, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.1)',
              animation: 'pulse-glow 0.4s ease-in-out infinite'
            }}
          ></div>
        )} */}
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