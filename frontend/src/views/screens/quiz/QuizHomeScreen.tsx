import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CustomCalendar from '@/views/components/CustomCalendar';

function QuizHomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.todayContainer}>
          <View style={styles.todayTextContainer}>
            <Text style={styles.todayTitle}>오늘의 퀴즈</Text>
            <Text style={styles.todayDescription}>
              오늘의 퀴즈를 풀고 모의투자 시드머니를 얻어보세요!
            </Text>
          </View>
          <View style={styles.todayContentBox}>
            <View style={styles.todayContentText}>
              <Text style={styles.todayContentTitle}>
                새로운 퀴즈가 도착했어요!
              </Text>
              <Text style={styles.todayContentDescription}>
                3문제 약 3분 소요
              </Text>
            </View>
            <TouchableOpacity style={styles.todayContentButton}>
              <Text style={styles.todayContentButtonText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.reviewTextContainer}>
            <Text style={styles.reviewTitle}>퀴즈 다시풀기</Text>
            <Text style={styles.reviewDescription}>
              풀었던 퀴즈를 다시 풀면서 나의 경제 지식을 점검해보세요!
            </Text>
          </View>
          <View style={styles.reviewContentContainer}>
            <View style={styles.reviewContentsBox}>
              <View style={styles.reviewContentText}>
                <Text style={styles.reviewContentTitle}>기본 경제 개념</Text>
                <Text style={styles.reviewContentDescription}>
                  3문제 약 3분 소요
                </Text>
              </View>
              <TouchableOpacity style={styles.reviewContentButton}>
                <Text style={styles.reviewContentButtonText}>다시풀기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewContentsBox}>
              <View style={styles.reviewContentText}>
                <Text style={styles.reviewContentTitle}>기본 경제 개념</Text>
                <Text style={styles.reviewContentDescription}>
                  3문제 약 3분 소요
                </Text>
              </View>
              <TouchableOpacity style={styles.reviewContentButton}>
                <Text style={styles.reviewContentButtonText}>다시풀기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.reviewContentsBox}>
              <View style={styles.reviewContentText}>
                <Text style={styles.reviewContentTitle}>기본 경제 개념</Text>
                <Text style={styles.reviewContentDescription}>
                  3문제 약 3분 소요
                </Text>
              </View>
              <TouchableOpacity style={styles.reviewContentButton}>
                <Text style={styles.reviewContentButtonText}>다시풀기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarTextContainer}>
            <Text style={styles.calendarTitle}>퀴즈 달력</Text>
            <Text style={styles.calendarDescription}>
              3일 연속 퀴즈를 풀었어요!
            </Text>
          </View>
          <View style={styles.calendar}></View>
          <CustomCalendar></CustomCalendar>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  todayContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  todayTextContainer: {
    marginBottom: 20,
  },
  todayTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    marginBottom: 6,
  },
  todayDescription: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_75,
  },
  todayContentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    height: 80,
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  todayContentText: {},
  todayContentTitle: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 15,
    marginBottom: 5,
  },
  todayContentDescription: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_50,
  },
  todayContentButton: {
    width: 92,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_100,
  },
  todayContentButtonText: {
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    fontSize: 15,
  },
  reviewContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  reviewTextContainer: {
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    marginBottom: 6,
  },
  reviewDescription: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_75,
  },
  reviewContentContainer: {},
  reviewContentsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    height: 80,
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  reviewContentText: {},
  reviewContentTitle: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 15,
    marginBottom: 5,
  },
  reviewContentDescription: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_50,
  },
  reviewContentButton: {
    width: 92,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_100,
  },
  reviewContentButtonText: {
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    fontSize: 15,
  },
  calendarContainer: {},
  calendarTextContainer: {
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    marginBottom: 6,
  },
  calendarDescription: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_75,
  },
  calendar: {},
});

export default QuizHomeScreen;
