import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useTrendingStore } from '../../store/trendingStore';
import Modal from '../../components/Modal';

type TabType = 'videos' | 'keywords' | 'questions' | 'inspirations';

const TrendingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('videos');
  const [showModal, setShowModal] = useState(false);
  const {
    competitorVideos,
    keywords,
    commentQuestions,
    inspirations,
    convertInspirationToTopic
  } = useTrendingStore();

  const tabs: { key: TabType; label: string }[] = [
    { key: 'videos', label: '竞品视频' },
    { key: 'keywords', label: '关键词' },
    { key: 'questions', label: '评论问题' },
    { key: 'inspirations', label: '灵感库' }
  ];

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  const getSourceLabel = (source: string): string => {
    const labels: Record<string, string> = {
      video: '视频',
      keyword: '关键词',
      comment: '评论',
      manual: '手动'
    };
    return labels[source] || source;
  };

  const handleConvertToTopic = (inspirationId: string) => {
    const newTopicId = `topic_${Date.now()}`;
    convertInspirationToTopic(inspirationId, newTopicId);
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.tabs}>
        {tabs.map((tab) => (
          <View
            key={tab.key}
            className={classnames(styles.tab, activeTab === tab.key && styles.tabActive)}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text className={classnames(styles.tabText, activeTab === tab.key && styles.tabTextActive)}>
              {tab.label}
            </Text>
          </View>
        ))}
      </View>

      {activeTab === 'videos' && (
        <View className={styles.section}>
          {competitorVideos.map((video) => (
            <View key={video.id} className={styles.videoCard}>
              <View className={styles.videoHeader}>
                <Text className={styles.videoTitle}>{video.title}</Text>
                <Text className={styles.videoPlatform}>{video.platform}</Text>
              </View>
              <View className={styles.videoMeta}>
                <Text className={styles.videoMetaItem}>播放 {formatNumber(video.views)}</Text>
                <Text className={styles.videoMetaItem}>点赞 {formatNumber(video.likes)}</Text>
                <Text className={styles.videoMetaItem}>评论 {formatNumber(video.comments)}</Text>
              </View>
              <Text className={styles.videoAuthor}>作者：{video.author}</Text>
              <View className={styles.videoTags}>
                {video.tags.map((tag, index) => (
                  <Text key={index} className={styles.videoTag}>{tag}</Text>
                ))}
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={() => setShowModal(true)}>
            <Text className={styles.addBtnText}>+ 收藏新视频</Text>
          </View>
        </View>
      )}

      {activeTab === 'keywords' && (
        <View className={styles.section}>
          {keywords.map((keyword) => (
            <View key={keyword.id} className={styles.keywordCard}>
              <View className={styles.keywordContent}>
                <Text className={styles.keywordText}>{keyword.keyword}</Text>
                <View className={styles.keywordMeta}>
                  <Text className={styles.keywordCategory}>{keyword.category}</Text>
                  <Text className={styles.keywordVolume}>热度：{keyword.searchVolume}</Text>
                </View>
              </View>
              <View className={classnames(
                styles.keywordTrend,
                keyword.trend === 'up' && styles.trendUp,
                keyword.trend === 'down' && styles.trendDown,
                keyword.trend === 'stable' && styles.trendStable
              )}>
                <Text className={styles.trendIcon}>
                  {keyword.trend === 'up' ? '↑' : keyword.trend === 'down' ? '↓' : '→'}
                </Text>
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={() => setShowModal(true)}>
            <Text className={styles.addBtnText}>+ 添加关键词</Text>
          </View>
        </View>
      )}

      {activeTab === 'questions' && (
        <View className={styles.section}>
          {commentQuestions.map((question) => (
            <View key={question.id} className={styles.questionCard}>
              <Text className={styles.questionText}>{question.question}</Text>
              <View className={styles.questionMeta}>
                <Text className={styles.questionSource}>来源：{question.source}</Text>
                {question.used ? (
                  <Text className={styles.questionUsed}>已使用</Text>
                ) : (
                  <Text className={styles.questionLikes}>点赞 {question.likes}</Text>
                )}
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={() => setShowModal(true)}>
            <Text className={styles.addBtnText}>+ 收藏问题</Text>
          </View>
        </View>
      )}

      {activeTab === 'inspirations' && (
        <View className={styles.section}>
          {inspirations.map((inspiration) => (
            <View key={inspiration.id} className={styles.inspirationCard}>
              <View className={styles.inspirationHeader}>
                <Text className={styles.inspirationContent}>{inspiration.content}</Text>
                <Text className={styles.inspirationSource}>{getSourceLabel(inspiration.source)}</Text>
              </View>
              <View className={styles.inspirationFooter}>
                <Text className={styles.inspirationDate}>{inspiration.createdAt}</Text>
                {inspiration.convertedToTopic ? (
                  <Text className={styles.inspirationConverted}>已转选题</Text>
                ) : (
                  <View className={styles.convertBtn} onClick={() => handleConvertToTopic(inspiration.id)}>
                    <Text className={styles.convertBtnText}>转选题</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={() => setShowModal(true)}>
            <Text className={styles.addBtnText}>+ 记录灵感</Text>
          </View>
        </View>
      )}

      <Modal
        visible={showModal}
        title="添加内容"
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          <Text className={styles.modalHint}>添加功能开发中...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TrendingPage;