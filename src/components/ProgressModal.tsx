import { useAppStore } from '../utils/store';
import { formatBytes } from '../utils/format';

interface ProgressModalProps {
  isOpen: boolean;
  title: string;
  onCancel?: () => void;
}

export function ProgressModal({ isOpen, title, onCancel }: ProgressModalProps) {
  const { scanProgress, currentFile } = useAppStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        
        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-primary-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${scanProgress}%` }}
          />
        </div>

        {/* Progress text */}
        <p className="text-center text-sm font-medium mb-4">{scanProgress}% Complete</p>

        {/* Current file */}
        {currentFile && (
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 max-h-20 overflow-y-auto">
            <p className="text-xs text-slate-600 dark:text-slate-400 break-all font-mono">
              {currentFile}
            </p>
          </div>
        )}

        {/* Cancel button */}
        <button 
          onClick={onCancel}
          className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
