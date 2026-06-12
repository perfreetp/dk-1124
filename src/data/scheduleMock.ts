import { ScheduleTask, DaySchedule } from '../types';

export const mockScheduleTasks: ScheduleTask[] = [
  {
    id: 'task_001',
    topicId: 'topic_001',
    topicTitle: '厨房收纳神器测评',
    type: 'filming',
    status: 'pending',
    scheduledDate: '2024-06-15',
    scheduledTime: '10:00',
    assignee: '小美',
    notes: '需要提前购买收纳盒',
    deadline: '2024-06-16',
    reminder: true,
    createdAt: '2024-06-10'
  },
  {
    id: 'task_002',
    topicId: 'topic_001',
    topicTitle: '厨房收纳神器测评',
    type: 'editing',
    status: 'pending',
    scheduledDate: '2024-06-16',
    scheduledTime: '14:00',
    assignee: '小美',
    notes: '剪辑时长控制在60秒内',
    deadline: '2024-06-17',
    reminder: true,
    createdAt: '2024-06-10'
  },
  {
    id: 'task_003',
    topicId: 'topic_001',
    topicTitle: '厨房收纳神器测评',
    type: 'publishing',
    status: 'pending',
    scheduledDate: '2024-06-17',
    scheduledTime: '18:00',
    assignee: '小美',
    notes: '选择晚间发布',
    deadline: '2024-06-17',
    reminder: true,
    createdAt: '2024-06-10'
  },
  {
    id: 'task_004',
    topicId: 'topic_002',
    topicTitle: '上班族快手早餐',
    type: 'filming',
    status: 'in_progress',
    scheduledDate: '2024-06-14',
    scheduledTime: '08:00',
    assignee: '小美',
    notes: '早餐时段拍摄效果更好',
    deadline: '2024-06-14',
    reminder: true,
    createdAt: '2024-06-12'
  },
  {
    id: 'task_005',
    topicId: 'topic_002',
    topicTitle: '上班族快手早餐',
    type: 'editing',
    status: 'pending',
    scheduledDate: '2024-06-14',
    scheduledTime: '15:00',
    assignee: '小美',
    notes: '',
    deadline: '2024-06-15',
    reminder: true,
    createdAt: '2024-06-12'
  },
  {
    id: 'task_006',
    topicId: 'topic_002',
    topicTitle: '上班族快手早餐',
    type: 'publishing',
    status: 'pending',
    scheduledDate: '2024-06-15',
    scheduledTime: '07:00',
    assignee: '小美',
    notes: '早餐时段发布',
    deadline: '2024-06-15',
    reminder: true,
    createdAt: '2024-06-12'
  },
  {
    id: 'task_007',
    topicId: 'topic_006',
    topicTitle: '宝妈时间管理技巧',
    type: 'publishing',
    status: 'completed',
    scheduledDate: '2024-05-25',
    scheduledTime: '20:00',
    assignee: '小美',
    notes: '已发布',
    deadline: '2024-05-25',
    reminder: false,
    createdAt: '2024-05-22'
  }
];

export const generateDaySchedules = (tasks: ScheduleTask[], startDate: string, days: number): DaySchedule[] => {
  const schedules: DaySchedule[] = [];
  const baseDate = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const dayTasks = tasks.filter(t => t.scheduledDate === dateStr);
    const hasDeadline = dayTasks.some(t => t.deadline === dateStr);
    
    schedules.push({
      date: dateStr,
      tasks: dayTasks,
      hasDeadline
    });
  }
  
  return schedules;
};

export const mockDaySchedules = generateDaySchedules(mockScheduleTasks, '2024-06-12', 14);