import { create } from 'zustand';
import { ScheduleTask } from '../types';
import { mockScheduleTasks } from '../data/scheduleMock';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface ScheduleState {
  tasks: ScheduleTask[];
  addTask: (task: ScheduleTask) => void;
  updateTask: (task: ScheduleTask) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: ScheduleTask['status']) => void;
  getTasksByDate: (date: string) => ScheduleTask[];
  refreshTasks: () => void;
}

const loadTasks = () => storage.getItem<ScheduleTask[]>(STORAGE_KEYS.SCHEDULE_TASKS, mockScheduleTasks);

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  tasks: loadTasks(),
  
  addTask: (task) => {
    const newState = [...get().tasks, task];
    set({ tasks: newState });
    storage.setItem(STORAGE_KEYS.SCHEDULE_TASKS, newState);
  },
  
  updateTask: (task) => {
    const newState = get().tasks.map((t) =>
      t.id === task.id ? task : t
    );
    set({ tasks: newState });
    storage.setItem(STORAGE_KEYS.SCHEDULE_TASKS, newState);
  },
  
  deleteTask: (taskId) => {
    const newState = get().tasks.filter((t) => t.id !== taskId);
    set({ tasks: newState });
    storage.setItem(STORAGE_KEYS.SCHEDULE_TASKS, newState);
  },
  
  updateTaskStatus: (taskId, status) => {
    const newState = get().tasks.map((t) =>
      t.id === taskId ? { ...t, status } : t
    );
    set({ tasks: newState });
    storage.setItem(STORAGE_KEYS.SCHEDULE_TASKS, newState);
  },
  
  getTasksByDate: (date) => {
    const state = get();
    return state.tasks.filter((t) => {
      const taskDate = new Date(t.scheduledDate).toISOString().split('T')[0];
      const targetDate = new Date(date).toISOString().split('T')[0];
      return taskDate === targetDate;
    });
  },
  
  refreshTasks: () => {
    set({ tasks: loadTasks() });
  }
}));