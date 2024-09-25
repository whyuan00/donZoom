import {fonts} from '@/constants/font';
import {colors} from '@/constants/colors';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Octicons';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import NextIcon from 'react-native-vector-icons/MaterialIcons';

import PayIcon from '@/assets/pay.svg';
import Profile from '@/views/components/HomeProfile';
import {useState} from 'react';

function ParentsMainScreen() {
  const isParent = useState(true);
  const navigation = useNavigation() as any;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentsContainer}>
          <View style={styles.profileContainer}>
            <Profile name="사과" />
          </View>
          <View style={styles.moneyContainer}>
            <View style={styles.mypageContainer}>
              <TouchableOpacity
                style={styles.mypageAlarm}
                onPress={() => navigation.navigate('알림')}>
                <Icon name="bell-fill" size={16} style={styles.icon} />
                <Text style={styles.mypageText}>우리 아이 알림</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mypageSetting}
                onPress={() => navigation.navigate('설정')}>
                <SettingIcon name="settings" size={16} style={styles.icon} />
                <Text style={styles.mypageText}>우리 아이 설정</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.moneyTitleText}>김싸피(닉네임)님</Text>
              <View style={styles.moneyContentsContainer}>
                <View style={styles.moneyAccountContainer}>
                  <Text>
                    남은 금액
                    <Text style={styles.moneyText}>5,217원</Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AccountChildHistory')}>
                    <Text style={styles.moneyAccountText}>
                      우리 아이 소비 내역 조회
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>용돈 보내기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.missionContainer}
            onPress={() => navigation.navigate('Mission')}>
            <Text style={styles.missionTitleText}>
              미션내역
            </Text>
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
  mypageAlarm: {
    flexDirection: 'row',
  },
  mypageSetting: {
    flexDirection: 'row',
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
    height: 280,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  missionTitleText: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontSize: 20,
  },
});

export default ParentsMainScreen;
