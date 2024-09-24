import { colors } from '@/constants/colors';
import { fonts } from '@/constants/font';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from 'react-native';

function MyInformationScreen() {
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.inquireAutoTransferHeaderContainer}>
            <Text style={styles.cardTitle}>자동 이체 등록</Text>
            <Text style={styles.cardSubtitle}>등록된 계좌로 우리 아이들 용돈이 자동이체 됩니다.</Text>
          </View>
          <View style={styles.autoTransferAccountInfoContainer}>
            <Text style={styles.autoTransferInnerText}>현재 등록된 계좌가 없습니다. (최대 2개 등록 가능)</Text>
          </View>
          <View style={styles.inquireAutoTransferTextContainer}>
            <Text style={styles.inquireAccountText}>계좌 등록하기 ^</Text>
          </View>
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
              <Text style={styles.manageText}>관리</Text>
              <Text style={styles.deleteText}>삭제</Text>
            </View>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.securityHeaderContainer}>
            <Text style={styles.cardTitle}>인증/보안</Text>
          </View>
          <View style={styles.securityMenuContainer}>
            <Text style={styles.securityMenuText}>생체 인증</Text>
          </View>
          <View style={styles.securityMenuContainer}>
            <Text style={styles.securityMenuText}>비밀번호 관리</Text>
          </View>
        </View>
        <View style={styles.alarmMenuContainer}>
          <View style={styles.securityHeaderContainer}>
            <Text style={styles.cardTitle}>알림 설정</Text>
          </View>
          <View style={styles.alarmMenuTextContainer}>
            <Text style={styles.alarmMenuText}>비밀번호 관리</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  menuContainer: {
    backgroundColor: colors.YELLOW_50,
    width: 320,
    height: 161,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  alarmMenuContainer: {
    backgroundColor: colors.YELLOW_50,
    width: 320,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 19,
  },
  cardSubtitle: {
    marginTop: 6,
    fontFamily: fonts.LIGHT,
    fontSize: 10,
  },
  inquireAutoTransferHeaderContainer: {
    width: 286,
    height: 68,
  },
  autoTransferAccountInfoContainer: {
    width: 286,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  autoTransferInnerText: {
    fontFamily: fonts.BOLD,
    fontSize: 10,
  },
  inquireAutoTransferTextContainer: {
    justifyContent: 'center',
    width: 286,
    height: 33,
  },
  inquireAccountText: {
    marginLeft: 'auto',
    fontFamily: fonts.BOLD,
    fontSize: 12,
  },
  childInfoHeaderContainer: {
    width: 286,
    height: 51,
  },
  childInfoContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: 286,
    height: 86,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  childInfoDetailContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 42,
    height: 42,
    borderWidth: 3,
    borderColor: colors.BLACK,
    borderRadius: 50,
    marginBottom: 6,
  },
  childInfoText: {
    fontFamily: fonts.BOLD,
  },
  childInfoManageContainer: {
    left: 210,
    top: 9,
    flexDirection: 'row',
    position: 'absolute',
  },
  manageText: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLUE_100,
  },
  deleteText: {
    fontFamily: fonts.MEDIUM,
    marginLeft: 4,
    color: colors.RED_100,
  },
  securityHeaderContainer: {
    width: 286,
    height: 53,
  },
  securityMenuContainer: {
    width: 266,
    height: 33,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 9,
  },
  securityMenuText: {
    fontFamily: fonts.BOLD,
  },
  alarmMenuTextContainer:{
    width: 266,
    height: 33,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 9,
  },
  alarmMenuText:{
    fontFamily: fonts.BOLD,
  },
});

export default MyInformationScreen;
