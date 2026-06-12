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