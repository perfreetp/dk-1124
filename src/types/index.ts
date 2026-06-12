export interface AccountPersona {
  id: string;
  name: string;
  description: string;
  style: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnDirection {
  id: string;
  name: string;
  description: string;
  frequency: string;
  createdAt: string;
}

export interface TargetAudience {
  id: string;
  ageRange: string;
  gender: string;
  interests: string[];
  description: string;
}

export interface AccountInfo {
  id: string;
  platform: string;
  accountName: string;
  persona: AccountPersona;
  columns: ColumnDirection[];
  audience: TargetAudience;
  createdAt: string;
  updatedAt: string;
}

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

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface TitleCandidate {
  id: string;
  title: string;
  score: number;
  selected: boolean;
}

export interface ScriptPoint {
  id: string;
  content: string;
  order: number;
  duration: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  type: 'prop' | 'location' | 'equipment' | 'music' | 'other';
  status: 'ready' | 'need' | 'borrow';
  notes: string;
}

export interface Topic {
  id: string;
  titleCandidates: TitleCandidate[];
  selectedTitle: string;
  scriptPoints: ScriptPoint[];
  difficulty: DifficultyLevel;
  materials: MaterialItem[];
  assignee: string;
  status: 'draft' | 'ready' | 'filming' | 'editing' | 'published';
  inspirationId?: string;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  publishedDate?: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskType = 'filming' | 'editing' | 'publishing';

export interface ScheduleTask {
  id: string;
  topicId: string;
  topicTitle: string;
  type: TaskType;
  status: TaskStatus;
  scheduledDate: string;
  scheduledTime: string;
  assignee: string;
  notes: string;
  deadline: string;
  reminder: boolean;
  createdAt: string;
}

export interface DaySchedule {
  date: string;
  tasks: ScheduleTask[];
  hasDeadline: boolean;
}

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