import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Input, Textarea } from '@tarojs/components';
import styles from './index.module.scss';
import { useAccountStore } from '../../store/accountStore';
import Modal from '../../components/Modal';
import { AccountPersona, ColumnDirection, TargetAudience } from '../../types';

const AccountPage: React.FC = () => {
  const { accountInfo, updatePersona, addColumn, updateColumn, deleteColumn, updateAudience } = useAccountStore();
  
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  
  const [personaForm, setPersonaForm] = useState<AccountPersona>({
    id: '',
    name: '',
    description: '',
    style: '',
    createdAt: '',
    updatedAt: ''
  });
  
  const [columnForm, setColumnForm] = useState<ColumnDirection>({
    id: `col_${Date.now()}`,
    name: '',
    description: '',
    frequency: '',
    createdAt: new Date().toISOString().split('T')[0]
  });
  
  const [audienceForm, setAudienceForm] = useState<{
    id: string;
    ageRange: string;
    gender: string;
    interests: string[];
    description: string;
    newInterest: string;
  }>({
    id: '',
    ageRange: '',
    gender: '',
    interests: [],
    description: '',
    newInterest: ''
  });

  useEffect(() => {
    setPersonaForm({
      ...accountInfo.persona,
      updatedAt: new Date().toISOString().split('T')[0]
    });
  }, [accountInfo.persona, showPersonaModal]);

  useEffect(() => {
    if (!showColumnModal) {
      setIsEditingColumn(false);
    }
  }, [showColumnModal]);

  useEffect(() => {
    setAudienceForm({
      id: accountInfo.audience.id,
      ageRange: accountInfo.audience.ageRange,
      gender: accountInfo.audience.gender,
      interests: [...accountInfo.audience.interests],
      description: accountInfo.audience.description,
      newInterest: ''
    });
  }, [accountInfo.audience, showAudienceModal]);

  const handleSavePersona = () => {
    updatePersona(personaForm);
    setShowPersonaModal(false);
  };

  const handleSaveColumn = () => {
    if (!columnForm.name.trim()) {
      Taro.showToast({ title: '请输入栏目名称', icon: 'none' });
      return;
    }
    if (isEditingColumn) {
      updateColumn(columnForm);
    } else {
      addColumn({ ...columnForm, id: `col_${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] });
    }
    setShowColumnModal(false);
    setIsEditingColumn(false);
  };

  const handleSaveAudience = () => {
    const audience: TargetAudience = {
      id: audienceForm.id,
      ageRange: audienceForm.ageRange,
      gender: audienceForm.gender,
      interests: audienceForm.interests,
      description: audienceForm.description
    };
    updateAudience(audience);
    setShowAudienceModal(false);
  };

  const handleAddInterest = () => {
    if (audienceForm.newInterest.trim() && !audienceForm.interests.includes(audienceForm.newInterest)) {
      setAudienceForm(prev => ({
        ...prev,
        interests: [...prev.interests, prev.newInterest.trim()],
        newInterest: ''
      }));
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setAudienceForm(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleEditColumn = (column: ColumnDirection) => {
    setColumnForm({ ...column });
    setIsEditingColumn(true);
    setShowColumnModal(true);
  };

  const handleDeleteColumn = (columnId: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个栏目吗？',
      success: (res) => {
        if (res.confirm) {
          deleteColumn(columnId);
        }
      }
    });
  };

  const resetColumnForm = () => {
    setColumnForm({
      id: `col_${Date.now()}`,
      name: '',
      description: '',
      frequency: '',
      createdAt: new Date().toISOString().split('T')[0]
    });
    setIsEditingColumn(false);
  };

  const handleAddColumnClick = () => {
    resetColumnForm();
    setShowColumnModal(true);
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.accountName}>{accountInfo.accountName}</Text>
        <Text className={styles.platform}>{accountInfo.platform}</Text>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>账号人设</Text>
          <View className={styles.editBtn} onClick={() => setShowPersonaModal(true)}>
            <Text className={styles.editBtnText}>编辑</Text>
          </View>
        </View>
        <View className={styles.personaCard}>
          <Text className={styles.personaName}>{accountInfo.persona.name}</Text>
          <Text className={styles.personaDesc}>{accountInfo.persona.description}</Text>
          <Text className={styles.personaStyle}>风格：{accountInfo.persona.style}</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>栏目方向</Text>
          <View className={styles.editBtn} onClick={handleAddColumnClick}>
            <Text className={styles.editBtnText}>添加</Text>
          </View>
        </View>
        {accountInfo.columns.map((column) => (
          <View key={column.id} className={styles.columnCard}>
            <View className={styles.columnHeader}>
              <Text className={styles.columnName}>{column.name}</Text>
              <Text className={styles.columnFreq}>{column.frequency}</Text>
            </View>
            <Text className={styles.columnDesc}>{column.description}</Text>
            <View className={styles.columnActions}>
              <View className={`${styles.columnActionBtn} ${styles.columnActionEdit}`} onClick={() => handleEditColumn(column)}>
                <Text>编辑</Text>
              </View>
              <View className={`${styles.columnActionBtn} ${styles.columnActionDelete}`} onClick={() => handleDeleteColumn(column.id)}>
                <Text>删除</Text>
              </View>
            </View>
          </View>
        ))}
        <View className={styles.addBtn} onClick={handleAddColumnClick}>
          <Text className={styles.addBtnText}>+ 添加新栏目</Text>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>目标受众</Text>
          <View className={styles.editBtn} onClick={() => setShowAudienceModal(true)}>
            <Text className={styles.editBtnText}>编辑</Text>
          </View>
        </View>
        <View className={styles.audienceCard}>
          <View className={styles.audienceRow}>
            <Text className={styles.audienceLabel}>年龄范围</Text>
            <Text className={styles.audienceValue}>{accountInfo.audience.ageRange}</Text>
          </View>
          <View className={styles.audienceRow}>
            <Text className={styles.audienceLabel}>性别分布</Text>
            <Text className={styles.audienceValue}>{accountInfo.audience.gender}</Text>
          </View>
          <View className={styles.audienceRow}>
            <Text className={styles.audienceLabel}>兴趣标签</Text>
            <View className={styles.interestTags}>
              {accountInfo.audience.interests.map((interest, index) => (
                <Text key={index} className={styles.interestTag}>{interest}</Text>
              ))}
            </View>
          </View>
          <View className={styles.audienceRow}>
            <Text className={styles.audienceLabel}>受众描述</Text>
            <Text className={styles.audienceValue}>{accountInfo.audience.description}</Text>
          </View>
        </View>
      </View>

      <Modal
        visible={showPersonaModal}
        title="编辑账号人设"
        onClose={() => setShowPersonaModal(false)}
      >
        <View className={styles.modalContent}>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>人设名称</Text>
            <Input
              className={styles.formInput}
              value={personaForm.name}
              onChange={(e) => setPersonaForm(prev => ({ ...prev, name: e.detail.value }))}
              placeholder="请输入人设名称"
            />
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>人设描述</Text>
            <Textarea
              className={styles.formTextarea}
              value={personaForm.description}
              onChange={(e) => setPersonaForm(prev => ({ ...prev, description: e.detail.value }))}
              placeholder="请输入人设描述"
            />
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>内容风格</Text>
            <Input
              className={styles.formInput}
              value={personaForm.style}
              onChange={(e) => setPersonaForm(prev => ({ ...prev, style: e.detail.value }))}
              placeholder="请输入内容风格"
            />
          </View>
          <View className={styles.formActions}>
            <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowPersonaModal(false)}>
              <Text>取消</Text>
            </View>
            <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleSavePersona}>
              <Text>保存</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showColumnModal}
        title={isEditingColumn ? '编辑栏目' : '添加栏目'}
        onClose={() => setShowColumnModal(false)}
      >
        <View className={styles.modalContent}>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>栏目名称</Text>
            <Input
              className={styles.formInput}
              value={columnForm.name}
              onChange={(e) => setColumnForm(prev => ({ ...prev, name: e.detail.value }))}
              placeholder="请输入栏目名称"
            />
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>栏目描述</Text>
            <Textarea
              className={styles.formTextarea}
              value={columnForm.description}
              onChange={(e) => setColumnForm(prev => ({ ...prev, description: e.detail.value }))}
              placeholder="请输入栏目描述"
            />
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>更新频率</Text>
            <Input
              className={styles.formInput}
              value={columnForm.frequency}
              onChange={(e) => setColumnForm(prev => ({ ...prev, frequency: e.detail.value }))}
              placeholder="例如：每周2期"
            />
          </View>
          <View className={styles.formActions}>
            <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowColumnModal(false)}>
              <Text>取消</Text>
            </View>
            <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleSaveColumn}>
              <Text>保存</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAudienceModal}
        title="编辑目标受众"
        onClose={() => setShowAudienceModal(false)}
      >
        <View className={styles.modalContent}>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>年龄范围</Text>
            <Input
              className={styles.formInput}
              value={audienceForm.ageRange}
              onChange={(e) => setAudienceForm(prev => ({ ...prev, ageRange: e.detail.value }))}
              placeholder="例如：25-35岁"
            />
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>性别分布</Text>
            <Input
              className={styles.formInput}
              value={audienceForm.gender}
              onChange={(e) => setAudienceForm(prev => ({ ...prev, gender: e.detail.value }))}
              placeholder="例如：女性为主"
            />
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>兴趣标签</Text>
            <View className={styles.interestInputRow}>
              <Input
                className={styles.interestInput}
                value={audienceForm.newInterest}
                onChange={(e) => setAudienceForm(prev => ({ ...prev, newInterest: e.detail.value }))}
                placeholder="添加兴趣标签"
                onConfirm={handleAddInterest}
              />
              <View className={styles.addInterestBtn} onClick={handleAddInterest}>
                <Text>添加</Text>
              </View>
            </View>
            <View className={styles.selectedInterests}>
              {audienceForm.interests.map((interest, index) => (
                <View key={index} className={styles.selectedInterest}>
                  <Text>{interest}</Text>
                  <Text className={styles.removeInterest} onClick={() => handleRemoveInterest(interest)}>×</Text>
                </View>
              ))}
            </View>
          </View>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>受众描述</Text>
            <Textarea
              className={styles.formTextarea}
              value={audienceForm.description}
              onChange={(e) => setAudienceForm(prev => ({ ...prev, description: e.detail.value }))}
              placeholder="请输入受众描述"
            />
          </View>
          <View className={styles.formActions}>
            <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowAudienceModal(false)}>
              <Text>取消</Text>
            </View>
            <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleSaveAudience}>
              <Text>保存</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AccountPage;