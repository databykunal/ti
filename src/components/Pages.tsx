import { FileStack, Clock, Zap, History, Settings as SettingsIcon } from 'lucide-react';

export function SimilarFiles() {
  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">Similar Files</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Find similar and visually identical files</p>
      </div>
      <div className="p-8">
        <div className="card text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">Coming soon in Phase 5</p>
        </div>
      </div>
    </div>
  );
}

export function LargeFiles() {
  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">Large Files</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Find your largest files and folders</p>
      </div>
      <div className="p-8">
        <div className="card text-center py-12">
          <FileStack className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Coming soon in Phase 6</p>
        </div>
      </div>
    </div>
  );
}

export function OldFiles() {
  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">Old Files</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Find possibly unused files</p>
      </div>
      <div className="p-8">
        <div className="card text-center py-12">
          <Clock className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Coming soon in Phase 6</p>
        </div>
      </div>
    </div>
  );
}

export function Cleanup() {
  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">Smart Cleanup</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Get intelligent cleanup recommendations</p>
      </div>
      <div className="p-8">
        <div className="card text-center py-12">
          <Zap className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Coming soon in Phase 8</p>
        </div>
      </div>
    </div>
  );
}

export function HistoryPage() {
  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">History</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">View your scan history and cleanup logs</p>
      </div>
      <div className="p-8">
        <div className="card text-center py-12">
          <History className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Coming soon in Phase 9</p>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  return (
    <div className="flex-1 overflow-auto ml-64">
      <div className="border-b border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Configure TidyDrive preferences</p>
      </div>
      <div className="p-8 space-y-6">
        <div className="card">
          <h3 className="font-bold text-lg mb-4">General Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Auto-scan on startup</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Show notifications</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Enable analytics (anonymous)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-bold text-lg mb-4">About</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">TidyDrive v0.1.0</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Privacy-focused Storage Manager</p>
        </div>
      </div>
    </div>
  );
}
