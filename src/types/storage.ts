export interface Drive {
  id: string;
  name: string;
  path: string;
  totalSize: number;
  usedSize: number;
  freeSize: number;
}

export interface FileInfo {
  path: string;
  name: string;
  size: number;
  modifiedTime: number;
  isDir: boolean;
  extension: string;
}

export interface FolderStats {
  path: string;
  name: string;
  size: number;
  fileCount: number;
  percentage: number;
}

export interface ScanResult {
  driveId: string;
  totalFiles: number;
  totalSize: number;
  folders: FolderStats[];
  largeFiles: FileInfo[];
  timestamp: number;
  duration: number;
}

export interface StorageCategory {
  name: string;
  size: number;
  percentage: number;
  count: number;
  color: string;
}

export interface DiskAnalysisResult {
  drive: Drive;
  categories: StorageCategory[];
  topFolders: FolderStats[];
  largestFiles: FileInfo[];
}
