import { create } from 'zustand';
import { CompetitorVideo, KeywordItem, CommentQuestion, Inspiration } from '../types';
import { mockCompetitorVideos, mockKeywords, mockCommentQuestions, mockInspirations } from '../data/trendingMock';

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
}

export const useTrendingStore = create<TrendingState>((set) => ({
  competitorVideos: mockCompetitorVideos,
  keywords: mockKeywords,
  commentQuestions: mockCommentQuestions,
  inspirations: mockInspirations,
  addCompetitorVideo: (video) =>
    set((state) => ({
      competitorVideos: [...state.competitorVideos, video]
    })),
  deleteCompetitorVideo: (videoId) =>
    set((state) => ({
      competitorVideos: state.competitorVideos.filter((v) => v.id !== videoId)
    })),
  addKeyword: (keyword) =>
    set((state) => ({
      keywords: [...state.keywords, keyword]
    })),
  deleteKeyword: (keywordId) =>
    set((state) => ({
      keywords: state.keywords.filter((k) => k.id !== keywordId)
    })),
  addCommentQuestion: (question) =>
    set((state) => ({
      commentQuestions: [...state.commentQuestions, question]
    })),
  deleteCommentQuestion: (questionId) =>
    set((state) => ({
      commentQuestions: state.commentQuestions.filter((q) => q.id !== questionId)
    })),
  markQuestionUsed: (questionId) =>
    set((state) => ({
      commentQuestions: state.commentQuestions.map((q) =>
        q.id === questionId ? { ...q, used: true } : q
      )
    })),
  addInspiration: (inspiration) =>
    set((state) => ({
      inspirations: [...state.inspirations, inspiration]
    })),
  convertInspirationToTopic: (inspirationId, topicId) =>
    set((state) => ({
      inspirations: state.inspirations.map((i) =>
        i.id === inspirationId
          ? { ...i, convertedToTopic: true, topicId }
          : i
      )
    }))
}));