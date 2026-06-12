export interface CompetitorVideo {
  id: string;
  title: string;
  url: string;
  platform: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  collectedAt: string;
  tags: string[];
  notes: string;
}

export interface KeywordItem {
  id: string;
  keyword: string;
  category: string;
  searchVolume: string;
  trend: 'up' | 'down' | 'stable';
  createdAt: string;
}

export interface CommentQuestion {
  id: string;
  question: string;
  source: string;
  sourceUrl: string;
  likes: number;
  collectedAt: string;
  used: boolean;
}

export interface Inspiration {
  id: string;
  content: string;
  source: 'video' | 'keyword' | 'comment' | 'manual';
  sourceId: string;
  createdAt: string;
  convertedToTopic: boolean;
  topicId?: string;
}