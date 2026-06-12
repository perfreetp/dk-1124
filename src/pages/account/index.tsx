import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import styles from './index.module.scss';
import { useAccountStore } from '../../store/accountStore';
import Modal from '../../components/Modal';

const AccountPage: React.FC = () => {
  const { accountInfo, updatePersona, addColumn, deleteColumn, updateAudience } = useAccountStore();
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);

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
          <View className={styles.editBtn} onClick={() => setShowColumnModal(true)}>
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
          </View>
        ))}
        <View className={styles.addBtn} onClick={() => setShowColumnModal(true)}>
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
          <Text className={styles.modalHint}>人设编辑功能开发中...</Text>
        </View>
      </Modal>

      <Modal
        visible={showColumnModal}
        title="添加栏目"
        onClose={() => setShowColumnModal(false)}
      >
        <View className={styles.modalContent}>
          <Text className={styles.modalHint}>栏目添加功能开发中...</Text>
        </View>
      </Modal>

      <Modal
        visible={showAudienceModal}
        title="编辑目标受众"
        onClose={() => setShowAudienceModal(false)}
      >
        <View className={styles.modalContent}>
          <Text className={styles.modalHint}>受众编辑功能开发中...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AccountPage;