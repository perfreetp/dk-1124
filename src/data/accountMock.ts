import { AccountInfo } from '../types';

export const mockAccountInfo: AccountInfo = {
  id: 'acc_001',
  platform: '抖音',
  accountName: '生活小妙招达人',
  persona: {
    id: 'persona_001',
    name: '居家达人小美',
    description: '90后宝妈，热爱分享生活小技巧，擅长收纳整理和美食制作',
    style: '温馨亲切、实用接地气',
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01'
  },
  columns: [
    {
      id: 'col_001',
      name: '收纳妙招',
      description: '分享各种收纳整理技巧，让生活更整洁',
      frequency: '每周2期',
      createdAt: '2024-01-01'
    },
    {
      id: 'col_002',
      name: '快手美食',
      description: '10分钟搞定一道家常菜',
      frequency: '每周3期',
      createdAt: '2024-02-01'
    },
    {
      id: 'col_003',
      name: '省钱攻略',
      description: '各种省钱小技巧和优惠信息',
      frequency: '每周1期',
      createdAt: '2024-03-01'
    }
  ],
  audience: {
    id: 'aud_001',
    ageRange: '25-35岁',
    gender: '女性为主',
    interests: ['家居生活', '美食烹饪', '育儿', '省钱'],
    description: '追求生活品质的年轻宝妈群体'
  },
  createdAt: '2024-01-01',
  updatedAt: '2024-06-01'
};