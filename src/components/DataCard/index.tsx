import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface DataCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  highlight?: boolean;
}

const trendIcons: Record<string, string> = {
  up: '↑',
  down: '↓',
  stable: '→'
};

const trendColors: Record<string, string> = {
  up: styles.trendUp,
  down: styles.trendDown,
  stable: styles.trendStable
};

const DataCard: React.FC<DataCardProps> = ({
  label,
  value,
  unit,
  trend,
  highlight
}) => {
  return (
    <View className={styles.container}>
      <Text className={styles.label}>{label}</Text>
      <View className={styles.valueRow}>
        <Text className={highlight ? styles.valueHighlight : styles.value}>
          {value}
        </Text>
        {unit && <Text className={styles.unit}>{unit}</Text>}
        {trend && (
          <View className={trendColors[trend]}>
            <Text className={styles.trendIcon}>{trendIcons[trend]}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DataCard;