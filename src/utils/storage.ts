const isBrowser = typeof window !== 'undefined';

export const storage = {
  getItem: <T>(key: string, defaultValue: T): T => {
    if (!isBrowser) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  setItem: <T>(key: string, value: T): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  removeItem: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }
};

export const STORAGE_KEYS = {
  ACCOUNT_INFO: 'account_info',
  TRENDING_DATA: 'trending_data',
  TOPICS: 'topics',
  SCHEDULE_TASKS: 'schedule_tasks',
  REVIEWS: 'reviews',
  INSPIRATIONS: 'inspirations',
  COLLECTED_VIDEOS: 'collected_videos',
  KEYWORDS: 'keywords',
  QUESTIONS: 'questions'
} as const;