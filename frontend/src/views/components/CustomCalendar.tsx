import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {colors} from '@/constants/colors';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'fr';

const CustomCalendar = ({selectedDate, onDateSelect}) => {
  const handleDayPress = day => {
    onDateSelect(day.dateString);
  };

  const markedDates = selectedDate
    ? {
        [selectedDate]: {selected: true, selectedColor: colors.BLUE_100},
      }
    : {};

  return (
    <View>
      <Calendar
        style={styles.container}
        monthFormat={'yyyy년 MM월'}
        disableArrowLeft={true}
        enableSwipeMonths={true}
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 300,
  },
});

export default CustomCalendar;
