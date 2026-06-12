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