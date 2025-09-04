import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

interface PanelProps {
  type: 'single' | 'quad' | 'pie' | 'line' | 'multiline' | 'bar';
  delay: number;
}

const Panel: React.FC<PanelProps> = ({ type, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const renderContent = () => {
    if (!isLoaded) {
      return (
        <div className="w-full h-full animate-pulse">
          <div className="h-3 bg-gray-300 rounded mb-2"></div>
          <div className="h-full bg-gray-200 rounded"></div>
        </div>
      );
    }

    switch (type) {
      case 'single':
        return (
          <div className="animate-fade-in">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-300 rounded mb-1 w-12"></div>
            <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
              <div className="w-8 h-2 bg-white/70 rounded"></div>
            </div>
          </div>
        );

      case 'quad':
        return (
          <div className="grid grid-cols-2 gap-1 animate-fade-in h-full">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-teal-400 to-teal-300 rounded p-1 flex flex-col justify-center items-center">
                <div className="w-3 h-1 bg-white/70 rounded mb-0.5"></div>
                <div className="w-4 h-1 bg-white/50 rounded"></div>
              </div>
            ))}
          </div>
        );

      case 'pie':
        return (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400"></div>
              <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white/20"></div>
              <div className="absolute top-2 left-2 w-1 h-4 bg-white/60 rounded transform rotate-45"></div>
            </div>
          </div>
        );

      case 'line':
        return (
          <div className="h-full flex items-end justify-between animate-fade-in px-1">
            <svg className="w-full h-6" viewBox="0 0 40 20">
              <path
                d="M2,18 Q8,14 12,12 T20,8 T28,10 T38,6"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                fill="none"
                className="animate-draw-line"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case 'multiline':
        return (
          <div className="h-full flex items-end justify-between animate-fade-in px-1">
            <svg className="w-full h-6" viewBox="0 0 40 20">
              <path
                d="M2,16 Q8,12 12,14 T20,10 T28,12 T38,8"
                stroke="#3B82F6"
                strokeWidth="1"
                fill="none"
                className="animate-draw-line"
              />
              <path
                d="M2,14 Q8,10 12,8 T20,6 T28,8 T38,4"
                stroke="#8B5CF6"
                strokeWidth="1"
                fill="none"
                className="animate-draw-line"
                style={{ animationDelay: '0.2s' }}
              />
              <path
                d="M2,12 Q8,8 12,10 T20,14 T28,6 T38,10"
                stroke="#14B8A6"
                strokeWidth="1"
                fill="none"
                className="animate-draw-line"
                style={{ animationDelay: '0.4s' }}
              />
            </svg>
          </div>
        );

      case 'bar':
        return (
          <div className="h-full flex items-end justify-between animate-fade-in px-1 gap-0.5">
            {[4, 6, 3, 5, 7, 4].map((height, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-blue-500 to-purple-400 rounded-sm animate-grow-bar"
                style={{
                  width: '4px',
                  height: `${height * 2}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 h-16 shadow-lg">
      {renderContent()}
    </div>
  );
};

interface DashboardAnimationProps {
  onReset: () => void;
}

export const DashboardAnimation: React.FC<DashboardAnimationProps> = ({ onReset }) => {
  const [key, setKey] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleReplay = () => {
    setKey(prev => prev + 1);
    setTimer(0);
    setIsRunning(true);
  };

  useEffect(() => {
    setIsRunning(true);
    setTimer(0);
    
    // Stop timer when all panels are loaded (2000ms + some buffer)
    const timer = setTimeout(() => {
      setIsRunning(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [key]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const panels = [
    { type: 'single' as const, delay: 500 },
    { type: 'quad' as const, delay: 800 },
    { type: 'pie' as const, delay: 1100 },
    { type: 'line' as const, delay: 1400 },
    { type: 'multiline' as const, delay: 1700 },
    { type: 'bar' as const, delay: 2000 },
  ];

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex items-center space-x-2">
        <h3 className="text-sm font-medium text-gray-600">Dashboard Loading</h3>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
          {timer.toFixed(1)}s
        </span>
      </div>
      
      <div key={key} className="w-[300px] h-[200px] bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-300 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-500 font-medium">Dashboard</div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-3 gap-2 h-[140px]">
          {panels.map((panel, index) => (
            <Panel
              key={index}
              type={panel.type}
              delay={panel.delay}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleReplay}
        className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg hover:bg-white/30 transition-all duration-200 text-gray-700 text-sm font-medium"
      >
        <RotateCcw size={14} />
        <span>Replay</span>
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes draw-line {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          to {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }

        @keyframes grow-bar {
          from {
            height: 0;
          }
          to {
            height: var(--target-height);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-draw-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-line 1s ease-out forwards;
        }

        .animate-grow-bar {
          height: 0;
          animation: grow-bar 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};