import { create } from 'zustand';
import { Topic, DifficultyLevel } from '../types';
import { mockTopics } from '../data/topicMock';

interface TopicState {
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  updateTopic: (topic: Topic) => void;
  deleteTopic: (topicId: string) => void;
  updateTopicStatus: (topicId: string, status: Topic['status']) => void;
  getTopicsByStatus: (status: Topic['status']) => Topic[];
  getTopicsByDifficulty: (difficulty: DifficultyLevel) => Topic[];
}

export const useTopicStore = create<TopicState>((set, get) => ({
  topics: mockTopics,
  addTopic: (topic) =>
    set((state) => ({
      topics: [...state.topics, topic]
    })),
  updateTopic: (topic) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topic.id ? { ...topic, updatedAt: new Date().toISOString().split('T')[0] } : t
      )
    })),
  deleteTopic: (topicId) =>
    set((state) => ({
      topics: state.topics.filter((t) => t.id !== topicId)
    })),
  updateTopicStatus: (topicId, status) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, status, updatedAt: new Date().toISOString().split('T')[0] } : t
      )
    })),
  getTopicsByStatus: (status) => {
    const state = get();
    return state.topics.filter((t) => t.status === status);
  },
  getTopicsByDifficulty: (difficulty) => {
    const state = get();
    return state.topics.filter((t) => t.difficulty === difficulty);
  }
}));