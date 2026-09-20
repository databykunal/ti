import { HardDrive, TrendingUp } from 'lucide-react';
import { useAppStore } from '../utils/store';
import { formatBytes } from '../utils/format';

export function StorageAnalyzer() {
  const { lastScanResult } = useAppStore();

  if (!lastScanResult) {
    return (
      <div className="flex-1 overflow-auto ml-64">
        <div className="border-b border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-3xl font-bold">Storage Analyzer</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Detailed breakdown of your storage</p>
        </div>
        
        <div className="p-8">
          <div className="card text-center py-12">
            <HardDrive className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No scan data. Run scan from Dashboard first.</p>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { name: 'Videos', size: 45, color: 'bg-red-500' },
    { name: 'Photos', size: 32, color: 'bg-green-500' },
    { name: 'Documents', size: 28, color: 'bg-blue-500' },
    { name: 'Applications', size: 65, color: 'bg-purple-500' },
    { name: 'Other', size: 48, color: 'bg-gray-500' },
  ];

  const totalSize = categories.reduce((a, b) => a + b.size, 0);

  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">Storage Analyzer</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Detailed breakdown of your storage</p>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Files</p>
            <p className="text-2xl font-bold">{lastScanResult.totalFiles.toLocaleString()}</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Size</p>
            <p className="text-2xl font-bold">{formatBytes(lastScanResult.totalSize)}</p>
          </div>
          
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Duration</p>
            <p className="text-2xl font-bold">{lastScanResult.duration}s</p>
          </div>
        </div>

        {/* Categories */}
        <div className="card">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Storage by Category
          </h3>
          
          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {formatBytes(cat.size * 1024 * 1024 * 1024)} ({Math.round(cat.size / totalSize * 100)}%)
                  </p>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${cat.color} h-2 rounded-full transition-all`}
                    style={{ width: `${(cat.size / totalSize) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Folders */}
        <div className="card">
          <h3 className="font-bold text-lg mb-4">Top Folders</h3>
          
          <div className="space-y-2">
            {lastScanResult.folders.slice(0, 10).map((folder, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{folder.name}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{folder.fileCount} files</p>
                </div>
                <p className="font-semibold text-primary-600 dark:text-primary-400">{formatBytes(folder.size)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
