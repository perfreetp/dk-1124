import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useTopicStore } from '../../store/topicStore';
import TopicCard from '../../components/TopicCard';
import Modal from '../../components/Modal';

type FilterType = 'all' | 'draft' | 'ready' | 'filming' | 'editing' | 'published';

const TopicsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showModal, setShowModal] = useState(false);
  const { topics, getTopicsByStatus } = useTopicStore();

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'draft', label: '草稿' },
    { key: 'ready', label: '待拍' },
    { key: 'filming', label: '拍摄中' },
    { key: 'editing', label: '剪辑中' },
    { key: 'published', label: '已发布' }
  ];

  const filteredTopics = activeFilter === 'all'
    ? topics
    : getTopicsByStatus(activeFilter);

  const stats = {
    total: topics.length,
    draft: topics.filter(t => t.status === 'draft').length,
    ready: topics.filter(t => t.status === 'ready').length,
    filming: topics.filter(t => t.status === 'filming').length
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>选题池</Text>
        <View className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Text className={styles.addBtnText}>+ 新选题</Text>
        </View>
      </View>

      <View className={styles.statsRow}>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.total}</Text>
          <Text className={styles.statLabel}>总选题</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.draft}</Text>
          <Text className={styles.statLabel}>草稿</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.ready}</Text>
          <Text className={styles.statLabel}>待拍摄</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.filming}</Text>
          <Text className={styles.statLabel}>进行中</Text>
        </View>
      </View>

      <View className={styles.filterTabs}>
        {filters.map((filter) => (
          <View
            key={filter.key}
            className={classnames(styles.filterTab, activeFilter === filter.key && styles.filterTabActive)}
            onClick={() => setActiveFilter(filter.key)}
          >
            <Text className={classnames(styles.filterTabText, activeFilter === filter.key && styles.filterTabTextActive)}>
              {filter.label}
            </Text>
          </View>
        ))}
      </View>

      <View className={styles.topicList}>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))
        ) : (
          <View className={styles.emptyState}>
            <View className={styles.emptyIcon}>
              <Text className={styles.emptyIconText}>空</Text>
            </View>
            <Text className={styles.emptyTitle}>暂无选题</Text>
            <Text className={styles.emptyDesc}>点击上方按钮创建新选题</Text>
          </View>
        )}
      </View>

      <Modal
        visible={showModal}
        title="创建新选题"
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          <Text className={styles.modalHint}>选题创建功能开发中...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TopicsPage;