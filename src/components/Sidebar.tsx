import { BarChart3, Zap, Settings, History, HardDrive, Copy, FileStack, Clock, Trash2, Filter } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'analyze', label: 'Analyze Storage', icon: HardDrive },
  { id: 'duplicates', label: 'Duplicates', icon: Copy },
  { id: 'similar', label: 'Similar Files', icon: Copy },
  { id: 'large-files', label: 'Large Files', icon: FileStack },
  { id: 'old-files', label: 'Old Files', icon: Clock },
  { id: 'cleanup', label: 'Cleanup', icon: Zap },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <div>
            <h1 className="font-bold text-lg">TidyDrive</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">v0.1.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`sidebar-link w-full flex items-center gap-3 ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">THEME</span>
          <ThemeToggle />
        </div>
        
        <div className="text-xs text-slate-500 dark:text-slate-400 px-2 py-2">
          <p>100% Private • Zero Upload</p>
        </div>
      </div>
    </aside>
  );
}
