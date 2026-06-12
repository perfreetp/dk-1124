import { create } from 'zustand';
import { VideoData, PerformanceTemplate, ReviewStats } from '../types';
import { mockVideoData, mockPerformanceTemplates, mockReviewStats } from '../data/reviewMock';

interface ReviewState {
  videoData: VideoData[];
  templates: PerformanceTemplate[];
  stats: ReviewStats;
  addVideoData: (data: VideoData) => void;
  updateVideoData: (data: VideoData) => void;
  deleteVideoData: (dataId: string) => void;
  markAsTemplate: (dataId: string) => void;
  markCanRemake: (dataId: string, remakeNotes: string) => void;
  addTemplate: (template: PerformanceTemplate) => void;
  deleteTemplate: (templateId: string) => void;
  getTopPerforming: (limit: number) => VideoData[];
  refreshStats: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  videoData: mockVideoData,
  templates: mockPerformanceTemplates,
  stats: mockReviewStats,
  addVideoData: (data) =>
    set((state) => ({
      videoData: [...state.videoData, data]
    })),
  updateVideoData: (data) =>
    set((state) => ({
      videoData: state.videoData.map((v) =>
        v.id === data.id ? data : v
      )
    })),
  deleteVideoData: (dataId) =>
    set((state) => ({
      videoData: state.videoData.filter((v) => v.id !== dataId)
    })),
  markAsTemplate: (dataId) =>
    set((state) => ({
      videoData: state.videoData.map((v) =>
        v.id === dataId ? { ...v, isTemplate: true } : v
      )
    })),
  markCanRemake: (dataId, remakeNotes) =>
    set((state) => ({
      videoData: state.videoData.map((v) =>
        v.id === dataId ? { ...v, canRemake: true, remakeNotes } : v
      )
    })),
  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template]
    })),
  deleteTemplate: (templateId) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== templateId)
    })),
  getTopPerforming: (limit) => {
    const state = get();
    return state.videoData
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },
  refreshStats: () => {
    const state = get();
    const totalVideos = state.videoData.length;
    const avgViews = state.videoData.reduce((sum, v) => sum + v.views, 0) / totalVideos;
    const avgCompletionRate = state.videoData.reduce((sum, v) => sum + v.completionRate, 0) / totalVideos;
    const avgEngagementRate = state.videoData.reduce((sum, v) => sum + v.engagementRate, 0) / totalVideos;
    
    set({
      stats: {
        totalVideos,
        avgViews,
        avgCompletionRate,
        avgEngagementRate,
        topPerforming: state.videoData.sort((a, b) => b.views - a.views).slice(0, 3),
        templates: state.templates
      }
    });
  }
}));