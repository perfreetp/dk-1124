export interface VideoData {
  id: string;
  topicId: string;
  topicTitle: string;
  platform: string;
  publishDate: string;
  views: number;
  completionRate: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  duration: string;
  notes: string;
  isTemplate: boolean;
  canRemake: boolean;
  remakeNotes?: string;
  createdAt: string;
}

export interface PerformanceTemplate {
  id: string;
  name: string;
  description: string;
  avgViews: number;
  avgEngagement: number;
  successFactors: string[];
  createdAt: string;
}

export interface ReviewStats {
  totalVideos: number;
  avgViews: number;
  avgCompletionRate: number;
  avgEngagementRate: number;
  topPerforming: VideoData[];
  templates: PerformanceTemplate[];
}