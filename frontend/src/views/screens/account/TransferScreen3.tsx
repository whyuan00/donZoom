import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useAccount from '@/hooks/queries/useAccount';
import {useSignupStore} from '@/stores/useAuthStore';
import useTransferStore from '@/stores/useTransferStore';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TransferScreen3({navigation}: any) {
  const {accountNo, amount, name: holderName, setName} = useTransferStore();
  const {getAccountHolderMutation} = useAccount();
  const {name} = useSignupStore();

  const onPressNext = () => {
    navigation.navigate('송금4');
  };

  return (
    <View style={styles.container}>
      <View style={styles.transferInfoContainer}>
        <View style={styles.transferInfoHeaderContainer}>
          <View style={styles.headerTopContainer}>
            <Text style={styles.headerTopLeftText}>{holderName}</Text>
            <Text style={styles.headerTopRightText}>님에게</Text>
          </View>
          <View style={styles.headerBottomContainer}>
            <Text style={styles.headerBottomLeftText}>10,000원</Text>
            <Text style={styles.headerBottomRightText}>을 이체합니다</Text>
          </View>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text style={styles.innerLeftText}>출금계좌</Text>
          <Text style={styles.innerRightText}>우리 1005-458-953312</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text style={styles.innerLeftText}>받는분</Text>
          <Text style={styles.innerRightText}>신순호</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text style={styles.innerLeftText}>보낼금액</Text>
          <Text style={styles.innerRightText}>10,000원</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text style={styles.innerLeftText}>받는 통장 표기</Text>
          <Text style={styles.innerRightText}>신호준</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text style={styles.innerLeftText}>내 통장 표기</Text>
          <Text style={styles.innerRightText}>신호준</Text>
        </View>
        <View style={styles.recipientInfoOptionContainer}>
          <Text style={styles.innerLeftText}>이체일</Text>
          <Text style={styles.innerRightText}>2024.9.22 19:00</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.nextButtonContainer}
        onPress={onPressNext}>
        <Text style={styles.nextButtonText}>이체하기</Text>
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
  transferInfoContainer: {
    backgroundColor: colors.WHITE,
    height: 368,
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 19,
  },
  transferInfoHeaderContainer: {
    paddingHorizontal: 24,
    height: 84,
    paddingTop: 20,
  },
  headerTopContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  headerBottomContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingBottom: 19,
    borderBottomColor: colors.GRAY_100,
    borderBottomWidth: 1,
  },
  headerTopLeftText: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLUE_100,
    fontSize: 18,
    marginTop: 'auto',
  },
  headerTopRightText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    marginTop: 'auto',
  },
  headerBottomLeftText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    marginTop: 'auto',
  },
  headerBottomRightText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    marginTop: 'auto',
  },
  recipientInfoOptionContainer: {
    marginHorizontal: 24,
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    borderTopColor: colors.GRAY_25,
    borderTopWidth: 1,
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
  innerLeftText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
  },
  innerRightText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    marginLeft: 'auto',
  },
});
