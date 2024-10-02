import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useAuth from '@/hooks/queries/useAuth';
import useSignupForm from '@/hooks/useSignupForm';
import useLogout from '@/stores/useLogout';
import usePasswordStore from '@/stores/usePasswordStore';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import NextIcon from 'react-native-vector-icons/MaterialIcons';

function MyInformationScreen() {
  const navigation = useNavigation() as any;
  const [isParents] = useState(true);
  const logout = useLogout();
  const {logoutMutation} = useAuth();
  const {reset: signupReset} = useSignupForm();
  const {reset: passwordReset} = usePasswordStore();

  return (
    <ScrollView>
      <View style={styles.container}>
        {isParents && (
          <>
            <View style={styles.menuContainer}>
              <View style={styles.inquireAutoTransferHeaderContainer}>
                <Text style={styles.cardTitle}>자동 이체 등록</Text>
                <Text style={styles.cardSubtitle}>
                  등록된 계좌로 우리 아이들 용돈이 자동이체 됩니다.
                </Text>
              </View>
              <View style={styles.autoTransferAccountInfoContainer}>
                <Text style={styles.autoTransferInnerText}>
                  현재 등록된 계좌가 없습니다.
                </Text>
                <Text style={styles.autoTransferInnerText}>
                  (최대 2개 등록 가능)
                </Text>
              </View>
              <TouchableOpacity style={styles.inquireAutoTransferTextContainer}>
                <Text style={styles.inquireAccountText}>계좌 등록하기</Text>
                <NextIcon name="navigate-next" size={20} color={colors.BLACK} />
              </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
              <View style={styles.childInfoHeaderContainer}>
                <Text style={styles.cardTitle}>등록된 아이 정보</Text>
              </View>
              <View style={styles.childInfoContainer}>
                <View style={styles.childInfoDetailContainer}>
                  <Image
                    source={require('@/assets/images/characterImage.webp')}
                    style={styles.image}
                  />
                  <Text style={styles.childInfoText}>김싸피(닉네임)</Text>
                </View>
                <View style={styles.childInfoManageContainer}>
                  <TouchableOpacity>
                    <Text style={styles.manageText}>관리</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.deleteText}>삭제</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
        <View style={styles.alarmMenuContainer}>
          <View style={styles.securityHeaderContainer}>
            <Text style={styles.cardTitle}>QR코드 생성</Text>
          </View>
          <TouchableOpacity
            style={styles.securityMenuContainer}
            onPress={() => navigation.navigate('QR 생성')}>
            <Text style={styles.securityMenuText}>QR 생성</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alarmMenuContainer}>
          <View style={styles.securityHeaderContainer}>
            <Text style={styles.cardTitle}>인증/보안</Text>
          </View>
          <TouchableOpacity
            style={styles.securityMenuContainer}
            onPress={() => navigation.navigate('보안 설정')}>
            <Text style={styles.securityMenuText}>보안 설정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alarmMenuContainer}>
          <View style={styles.securityHeaderContainer}>
            <Text style={styles.cardTitle}>알림 설정</Text>
          </View>
          <TouchableOpacity
            style={styles.alarmMenuTextContainer}
            onPress={() => navigation.navigate('알림 설정')}>
            <Text style={styles.alarmMenuText}>알림 설정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alarmMenuContainer}>
          <View style={styles.securityHeaderContainer}>
            <Text style={styles.cardTitle}>로그아웃</Text>
          </View>
          <TouchableOpacity
            style={styles.alarmMenuTextContainer}
            onPress={() => {
              logoutMutation.mutate(null);
              signupReset();
              passwordReset();
            }}>
            <Text style={styles.alarmMenuText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  menuContainer: {
    backgroundColor: colors.YELLOW_50,
    width: 360,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  alarmMenuContainer: {
    backgroundColor: colors.YELLOW_50,
    width: 360,
    height: 140,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontSize: 20,
    marginTop: 20,
  },
  cardSubtitle: {
    color: colors.GRAY_75,
    marginTop: 6,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
  },
  inquireAutoTransferHeaderContainer: {
    width: 312,
    marginBottom: 16,
  },
  autoTransferAccountInfoContainer: {
    width: 320,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  autoTransferInnerText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
  },
  inquireAutoTransferTextContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inquireAccountText: {
    color: colors.BLACK,
    marginLeft: 'auto',
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
  },
  childInfoHeaderContainer: {
    width: 312,
    marginBottom: 16,
  },
  childInfoContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: 320,
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  childInfoDetailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: colors.BLACK,
    borderRadius: 50,
    marginTop: 6,
    marginBottom: 8,
  },
  childInfoText: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
  },
  childInfoManageContainer: {
    left: 238,
    top: 14,
    flexDirection: 'row',
    position: 'absolute',
  },
  manageText: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLUE_100,
    fontSize: 16,
  },
  deleteText: {
    fontFamily: fonts.MEDIUM,
    marginLeft: 6,
    color: colors.RED_100,
    fontSize: 16,
  },
  securityHeaderContainer: {
    width: 312,
    marginBottom: 20,
  },
  securityMenuContainer: {
    width: 320,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 12,
  },
  securityMenuText: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
  },
  alarmMenuTextContainer: {
    width: 320,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  alarmMenuText: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
  },
});

export default MyInformationScreen;
