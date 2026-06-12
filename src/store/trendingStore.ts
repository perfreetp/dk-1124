import { create } from 'zustand';
import { CompetitorVideo, KeywordItem, CommentQuestion, Inspiration } from '../types';
import { mockCompetitorVideos, mockKeywords, mockCommentQuestions, mockInspirations } from '../data/trendingMock';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface TrendingState {
  competitorVideos: CompetitorVideo[];
  keywords: KeywordItem[];
  commentQuestions: CommentQuestion[];
  inspirations: Inspiration[];
  addCompetitorVideo: (video: CompetitorVideo) => void;
  deleteCompetitorVideo: (videoId: string) => void;
  addKeyword: (keyword: KeywordItem) => void;
  deleteKeyword: (keywordId: string) => void;
  addCommentQuestion: (question: CommentQuestion) => void;
  deleteCommentQuestion: (questionId: string) => void;
  markQuestionUsed: (questionId: string) => void;
  addInspiration: (inspiration: Inspiration) => void;
  convertInspirationToTopic: (inspirationId: string, topicId: string) => void;
  refreshData: () => void;
}

const loadCompetitorVideos = () => storage.getItem(STORAGE_KEYS.COLLECTED_VIDEOS, mockCompetitorVideos);
const loadKeywords = () => storage.getItem(STORAGE_KEYS.KEYWORDS, mockKeywords);
const loadCommentQuestions = () => storage.getItem(STORAGE_KEYS.QUESTIONS, mockCommentQuestions);
const loadInspirations = () => storage.getItem(STORAGE_KEYS.INSPIRATIONS, mockInspirations);

export const useTrendingStore = create<TrendingState>((set, get) => ({
  competitorVideos: loadCompetitorVideos(),
  keywords: loadKeywords(),
  commentQuestions: loadCommentQuestions(),
  inspirations: loadInspirations(),
  
  addCompetitorVideo: (video) => {
    const newState = [...get().competitorVideos, video];
    set({ competitorVideos: newState });
    storage.setItem(STORAGE_KEYS.COLLECTED_VIDEOS, newState);
  },
  
  deleteCompetitorVideo: (videoId) => {
    const newState = get().competitorVideos.filter((v) => v.id !== videoId);
    set({ competitorVideos: newState });
    storage.setItem(STORAGE_KEYS.COLLECTED_VIDEOS, newState);
  },
  
  addKeyword: (keyword) => {
    const newState = [...get().keywords, keyword];
    set({ keywords: newState });
    storage.setItem(STORAGE_KEYS.KEYWORDS, newState);
  },
  
  deleteKeyword: (keywordId) => {
    const newState = get().keywords.filter((k) => k.id !== keywordId);
    set({ keywords: newState });
    storage.setItem(STORAGE_KEYS.KEYWORDS, newState);
  },
  
  addCommentQuestion: (question) => {
    const newState = [...get().commentQuestions, question];
    set({ commentQuestions: newState });
    storage.setItem(STORAGE_KEYS.QUESTIONS, newState);
  },
  
  deleteCommentQuestion: (questionId) => {
    const newState = get().commentQuestions.filter((q) => q.id !== questionId);
    set({ commentQuestions: newState });
    storage.setItem(STORAGE_KEYS.QUESTIONS, newState);
  },
  
  markQuestionUsed: (questionId) => {
    const newState = get().commentQuestions.map((q) =>
      q.id === questionId ? { ...q, used: true } : q
    );
    set({ commentQuestions: newState });
    storage.setItem(STORAGE_KEYS.QUESTIONS, newState);
  },
  
  addInspiration: (inspiration) => {
    const newState = [...get().inspirations, inspiration];
    set({ inspirations: newState });
    storage.setItem(STORAGE_KEYS.INSPIRATIONS, newState);
  },
  
  convertInspirationToTopic: (inspirationId, topicId) => {
    const newState = get().inspirations.map((i) =>
      i.id === inspirationId
        ? { ...i, convertedToTopic: true, topicId }
        : i
    );
    set({ inspirations: newState });
    storage.setItem(STORAGE_KEYS.INSPIRATIONS, newState);
  },
  
  refreshData: () => {
    set({
      competitorVideos: loadCompetitorVideos(),
      keywords: loadKeywords(),
      commentQuestions: loadCommentQuestions(),
      inspirations: loadInspirations()
    });
  }
}));