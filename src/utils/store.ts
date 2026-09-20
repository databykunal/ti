import { create } from 'zustand';
import { ScanResult } from '../types/storage';
import { DuplicateScanResult } from '../types/duplicates';

export interface AppState {
  // Scan state
  isScanning: boolean;
  scanProgress: number;
  currentFile: string;
  scanStartTime: number;
  
  // Results
  lastScanResult: ScanResult | null;
  lastDuplicateScanResult: DuplicateScanResult | null;
  
  // Settings
  selectedDrive: string | null;
  excludedFolders: string[];
  
  // History
  scanHistory: ScanResult[];
  
  // Actions
  setScanning: (scanning: boolean) => void;
  setProgress: (progress: number) => void;
  setCurrentFile: (file: string) => void;
  setScanResult: (result: ScanResult) => void;
  setDuplicateScanResult: (result: DuplicateScanResult) => void;
  setSelectedDrive: (drive: string | null) => void;
  addExcludedFolder: (folder: string) => void;
  removeExcludedFolder: (folder: string) => void;
  addToHistory: (result: ScanResult) => void;
  clearHistory: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isScanning: false,
  scanProgress: 0,
  currentFile: '',
  scanStartTime: 0,
  
  lastScanResult: null,
  lastDuplicateScanResult: null,
  
  selectedDrive: null,
  excludedFolders: [],
  
  scanHistory: [],
  
  setScanning: (scanning) => set({ isScanning: scanning }),
  setProgress: (progress) => set({ scanProgress: progress }),
  setCurrentFile: (file) => set({ currentFile: file }),
  setScanResult: (result) => set({ lastScanResult: result }),
  setDuplicateScanResult: (result) => set({ lastDuplicateScanResult: result }),
  setSelectedDrive: (drive) => set({ selectedDrive: drive }),
  
  addExcludedFolder: (folder) => set((state) => ({
    excludedFolders: [...state.excludedFolders, folder]
  })),
  
  removeExcludedFolder: (folder) => set((state) => ({
    excludedFolders: state.excludedFolders.filter(f => f !== folder)
  })),
  
  addToHistory: (result) => set((state) => ({
    scanHistory: [result, ...state.scanHistory].slice(0, 10)
  })),
  
  clearHistory: () => set({ scanHistory: [] }),
  
  reset: () => set({
    isScanning: false,
    scanProgress: 0,
    currentFile: '',
    lastScanResult: null,
    lastDuplicateScanResult: null,
  }),
}));
