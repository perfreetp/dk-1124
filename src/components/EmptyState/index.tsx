import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <View className={styles.container}>
      <View className={styles.iconWrapper}>
        <Text className={styles.iconText}>空</Text>
      </View>
      <Text className={styles.title}>{title}</Text>
      {description && (
        <Text className={styles.description}>{description}</Text>
      )}
      {actionText && onAction && (
        <View className={styles.actionButton} onClick={onAction}>
          <Text className={styles.actionText}>{actionText}</Text>
        </View>
      )}
    </View>
  );
};

export default EmptyState;