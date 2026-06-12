import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Input, Textarea } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useReviewStore } from '../../store/reviewStore';
import { useTopicStore } from '../../store/topicStore';
import Modal from '../../components/Modal';
import { ReviewRecord } from '../../types';

type FilterType = 'all' | 'template' | 'adaptable';
type ModalType = 'create' | 'edit';

const ReviewPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('create');
  const [selectedReview, setSelectedReview] = useState<ReviewRecord | null>(null);

  const { reviews, addReview, updateReview, deleteReview } = useReviewStore();
  const { topics } = useTopicStore();

  const [reviewForm, setReviewForm] = useState<{
    videoTitle: string;
    publishDate: string;
    viewCount: string;
    completeRate: string;
    likeCount: string;
    commentCount: string;
    shareCount: string;
    isTemplate: boolean;
    isAdaptable: boolean;
    notes: string;
    topicId: string;
  }>({
    videoTitle: '',
    publishDate: new Date().toISOString().split('T')[0],
    viewCount: '',
    completeRate: '',
    likeCount: '',
    commentCount: '',
    shareCount: '',
    isTemplate: false,
    isAdaptable: false,
    notes: '',
    topicId: ''
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'template', label: '模板' },
    { key: 'adaptable', label: '可改编' }
  ];

  const filteredReviews = activeFilter === 'all'
    ? reviews
    : activeFilter === 'template'
      ? reviews.filter(r => r.isTemplate)
      : reviews.filter(r => r.isAdaptable);

  const stats = {
    total: reviews.length,
    totalViews: reviews.reduce((sum, r) => sum + parseInt(r.viewCount) || 0, 0),
    avgCompleteRate: reviews.length > 0
      ? Math.round(reviews.reduce((sum, r) => sum + parseFloat(r.completeRate) || 0, 0) / reviews.length)
      : 0,
    templateCount: reviews.filter(r => r.isTemplate).length
  };

  useEffect(() => {
    if (selectedReview && modalType === 'edit') {
      setReviewForm({
        videoTitle: selectedReview.videoTitle,
        publishDate: selectedReview.publishDate,
        viewCount: selectedReview.viewCount,
        completeRate: selectedReview.completeRate,
        likeCount: selectedReview.likeCount,
        commentCount: selectedReview.commentCount,
        shareCount: selectedReview.shareCount,
        isTemplate: selectedReview.isTemplate,
        isAdaptable: selectedReview.isAdaptable,
        notes: selectedReview.notes,
        topicId: selectedReview.topicId
      });
    }
  }, [selectedReview, modalType]);

  const openCreateModal = () => {
    setModalType('create');
    setReviewForm({
      videoTitle: '',
      publishDate: new Date().toISOString().split('T')[0],
      viewCount: '',
      completeRate: '',
      likeCount: '',
      commentCount: '',
      shareCount: '',
      isTemplate: false,
      isAdaptable: false,
      notes: '',
      topicId: ''
    });
    setShowModal(true);
  };

  const openEditModal = (review: ReviewRecord) => {
    setSelectedReview(review);
    setModalType('edit');
    setShowModal(true);
  };

  const handleSaveReview = () => {
    if (!reviewForm.videoTitle.trim()) {
      Taro.showToast({ title: '请输入视频标题', icon: 'none' });
      return;
    }

    if (modalType === 'create') {
      const newReview: ReviewRecord = {
        id: `review_${Date.now()}`,
        videoTitle: reviewForm.videoTitle,
        publishDate: reviewForm.publishDate,
        viewCount: reviewForm.viewCount || '0',
        completeRate: reviewForm.completeRate || '0',
        likeCount: reviewForm.likeCount || '0',
        commentCount: reviewForm.commentCount || '0',
        shareCount: reviewForm.shareCount || '0',
        isTemplate: reviewForm.isTemplate,
        isAdaptable: reviewForm.isAdaptable,
        notes: reviewForm.notes,
        topicId: reviewForm.topicId,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addReview(newReview);
      Taro.showToast({ title: '创建成功', icon: 'success' });
    } else if (modalType === 'edit' && selectedReview) {
      const updatedReview: ReviewRecord = {
        ...selectedReview,
        videoTitle: reviewForm.videoTitle,
        publishDate: reviewForm.publishDate,
        viewCount: reviewForm.viewCount || '0',
        completeRate: reviewForm.completeRate || '0',
        likeCount: reviewForm.likeCount || '0',
        commentCount: reviewForm.commentCount || '0',
        shareCount: reviewForm.shareCount || '0',
        isTemplate: reviewForm.isTemplate,
        isAdaptable: reviewForm.isAdaptable,
        notes: reviewForm.notes,
        topicId: reviewForm.topicId
      };
      updateReview(updatedReview);
      Taro.showToast({ title: '更新成功', icon: 'success' });
    }

    setShowModal(false);
  };

  const handleDeleteReview = () => {
    if (!selectedReview) return;
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个复盘记录吗？',
      success: (res) => {
        if (res.confirm && selectedReview) {
          deleteReview(selectedReview.id);
          setShowModal(false);
          Taro.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  };

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (n >= 10000) {
      return (n / 10000).toFixed(1) + 'w';
    }
    return num;
  };

  const getCompleteRateStyle = (rate: string) => {
    const r = parseFloat(rate);
    if (r >= 60) return styles.dataCardHighlight;
    if (r < 30) return styles.dataCardWarning;
    return '';
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>发布复盘</Text>
        <View className={styles.addBtn} onClick={openCreateModal}>
          <Text className={styles.addBtnText}>+ 新复盘</Text>
        </View>
      </View>

      <View className={styles.statsSection}>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.total}</Text>
          <Text className={styles.statLabel}>复盘数</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{formatNumber(stats.totalViews.toString())}</Text>
          <Text className={styles.statLabel}>总播放</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.avgCompleteRate}%</Text>
          <Text className={styles.statLabel}>平均完播</Text>
        </View>
        <View className={styles.statCard}>
          <Text className={styles.statValue}>{stats.templateCount}</Text>
          <Text className={styles.statLabel}>模板数</Text>
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

      <View className={styles.reviewList}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => {
            const topic = topics.find(t => t.id === review.topicId);
            return (
              <View key={review.id} className={styles.reviewCard}>
                <View className={styles.reviewHeader}>
                  <Text className={styles.reviewTitle}>{review.videoTitle}</Text>
                  <View className={styles.reviewTags}>
                    {review.isTemplate && (
                      <Text className={classnames(styles.reviewTag, styles.tagTemplate)}>模板</Text>
                    )}
                    {review.isAdaptable && (
                      <Text className={classnames(styles.reviewTag, styles.tagAdaptable)}>可改编</Text>
                    )}
                  </View>
                </View>
                <View className={styles.reviewMeta}>
                  <Text className={styles.metaItem}>📅 {review.publishDate}</Text>
                  {topic && (
                    <Text className={styles.metaItem}>📝 {topic.selectedTitle}</Text>
                  )}
                </View>
                <View className={styles.dataRow}>
                  <View className={styles.dataCard}>
                    <Text className={styles.dataValue}>{formatNumber(review.viewCount)}</Text>
                    <Text className={styles.dataLabel}>播放</Text>
                  </View>
                  <View className={classnames(styles.dataCard, getCompleteRateStyle(review.completeRate))}>
                    <Text className={styles.dataValue}>{review.completeRate}%</Text>
                    <Text className={styles.dataLabel}>完播</Text>
                  </View>
                </View>
                <View className={styles.dataRow}>
                  <View className={styles.dataCard}>
                    <Text className={styles.dataValue}>{formatNumber(review.likeCount)}</Text>
                    <Text className={styles.dataLabel}>点赞</Text>
                  </View>
                  <View className={styles.dataCard}>
                    <Text className={styles.dataValue}>{formatNumber(review.commentCount)}</Text>
                    <Text className={styles.dataLabel}>评论</Text>
                  </View>
                  <View className={styles.dataCard}>
                    <Text className={styles.dataValue}>{formatNumber(review.shareCount)}</Text>
                    <Text className={styles.dataLabel}>分享</Text>
                  </View>
                </View>
                {review.notes && (
                  <Text className={styles.reviewNotes}>💡 {review.notes}</Text>
                )}
                <View className={styles.reviewActions}>
                  <View className={styles.reviewActionBtn + ' ' + styles.reviewActionEdit} onClick={() => openEditModal(review)}>
                    <Text>编辑</Text>
                  </View>
                  <View className={styles.reviewActionBtn + ' ' + styles.reviewActionDelete} onClick={() => { setSelectedReview(review); handleDeleteReview(); }}>
                    <Text>删除</Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View className={styles.emptyState}>
            <View className={styles.emptyIcon}>
              <Text className={styles.emptyIconText}>空</Text>
            </View>
            <Text className={styles.emptyTitle}>暂无复盘</Text>
            <Text className={styles.emptyDesc}>点击上方按钮添加复盘记录</Text>
          </View>
        )}
      </View>

      <Modal
        visible={showModal}
        title={modalType === 'create' ? '添加复盘记录' : '编辑复盘'}
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>视频标题</Text>
            <Input
              className={styles.formInput}
              value={reviewForm.videoTitle}
              onChange={(e) => setReviewForm(prev => ({ ...prev, videoTitle: e.detail.value }))}
              placeholder="输入视频标题"
            />
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>发布日期</Text>
            <View className={styles.datePicker}>
              <Text>{reviewForm.publishDate}</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>播放数据</Text>
            <View className={styles.dataGroup}>
              <Input
                className={styles.dataInput}
                type="number"
                value={reviewForm.viewCount}
                onChange={(e) => setReviewForm(prev => ({ ...prev, viewCount: e.detail.value }))}
                placeholder="播放量"
              />
              <Text className={styles.dataUnit}>次</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>完播率</Text>
            <View className={styles.dataGroup}>
              <Input
                className={styles.dataInput}
                type="digit"
                value={reviewForm.completeRate}
                onChange={(e) => setReviewForm(prev => ({ ...prev, completeRate: e.detail.value }))}
                placeholder="0-100"
              />
              <Text className={styles.dataUnit}>%</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>互动数据</Text>
            <View className={styles.dataRow}>
              <View className={styles.dataGroup}>
                <Input
                  className={styles.dataInput}
                  type="number"
                  value={reviewForm.likeCount}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, likeCount: e.detail.value }))}
                  placeholder="点赞"
                />
              </View>
              <View className={styles.dataGroup}>
                <Input
                  className={styles.dataInput}
                  type="number"
                  value={reviewForm.commentCount}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, commentCount: e.detail.value }))}
                  placeholder="评论"
                />
              </View>
              <View className={styles.dataGroup}>
                <Input
                  className={styles.dataInput}
                  type="number"
                  value={reviewForm.shareCount}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, shareCount: e.detail.value }))}
                  placeholder="分享"
                />
              </View>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>标记</Text>
            <View className={styles.checkboxGroup}>
              <View
                className={classnames(styles.checkboxItem, reviewForm.isTemplate && styles.active)}
                onClick={() => setReviewForm(prev => ({ ...prev, isTemplate: !prev.isTemplate }))}
              >
                <Text>{reviewForm.isTemplate ? '✓ 模板' : '设为模板'}</Text>
              </View>
              <View
                className={classnames(styles.checkboxItem, reviewForm.isAdaptable && styles.active)}
                onClick={() => setReviewForm(prev => ({ ...prev, isAdaptable: !prev.isAdaptable }))}
              >
                <Text>{reviewForm.isAdaptable ? '✓ 可改编' : '可改编'}</Text>
              </View>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>关联选题</Text>
            <View className={styles.topicDropdown}>
              <Text>{reviewForm.topicId ? topics.find(t => t.id === reviewForm.topicId)?.selectedTitle || '选择选题' : '选择选题'}</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>复盘笔记</Text>
            <Textarea
              className={styles.formTextarea}
              value={reviewForm.notes}
              onChange={(e) => setReviewForm(prev => ({ ...prev, notes: e.detail.value }))}
              placeholder="记录本次发布的经验教训..."
            />
          </View>

          <View className={styles.formActions}>
            <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}>
              <Text>取消</Text>
            </View>
            <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleSaveReview}>
              <Text>{modalType === 'create' ? '创建' : '保存'}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ReviewPage;