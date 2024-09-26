import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useAccountBalance from '@/hooks/useAccountInfo';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TransferScreen2({navigation}: any) {
  const {account, balance, isLoading, error, refetch} = useAccountBalance();
  const onPressNext = () => {
    navigation.navigate('송금3');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.menuHeaderText}>출금계좌</Text>
      <View style={styles.myAccountInfoContainer}>
        <View style={styles.myAccountTextContainer}>
          <Text style={styles.myAccountTextHeader}>내 계좌</Text>
          <Text style={styles.myAccountTextContext}>{account}</Text>
        </View>
        <View style={styles.myAccountTextContainer}>
          <Text style={styles.withdrawableAmountTextHeader}>출금가능금액</Text>
          <Text style={styles.withdrawableAmountTextContext}>{balance}원</Text>
        </View>
      </View>
      <Text style={styles.menuHeaderText}>송금정보</Text>
      <View style={styles.recipientInfoContainer}>
        <View style={styles.recipientInfoTextContainer}>
          <View style={styles.recipientInfoTextTopContainer}>
            <Text style={styles.recipientNameText}>신순호</Text>
            <Text style={styles.recipientAccountText}>
              우리 1005-458-953312
            </Text>
          </View>
          <View style={styles.recipientInfoTextBottomContainer}>
            <Text style={styles.ammountInfoText}>10,000원</Text>
          </View>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text>받는 통장 표기</Text>
          <Text>신호준</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text>내 통장 표기</Text>
          <Text>신호준</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text>예약 이체</Text>
          <FontAwesome
            name="toggle-off"
            size={30}
            style={styles.toggle}></FontAwesome>
        </View>
      </View>
      <TouchableOpacity
        style={styles.nextButtonContainer}
        onPress={onPressNext}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정
    justifyContent: 'flex-start', // 내용이 화면 상단에 위치하도록 설정
    alignItems: 'stretch', // 자식 컴포넌트가 화면의 가로를 채우도록 설정
    paddingHorizontal: 30,
    backgroundColor: colors.YELLOW_25,
  },
  myAccountInfoContainer: {
    backgroundColor: colors.WHITE,
    height: 73,
    borderRadius: 10,
  },
  myAccountTextContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  recipientInfoContainer: {
    backgroundColor: colors.WHITE,
    height: 247,
    borderRadius: 12,
  },
  amountInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    height: 55,
    borderRadius: 10,
  },
  menuHeaderText: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    paddingTop: 23,
    paddingBottom: 8,
  },
  recipientAccountInfoText: {
    fontFamily: fonts.BOLD,
    fontSize: 16,
  },
  amountInputText: {
    fontFamily: fonts.BOLD,
    fontSize: 16,
  },
  myAccountTextHeader: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
  },
  myAccountTextContext: {
    fontFamily: fonts.BOLD,
    marginLeft: 'auto',
    fontSize: 12,
  },
  withdrawableAmountTextHeader: {
    fontFamily: fonts.BOLD,
    color: colors.BLUE_100,
    marginLeft: 'auto',
    fontSize: 12,
  },
  withdrawableAmountTextContext: {
    fontFamily: fonts.BOLD,
    color: colors.BLUE_100,
    marginLeft: 10,
    fontSize: 12,
  },
  nextButtonContainer: {
    marginTop: 'auto',
    marginBottom: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    height: 55,
    borderRadius: 10,
  },
  nextButtonText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
  },
  recipientInfoTextContainer: {
    height: 120,
  },
  recipientInfoOptionContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    borderTopColor: colors.GRAY_25,
    borderTopWidth: 1,
  },
  recipientInfoTextTopContainer: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  recipientInfoTextBottomContainer: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  ammountInfoText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
    marginLeft: 'auto',
  },
  recipientNameText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    marginTop: 20,
  },
  recipientAccountText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    marginTop: 6,
  },
  toggle: {
    marginLeft: 'auto',
  },
});
