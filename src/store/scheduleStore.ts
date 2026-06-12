import { create } from 'zustand';
import { ScheduleTask, DaySchedule } from '../types';
import { mockScheduleTasks, generateDaySchedules } from '../data/scheduleMock';

interface ScheduleState {
  tasks: ScheduleTask[];
  daySchedules: DaySchedule[];
  addTask: (task: ScheduleTask) => void;
  updateTask: (task: ScheduleTask) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: ScheduleTask['status']) => void;
  getTasksByDate: (date: string) => ScheduleTask[];
  getUpcomingDeadlines: (days: number) => ScheduleTask[];
  refreshDaySchedules: (startDate: string, days: number) => void;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  tasks: mockScheduleTasks,
  daySchedules: generateDaySchedules(mockScheduleTasks, '2024-06-12', 14),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task]
    })),
  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === task.id ? task : t
      )
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId)
    })),
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    })),
  getTasksByDate: (date) => {
    const state = get();
    return state.tasks.filter((t) => t.scheduledDate === date);
  },
  getUpcomingDeadlines: (days) => {
    const state = get();
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    return state.tasks.filter((t) => {
      const deadline = new Date(t.deadline);
      return deadline >= today && deadline <= futureDate && t.status !== 'completed';
    });
  },
  refreshDaySchedules: (startDate, days) => {
    const state = get();
    set({
      daySchedules: generateDaySchedules(state.tasks, startDate, days)
    });
  }
}));