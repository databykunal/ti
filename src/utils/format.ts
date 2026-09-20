export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';
  if (bytes < 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return 'Unknown';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

export function formatDateTime(timestamp: number): string {
  if (!timestamp) return 'Unknown';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

export function formatPercent(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function formatPercentString(value: number, total: number): string {
  return formatPercent(value, total) + '%';
}

export function shortenPath(path: string, maxLength = 50): string {
  if (path.length <= maxLength) return path;
  
  const start = path.substring(0, maxLength / 2);
  const end = path.substring(path.length - maxLength / 2);
  return start + '...' + end;
}

export function getFileIcon(extension: string): string {
  const ext = extension.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) return '🖼️';
  if (['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'].includes(ext)) return '🎬';
  if (['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg'].includes(ext)) return '🎵';
  if (['pdf'].includes(ext)) return '📄';
  if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return '📝';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊';
  if (['ppt', 'pptx'].includes(ext)) return '🎯';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '📦';
  if (['exe', 'msi', 'dmg', 'pkg'].includes(ext)) return '⚙️';
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'rb', 'go', 'rs'].includes(ext)) return '💻';
  if (['json', 'xml', 'yaml', 'yml', 'toml'].includes(ext)) return '⚙️';
  
  return '📄';
}

export function calculateHealthScore(freePercent: number, duplicates: number, oldFiles: number): number {
  let score = 100;
  
  // Free space impact
  if (freePercent < 5) score -= 40;
  else if (freePercent < 10) score -= 30;
  else if (freePercent < 15) score -= 20;
  else if (freePercent < 20) score -= 10;
  
  // Duplicates impact
  if (duplicates > 0) score -= Math.min(20, duplicates / 100);
  
  // Old files impact
  if (oldFiles > 0) score -= Math.min(15, oldFiles / 100);
  
  return Math.max(0, Math.min(100, score));
}
