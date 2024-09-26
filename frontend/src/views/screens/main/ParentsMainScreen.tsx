import {fonts} from '@/constants/font';
import {colors} from '@/constants/colors';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import NextIcon from 'react-native-vector-icons/MaterialIcons';

import Profile from '@/views/components/ParentsProfile';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const profiles = [
  {
    name: '사과',
    balance: '5,217',
    ongoingMissions: ['마트에서 두부 사오기'],
    completeMissions: ['마트에서 참치 사오기'],
  },
  {
    name: '바나나',
    balance: '3,112',
    ongoingMissions: ['마트에서 참치 사오기'],
    completeMissions: ['마트에서 우유 사오기'],
  },
  {
    name: '토마토',
    balance: '8,200',
    ongoingMissions: ['청소하기'],
    completeMissions: ['책읽기'],
  },
];

function ParentsMainScreen() {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [profileOrder, setProfileOrder] = useState(profiles);
  const navigation = useNavigation() as any;

  const animatedValues = profiles.map(() => new Animated.Value(0));
  const animatedXValues = profiles.map(() => new Animated.Value(0));

  useEffect(() => {
    setProfileOrder(profiles);
  }, []);

  const selectProfile = (index: number) => {
    const reorderProfiles = [
      profiles[index],
      ...profiles.slice(0, index),
      ...profiles.slice(index + 1),
    ];

    setProfileOrder(reorderProfiles);
    setSelectedProfileIndex(0);

    reorderProfiles.forEach((_, i) => {
      const xPosition = i * 50;
      Animated.timing(animatedXValues[i], {
        toValue: xPosition,
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(animatedValues[i], {
        toValue: i === 0 ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentsContainer}>
          <View style={styles.profileContainer}>
            {profileOrder.map((profile, index) => {
              const animatedStyle = {
                transform: [
                  {
                    translateX: animatedXValues[index],
                  },
                  {
                    scale: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
                zIndex: profiles.length - index,
              };
              // console.log(animatedStyle.zIndex, profile.name);

              return (
                <TouchableOpacity
                  key={profile.name}
                  onPress={() =>
                    selectProfile(
                      profiles.findIndex(p => p.name === profile.name),
                    )
                  }
                  style={styles.profileTouchable}>
                  <Animated.View
                    style={[animatedStyle, {zIndex: profiles.length - index}]}>
                    <Profile name={profile.name} />
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
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
              <Text style={styles.moneyTitleText}>
                <Text style={{fontSize: 30}}>{profileOrder[0].name}</Text>님
              </Text>
              <View style={styles.moneyContentsContainer}>
                <View style={styles.moneyAccountContainer}>
                  <View style={styles.balance}>
                    <Text style={styles.balanceText}>남은 금액</Text>
                    <Text style={styles.moneyText}>
                      {profileOrder[0].balance}원
                    </Text>
                  </View>
                  <View style={styles.accountText}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('거래내역 조회')
                      }>
                      <Text style={styles.moneyAccountText}>
                        우리 아이 소비 내역 조회
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.moneyAccountText}>ㅣ</Text>
                    <TouchableOpacity>
                      <Text style={styles.moneyAccountText}>용돈 보내기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.missionContainer}>
            <Text style={styles.missionTitleText}>미션내역</Text>
            <View>
              <Text style={styles.missionText}>진행 중인 미션 (2)</Text>
              <TouchableOpacity style={styles.missionBox}>
                <Text style={styles.ongoingMissionText}>
                  {profileOrder[0].ongoingMissions}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.missionText}>완료 요청 대기 (2)</Text>
              <TouchableOpacity style={styles.missionBox}>
                <Text style={styles.ongoingMissionText}>
                  {profileOrder[0].completeMissions}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate('부모미션')}>
              <Text style={styles.detailMission}>자세히 보기</Text>
              <NextIcon name="navigate-next" size={20} color={colors.BLACK} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.childSituation} onPress={()=>navigation.navigate('퀴즈')}>
              <Text style={styles.childSituationText}>
                <Text style={{fontFamily: fonts.BOLD, fontSize: 24}}>
                  {profileOrder[0].name}
                </Text>
                님의
              </Text>
              <Text style={styles.childSituationText}>퀴즈 현황</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.childSituation}>
              <Text style={styles.childSituationText}>
                <Text style={{fontFamily: fonts.BOLD, fontSize: 24}}>
                  {profileOrder[0].name}
                </Text>
                님의
              </Text>
              <Text style={styles.childSituationText}>모의투자 현황</Text>
            </TouchableOpacity>
          </View>
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
  profileContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  profileTouchable: {
    marginHorizontal: -12,
  },
  mypageContainer: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 28,
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
    height: 244,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_75,
    borderRadius: 10,
    padding: 30,
    marginBottom: 30,
  },
  moneyTitleText: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontSize: 24,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 6,
  },
  moneyContentsContainer: {
    width: 320,
    height: 110,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  moneyAccountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
  },
  balanceText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    marginBottom: 10,
    marginRight: 10,
  },
  moneyText: {
    fontSize: 28,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    marginBottom: 5,
  },
  accountText: {
    flexDirection: 'row',
    marginRight: 10,
  },
  moneyAccountText: {
    fontSize: 12,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    marginRight: 10,
  },
  missionContainer: {
    width: 360,
    height: 330,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  missionTitleText: {
    width: 300,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontSize: 24,
    marginBottom: 30,
  },
  missionText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 10,
  },
  missionBox: {
    width: 320,
    height: 60,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ongoingMissionText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 18,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  detailMission: {
    width: 310,
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  childSituation: {
    width: '48%',
    height: 100,
    backgroundColor: colors.YELLOW_50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childSituationText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
  },
});

export default ParentsMainScreen;
