import { VideoData, PerformanceTemplate, ReviewStats, ReviewRecord } from '../types';

export const mockReviews: ReviewRecord[] = [
  {
    id: 'review_001',
    videoTitle: '宝妈时间管理技巧',
    publishDate: '2024-05-25',
    viewCount: '89000',
    completeRate: '78',
    likeCount: '6500',
    commentCount: '890',
    shareCount: '320',
    isTemplate: true,
    isAdaptable: true,
    notes: '发布时间选择合理，互动率高',
    topicId: '',
    createdAt: '2024-05-26'
  },
  {
    id: 'review_002',
    videoTitle: '厨房收纳小技巧',
    publishDate: '2024-05-20',
    viewCount: '125000',
    completeRate: '85',
    likeCount: '9800',
    commentCount: '1200',
    shareCount: '450',
    isTemplate: true,
    isAdaptable: true,
    notes: '完播率高，内容紧凑',
    topicId: '',
    createdAt: '2024-05-21'
  },
  {
    id: 'review_003',
    videoTitle: '快手早餐合集',
    publishDate: '2024-05-15',
    viewCount: '76000',
    completeRate: '72',
    likeCount: '5400',
    commentCount: '680',
    shareCount: '280',
    isTemplate: false,
    isAdaptable: true,
    notes: '早餐时段发布效果好',
    topicId: '',
    createdAt: '2024-05-16'
  }
];

export const mockPerformanceTemplates: PerformanceTemplate[] = [
  {
    id: 'pt_001',
    name: '数据展示型',
    description: '开头展示具体数据，中间详细讲解，结尾总结',
    avgViews: 140000,
    avgEngagement: 11.8,
    successFactors: ['数据详实', '开头吸引', '节奏紧凑', '结尾引导互动'],
    createdAt: '2024-05-20'
  },
  {
    id: 'pt_002',
    name: '对比展示型',
    description: '前后对比展示效果，突出改变',
    avgViews: 100000,
    avgEngagement: 10.5,
    successFactors: ['对比明显', '视觉效果好', '有代入感'],
    createdAt: '2024-05-18'
  },
  {
    id: 'pt_003',
    name: '痛点解决型',
    description: '开头提出痛点，中间给出解决方案',
    avgViews: 85000,
    avgEngagement: 9.8,
    successFactors: ['痛点明确', '方案实用', '节奏紧凑'],
    createdAt: '2024-05-15'
  }
];

export const mockReviewStats: ReviewStats = {
  totalVideos: 5,
  avgViews: 100000,
  avgCompletionRate: 77,
  avgEngagementRate: 10.46,
  topPerforming: mockVideoData.slice(0, 3),
  templates: mockPerformanceTemplates
};