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
        <div className="w-full h-full animate-pulse flex flex-col gap-1">
          <div className="h-2 bg-gray-300 rounded flex-shrink-0"></div>
          <div className="flex-1 bg-gray-200 rounded"></div>
        </div>
      );
    }

    switch (type) {
      case 'single':
        return (
          <div className="animate-fade-in h-full flex flex-col justify-center">
            <div className="h-3 bg-blue-400 rounded mb-2 w-full"></div>
            <div className="h-10 bg-blue-500 rounded flex items-center justify-center">
              <div className="w-12 h-3 bg-white/70 rounded"></div>
            </div>
          </div>
        );

      case 'quad':
        return (
          <div className="grid grid-cols-2 gap-1 animate-fade-in h-full">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-teal-400 rounded p-1 flex flex-col justify-center items-center">
                <div className="w-3 h-1 bg-white/70 rounded mb-0.5"></div>
                <div className="w-4 h-1 bg-white/50 rounded"></div>
              </div>
            ))}
          </div>
        );

      case 'pie':
        return (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="relative w-12 h-12">
              {/* 外环 */}
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                />
                {/* 进度环 - 75% */}
                <circle
                  cx="24"
                  cy="24"
                  r="18"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="6"
                  strokeDasharray="113"
                  strokeDashoffset="28"
                  strokeLinecap="round"
                  className="animate-draw-circle"
                />
                {/* 第二层环 - 60% */}
                <circle
                  cx="24"
                  cy="24"
                  r="12"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="12"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="4"
                  strokeDasharray="75"
                  strokeDashoffset="30"
                  strokeLinecap="round"
                  className="animate-draw-circle"
                  style={{ animationDelay: '0.3s' }}
                />
              </svg>

            </div>
          </div>
        );

      case 'line':
        return (
          <div className="h-full flex items-center justify-center animate-fade-in p-1">
            <svg className="w-full h-10" viewBox="0 0 40 24">
              <defs>
                <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M2,20 Q8,16 12,14 T20,10 T28,12 T38,8 L38,22 L2,22 Z"
                fill="url(#fillGradient)"
                className="animate-draw-line"
              />
              <path
                d="M2,20 Q8,16 12,14 T20,10 T28,12 T38,8"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                className="animate-draw-line"
              />
            </svg>
          </div>
        );

      case 'multiline':
        return (
          <div className="h-full flex items-center justify-center animate-fade-in p-1">
            <svg className="w-full h-10" viewBox="0 0 40 24">
              <defs>
                <linearGradient id="fillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="fillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M2,14 Q8,10 12,12 T20,8 T28,10 T38,6 L38,22 L2,22 Z"
                fill="url(#fillGradient1)"
                className="animate-draw-line"
              />
              <path
                d="M2,20 Q8,18 12,16 T20,18 T28,16 T38,18 L38,22 L2,22 Z"
                fill="url(#fillGradient2)"
                className="animate-draw-line"
                style={{ animationDelay: '0.2s' }}
              />
              <path
                d="M2,14 Q8,10 12,12 T20,8 T28,10 T38,6"
                stroke="#3B82F6"
                strokeWidth="1.5"
                fill="none"
                className="animate-draw-line"
              />
              <path
                d="M2,20 Q8,18 12,16 T20,18 T28,16 T38,18"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                fill="none"
                className="animate-draw-line"
                style={{ animationDelay: '0.2s' }}
              />
            </svg>
          </div>
        );

      case 'bar':
        return (
          <div className="h-full flex items-end justify-between animate-fade-in px-1 pb-3 gap-0.5">
            {[4, 6, 3, 5, 7, 4, 5].map((height, i) => (
              <div
                key={i}
                className="bg-blue-500 rounded-sm animate-grow-bar"
                style={{
                  width: '5px',
                  '--target-height': `${height * 4}px`,
                  animationDelay: `${i * 0.1}s`
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* 原始背景: bg-white/10 backdrop-blur-sm border border-white/20 */}
      <div className="bg-white border border-gray-200 rounded-lg p-1 h-16 shadow-lg">
        {renderContent()}
      </div>
    </>
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
    let interval: ReturnType<typeof setInterval>;
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
      
      {/* 原始背景: bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-md */}
      <div key={key} className="w-[300px] h-[200px] bg-white border border-gray-300 rounded-xl p-3 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-300 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          </div>

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

      <style>{`
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

        @keyframes draw-circle {
          from {
            stroke-dashoffset: 113;
          }
          to {
            stroke-dashoffset: 28;
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

        .animate-draw-circle {
          stroke-dasharray: 113;
          stroke-dashoffset: 113;
          animation: draw-circle 1.2s ease-out forwards;
        }

        .animate-grow-bar {
          height: 0;
          animation: grow-bar 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};