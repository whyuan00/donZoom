import {colors} from '@/constants/colors';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import NextIcon from 'react-native-vector-icons/MaterialIcons';
import PayIcon from '@/assets/pay.svg';
import {fonts} from '@/constants/font';
import DrawMachine from '@/assets/voidDrawMachine.svg';
import Floor from '@/assets/longFloor.svg';

function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentsContainer}>
          <View style={styles.profileContainer}></View>
          <View style={styles.mypageContainer}>
            <Icon name="bell-fill" size={16} style={styles.icon} />
            <Text style={styles.mypageText}>알림</Text>

            <SettingIcon name="settings" size={16} style={styles.icon} />
            <Text style={styles.mypageText}>설정</Text>
          </View>
          <View style={styles.moneyContainer}>
            <View>
              <Text style={styles.moneyTitleText}>이번달 남은 용돈은</Text>
              <View style={styles.moneyContentsContainer}>
                <View style={styles.moneyAccountContainer}>
                  <Text style={styles.moneyText}>5,217원</Text>
                  <Text style={styles.moneyAccountText}>내 계좌 관리하기</Text>
                </View>
                <View style={styles.iconContainer}>
                  <NextIcon
                    name="navigate-next"
                    size={40}
                    color={colors.BLACK}
                  />
                </View>
                <View style={styles.payContainer}>
                  <PayIcon width={50} height={50} />
                  <Text style={styles.payText}>결제</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.missionContainer}>
            <Text style={styles.missionText}>오늘의 미션 수행하러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizContainer}>
            <Text style={styles.quizText}>금융 상식 UP! 머니 GET!</Text>
            <Text style={styles.quizText}>오늘의 퀴즈는?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawContainer}>
          <DrawMachine style={styles.machine} />
          <Floor style={styles.floor} />
          <TouchableOpacity style={styles.goDraw}>
            <Text style={styles.drawText}>머니로</Text>
            <Text style={styles.drawText}>뽑기하러</Text>
            <Text style={styles.drawText}>가기</Text>
            <Text style={styles.drawText}>{'>>>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  contentsContainer: {
    padding: 20,
  },
  profileContainer: {},
  mypageContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  mypageText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 13,
  },
  icon: {
    color: colors.BLACK,
    marginHorizontal: 5,
  },
  moneyContainer: {
    width: 360,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_75,
    borderRadius: 10,
    padding: 30,
    marginBottom: 20,
  },
  moneyTitleText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 28,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  moneyContentsContainer: {
    width: 300,
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  moneyAccountContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyText: {
    fontSize: 30,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    marginBottom: 5,
  },
  moneyAccountText: {
    fontSize: 12,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  iconContainer: {
    paddingBottom: 10,
  },
  payContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  payText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    marginTop: 3,
  },
  missionContainer: {
    width: 360,
    height: 96,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  missionText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
  },
  quizContainer: {
    width: 360,
    height: 96,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  quizText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
    margin: 2,
  },
  drawContainer: {
    width: '100%',
    height: 360,
  },
  machine: {
    position: 'relative',
    zIndex: 10,
    left: 32,
  },
  floor: {
    width: '100%',
    position: 'relative',
    top: -56,
  },
  goDraw: {
    width: 100,
    height: 140,
    position: 'relative',
    left: 260,
    top: -340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawText: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontSize: 18,
    margin: 2,
  },
});

export default HomeScreen;
