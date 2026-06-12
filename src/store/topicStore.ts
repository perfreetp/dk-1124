import { create } from 'zustand';
import { Topic, DifficultyLevel } from '../types';
import { mockTopics } from '../data/topicMock';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface TopicState {
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  updateTopic: (topic: Topic) => void;
  deleteTopic: (topicId: string) => void;
  updateTopicStatus: (topicId: string, status: Topic['status']) => void;
  getTopicsByStatus: (status: Topic['status']) => Topic[];
  getTopicsByDifficulty: (difficulty: DifficultyLevel) => Topic[];
  refreshTopics: () => void;
}

const loadTopics = () => storage.getItem<Topic[]>(STORAGE_KEYS.TOPICS, mockTopics);

export const useTopicStore = create<TopicState>((set, get) => ({
  topics: loadTopics(),
  
  addTopic: (topic) => {
    const newState = [...get().topics, topic];
    set({ topics: newState });
    storage.setItem(STORAGE_KEYS.TOPICS, newState);
  },
  
  updateTopic: (topic) => {
    const newState = get().topics.map((t) =>
      t.id === topic.id ? { ...topic, updatedAt: new Date().toISOString().split('T')[0] } : t
    );
    set({ topics: newState });
    storage.setItem(STORAGE_KEYS.TOPICS, newState);
  },
  
  deleteTopic: (topicId) => {
    const newState = get().topics.filter((t) => t.id !== topicId);
    set({ topics: newState });
    storage.setItem(STORAGE_KEYS.TOPICS, newState);
  },
  
  updateTopicStatus: (topicId, status) => {
    const newState = get().topics.map((t) =>
      t.id === topicId ? { ...t, status, updatedAt: new Date().toISOString().split('T')[0] } : t
    );
    set({ topics: newState });
    storage.setItem(STORAGE_KEYS.TOPICS, newState);
  },
  
  getTopicsByStatus: (status) => {
    const state = get();
    return state.topics.filter((t) => t.status === status);
  },
  
  getTopicsByDifficulty: (difficulty) => {
    const state = get();
    return state.topics.filter((t) => t.difficulty === difficulty);
  },
  
  refreshTopics: () => {
    set({ topics: loadTopics() });
  }
}));