import React, { useState } from 'react';
import { View, Text, ScrollView, Input, Textarea } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useTrendingStore } from '../../store/trendingStore';
import { useTopicStore } from '../../store/topicStore';
import Modal from '../../components/Modal';
import { CompetitorVideo, KeywordItem, CommentQuestion, Inspiration } from '../../types';

type TabType = 'videos' | 'keywords' | 'questions' | 'inspirations';

const TrendingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('videos');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [formType, setFormType] = useState<TabType>('videos');

  const {
    competitorVideos,
    keywords,
    commentQuestions,
    inspirations,
    addCompetitorVideo,
    addKeyword,
    addCommentQuestion,
    addInspiration,
    convertInspirationToTopic
  } = useTrendingStore();

  const { addTopic } = useTopicStore();

  const [videoForm, setVideoForm] = useState<{
    title: string;
    url: string;
    platform: string;
    author: string;
    tags: string[];
    newTag: string;
    notes: string;
  }>({
    title: '',
    url: '',
    platform: '',
    author: '',
    tags: [],
    newTag: '',
    notes: ''
  });

  const [keywordForm, setKeywordForm] = useState<{
    keyword: string;
    category: string;
    searchVolume: string;
    trend: 'up' | 'down' | 'stable';
  }>({
    keyword: '',
    category: '',
    searchVolume: '',
    trend: 'stable'
  });

  const [questionForm, setQuestionForm] = useState<{
    question: string;
    source: string;
    sourceUrl: string;
    likes: string;
  }>({
    question: '',
    source: '',
    sourceUrl: '',
    likes: '0'
  });

  const [inspirationForm, setInspirationForm] = useState<{
    content: string;
  }>({
    content: ''
  });

  const [convertForm, setConvertForm] = useState<{
    inspirationId: string;
    content: string;
    assignee: string;
    difficulty: 'easy' | 'medium' | 'hard';
    scriptPoint: string;
    materialName: string;
  }>({
    inspirationId: '',
    content: '',
    assignee: '',
    difficulty: 'medium',
    scriptPoint: '',
    materialName: ''
  });

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

  const openModal = (type: TabType) => {
    setFormType(type);
    setModalTitle({
      videos: '收藏新视频',
      keywords: '添加关键词',
      questions: '收藏问题',
      inspirations: '记录灵感'
    }[type]);
    setShowModal(true);
  };

  const handleAddVideo = () => {
    if (!videoForm.title.trim()) {
      Taro.showToast({ title: '请输入视频标题', icon: 'none' });
      return;
    }
    const video: CompetitorVideo = {
      id: `video_${Date.now()}`,
      title: videoForm.title,
      url: videoForm.url,
      platform: videoForm.platform || '抖音',
      author: videoForm.author || '未知',
      views: 0,
      likes: 0,
      comments: 0,
      collectedAt: new Date().toISOString().split('T')[0],
      tags: videoForm.tags,
      notes: videoForm.notes
    };
    addCompetitorVideo(video);
    setVideoForm({ title: '', url: '', platform: '', author: '', tags: [], newTag: '', notes: '' });
    setShowModal(false);
    Taro.showToast({ title: '收藏成功', icon: 'success' });
  };

  const handleAddKeyword = () => {
    if (!keywordForm.keyword.trim()) {
      Taro.showToast({ title: '请输入关键词', icon: 'none' });
      return;
    }
    const keyword: KeywordItem = {
      id: `kw_${Date.now()}`,
      keyword: keywordForm.keyword,
      category: keywordForm.category || '其他',
      searchVolume: keywordForm.searchVolume || '中',
      trend: keywordForm.trend,
      createdAt: new Date().toISOString().split('T')[0]
    };
    addKeyword(keyword);
    setKeywordForm({ keyword: '', category: '', searchVolume: '', trend: 'stable' });
    setShowModal(false);
    Taro.showToast({ title: '添加成功', icon: 'success' });
  };

  const handleAddQuestion = () => {
    if (!questionForm.question.trim()) {
      Taro.showToast({ title: '请输入问题内容', icon: 'none' });
      return;
    }
    const question: CommentQuestion = {
      id: `cq_${Date.now()}`,
      question: questionForm.question,
      source: questionForm.source || '未知来源',
      sourceUrl: questionForm.sourceUrl,
      likes: parseInt(questionForm.likes) || 0,
      collectedAt: new Date().toISOString().split('T')[0],
      used: false
    };
    addCommentQuestion(question);
    setQuestionForm({ question: '', source: '', sourceUrl: '', likes: '0' });
    setShowModal(false);
    Taro.showToast({ title: '收藏成功', icon: 'success' });
  };

  const handleAddInspiration = () => {
    if (!inspirationForm.content.trim()) {
      Taro.showToast({ title: '请输入灵感内容', icon: 'none' });
      return;
    }
    const inspiration: Inspiration = {
      id: `insp_${Date.now()}`,
      content: inspirationForm.content,
      source: 'manual',
      sourceId: '',
      createdAt: new Date().toISOString().split('T')[0],
      convertedToTopic: false
    };
    addInspiration(inspiration);
    setInspirationForm({ content: '' });
    setShowModal(false);
    Taro.showToast({ title: '记录成功', icon: 'success' });
  };

  const openConvertModal = (inspiration: Inspiration) => {
    setConvertForm({
      inspirationId: inspiration.id,
      content: inspiration.content,
      assignee: '',
      difficulty: 'medium',
      scriptPoint: '',
      materialName: ''
    });
    setModalTitle('灵感转选题');
    setFormType('inspirations');
    setShowModal(true);
  };

  const handleConvertToTopic = () => {
    if (!convertForm.content.trim()) {
      Taro.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }
    const newTopicId = `topic_${Date.now()}`;
    
    convertInspirationToTopic(convertForm.inspirationId, newTopicId);
    
    addTopic({
      id: newTopicId,
      titleCandidates: [{ id: `tc_${Date.now()}`, title: convertForm.content, score: 80, selected: true }],
      selectedTitle: convertForm.content,
      scriptPoints: convertForm.scriptPoint ? [{ id: `sp_${Date.now()}`, content: convertForm.scriptPoint, order: 1, duration: '10秒' }] : [],
      difficulty: convertForm.difficulty,
      materials: convertForm.materialName ? [{ id: `mat_${Date.now()}`, name: convertForm.materialName, type: 'prop', status: 'need', notes: '' }] : [],
      assignee: convertForm.assignee || '未分配',
      status: 'draft',
      inspirationId: convertForm.inspirationId,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });

    setShowModal(false);
    Taro.showToast({ title: '转选题成功', icon: 'success' });
  };

  const handleAddTag = () => {
    if (videoForm.newTag.trim() && !videoForm.tags.includes(videoForm.newTag)) {
      setVideoForm(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setVideoForm(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
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
          <View className={styles.addBtn} onClick={() => openModal('videos')}>
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
          <View className={styles.addBtn} onClick={() => openModal('keywords')}>
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
          <View className={styles.addBtn} onClick={() => openModal('questions')}>
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
                  <View className={styles.convertBtn} onClick={() => openConvertModal(inspiration)}>
                    <Text className={styles.convertBtnText}>转选题</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
          <View className={styles.addBtn} onClick={() => openModal('inspirations')}>
            <Text className={styles.addBtnText}>+ 记录灵感</Text>
          </View>
        </View>
      )}

      <Modal
        visible={showModal}
        title={modalTitle}
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          {formType === 'videos' && (
            <>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>视频标题</Text>
                <Input className={styles.formInput} value={videoForm.title} onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.detail.value }))} placeholder="请输入视频标题" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>视频链接</Text>
                <Input className={styles.formInput} value={videoForm.url} onChange={(e) => setVideoForm(prev => ({ ...prev, url: e.detail.value }))} placeholder="请输入视频链接" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>平台</Text>
                <Input className={styles.formInput} value={videoForm.platform} onChange={(e) => setVideoForm(prev => ({ ...prev, platform: e.detail.value }))} placeholder="抖音/快手/B站" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>作者</Text>
                <Input className={styles.formInput} value={videoForm.author} onChange={(e) => setVideoForm(prev => ({ ...prev, author: e.detail.value }))} placeholder="视频作者" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>标签</Text>
                <View className={styles.tagInputRow}>
                  <Input className={styles.tagInput} value={videoForm.newTag} onChange={(e) => setVideoForm(prev => ({ ...prev, newTag: e.detail.value }))} placeholder="添加标签" onConfirm={handleAddTag} />
                  <View className={styles.addTagBtn} onClick={handleAddTag}><Text>添加</Text></View>
                </View>
                <View className={styles.selectedTags}>
                  {videoForm.tags.map((tag, index) => (
                    <View key={index} className={styles.selectedTag}>
                      <Text>{tag}</Text>
                      <Text className={styles.removeTag} onClick={() => handleRemoveTag(tag)}>×</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>备注</Text>
                <Textarea className={styles.formTextarea} value={videoForm.notes} onChange={(e) => setVideoForm(prev => ({ ...prev, notes: e.detail.value }))} placeholder="添加备注信息" />
              </View>
              <View className={styles.formActions}>
                <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}><Text>取消</Text></View>
                <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleAddVideo}><Text>收藏</Text></View>
              </View>
            </>
          )}

          {formType === 'keywords' && (
            <>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>关键词</Text>
                <Input className={styles.formInput} value={keywordForm.keyword} onChange={(e) => setKeywordForm(prev => ({ ...prev, keyword: e.detail.value }))} placeholder="请输入关键词" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>分类</Text>
                <Input className={styles.formInput} value={keywordForm.category} onChange={(e) => setKeywordForm(prev => ({ ...prev, category: e.detail.value }))} placeholder="如：收纳、美食" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>搜索热度</Text>
                <View className={styles.tagInputRow}>
                  {['高', '中', '低'].map((level) => (
                    <View key={level} className={`${styles.addTagBtn} ${keywordForm.searchVolume === level ? styles.formBtnPrimary : ''}`} onClick={() => setKeywordForm(prev => ({ ...prev, searchVolume: level }))}>
                      <Text>{level}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>趋势</Text>
                <View className={styles.tagInputRow}>
                  {[
                    { key: 'up', label: '↑ 上升' },
                    { key: 'stable', label: '→ 稳定' },
                    { key: 'down', label: '↓ 下降' }
                  ].map((trend) => (
                    <View key={trend.key} className={`${styles.addTagBtn} ${keywordForm.trend === trend.key ? styles.formBtnPrimary : ''}`} onClick={() => setKeywordForm(prev => ({ ...prev, trend: trend.key as 'up' | 'down' | 'stable' }))}>
                      <Text>{trend.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className={styles.formActions}>
                <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}><Text>取消</Text></View>
                <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleAddKeyword}><Text>添加</Text></View>
              </View>
            </>
          )}

          {formType === 'questions' && (
            <>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>问题内容</Text>
                <Textarea className={styles.formTextarea} value={questionForm.question} onChange={(e) => setQuestionForm(prev => ({ ...prev, question: e.detail.value }))} placeholder="请输入评论问题" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>来源</Text>
                <Input className={styles.formInput} value={questionForm.source} onChange={(e) => setQuestionForm(prev => ({ ...prev, source: e.detail.value }))} placeholder="如：某视频评论区" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>来源链接</Text>
                <Input className={styles.formInput} value={questionForm.sourceUrl} onChange={(e) => setQuestionForm(prev => ({ ...prev, sourceUrl: e.detail.value }))} placeholder="可选" />
              </View>
              <View className={styles.formActions}>
                <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}><Text>取消</Text></View>
                <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleAddQuestion}><Text>收藏</Text></View>
              </View>
            </>
          )}

          {formType === 'inspirations' && modalTitle === '记录灵感' && (
            <>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>灵感内容</Text>
                <Textarea className={styles.formTextarea} value={inspirationForm.content} onChange={(e) => setInspirationForm(prev => ({ ...prev, content: e.detail.value }))} placeholder="记录你的灵感..." />
              </View>
              <View className={styles.formActions}>
                <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}><Text>取消</Text></View>
                <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleAddInspiration}><Text>保存</Text></View>
              </View>
            </>
          )}

          {formType === 'inspirations' && modalTitle === '灵感转选题' && (
            <>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>选题标题</Text>
                <Input className={styles.formInput} value={convertForm.content} onChange={(e) => setConvertForm(prev => ({ ...prev, content: e.detail.value }))} placeholder="自动填入灵感内容" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>负责人</Text>
                <Input className={styles.formInput} value={convertForm.assignee} onChange={(e) => setConvertForm(prev => ({ ...prev, assignee: e.detail.value }))} placeholder="分配负责人" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>拍摄难度</Text>
                <View className={styles.tagInputRow}>
                  {[
                    { key: 'easy', label: '简单' },
                    { key: 'medium', label: '中等' },
                    { key: 'hard', label: '困难' }
                  ].map((level) => (
                    <View key={level.key} className={`${styles.addTagBtn} ${convertForm.difficulty === level.key ? styles.formBtnPrimary : ''}`} onClick={() => setConvertForm(prev => ({ ...prev, difficulty: level.key as 'easy' | 'medium' | 'hard' }))}>
                      <Text>{level.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>脚本要点（可选）</Text>
                <Textarea className={styles.formTextarea} value={convertForm.scriptPoint} onChange={(e) => setConvertForm(prev => ({ ...prev, scriptPoint: e.detail.value }))} placeholder="添加脚本要点" />
              </View>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>所需素材（可选）</Text>
                <Input className={styles.formInput} value={convertForm.materialName} onChange={(e) => setConvertForm(prev => ({ ...prev, materialName: e.detail.value }))} placeholder="如：收纳盒、厨房场景" />
              </View>
              <View className={styles.formActions}>
                <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}><Text>取消</Text></View>
                <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleConvertToTopic}><Text>生成选题</Text></View>
              </View>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TrendingPage;