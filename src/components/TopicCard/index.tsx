import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { Topic, DifficultyLevel } from '../../types';

interface TopicCardProps {
  topic: Topic;
  onClick?: () => void;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  easy: styles.difficultyEasy,
  medium: styles.difficultyMedium,
  hard: styles.difficultyHard
};

const difficultyLabels: Record<DifficultyLevel, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
};

const statusLabels: Record<Topic['status'], string> = {
  draft: '草稿',
  ready: '待拍摄',
  filming: '拍摄中',
  editing: '剪辑中',
  published: '已发布'
};

const statusColors: Record<Topic['status'], string> = {
  draft: styles.statusDraft,
  ready: styles.statusReady,
  filming: styles.statusFilming,
  editing: styles.statusEditing,
  published: styles.statusPublished
};

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  const materialsReady = topic.materials.filter(m => m.status === 'ready').length;
  const materialsTotal = topic.materials.length;

  return (
    <View className={styles.container} onClick={onClick}>
      <View className={styles.header}>
        <Text className={styles.title}>{topic.selectedTitle}</Text>
        <View className={classnames(styles.statusBadge, statusColors[topic.status])}>
          <Text className={styles.statusText}>{statusLabels[topic.status]}</Text>
        </View>
      </View>

      <View className={styles.infoRow}>
        <View className={styles.infoItem}>
          <Text className={styles.infoLabel}>难度</Text>
          <View className={classnames(styles.difficultyBadge, difficultyColors[topic.difficulty])}>
            <Text className={styles.difficultyText}>{difficultyLabels[topic.difficulty]}</Text>
          </View>
        </View>
        <View className={styles.infoItem}>
          <Text className={styles.infoLabel}>负责人</Text>
          <Text className={styles.infoValue}>{topic.assignee}</Text>
        </View>
        <View className={styles.infoItem}>
          <Text className={styles.infoLabel}>素材</Text>
          <Text className={styles.infoValue}>{materialsReady}/{materialsTotal}</Text>
        </View>
      </View>

      <View className={styles.footer}>
        <View className={styles.scriptPoints}>
          <Text className={styles.scriptLabel}>脚本要点：</Text>
          <Text className={styles.scriptCount}>{topic.scriptPoints.length}项</Text>
        </View>
        {topic.scheduledDate && (
          <Text className={styles.scheduledDate}>排期：{topic.scheduledDate}</Text>
        )}
      </View>
    </View>
  );
};

export default TopicCard;