import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface DatePickerProps {
  visible: boolean;
  type: 'date' | 'datetime';
  value: string;
  minDate?: string;
  maxDate?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  visible,
  type,
  value,
  minDate,
  maxDate,
  onConfirm,
  onCancel
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());
  const [selectedTime, setSelectedTime] = useState(() => {
    const time = value.split(' ')[1] || '10:00';
    const [hours, minutes] = time.split(':');
    return { hours: parseInt(hours), minutes: parseInt(minutes) };
  });

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value.split(' ')[0]));
      const time = value.split(' ')[1];
      if (time) {
        const [hours, minutes] = time.split(':');
        setSelectedTime({ hours: parseInt(hours), minutes: parseInt(minutes) });
      }
    }
  }, [value, visible]);

  if (!visible) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const selectedDateStr = selectedDate.toISOString().split('T')[0];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPadding = firstDay.getDay();

  const days = [];
  for (let i = startPadding - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({ date, isCurrentMonth: false });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({ date, isCurrentMonth: true });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i);
    days.push({ date, isCurrentMonth: false });
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const isDisabled = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    return false;
  };

  const handleConfirm = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    if (type === 'date') {
      onConfirm(dateStr);
    } else {
      const timeStr = `${String(selectedTime.hours).padStart(2, '0')}:${String(selectedTime.minutes).padStart(2, '0')}`;
      onConfirm(`${dateStr} ${timeStr}`);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <>
      <View className={styles.mask} onClick={onCancel} />
      <View className={styles.pickerPanel}>
        <View className={styles.pickerHeader}>
          <Text className={classnames(styles.pickerBtn, styles.pickerCancel)} onClick={onCancel}>取消</Text>
          <Text className={styles.pickerTitle}>{type === 'date' ? '选择日期' : '选择日期时间'}</Text>
          <Text className={styles.pickerBtn} onClick={handleConfirm}>确定</Text>
        </View>

        <View className={styles.navRow}>
          <View className={styles.navBtn} onClick={prevMonth}>
            <Text className={styles.navBtnText}>‹</Text>
          </View>
          <Text className={styles.monthYearText}>{year}年{month + 1}月</Text>
          <View className={styles.navBtn} onClick={nextMonth}>
            <Text className={styles.navBtnText}>›</Text>
          </View>
        </View>

        <View className={styles.weekDayRow}>
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <Text key={day} className={styles.weekDayCell}>{day}</Text>
          ))}
        </View>

        <View className={styles.dateGrid}>
          {days.map(({ date, isCurrentMonth }) => {
            const dateStr = date.toISOString().split('T')[0];
            const disabled = isDisabled(date);
            return (
              <View
                key={dateStr}
                className={classnames(
                  styles.dateCell,
                  !isCurrentMonth && styles.otherMonth,
                  dateStr === todayStr && !disabled && styles.today,
                  dateStr === selectedDateStr && styles.selected,
                  disabled && styles.disabled
                )}
                onClick={() => !disabled && selectDate(date)}
              >
                <Text>{date.getDate()}</Text>
              </View>
            );
          })}
        </View>

        {type === 'datetime' && (
          <View className={styles.timePicker}>
            <View className={styles.timeSelect}>
              <Text>{String(selectedTime.hours).padStart(2, '0')}</Text>
            </View>
            <Text className={styles.timeSeparator}>:</Text>
            <View className={styles.timeSelect}>
              <Text>{String(selectedTime.minutes).padStart(2, '0')}</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default DatePicker;