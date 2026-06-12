import { CompetitorVideo, KeywordItem, CommentQuestion, Inspiration } from '../types';

export const mockCompetitorVideos: CompetitorVideo[] = [
  {
    id: 'video_001',
    title: '厨房收纳神器推荐，让你的厨房焕然一新',
    url: 'https://example.com/video1',
    platform: '抖音',
    author: '收纳达人',
    views: 125000,
    likes: 8500,
    comments: 1200,
    collectedAt: '2024-06-01',
    tags: ['收纳', '厨房', '神器'],
    notes: '拍摄角度很好，可以借鉴'
  },
  {
    id: 'video_002',
    title: '5分钟快手早餐，上班族必备',
    url: 'https://example.com/video2',
    platform: '抖音',
    author: '美食博主',
    views: 89000,
    likes: 6200,
    comments: 890,
    collectedAt: '2024-06-02',
    tags: ['早餐', '快手', '上班族'],
    notes: '节奏紧凑，值得学习'
  },
  {
    id: 'video_003',
    title: '省钱小技巧：超市购物攻略',
    url: 'https://example.com/video3',
    platform: '抖音',
    author: '省钱达人',
    views: 156000,
    likes: 12000,
    comments: 2300,
    collectedAt: '2024-06-03',
    tags: ['省钱', '超市', '攻略'],
    notes: '数据详实，说服力强'
  },
  {
    id: 'video_004',
    title: '衣柜整理方法，告别凌乱',
    url: 'https://example.com/video4',
    platform: '抖音',
    author: '整理师',
    views: 98000,
    likes: 7800,
    comments: 1100,
    collectedAt: '2024-06-04',
    tags: ['衣柜', '整理', '收纳'],
    notes: '步骤清晰，适合新手'
  },
  {
    id: 'video_005',
    title: '周末懒人餐，一锅搞定',
    url: 'https://example.com/video5',
    platform: '抖音',
    author: '懒人厨房',
    views: 76000,
    likes: 5400,
    comments: 780,
    collectedAt: '2024-06-05',
    tags: ['懒人餐', '一锅', '周末'],
    notes: '画面温馨，有代入感'
  }
];

export const mockKeywords: KeywordItem[] = [
  {
    id: 'kw_001',
    keyword: '厨房收纳',
    category: '收纳',
    searchVolume: '高',
    trend: 'up',
    createdAt: '2024-06-01'
  },
  {
    id: 'kw_002',
    keyword: '快手早餐',
    category: '美食',
    searchVolume: '中',
    trend: 'up',
    createdAt: '2024-06-02'
  },
  {
    id: 'kw_003',
    keyword: '省钱攻略',
    category: '省钱',
    searchVolume: '高',
    trend: 'stable',
    createdAt: '2024-06-03'
  },
  {
    id: 'kw_004',
    keyword: '衣柜整理',
    category: '收纳',
    searchVolume: '中',
    trend: 'up',
    createdAt: '2024-06-04'
  },
  {
    id: 'kw_005',
    keyword: '懒人美食',
    category: '美食',
    searchVolume: '中',
    trend: 'up',
    createdAt: '2024-06-05'
  },
  {
    id: 'kw_006',
    keyword: '宝妈日常',
    category: '生活',
    searchVolume: '高',
    trend: 'up',
    createdAt: '2024-06-06'
  }
];

export const mockCommentQuestions: CommentQuestion[] = [
  {
    id: 'cq_001',
    question: '这种收纳盒哪里买？求链接',
    source: '厨房收纳视频',
    sourceUrl: 'https://example.com/video1',
    likes: 256,
    collectedAt: '2024-06-01',
    used: false
  },
  {
    id: 'cq_002',
    question: '早餐能提前准备吗？',
    source: '快手早餐视频',
    sourceUrl: 'https://example.com/video2',
    likes: 189,
    collectedAt: '2024-06-02',
    used: true
  },
  {
    id: 'cq_003',
    question: '超市打折时间是什么时候？',
    source: '省钱攻略视频',
    sourceUrl: 'https://example.com/video3',
    likes: 312,
    collectedAt: '2024-06-03',
    used: false
  },
  {
    id: 'cq_004',
    question: '小户型怎么收纳？',
    source: '衣柜整理视频',
    sourceUrl: 'https://example.com/video4',
    likes: 178,
    collectedAt: '2024-06-04',
    used: false
  }
];

export const mockInspirations: Inspiration[] = [
  {
    id: 'insp_001',
    content: '厨房收纳神器测评系列',
    source: 'video',
    sourceId: 'video_001',
    createdAt: '2024-06-01',
    convertedToTopic: true,
    topicId: 'topic_001'
  },
  {
    id: 'insp_002',
    content: '上班族快手早餐合集',
    source: 'keyword',
    sourceId: 'kw_002',
    createdAt: '2024-06-02',
    convertedToTopic: true,
    topicId: 'topic_002'
  },
  {
    id: 'insp_003',
    content: '超市购物省钱秘籍',
    source: 'comment',
    sourceId: 'cq_003',
    createdAt: '2024-06-03',
    convertedToTopic: false
  },
  {
    id: 'insp_004',
    content: '小户型收纳解决方案',
    source: 'comment',
    sourceId: 'cq_004',
    createdAt: '2024-06-04',
    convertedToTopic: false
  },
  {
    id: 'insp_005',
    content: '周末懒人餐系列',
    source: 'manual',
    sourceId: '',
    createdAt: '2024-06-05',
    convertedToTopic: false
  }
];