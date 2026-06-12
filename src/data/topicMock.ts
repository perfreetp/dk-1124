import { Topic } from '../types';

export const mockTopics: Topic[] = [
  {
    id: 'topic_001',
    titleCandidates: [
      { id: 'tc_001', title: '厨房收纳神器测评，这5款真的好用', score: 85, selected: true },
      { id: 'tc_002', title: '厨房收纳必备神器推荐', score: 70, selected: false },
      { id: 'tc_003', title: '让你的厨房焕然一新，收纳神器合集', score: 75, selected: false }
    ],
    selectedTitle: '厨房收纳神器测评，这5款真的好用',
    scriptPoints: [
      { id: 'sp_001', content: '开场：展示凌乱厨房vs整洁厨房对比', order: 1, duration: '5秒' },
      { id: 'sp_002', content: '介绍第一款收纳盒，展示使用效果', order: 2, duration: '15秒' },
      { id: 'sp_003', content: '依次介绍其他4款神器', order: 3, duration: '40秒' },
      { id: 'sp_004', content: '总结推荐，引导互动', order: 4, duration: '10秒' }
    ],
    difficulty: 'medium',
    materials: [
      { id: 'mat_001', name: '收纳盒套装', type: 'prop', status: 'need', notes: '需购买5款不同收纳盒' },
      { id: 'mat_002', name: '厨房场景', type: 'location', status: 'ready', notes: '自家厨房' },
      { id: 'mat_003', name: '手机支架', type: 'equipment', status: 'ready', notes: '' },
      { id: 'mat_004', name: '轻快背景音乐', type: 'music', status: 'need', notes: '找欢快的音乐' }
    ],
    assignee: '小美',
    status: 'ready',
    inspirationId: 'insp_001',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-10',
    scheduledDate: '2024-06-15'
  },
  {
    id: 'topic_002',
    titleCandidates: [
      { id: 'tc_004', title: '上班族快手早餐，5分钟搞定', score: 90, selected: true },
      { id: 'tc_005', title: '懒人早餐合集，10分钟内完成', score: 80, selected: false },
      { id: 'tc_006', title: '早餐这样做，省时又美味', score: 75, selected: false }
    ],
    selectedTitle: '上班族快手早餐，5分钟搞定',
    scriptPoints: [
      { id: 'sp_005', content: '开场：上班族早餐痛点', order: 1, duration: '5秒' },
      { id: 'sp_006', content: '展示3款快手早餐制作过程', order: 2, duration: '45秒' },
      { id: 'sp_007', content: '总结时间安排技巧', order: 3, duration: '10秒' }
    ],
    difficulty: 'easy',
    materials: [
      { id: 'mat_005', name: '食材准备', type: 'prop', status: 'ready', notes: '鸡蛋、面包、牛奶' },
      { id: 'mat_006', name: '厨房场景', type: 'location', status: 'ready', notes: '' },
      { id: 'mat_007', name: '计时器', type: 'equipment', status: 'ready', notes: '展示时间' }
    ],
    assignee: '小美',
    status: 'filming',
    inspirationId: 'insp_002',
    createdAt: '2024-06-02',
    updatedAt: '2024-06-12',
    scheduledDate: '2024-06-14'
  },
  {
    id: 'topic_003',
    titleCandidates: [
      { id: 'tc_007', title: '超市购物省钱秘籍，每月省500', score: 88, selected: true },
      { id: 'tc_008', title: '超市省钱攻略大全', score: 72, selected: false }
    ],
    selectedTitle: '超市购物省钱秘籍，每月省500',
    scriptPoints: [
      { id: 'sp_008', content: '开场：省钱数据展示', order: 1, duration: '5秒' },
      { id: 'sp_009', content: '介绍5个省钱技巧', order: 2, duration: '50秒' },
      { id: 'sp_010', content: '实际购物演示', order: 3, duration: '15秒' },
      { id: 'sp_011', content: '总结省钱成果', order: 4, duration: '10秒' }
    ],
    difficulty: 'medium',
    materials: [
      { id: 'mat_008', name: '超市场景', type: 'location', status: 'need', notes: '需去超市拍摄' },
      { id: 'mat_009', name: '购物清单', type: 'prop', status: 'ready', notes: '' },
      { id: 'mat_010', name: '价格对比数据', type: 'other', status: 'need', notes: '需收集价格数据' }
    ],
    assignee: '小美',
    status: 'draft',
    inspirationId: 'insp_003',
    createdAt: '2024-06-03',
    updatedAt: '2024-06-03'
  },
  {
    id: 'topic_004',
    titleCandidates: [
      { id: 'tc_009', title: '小户型收纳解决方案', score: 82, selected: true },
      { id: 'tc_010', title: '30平米也能收纳整齐', score: 78, selected: false }
    ],
    selectedTitle: '小户型收纳解决方案',
    scriptPoints: [
      { id: 'sp_012', content: '开场：小户型收纳痛点', order: 1, duration: '5秒' },
      { id: 'sp_013', content: '展示4个收纳方案', order: 2, duration: '50秒' },
      { id: 'sp_014', content: '改造前后对比', order: 3, duration: '15秒' }
    ],
    difficulty: 'hard',
    materials: [
      { id: 'mat_011', name: '小户型场景', type: 'location', status: 'need', notes: '需找小户型拍摄场地' },
      { id: 'mat_012', name: '收纳工具', type: 'prop', status: 'need', notes: '挂钩、置物架等' }
    ],
    assignee: '小美',
    status: 'draft',
    inspirationId: 'insp_004',
    createdAt: '2024-06-04',
    updatedAt: '2024-06-04'
  },
  {
    id: 'topic_005',
    titleCandidates: [
      { id: 'tc_011', title: '周末懒人餐，一锅搞定全家', score: 85, selected: true },
      { id: 'tc_012', title: '懒人周末美食合集', score: 70, selected: false }
    ],
    selectedTitle: '周末懒人餐，一锅搞定全家',
    scriptPoints: [
      { id: 'sp_015', content: '开场：周末不想做饭痛点', order: 1, duration: '5秒' },
      { id: 'sp_016', content: '展示一锅餐制作', order: 2, duration: '40秒' },
      { id: 'sp_017', content: '成品展示和品尝', order: 3, duration: '15秒' }
    ],
    difficulty: 'easy',
    materials: [
      { id: 'mat_013', name: '食材', type: 'prop', status: 'ready', notes: '' },
      { id: 'mat_014', name: '厨房场景', type: 'location', status: 'ready', notes: '' }
    ],
    assignee: '小美',
    status: 'draft',
    inspirationId: 'insp_005',
    createdAt: '2024-06-05',
    updatedAt: '2024-06-05'
  },
  {
    id: 'topic_006',
    titleCandidates: [
      { id: 'tc_013', title: '宝妈时间管理技巧', score: 80, selected: true },
      { id: 'tc_014', title: '带娃也能高效做事', score: 75, selected: false }
    ],
    selectedTitle: '宝妈时间管理技巧',
    scriptPoints: [
      { id: 'sp_018', content: '开场：宝妈时间困境', order: 1, duration: '5秒' },
      { id: 'sp_019', content: '分享5个时间管理技巧', order: 2, duration: '50秒' },
      { id: 'sp_020', content: '实际应用演示', order: 3, duration: '15秒' }
    ],
    difficulty: 'medium',
    materials: [
      { id: 'mat_015', name: '家庭场景', type: 'location', status: 'ready', notes: '' }
    ],
    assignee: '小美',
    status: 'published',
    inspirationId: '',
    createdAt: '2024-05-20',
    updatedAt: '2024-05-25',
    scheduledDate: '2024-05-22',
    publishedDate: '2024-05-25'
  }
];