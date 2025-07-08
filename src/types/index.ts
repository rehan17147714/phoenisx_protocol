export interface Message {
  id: string;
  type: 'user' | 'phoenix';
  content: string;
  timestamp: Date;
}

export interface MemoryEntry {
  question: string;
  answer: string;
  timestamp: Date;
}

export interface CodeSnippet {
  id: string;
  name: string;
  code: string;
  language: string;
  timestamp: Date;
}

export interface ExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
}

export interface DownloadItem {
  id: string;
  url: string;
  title: string;
  type: 'video' | 'audio' | 'image' | 'document';
  status: 'pending' | 'downloading' | 'completed' | 'error';
  progress: number;
  size?: string;
  duration?: string;
  thumbnail?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isOwner: boolean;
  linkedAccounts: {
    github?: string;
    youtube?: string;
    instagram?: string;
    bolt?: string;
  };
  preferences: {
    theme: 'dark' | 'galaxy' | 'neon';
    aiModel: string;
    notifications: boolean;
  };
  stats: {
    totalSessions: number;
    codeExecutions: number;
    downloads: number;
    memoryEntries: number;
    joinDate: Date;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}