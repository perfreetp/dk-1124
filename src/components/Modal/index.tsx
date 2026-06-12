import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  onClose,
  children
}) => {
  if (!visible) return null;

  return (
    <View className={styles.overlay} onClick={onClose}>
      <View className={styles.container} onClick={(e) => e.stopPropagation()}>
        <View className={styles.header}>
          <Text className={styles.title}>{title}</Text>
          <View className={styles.closeBtn} onClick={onClose}>
            <Text className={styles.closeText}>×</Text>
          </View>
        </View>
        <View className={styles.content}>
          {children}
        </View>
      </View>
    </View>
  );
};

export default Modal;