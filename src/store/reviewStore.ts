import { create } from 'zustand';
import { ReviewRecord } from '../types';
import { mockReviews } from '../data/reviewMock';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface ReviewState {
  reviews: ReviewRecord[];
  addReview: (review: ReviewRecord) => void;
  updateReview: (review: ReviewRecord) => void;
  deleteReview: (reviewId: string) => void;
  getReviewsByFilter: (filter: 'all' | 'template' | 'adaptable') => ReviewRecord[];
  refreshReviews: () => void;
}

const loadReviews = () => storage.getItem<ReviewRecord[]>(STORAGE_KEYS.REVIEWS, mockReviews);

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: loadReviews(),
  
  addReview: (review) => {
    const newState = [...get().reviews, review];
    set({ reviews: newState });
    storage.setItem(STORAGE_KEYS.REVIEWS, newState);
  },
  
  updateReview: (review) => {
    const newState = get().reviews.map((r) =>
      r.id === review.id ? review : r
    );
    set({ reviews: newState });
    storage.setItem(STORAGE_KEYS.REVIEWS, newState);
  },
  
  deleteReview: (reviewId) => {
    const newState = get().reviews.filter((r) => r.id !== reviewId);
    set({ reviews: newState });
    storage.setItem(STORAGE_KEYS.REVIEWS, newState);
  },
  
  getReviewsByFilter: (filter) => {
    const state = get();
    if (filter === 'all') return state.reviews;
    if (filter === 'template') return state.reviews.filter(r => r.isTemplate);
    if (filter === 'adaptable') return state.reviews.filter(r => r.isAdaptable);
    return state.reviews;
  },
  
  refreshReviews: () => {
    set({ reviews: loadReviews() });
  }
}));