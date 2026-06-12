import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Input, Textarea } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useScheduleStore } from '../../store/scheduleStore';
import { useTopicStore } from '../../store/topicStore';
import Modal from '../../components/Modal';
import DatePicker from '../../components/DatePicker';
import { ScheduleTask, PriorityLevel, TaskStatus } from '../../types';

type ModalType = 'create' | 'edit';

const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('create');
  const [selectedTask, setSelectedTask] = useState<ScheduleTask | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState<'date' | 'datetime'>('datetime');
  const [datePickerField, setDatePickerField] = useState<'scheduled' | 'deadline'>('scheduled');

  const { tasks, addTask, updateTask, deleteTask, getTasksByDate } = useScheduleStore();
  const { topics } = useTopicStore();

  const [taskForm, setTaskForm] = useState<{
    title: string;
    description: string;
    scheduledDate: string;
    scheduledTime: string;
    priority: PriorityLevel;
    status: TaskStatus;
    assignee: string;
    topicId: string;
    reminder: boolean;
    deadline: string;
  }>({
    title: '',
    description: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '10:00',
    priority: 'medium',
    status: 'pending',
    assignee: '',
    topicId: '',
    reminder: true,
    deadline: new Date().toISOString().split('T')[0]
  });

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const priorityLabels: Record<PriorityLevel, string> = {
    high: '高',
    medium: '中',
    low: '低'
  };
  const statusLabels: Record<TaskStatus, string> = {
    pending: '待开始',
    inProgress: '进行中',
    completed: '已完成',
    cancelled: '已取消'
  };

  const today = new Date();
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];
  const filteredTasks = getTasksByDate(selectedDateStr);

  useEffect(() => {
    if (selectedTask && modalType === 'edit') {
      setTaskForm({
        title: selectedTask.title,
        description: selectedTask.description,
        scheduledDate: selectedTask.scheduledDate,
        scheduledTime: selectedTask.scheduledTime,
        priority: selectedTask.priority || 'medium',
        status: selectedTask.status,
        assignee: selectedTask.assignee,
        topicId: selectedTask.topicId,
        reminder: selectedTask.reminder,
        deadline: selectedTask.deadline
      });
    }
  }, [selectedTask, modalType]);

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay();
    
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.toISOString().split('T')[0] === todayStr,
        isSelected: date.toISOString().split('T')[0] === selectedDateStr,
        hasTask: tasks.some(t => t.scheduledDate === date.toISOString().split('T')[0])
      });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toISOString().split('T')[0] === todayStr,
        isSelected: date.toISOString().split('T')[0] === selectedDateStr,
        hasTask: tasks.some(t => t.scheduledDate === date.toISOString().split('T')[0])
      });
    }
    
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: date.toISOString().split('T')[0] === todayStr,
        isSelected: date.toISOString().split('T')[0] === selectedDateStr,
        hasTask: tasks.some(t => t.scheduledDate === date.toISOString().split('T')[0])
      });
    }
    
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const openCreateModal = () => {
    setModalType('create');
    const now = new Date();
    setTaskForm({
      title: '',
      description: '',
      scheduledDate: now.toISOString().split('T')[0],
      scheduledTime: '10:00',
      priority: 'medium',
      status: 'pending',
      assignee: '',
      topicId: '',
      reminder: true,
      deadline: now.toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const openEditModal = (task: ScheduleTask) => {
    setSelectedTask(task);
    setModalType('edit');
    setShowModal(true);
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) {
      Taro.showToast({ title: '请输入任务标题', icon: 'none' });
      return;
    }

    if (modalType === 'create') {
      const newTask: ScheduleTask = {
        id: `task_${Date.now()}`,
        title: taskForm.title,
        description: taskForm.description,
        scheduledDate: taskForm.scheduledDate,
        scheduledTime: taskForm.scheduledTime,
        priority: taskForm.priority,
        status: taskForm.status,
        assignee: taskForm.assignee || '未分配',
        topicId: taskForm.topicId,
        type: 'filming',
        notes: '',
        reminder: taskForm.reminder,
        deadline: taskForm.deadline,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addTask(newTask);
      Taro.showToast({ title: '创建成功', icon: 'success' });
    } else if (modalType === 'edit' && selectedTask) {
      const updatedTask: ScheduleTask = {
        ...selectedTask,
        title: taskForm.title,
        description: taskForm.description,
        scheduledDate: taskForm.scheduledDate,
        scheduledTime: taskForm.scheduledTime,
        priority: taskForm.priority,
        status: taskForm.status,
        assignee: taskForm.assignee || '未分配',
        topicId: taskForm.topicId,
        reminder: taskForm.reminder,
        deadline: taskForm.deadline
      };
      updateTask(updatedTask);
      Taro.showToast({ title: '更新成功', icon: 'success' });
    }

    setShowModal(false);
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个任务吗？',
      success: (res) => {
        if (res.confirm && selectedTask) {
          deleteTask(selectedTask.id);
          setShowModal(false);
          Taro.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  };

  const openDatePicker = (field: 'scheduled' | 'deadline') => {
    setDatePickerField(field);
    setDatePickerType(field === 'scheduled' ? 'datetime' : 'date');
    setShowDatePicker(true);
  };

  const handleDateConfirm = (value: string) => {
    if (datePickerField === 'scheduled') {
      const [date, time] = value.split(' ');
      setTaskForm(prev => ({
        ...prev,
        scheduledDate: date,
        scheduledTime: time || prev.scheduledTime
      }));
    } else {
      setTaskForm(prev => ({ ...prev, deadline: value }));
    }
    setShowDatePicker(false);
  };

  const isUrgent = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 1 && deadlineDate >= today;
  };

  const calendarDays = getCalendarDays();

  return (
    <ScrollView scrollY className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>拍摄排期</Text>
        <View className={styles.addBtn} onClick={openCreateModal}>
          <Text className={styles.addBtnText}>+ 新任务</Text>
        </View>
      </View>

      <View className={styles.calendarSection}>
        <View className={styles.calendarHeader}>
          <View className={styles.calendarNav}>
            <View className={styles.navBtn} onClick={prevMonth}>
              <Text className={styles.navBtnText}>‹</Text>
            </View>
            <Text className={styles.monthYear}>
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </Text>
            <View className={styles.navBtn} onClick={nextMonth}>
              <Text className={styles.navBtnText}>›</Text>
            </View>
          </View>
        </View>
        <View className={styles.weekDays}>
          {weekDays.map((day) => (
            <Text key={day} className={styles.weekDay}>{day}</Text>
          ))}
        </View>
        <View className={styles.calendarGrid}>
          {calendarDays.map((day) => (
            <View
              key={day.date.toISOString()}
              className={classnames(
                styles.calendarDay,
                !day.isCurrentMonth && styles.otherMonth,
                day.isToday && styles.today,
                day.isSelected && styles.selected,
                day.hasTask && styles.hasTask
              )}
              onClick={() => selectDate(day.date)}
            >
              <Text>{day.date.getDate()}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.taskListSection}>
        <Text className={styles.sectionTitle}>
          {selectedDateStr === todayStr ? '今日任务' : `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日任务`}
        </Text>
        
        {filteredTasks.length > 0 ? (
          <View className={styles.taskList}>
            {filteredTasks.map((task) => {
              const topic = topics.find(t => t.id === task.topicId);
              return (
                <View
                  key={task.id}
                  className={classnames(
                    styles.taskCard,
                    `taskCard${task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}`
                  )}
                >
                  <View className={styles.taskHeader}>
                    <Text className={styles.taskTitle}>{task.title}</Text>
                    <Text className={classnames(styles.taskPriority, `priority${task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'Medium'}`)}>
                      {priorityLabels[task.priority || 'medium']}
                    </Text>
                  </View>
                  <View className={styles.taskMeta}>
                    <Text className={classnames(styles.taskDeadline, isUrgent(task.deadline) && styles.taskDeadlineUrgent)}>
                      📅 {task.scheduledDate} {task.scheduledTime}
                    </Text>
                    <Text className={styles.taskAssignee}>👤 {task.assignee}</Text>
                    {topic && (
                      <Text className={styles.taskTopic}>📝 {topic.selectedTitle}</Text>
                    )}
                    <Text className={classnames(styles.taskStatus, `status${task.status.charAt(0).toUpperCase() + task.status.slice(1)}`)}>
                      {statusLabels[task.status]}
                    </Text>
                  </View>
                  {task.description && (
                    <Text className={styles.taskDesc}>{task.description}</Text>
                  )}
                  <View className={styles.taskActions}>
                    <View className={styles.taskActionBtn + ' ' + styles.taskActionEdit} onClick={() => openEditModal(task)}>
                      <Text>编辑</Text>
                    </View>
                    <View className={styles.taskActionBtn + ' ' + styles.taskActionDelete} onClick={() => { setSelectedTask(task); handleDeleteTask(); }}>
                      <Text>删除</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View className={styles.emptyState}>
            <View className={styles.emptyIcon}>
              <Text className={styles.emptyIconText}>空</Text>
            </View>
            <Text className={styles.emptyTitle}>暂无任务</Text>
            <Text className={styles.emptyDesc}>点击上方按钮添加排期任务</Text>
          </View>
        )}
      </View>

      <Modal
        visible={showModal}
        title={modalType === 'create' ? '添加排期任务' : '编辑任务'}
        onClose={() => setShowModal(false)}
      >
        <View className={styles.modalContent}>
          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>任务标题</Text>
            <Input
              className={styles.formInput}
              value={taskForm.title}
              onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.detail.value }))}
              placeholder="输入任务标题"
            />
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>任务描述</Text>
            <Textarea
              className={styles.formTextarea}
              value={taskForm.description}
              onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.detail.value }))}
              placeholder="输入任务描述"
            />
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>排期日期时间</Text>
            <View className={styles.datePicker} onClick={() => openDatePicker('scheduled')}>
              <Text>{taskForm.scheduledDate} {taskForm.scheduledTime}</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>优先级</Text>
            <View className={styles.priorityOptions}>
              {(['high', 'medium', 'low'] as PriorityLevel[]).map((level) => (
                <View
                  key={level}
                  className={classnames(styles.priorityOption, level, taskForm.priority === level && styles.active)}
                  onClick={() => setTaskForm(prev => ({ ...prev, priority: level }))}
                >
                  <Text>{priorityLabels[level]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>任务状态</Text>
            <View className={styles.statusOptions}>
              {(['pending', 'inProgress', 'completed', 'cancelled'] as TaskStatus[]).map((status) => (
                <View
                  key={status}
                  className={classnames(styles.statusOption, taskForm.status === status && styles.active)}
                  onClick={() => setTaskForm(prev => ({ ...prev, status }))}
                >
                  <Text>{statusLabels[status]}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>负责人</Text>
            <Input
              className={styles.formInput}
              value={taskForm.assignee}
              onChange={(e) => setTaskForm(prev => ({ ...prev, assignee: e.detail.value }))}
              placeholder="输入负责人姓名"
            />
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>关联选题</Text>
            <View className={styles.topicDropdown}>
              <Text>{taskForm.topicId ? topics.find(t => t.id === taskForm.topicId)?.selectedTitle || '选择选题' : '选择选题'}</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <Text className={styles.formLabel}>截止日期</Text>
            <View className={styles.datePicker} onClick={() => openDatePicker('deadline')}>
              <Text>{taskForm.deadline}</Text>
            </View>
          </View>

          <View className={styles.formGroup}>
            <View className={styles.notificationToggle} onClick={() => setTaskForm(prev => ({ ...prev, reminder: !prev.reminder }))}>
              <Text className={styles.toggleLabel}>截止提醒</Text>
              <View className={classnames(styles.toggleSwitch, taskForm.reminder && styles.active)}>
                <View className={classnames(styles.toggleThumb, taskForm.reminder && styles.active)} />
              </View>
            </View>
          </View>

          <View className={styles.formActions}>
            <View className={`${styles.formBtn} ${styles.formBtnSecondary}`} onClick={() => setShowModal(false)}>
              <Text>取消</Text>
            </View>
            <View className={`${styles.formBtn} ${styles.formBtnPrimary}`} onClick={handleSaveTask}>
              <Text>{modalType === 'create' ? '创建' : '保存'}</Text>
            </View>
          </View>
        </View>
      </Modal>

      <DatePicker
        visible={showDatePicker}
        type={datePickerType}
        value={datePickerField === 'scheduled' ? `${taskForm.scheduledDate} ${taskForm.scheduledTime}` : taskForm.deadline}
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
    </ScrollView>
  );
};

export default SchedulePage;