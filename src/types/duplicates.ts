export interface DuplicateFile {
  path: string;
  name: string;
  size: number;
  hash: string;
  modifiedTime: number;
  selected?: boolean;
}

export interface DuplicateGroup {
  hash: string;
  size: number;
  count: number;
  files: DuplicateFile[];
  potentialSavings: number;
}

export interface DuplicateScanResult {
  groups: DuplicateGroup[];
  totalDuplicates: number;
  totalSavings: number;
  timestamp: number;
  duration: number;
}

export interface SimilarFile {
  path: string;
  name: string;
  size: number;
  similarity: number;
  modifiedTime: number;
}

export interface SimilarGroup {
  id: string;
  files: SimilarFile[];
  potentialSavings: number;
  type: 'burst' | 'resized' | 'edited';
}

export interface CleanupRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  size: number;
  safetyLevel: 'safe' | 'review' | 'dangerous';
  files: DuplicateFile[];
}
