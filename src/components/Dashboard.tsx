import { useState } from 'react';
import { AlertCircle, TrendingUp, Zap, Play, HardDrive } from 'lucide-react';
import { useAppStore } from '../utils/store';
import { ProgressModal } from './ProgressModal';
import { formatBytes, formatPercent } from '../utils/format';

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { isScanning, setScanning, setProgress, setCurrentFile } = useAppStore();
  const [scanInProgress, setScanInProgress] = useState(false);

  const handleStartScan = async () => {
    setScanning(true);
    setScanInProgress(true);
    setProgress(0);
    
    // Simulate scan progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      setProgress(Math.floor(progress));
      
      if (progress >= 100) {
        clearInterval(interval);
        setScanning(false);
        setScanInProgress(false);
      }
    }, 500);
  };

  const totalStorage = 256;
  const usedStorage = 218;
  const freeStorage = 38;
  const percentUsed = formatPercent(usedStorage, totalStorage);

  return (
    <div className="flex-1 overflow-auto ml-64">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-8 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Understand your storage at a glance</p>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        
        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Storage</p>
            <p className="text-3xl font-bold">{totalStorage} GB</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">C: Drive</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Used Storage</p>
            <p className="text-3xl font-bold">{usedStorage} GB</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{percentUsed}% utilized</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Free Storage</p>
            <p className="text-3xl font-bold">{freeStorage} GB</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{100 - percentUsed}% available</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Health Score</p>
            <p className="text-3xl font-bold">78<span className="text-lg">/100</span></p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">✓ Good</p>
          </div>
        </div>

        {/* Storage Bar */}
        <div className="card">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Storage Usage</p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-400 to-primary-600 h-4 rounded-full transition-all"
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {usedStorage} GB used of {totalStorage} GB
          </p>
        </div>

        {/* Warning Alert */}
        {percentUsed > 80 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">Storage Running Low</p>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">Only {freeStorage}GB free. Consider cleaning up to improve performance.</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="card">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleStartScan}
              disabled={isScanning}
              className="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="font-semibold text-primary-700 dark:text-primary-300">Run Full Scan</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Analyze your drives</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => onNavigate('duplicates')}
              className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <p className="font-semibold">Find Duplicates</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Detect duplicate files</p>
            </button>
            
            <button
              onClick={() => onNavigate('analyze')}
              className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <p className="font-semibold">Analyze Storage</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">See what's taking space</p>
            </button>
            
            <button
              onClick={() => onNavigate('cleanup')}
              className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left"
            >
              <p className="font-semibold">Smart Cleanup</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Safe cleanup options</p>
            </button>
          </div>
        </div>

        {/* Getting Started */}
        <div className="card text-center py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
          <TrendingUp className="w-12 h-12 mx-auto text-primary-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ready to Scan?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Click "Run Full Scan" to analyze your storage and get started</p>
          <button
            onClick={handleStartScan}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start Scanning
          </button>
        </div>
      </div>

      {/* Progress Modal */}
      <ProgressModal isOpen={scanInProgress} title="Scanning Storage..." />
    </div>
  );
}
