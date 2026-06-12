import { ScheduleTask, DaySchedule } from '../types';

export const mockScheduleTasks: ScheduleTask[] = [
  {
    id: 'task_001',
    title: '厨房收纳神器测评-拍摄',
    description: '需要提前购买收纳盒，场景布置',
    topicId: 'topic_001',
    type: 'filming',
    status: 'pending',
    priority: 'high',
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
    title: '厨房收纳神器测评-剪辑',
    description: '剪辑时长控制在60秒内',
    topicId: 'topic_001',
    type: 'editing',
    status: 'pending',
    priority: 'medium',
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
    title: '厨房收纳神器测评-发布',
    description: '选择晚间发布',
    topicId: 'topic_001',
    type: 'publishing',
    status: 'pending',
    priority: 'medium',
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
    title: '上班族快手早餐-拍摄',
    description: '早餐时段拍摄效果更好',
    topicId: 'topic_002',
    type: 'filming',
    status: 'inProgress',
    priority: 'high',
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
    title: '上班族快手早餐-剪辑',
    description: '剪辑快手早餐视频',
    topicId: 'topic_002',
    type: 'editing',
    status: 'pending',
    priority: 'medium',
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
    title: '上班族快手早餐-发布',
    description: '早餐时段发布',
    topicId: 'topic_002',
    type: 'publishing',
    status: 'pending',
    priority: 'low',
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
    title: '宝妈时间管理技巧-发布',
    description: '已发布',
    topicId: 'topic_006',
    type: 'publishing',
    status: 'completed',
    priority: 'low',
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