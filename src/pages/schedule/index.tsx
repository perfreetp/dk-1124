import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useScheduleStore } from '../../store/scheduleStore';
import Modal from '../../components/Modal';

const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-06-14');
  const [showModal, setShowModal] = useState(false);
  const { tasks, getTasksByDate, getUpcomingDeadlines } = useScheduleStore();

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const upcomingDeadlines = getUpcomingDeadlines(3);

  const selectedTasks = getTasksByDate(selectedDate);

  const generateCalendarDays = () => {
    const days = [];
    const baseDate = new Date('2024-06-12');
    for (let i = 0; i < 14; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayTasks = tasks.filter(t => t.scheduledDate === dateStr);
      const hasDeadline = tasks.some(t => t.deadline === dateStr && t.status !== 'completed');
      const hasCompleted = dayTasks.some(t => t.status === 'completed');
      days.push({
        date: dateStr,
        day: currentDate.getDate(),
        hasTask: dayTasks.length > 0,
        hasDeadline,
        hasCompleted,
        isToday: dateStr === '2024-06-14'
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      filming: '拍摄',
      editing: '剪辑',
      publishing: '发布'
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: '待处理',
      in_progress: '进行中',
      completed: '已完成',
      cancelled: '已取消'
    };
    return labels[status] || status;
  };

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>拍摄排期</Text>
        <View className={styles.monthSelector}>
          <View className={styles.monthBtn}>
            <Text className={styles.monthBtnText}>〈</Text>
          </View>
          <Text className={styles.monthText}>2024年6月</Text>
          <View className={styles.monthBtn}>
            <Text className={styles.monthBtnText}>〉</Text>
          </View>
        </View>
      </View>

      {upcomingDeadlines.length > 0 && (
        <View className={styles.deadlineAlert}>
          <Text className={styles.alertTitle}>临近截止提醒</Text>
          <Text className={styles.alertContent}>
            {upcomingDeadlines.map(t => t.topicTitle).join('、')} 即将到期
          </Text>
        </View>
      )}

      <View className={styles.calendar}>
        <View className={styles.weekDays}>
          {weekDays.map((day) => (
            <Text key={day} className={styles.weekDay}>{day}</Text>
          ))}
        </View>
        <View className={styles.daysGrid}>
          {calendarDays.map((day) => (
            <View
              key={day.date}
              className={classnames(
                styles.dayCell,
                day.isToday && styles.dayCellToday,
                day.hasTask && !day.isToday && styles.dayCellHasTask,
                day.hasDeadline && !day.isToday && styles.dayCellDeadline
              )}
              onClick={() => setSelectedDate(day.date)}
            >
              <Text className={classnames(styles.dayNumber, day.isToday && styles.dayNumberToday)}>
                {day.day}
              </Text>
              {day.hasTask && (
                <View className={classnames(
                  styles.dayIndicator,
                  day.hasCompleted ? styles.indicatorCompleted : styles.indicatorTask,
                  day.hasDeadline && styles.indicatorDeadline
                )} />
              )}
            </View>
          ))}
        </View>
      </View>

      <View className={styles.selectedDate}>
        <View className={styles.selectedDateHeader}>
          <Text className={styles.selectedDateTitle}>{selectedDate}</Text>
          <View className={styles.addTaskBtn} onClick={() => setShowModal(true)}>
            <Text className={styles.addTaskBtnText}>+ 添加任务</Text>
          </View>
        </View>

        <View className={styles.taskList}>
          {selectedTasks.length > 0 ? (
            selectedTasks.map((task) => (
              <View key={task.id} className={styles.taskCard}>
                <View className={styles.taskHeader}>
                  <Text className={styles.taskTitle}>{task.topicTitle}</Text>
                  <View className={classnames(
                    styles.taskType,
                    task.type === 'filming' && styles.typeFilming,
                    task.type === 'editing' && styles.typeEditing,
                    task.type === 'publishing' && styles.typePublishing
                  )}>
                    <Text>{getTypeLabel(task.type)}</Text>
                  </View>
                </View>
                <View className={styles.taskMeta}>
                  <Text className={styles.taskMetaItem}>时间 {task.scheduledTime}</Text>
                  <Text className={styles.taskMetaItem}>负责人 {task.assignee}</Text>
                </View>
                <View className={styles.taskStatus}>
                  <View className={classnames(
                    styles.statusBadge,
                    task.status === 'pending' && styles.statusPending,
                    task.status === 'in_progress' && styles.statusInProgress,
                    task.status === 'completed' && styles.statusCompleted
                  )}>
                    <Text className={styles.statusText}>{getStatusLabel(task.status)}</Text>
                  </View>
                  {task.reminder && (
                    <Text className={styles.taskDeadline}>截止 {task.deadline}</Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View className={styles.emptyState}>
              <View className={styles.emptyIcon}>
                <Text className={styles.emptyIconText}>空</Text>
              </View>
              <Text className={styles.emptyTitle}>当天无任务安排</Text>
            </View>
          )}
        </View>
      </View>

      <Modal
        visible={showModal}
        title="添加排期任务"
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          <Text className={styles.modalHint}>任务添加功能开发中...</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SchedulePage;