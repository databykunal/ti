import { useState } from 'react';
import { useAppStore } from '../utils/store';
import { Copy, Play, Trash2, CheckCircle } from 'lucide-react';
import { formatBytes } from '../utils/format';
import { ProgressModal } from './ProgressModal';

export function DuplicateFinder() {
  const { lastDuplicateScanResult, setScanning, setProgress } = useAppStore();
  const [scanInProgress, setScanInProgress] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const handleScanDuplicates = async () => {
    setScanning(true);
    setScanInProgress(true);
    setProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 35;
      if (progress > 100) progress = 100;
      setProgress(Math.floor(progress));
      
      if (progress >= 100) {
        clearInterval(interval);
        setScanning(false);
        setScanInProgress(false);
      }
    }, 400);
  };

  const handleSelectAll = (groupIdx: number) => {
    if (!lastDuplicateScanResult) return;
    const group = lastDuplicateScanResult.groups[groupIdx];
    const newSet = new Set(selectedFiles);
    
    group.files.forEach(file => {
      newSet.add(file.path);
    });
    
    setSelectedFiles(newSet);
  };

  const handleDeleteSelected = async () => {
    if (selectedFiles.size === 0) return;
    if (!confirm(`Delete ${selectedFiles.size} files?`)) return;
    
    // Simulate delete
    const newSet = new Set(selectedFiles);
    newSet.forEach(path => newSet.delete(path));
    setSelectedFiles(new Set());
  };

  if (!lastDuplicateScanResult) {
    return (
      <div className="flex-1 overflow-auto ml-64">
        <div className="border-b border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-3xl font-bold">Duplicate Finder</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Find and remove duplicate files</p>
        </div>
        
        <div className="p-8">
          <button
            onClick={handleScanDuplicates}
            className="btn-primary inline-flex items-center gap-2 mb-8"
          >
            <Play className="w-5 h-5" />
            Scan for Duplicates
          </button>

          <div className="card text-center py-12">
            <Copy className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No duplicates found yet. Click above to scan.</p>
          </div>
        </div>

        <ProgressModal isOpen={scanInProgress} title="Scanning for Duplicates..." />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <h2 className="text-3xl font-bold">Duplicate Finder</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Find and remove duplicate files</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Duplicate Groups</p>
            <p className="text-2xl font-bold">{lastDuplicateScanResult.groups.length}</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Duplicates</p>
            <p className="text-2xl font-bold">{lastDuplicateScanResult.totalDuplicates}</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Space to Save</p>
            <p className="text-2xl font-bold text-green-600">{formatBytes(lastDuplicateScanResult.totalSavings)}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleScanDuplicates}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Re-scan
          </button>
          
          {selectedFiles.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-danger-500 hover:bg-danger-600 text-white rounded-lg transition-colors font-medium inline-flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete {selectedFiles.size} Files
            </button>
          )}
        </div>

        {/* Duplicate Groups */}
        <div className="space-y-4">
          {lastDuplicateScanResult.groups.map((group, groupIdx) => (
            <div key={groupIdx} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-lg">{group.count} Duplicates</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Could save: <span className="text-green-600 font-semibold">{formatBytes(group.potentialSavings)}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleSelectAll(groupIdx)}
                  className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  Select All
                </button>
              </div>

              {/* Files in group */}
              <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4">
                {group.files.map((file, fileIdx) => (
                  <label key={fileIdx} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.path)}
                      onChange={(e) => {
                        const newSet = new Set(selectedFiles);
                        if (e.target.checked) {
                          newSet.add(file.path);
                        } else {
                          newSet.delete(file.path);
                        }
                        setSelectedFiles(newSet);
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{file.path}</p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 flex-shrink-0">{formatBytes(file.size)}</p>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProgressModal isOpen={scanInProgress} title="Scanning for Duplicates..." />
    </div>
  );
}
