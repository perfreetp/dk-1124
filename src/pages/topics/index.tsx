import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Input, Textarea } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useTopicStore } from '../../store/topicStore';
import TopicCard from '../../components/TopicCard';
import Modal from '../../components/Modal';
import { Topic, TitleCandidate, ScriptPoint, MaterialItem, DifficultyLevel } from '../../types';

type FilterType = 'all' | 'draft' | 'ready' | 'filming' | 'editing' | 'published';
type ModalType = 'create' | 'edit' | 'detail';

const TopicsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('create');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { topics, addTopic, updateTopic, deleteTopic, getTopicsByStatus } = useTopicStore();

  const [topicForm, setTopicForm] = useState<{
    titleCandidates: TitleCandidate[];
    selectedTitle: string;
    scriptPoints: ScriptPoint[];
    difficulty: DifficultyLevel;
    materials: MaterialItem[];
    assignee: string;
    status: Topic['status'];
  }>({
    titleCandidates: [{ id: `tc_${Date.now()}`, title: '', score: 80, selected: true }],
    selectedTitle: '',
    scriptPoints: [{ id: `sp_${Date.now()}`, content: '', order: 1, duration: '10秒' }],
    difficulty: 'medium',
    materials: [{ id: `mat_${Date.now()}`, name: '', type: 'prop' as const, status: 'need' as const, notes: '' }],
    assignee: '',
    status: 'draft'
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: '全部' },
    { key: 'draft', label: '草稿' },
    { key: 'ready', label: '待拍' },
    { key: 'filming', label: '拍摄中' },
    { key: 'editing', label: '剪辑中' },
    { key: 'published', label: '已发布' }
  ];

  const difficultyLabels: Record<DifficultyLevel, string> = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  };

  const filteredTopics = activeFilter === 'all'
    ? topics
    : getTopicsByStatus(activeFilter);

  const stats = {
    total: topics.length,
    draft: topics.filter(t => t.status === 'draft').length,
    ready: topics.filter(t => t.status === 'ready').length,
    filming: topics.filter(t => t.status === 'filming').length
  };

  useEffect(() => {
    if (selectedTopic && modalType === 'edit') {
      setTopicForm({
        titleCandidates: [...selectedTopic.titleCandidates],
        selectedTitle: selectedTopic.selectedTitle,
        scriptPoints: [...selectedTopic.scriptPoints],
        difficulty: selectedTopic.difficulty,
        materials: [...selectedTopic.materials],
        assignee: selectedTopic.assignee,
        status: selectedTopic.status
      });
    }
  }, [selectedTopic, modalType]);

  const openCreateModal = () => {
    setModalType('create');
    setTopicForm({
      titleCandidates: [{ id: `tc_${Date.now()}`, title: '', score: 80, selected: true }],
      selectedTitle: '',
      scriptPoints: [{ id: `sp_${Date.now()}`, content: '', order: 1, duration: '10秒' }],
      difficulty: 'medium',
      materials: [{ id: `mat_${Date.now()}`, name: '', type: 'prop' as const, status: 'need' as const, notes: '' }],
      assignee: '',
      status: 'draft'
    });
    setShowModal(true);
  };

  const openEditModal = (topic: Topic) => {
    setSelectedTopic(topic);
    setModalType('edit');
    setShowModal(true);
  };

  const openDetailModal = (topic: Topic) => {
    setSelectedTopic(topic);
    setModalType('detail');
    setShowModal(true);
  };

  const handleSaveTopic = () => {
    const selectedTitle = topicForm.titleCandidates.find(t => t.selected)?.title || '';
    if (!selectedTitle.trim()) {
      Taro.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }

    if (modalType === 'create') {
      const newTopic: Topic = {
        id: `topic_${Date.now()}`,
        titleCandidates: topicForm.titleCandidates.filter(t => t.title.trim()),
        selectedTitle,
        scriptPoints: topicForm.scriptPoints.filter(s => s.content.trim()),
        difficulty: topicForm.difficulty,
        materials: topicForm.materials.filter(m => m.name.trim()),
        assignee: topicForm.assignee || '未分配',
        status: topicForm.status,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      addTopic(newTopic);
      Taro.showToast({ title: '创建成功', icon: 'success' });
    } else if (modalType === 'edit' && selectedTopic) {
      const updatedTopic: Topic = {
        ...selectedTopic,
        titleCandidates: topicForm.titleCandidates.filter(t => t.title.trim()),
        selectedTitle,
        scriptPoints: topicForm.scriptPoints.filter(s => s.content.trim()),
        difficulty: topicForm.difficulty,
        materials: topicForm.materials.filter(m => m.name.trim()),
        assignee: topicForm.assignee || '未分配',
        status: topicForm.status,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      updateTopic(updatedTopic);
      Taro.showToast({ title: '更新成功', icon: 'success' });
    }

    setShowModal(false);
  };

  const handleDeleteTopic = () => {
    if (!selectedTopic) return;
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个选题吗？',
      success: (res) => {
        if (res.confirm && selectedTopic) {
          deleteTopic(selectedTopic.id);
          setShowModal(false);
          Taro.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  };

  const addTitleCandidate = () => {
    setTopicForm(prev => ({
      ...prev,
      titleCandidates: [...prev.titleCandidates, { id: `tc_${Date.now()}`, title: '', score: 70, selected: false }]
    }));
  };

  const removeTitleCandidate = (id: string) => {
    setTopicForm(prev => ({
      ...prev,
      titleCandidates: prev.titleCandidates.filter(t => t.id !== id),
      selectedTitle: prev.titleCandidates.find(t => t.id !== id && t.selected)?.title || ''
    }));
  };

  const selectTitleCandidate = (id: string) => {
    setTopicForm(prev => ({
      ...prev,
      titleCandidates: prev.titleCandidates.map(t => ({ ...t, selected: t.id === id })),
      selectedTitle: prev.titleCandidates.find(t => t.id === id)?.title || ''
    }));
  };

  const addScriptPoint = () => {
    setTopicForm(prev => ({
      ...prev,
      scriptPoints: [...prev.scriptPoints, { id: `sp_${Date.now()}`, content: '', order: prev.scriptPoints.length + 1, duration: '10秒' }]
    }));
  };

  const removeScriptPoint = (id: string) => {
    setTopicForm(prev => ({
      ...prev,
      scriptPoints: prev.scriptPoints.filter(s => s.id !== id).map((s, i) => ({ ...s, order: i + 1 }))
    }));
  };

  const addMaterial = () => {
    setTopicForm(prev => ({
      ...prev,
      materials: [...prev.materials, { id: `mat_${Date.now()}`, name: '', type: 'prop' as const, status: 'need' as const, notes: '' }]
    }));
  };

  const removeMaterial = (id: string) => {
    setTopicForm(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m.id !== id)
    }));
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>选题池</Text>
        <View className={styles.addBtn} onClick={openCreateModal}>
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
            <TopicCard key={topic.id} topic={topic} onClick={() => openDetailModal(topic)} />
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
        title={modalType === 'create' ? '创建新选题' : modalType === 'edit' ? '编辑选题' : '选题详情'}
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          {(modalType === 'create' || modalType === 'edit') && (
            <>
              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>标题备选</Text>
                {topicForm.titleCandidates.map((title) => (
                  <View key={title.id} className={styles.titleCandidateItem}>
                    <Input
                      className={styles.titleInput}
                      value={title.title}
                      onChange={(e) => setTopicForm(prev => ({
                        ...prev,
                        titleCandidates: prev.titleCandidates.map(t =>
                          t.id === title.id ? { ...t, title: e.detail.value } : t
                        )
                      }))}
                      placeholder="输入标题"
                    />
                    <Input
                      className={styles.scoreInput}
                      type="number"
                      value={title.score.toString()}
                      onChange={(e) => setTopicForm(prev => ({
                        ...prev,
                        titleCandidates: prev.titleCandidates.map(t =>
                          t.id === title.id ? { ...t, score: parseInt(e.detail.value) || 0 } : t
                        )
                      }))}
                      placeholder="评分"
                    />
                    <View className={styles.titleActions}>
                      <View className={`${styles.titleActionBtn} ${styles.titleActionSelect}`} onClick={() => selectTitleCandidate(title.id)}>
                        <Text>{title.selected ? '选中' : '选'}
                      </Text>
                      </View>
                      {topicForm.titleCandidates.length > 1 && (
                        <View className={`${styles.titleActionBtn} ${styles.titleActionDelete}`} onClick={() => removeTitleCandidate(title.id)}>
                          <Text>删</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
                <View className={styles.addTitleBtn} onClick={addTitleCandidate}>
                  <Text>+ 添加标题备选</Text>
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>脚本要点</Text>
                {topicForm.scriptPoints.map((script) => (
                  <View key={script.id} className={styles.scriptPointItem}>
                    <Input
                      className={styles.scriptInput}
                      value={script.content}
                      onChange={(e) => setTopicForm(prev => ({
                        ...prev,
                        scriptPoints: prev.scriptPoints.map(s =>
                          s.id === script.id ? { ...s, content: e.detail.value } : s
                        )
                      }))}
                      placeholder="输入脚本要点"
                    />
                    <Input
                      className={styles.durationInput}
                      value={script.duration}
                      onChange={(e) => setTopicForm(prev => ({
                        ...prev,
                        scriptPoints: prev.scriptPoints.map(s =>
                          s.id === script.id ? { ...s, duration: e.detail.value } : s
                        )
                      }))}
                      placeholder="时长"
                    />
                    {topicForm.scriptPoints.length > 1 && (
                      <View className={`${styles.titleActionBtn} ${styles.titleActionDelete}`} onClick={() => removeScriptPoint(script.id)}>
                        <Text>删</Text>
                      </View>
                    )}
                  </View>
                ))}
                <View className={styles.addScriptBtn} onClick={addScriptPoint}>
                  <Text>+ 添加脚本要点</Text>
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>拍摄难度</Text>
                <View className={styles.difficultyOptions}>
                  {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
                    <View
                      key={level}
                      className={classnames(styles.difficultyOption, topicForm.difficulty === level && styles.active)}
                      onClick={() => setTopicForm(prev => ({ ...prev, difficulty: level }))}
                    >
                      <Text>{difficultyLabels[level]}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>素材清单</Text>
                {topicForm.materials.map((material) => (
                  <View key={material.id} className={styles.materialItem}>
                    <Input
                      className={styles.materialInput}
                      value={material.name}
                      onChange={(e) => setTopicForm(prev => ({
                        ...prev,
                        materials: prev.materials.map(m =>
                          m.id === material.id ? { ...m, name: e.detail.value } : m
                        )
                      }))}
                      placeholder="素材名称"
                    />
                    <View className={styles.materialTypeSelect}>
                      <Text>{material.type === 'prop' ? '道具' : material.type === 'location' ? '场地' : material.type === 'equipment' ? '设备' : material.type === 'music' ? '音乐' : '其他'}</Text>
                    </View>
                    {topicForm.materials.length > 1 && (
                      <View className={`${styles.titleActionBtn} ${styles.titleActionDelete}`} onClick={() => removeMaterial(material.id)}>
                        <Text>删</Text>
                      </View>
                    )}
                  </View>
                ))}
                <View className={styles.addMaterialBtn} onClick={addMaterial}>
                  <Text>+ 添加素材</Text>
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>负责人</Text>
                <Input
                  className={styles.formInput}
                  value={topicForm.assignee}
                  onChange={(e) => setTopicForm(prev => ({ ...prev, assignee: e.detail.value }))}
                  placeholder="输入负责人姓名"
                />
              </View>

              <View className={styles.formActions}>
                <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}>
                  <Text>取消</Text>
                </View>
                <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleSaveTopic}>
                  <Text>{modalType === 'create' ? '创建' : '保存'}</Text>
                </View>
              </View>
            </>
          )}

          {modalType === 'detail' && selectedTopic && (
            <>
              <View className={styles.detailSection}>
                <Text className={styles.detailTitle}>{selectedTopic.selectedTitle}</Text>
              </View>

              <View className={styles.detailSection}>
                <Text className={styles.detailTitle}>标题备选</Text>
                {selectedTopic.titleCandidates.map((title, index) => (
                  <View key={title.id} className={styles.detailItem}>
                    <Text className={styles.detailLabel}>{index + 1}</Text>
                    <Text className={styles.detailValue}>{title.title} {title.selected && '(选中)'} 评分: {title.score}</Text>
                  </View>
                ))}
              </View>

              <View className={styles.detailSection}>
                <Text className={styles.detailTitle}>脚本要点</Text>
                {selectedTopic.scriptPoints.map((script) => (
                  <View key={script.id} className={styles.detailItem}>
                    <Text className={styles.detailLabel}>{script.order}</Text>
                    <Text className={styles.detailValue}>{script.content} ({script.duration})</Text>
                  </View>
                ))}
              </View>

              <View className={styles.detailSection}>
                <View className={styles.detailItem}>
                  <Text className={styles.detailLabel}>难度</Text>
                  <Text className={styles.detailValue}>{difficultyLabels[selectedTopic.difficulty]}</Text>
                </View>
                <View className={styles.detailItem}>
                  <Text className={styles.detailLabel}>负责人</Text>
                  <Text className={styles.detailValue}>{selectedTopic.assignee}</Text>
                </View>
                <View className={styles.detailItem}>
                  <Text className={styles.detailLabel}>状态</Text>
                  <Text className={styles.detailValue}>
                    {selectedTopic.status === 'draft' ? '草稿' :
                     selectedTopic.status === 'ready' ? '待拍摄' :
                     selectedTopic.status === 'filming' ? '拍摄中' :
                     selectedTopic.status === 'editing' ? '剪辑中' : '已发布'}
                  </Text>
                </View>
              </View>

              <View className={styles.detailSection}>
                <Text className={styles.detailTitle}>素材清单</Text>
                {selectedTopic.materials.map((material) => (
                  <View key={material.id} className={styles.detailItem}>
                    <Text className={styles.detailLabel}>
                      {material.type === 'prop' ? '道具' : 
                       material.type === 'location' ? '场地' : 
                       material.type === 'equipment' ? '设备' : 
                       material.type === 'music' ? '音乐' : '其他'}
                    </Text>
                    <Text className={styles.detailValue}>{material.name} ({material.status === 'ready' ? '已准备' : material.status === 'need' ? '需准备' : '需借用'})</Text>
                  </View>
                ))}
              </View>

              <View className={styles.detailActions}>
                <View className={`${styles.detailActionBtn} ${styles.detailActionEdit}`} onClick={() => openEditModal(selectedTopic)}>
                  <Text>编辑</Text>
                </View>
                <View className={`${styles.detailActionBtn} ${styles.detailActionDelete}`} onClick={handleDeleteTopic}>
                  <Text>删除</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default TopicsPage;