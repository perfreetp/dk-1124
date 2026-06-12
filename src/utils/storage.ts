const isBrowser = typeof window !== 'undefined';
const isWeChatMiniProgram = typeof wx !== 'undefined';

export const storage = {
  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      let item: string | null = null;
      
      if (isWeChatMiniProgram) {
        try {
          item = wx.getStorageSync(key);
        } catch (e) {
          console.warn('wx.getStorageSync failed, falling back to default');
        }
      } else if (isBrowser) {
        item = localStorage.getItem(key);
      }
      
      if (item === null || item === 'undefined') {
        return defaultValue;
      }
      
      if (typeof item === 'string') {
        try {
          return JSON.parse(item);
        } catch {
          return item as unknown as T;
        }
      }
      
      return item as T;
    } catch {
      return defaultValue;
    }
  },
  
  setItem: <T>(key: string, value: T): void => {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      
      if (isWeChatMiniProgram) {
        wx.setStorageSync(key, data);
      } else if (isBrowser) {
        localStorage.setItem(key, data);
      }
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },
  
  removeItem: (key: string): void => {
    try {
      if (isWeChatMiniProgram) {
        wx.removeStorageSync(key);
      } else if (isBrowser) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  },
  
  clear: (): void => {
    try {
      if (isWeChatMiniProgram) {
        wx.clearStorageSync();
      } else if (isBrowser) {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
};

export const STORAGE_KEYS = {
  ACCOUNT_INFO: 'shortvideo_account_info',
  TRENDING_DATA: 'shortvideo_trending_data',
  TOPICS: 'shortvideo_topics',
  SCHEDULE_TASKS: 'shortvideo_schedule_tasks',
  REVIEWS: 'shortvideo_reviews',
  INSPIRATIONS: 'shortvideo_inspirations',
  COLLECTED_VIDEOS: 'shortvideo_collected_videos',
  KEYWORDS: 'shortvideo_keywords',
  QUESTIONS: 'shortvideo_questions'
} as const;