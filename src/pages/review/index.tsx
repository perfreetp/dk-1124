import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { useReviewStore } from '../../store/reviewStore';
import Modal from '../../components/Modal';

const ReviewPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { videoData, templates, stats, markAsTemplate, markCanRemake } = useReviewStore();

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>发布复盘</Text>
      </View>

      <View className={styles.statsGrid}>
        <View className={styles.statCard}>
          <View className={styles.statValue}>
            <Text>{formatNumber(stats.avgViews)}</Text>
            <Text className={styles.statUnit}>平均播放</Text>
          </View>
          <Text className={styles.statLabel}>共{stats.totalVideos}条视频</Text>
        </View>
        <View className={styles.statCard}>
          <View className={styles.statValue}>
            <Text>{stats.avgCompletionRate}%</Text>
          </View>
          <Text className={styles.statLabel}>平均完播率</Text>
        </View>
        <View className={styles.statCard}>
          <View className={styles.statValue}>
            <Text>{stats.avgEngagementRate}%</Text>
          </View>
          <Text className={styles.statLabel}>平均互动率</Text>
        </View>
        <View className={styles.statCard}>
          <View className={styles.statValue}>
            <Text>{templates.length}</Text>
          </View>
          <Text className={styles.statLabel}>沉淀模板</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>高表现视频</Text>
          <View className={styles.sectionAction} onClick={() => setShowModal(true)}>
            <Text className={styles.sectionActionText}>添加数据</Text>
          </View>
        </View>
        {stats.topPerforming.map((video) => (
          <View key={video.id} className={styles.videoCard}>
            <View className={styles.videoHeader}>
              <Text className={styles.videoTitle}>{video.topicTitle}</Text>
              <Text className={styles.videoDate}>{video.publishDate}</Text>
            </View>
            <View className={styles.videoStats}>
              <View className={styles.videoStatItem}>
                <Text className={styles.videoStatValue}>{formatNumber(video.views)}</Text>
                <Text className={styles.videoStatLabel}>播放</Text>
              </View>
              <View className={styles.videoStatItem}>
                <Text className={styles.videoStatValue}>{video.completionRate}%</Text>
                <Text className={styles.videoStatLabel}>完播</Text>
              </View>
              <View className={styles.videoStatItem}>
                <Text className={styles.videoStatValue}>{video.engagementRate}%</Text>
                <Text className={styles.videoStatLabel}>互动</Text>
              </View>
              <View className={styles.videoStatItem}>
                <Text className={styles.videoStatValue}>{formatNumber(video.likes)}</Text>
                <Text className={styles.videoStatLabel}>点赞</Text>
              </View>
            </View>
            <View className={styles.videoTags}>
              {video.isTemplate && (
                <Text className={styles.templateTag}>模板</Text>
              )}
              {video.canRemake && (
                <Text className={styles.remakeTag}>可改编</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>表现模板</Text>
          <View className={styles.sectionAction} onClick={() => setShowModal(true)}>
            <Text className={styles.sectionActionText}>新建模板</Text>
          </View>
        </View>
        {templates.map((template) => (
          <View key={template.id} className={styles.templateCard}>
            <View className={styles.templateHeader}>
              <Text className={styles.templateName}>{template.name}</Text>
              <Text className={styles.templateAvgViews}>
                平均{formatNumber(template.avgViews)}播放
              </Text>
            </View>
            <Text className={styles.templateDesc}>{template.description}</Text>
            <View className={styles.templateFactors}>
              {template.successFactors.map((factor, index) => (
                <Text key={index} className={styles.factorTag}>{factor}</Text>
              ))}
            </View>
          </View>
        ))}
        <View className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Text className={styles.addBtnText}>+ 新建模板</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>可改编内容</Text>
        </View>
        {videoData.filter(v => v.canRemake).map((video) => (
          <View key={video.id} className={styles.videoCard}>
            <View className={styles.videoHeader}>
              <Text className={styles.videoTitle}>{video.topicTitle}</Text>
              <Text className={styles.videoDate}>{video.publishDate}</Text>
            </View>
            <View className={styles.videoStats}>
              <View className={styles.videoStatItem}>
                <Text className={styles.videoStatValue}>{formatNumber(video.views)}</Text>
                <Text className={styles.videoStatLabel}>播放</Text>
              </View>
              <View className={styles.videoStatItem}>
                <Text className={styles.videoStatValue}>{video.completionRate}%</Text>
                <Text className={styles.videoStatLabel}>完播</Text>
              </View>
            </View>
            {video.remakeNotes && (
              <Text className={styles.templateDesc}>改编建议：{video.remakeNotes}</Text>
            )}
          </View>
        ))}
      </View>

      <Modal
        visible={showModal}
        title="添加复盘数据"
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          <Text className={styles.modalHint}>数据添加功能开发中...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ReviewPage;