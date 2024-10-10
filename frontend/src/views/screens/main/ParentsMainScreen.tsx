import {fonts} from '@/constants/font';
import {colors} from '@/constants/colors';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Modal,
  RefreshControl,
} from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import NextIcon from 'react-native-vector-icons/MaterialIcons';

import Profile from '@/views/components/ParentsProfile';
import {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useAccountBalance from '@/hooks/useAccountInfo';

import useAuth from '@/hooks/queries/useAuth';
import SetRelationModal from '@/views/components/SetRelationModal';
import {useChildrenStore} from '@/stores/useChildrenStore';
import {Child} from '@/types/domain';
import useAccount from '@/hooks/queries/useAccount';
import {getChildrenAccount, getChildrenBalance} from '@/api/account';

interface ChildProfile {
  id: number;
  name: string;
  email: string;
  nickname: string;
  accountNumber: string;
  balance: number;
  ongoingMissions: string;
  completeMissions: string;
}
const childrenProfile: ChildProfile[] = [];
interface emailData {
  emailId: any;
  emailAddress: string;
}
function ParentsMainScreen() {
  const {myChildren} = useChildrenStore();
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [profileOrder, setProfileOrder] = useState(childrenProfile);
  const navigation = useNavigation() as any;
  const {account, balance, refetch} = useAccountBalance();
  const [isMyScreen, setIsMyScreen] = useState(true);
  const {getAccount} = useAccount();
  const [refreshing, setRefreshing] = useState(false);
  const {useGetChildrenAccountWithParams, useGetChildrenBalanceWithParams} =
    useAccount();
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // 아이 정보 가져오기
  useEffect(() => {
    refetch();
    console.log('myCHildren: ', myChildren);
    if (myChildren.length > 0) {
      console.log('myCHildren2: ', myChildren);
      const updatedChildren = myChildren.map((child, index) => ({
        ...child,
        accountNumber: '',
        balance: 0,
        ongoingMissions: '안녕1',
        completeMissions: '안녕2',
      }));
      setProfileOrder(updatedChildren);
    }
  }, [myChildren]);

  const animatedValues = profileOrder.map(() => new Animated.Value(0));
  const animatedXValues = profileOrder.map(() => new Animated.Value(0));

  // 해당 프로필로 정보 설정
  const selectProfile = async (index: number) => {
    setIsMyScreen(false);

    const selectedChild = profileOrder[index];

    try {
      const accountResult = await getChildrenAccount(selectedChild.email);
      const balanceResult = await getChildrenBalance(selectedChild.email);

      const updatedChild = {
        ...selectedChild,
        accountNumber: accountResult,
        balance: balanceResult,
      };

      const reorderProfiles = [
        updatedChild,
        ...profileOrder.slice(0, index),
        ...profileOrder.slice(index + 1),
      ];

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
      setProfileOrder(reorderProfiles);
      setSelectedChild(updatedChild);
    } catch (error) {
      console.error('Error fetching child data:', error);
    }

    setSelectedProfileIndex(0);
  };

  const {children, childAddMutation} = useAuth();
  // const { children: childrenProfile } = children 아이 프로필 불러오면됨
  const [modalVisible, setModalVisible] = useState(false);

  // 모달 닫기->아이 정보 추가
  const handleModalClose = (emails: string[]) => {
    setModalVisible(false);
    if (emails.length === 0) {
      return;
    }
    childAddMutation.mutate(emails, {
      onSuccess: () => {
        console.log('아이 이메일 전송 성공');
      },
    });
  };

  const viewMyScreen = () => {
    setIsMyScreen(true);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.profiles}>
          <TouchableOpacity
            style={styles.parentsProfileContainer}
            onPress={viewMyScreen}>
            <Profile name={'나'} />
          </TouchableOpacity>
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
                zIndex: profileOrder.length - index,
              };
              // console.log(animatedStyle.zIndex, profile.name);
              console.log('profile: ', profile);

              return (
                <TouchableOpacity
                  key={profile.id}
                  onPress={() =>
                    selectProfile(
                      profileOrder.findIndex(p => p.name === profile.name),
                    )
                  }
                  style={styles.profileTouchable}>
                  <Animated.View
                    style={[
                      animatedStyle,
                      {zIndex: profileOrder.length - index},
                    ]}>
                    <Profile name={profile.name} />
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
            {/* 아이 추가 모달 버튼*/}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{marginLeft: -8, marginTop: 3, zIndex: -1}}>
              <Profile />
            </TouchableOpacity>
            {/* 아이모달 */}
            <SetRelationModal
              visible={modalVisible}
              onClose={handleModalClose}
            />
          </View>
        </View>
        {isMyScreen ? (
          <View style={styles.contentsContainer}>
            <View style={styles.myMypageContainer}>
              <TouchableOpacity
                style={styles.mypageAlarm}
                onPress={() => navigation.navigate('알림')}>
                <Icon name="bell-fill" size={16} style={styles.icon} />
                <Text style={styles.mypageText}>알림</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mypageSetting}
                onPress={() => navigation.navigate('설정')}>
                <SettingIcon name="settings" size={16} style={styles.icon} />
                <Text style={styles.mypageText}>설정</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.myMoneyContainer}>
              {account !== '' ? (
                <View>
                  <Text style={styles.moneyTitleText}>계좌 잔액</Text>
                  <View style={styles.myMoneyContentsContainer}>
                    <View style={styles.moneyAccountContainer}>
                      <Text
                        style={styles.myMoneyText}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>{`${parseInt(
                        balance,
                      ).toLocaleString()}원`}</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('계좌관리')}>
                        <Text style={styles.myAccountText}>
                          내 계좌 관리하기
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity onPress={refresh}>
                    <Text>새로고침</Text>
                  </TouchableOpacity> */}
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('계좌개설')}
                  style={styles.initAccountButton}>
                  <Text style={styles.moneyAccountText2}>
                    아직 계좌가 없으시네요!
                  </Text>
                  <Text style={styles.moneyAccountText}>계좌 개설하기</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.myMissionContainer}
              onPress={() => navigation.navigate('아이미션')}>
              <Text style={styles.myMissionText}>
                <Text style={{fontFamily: fonts.BOLD}}>미션</Text> 생성하러 가기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quizContainer}
              onPress={() => navigation.navigate('퀴즈')}>
              <Text style={styles.quizText}>금융 상식 UP! 머니 GET!</Text>
              <Text style={styles.quizText}>
                오늘의 <Text style={{fontFamily: fonts.BOLD}}>퀴즈</Text>는?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quizContainer}
              onPress={() => navigation.navigate('모의투자')}>
              <Text style={styles.quizText}>나의 투자능력은?</Text>
              <Text style={styles.quizText}>
                <Text style={{fontFamily: fonts.BOLD}}>모의 투자</Text>로 Go!
                Go!
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentsContainer}>
            {profileOrder.length > 0 && (
              <>
                <View style={styles.moneyContainer}>
                  {/* <View style={styles.mypageContainer}>
                    <TouchableOpacity
                      style={styles.mypageAlarm}
                      onPress={() => navigation.navigate('알림')}>
                      <Icon name="bell-fill" size={16} style={styles.icon} />
                      <Text style={styles.mypageText}>우리 아이 알림</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.mypageSetting}.
                      onPress={() => navigation.navigate('설정')}>
                      <SettingIcon
                        name="settings"
                        size={16}
                        style={styles.icon}
                      />
                      <Text style={styles.mypageText}>우리 아이 설정</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View>
                    <Text style={styles.moneyTitleText}>
                      <Text style={{fontSize: 30}}>{profileOrder[0].name}</Text>
                      님
                    </Text>
                    <View style={styles.moneyContentsContainer}>
                      <View style={styles.moneyAccountContainer}>
                        <View style={styles.balance}>
                          <Text style={styles.balanceText}>남은 금액</Text>
                          <Text style={styles.moneyText}>
                            {profileOrder[0]?.balance.toLocaleString()}원
                          </Text>
                        </View>
                        <View style={styles.accountText}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('계좌관리')}>
                            <Text style={styles.moneyAccountText}>
                              우리 아이 소비 내역 조회
                            </Text>
                          </TouchableOpacity>
                          <Text style={styles.moneyAccountText}>ㅣ</Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('송금', {
                                accountNo: profileOrder[0].accountNumber,
                              })
                            }>
                            <Text style={styles.moneyAccountText}>
                              용돈 보내기
                            </Text>
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
                    <NextIcon
                      name="navigate-next"
                      size={20}
                      color={colors.BLACK}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.childSituation}
                    onPress={() => navigation.navigate('퀴즈')}>
                    <Text style={styles.childSituationText}>
                      <Text style={{fontFamily: fonts.BOLD, fontSize: 24}}>
                        {profileOrder[0].name}
                      </Text>
                      님의
                    </Text>
                    <Text style={styles.childSituationText}>퀴즈 현황</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('모의투자')}
                    style={styles.childSituation}>
                    <Text style={styles.childSituationText}>
                      <Text style={{fontFamily: fonts.BOLD, fontSize: 24}}>
                        {profileOrder[0].name}
                      </Text>
                      님의
                    </Text>
                    <Text style={styles.childSituationText}>모의투자 현황</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profiles: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  contentsContainer: {
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  parentsProfileContainer: {
    marginRight: 20,
  },
  profileTouchable: {
    marginHorizontal: -15,
  },
  myMypageContainer: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  mypageContainer: {
    width: 320,
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
  myMoneyContainer: {
    width: 340,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_75,
    borderRadius: 10,
    padding: 30,
    marginBottom: 30,
  },
  moneyContainer: {
    width: 340,
    height: 190,
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
  myMoneyContentsContainer: {
    width: 300,
    height: 90,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  moneyContentsContainer: {
    width: 300,
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
  myMoneyText: {
    fontSize: 28,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    marginBottom: 5,
    marginRight: 12,
  },
  myAccountText: {
    color: colors.BLACK,
    marginRight: 14,
    fontFamily: fonts.MEDIUM,
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
  myMissionContainer: {
    width: 340,
    height: 96,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  missionContainer: {
    width: 340,
    height: 310,
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
  myMissionText: {
    marginBottom: 6,
    marginLeft: 10,
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
    margin: 2,
  },
  missionText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 10,
  },
  missionBox: {
    width: 300,
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
    width: 300,
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
  input: {
    fontFamily: fonts.LIGHT,
    fontSize: 14,
    borderBottomColor: colors.GRAY_50,
    borderBottomWidth: 1,
    width: 215,
  },
  modalOverlay: {
    flex: 1,
    paddingTop: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  modalContainer: {
    width: 350,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '68%',
    marginTop: 10,
  },
  emailBox: {
    flex: 1,
    backgroundColor: colors.GRAY_25,
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 5,
    paddingLeft: 5,
  },
  emailText: {
    fontSize: 12,
    fontFamily: fonts.LIGHT,
    color: colors.BLACK,
    textAlign: 'left',
  },
  textButton: {
    fontFamily: fonts.LIGHT,
    fontSize: 10,
    color: colors.BLACK,
  },
  quizContainer: {
    width: 340,
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
  initAccountButton: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moneyAccountText2: {
    fontSize: 20,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
  },
});

export default ParentsMainScreen;
