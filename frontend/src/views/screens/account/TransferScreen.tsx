import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import KeyPad from '@/views/components/KeyPad';
import KeypadModal from '@/views/components/KeyPadModal';
import TransferRecipientModal from '@/views/components/TransferModal';
import {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Bank {
  id: string;
  name: string;
}

interface Recipient {
  bank: Bank;
  accountNumber: string;
}

export default function TransferScreen({navigation}: any) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [keypadModalVisible, setKeypadModalVisible] = useState<boolean>(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null,
  );
  const [amount, setAmount] = useState<string>('0');

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setModalVisible(false);
  };

  const handleOpenKeypadModal = () => {
    setKeypadModalVisible(true);
  };

  const handleCloseKeypadModal = () => {
    setKeypadModalVisible(false);
  };

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
  };

  const onPressNext = () => {
    navigation.navigate('송금2');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.menuHeaderText}>출금계좌</Text>
      <View style={styles.myAccountInfoContainer}>
        <View style={styles.myAccountTextContainer}>
          <Text style={styles.myAccountTextHeader}>내 계좌</Text>
          <Text style={styles.myAccountTextContext}>우리 1005-458-953312</Text>
        </View>
        <View style={styles.myAccountTextContainer}>
          <Text style={styles.withdrawableAmountTextHeader}>출금가능금액</Text>
          <Text style={styles.withdrawableAmountTextContext}>1,000,000원</Text>
        </View>
      </View>
      <Text style={styles.menuHeaderText}>입금대상</Text>
      <Pressable
        style={styles.recipientAccountInfoContainer}
        onPress={handleOpenModal}>
        <Text style={styles.recipientAccountInfoText}>
          {selectedRecipient
            ? `${selectedRecipient.bank.name} ${selectedRecipient.accountNumber}`
            : '받을 대상을 선택해 주세요'}
        </Text>
      </Pressable>

      <TransferRecipientModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSelectRecipient={handleSelectRecipient}
      />

      <Text style={styles.menuHeaderText}>보낼금액</Text>
      <Pressable
        style={styles.amountInputContainer}
        onPress={handleOpenKeypadModal}>
        <Text style={styles.amountInputText}>
          {' '}
          {amount === '0'
            ? '보낼 금액을 입력해 주세요'
            : `${parseInt(amount).toLocaleString()}원`}
        </Text>
      </Pressable>

      <KeypadModal
        visible={keypadModalVisible}
        onClose={handleCloseKeypadModal}
        onInput={handleAmountChange}
        currentValue={parseInt(amount)}
      />

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
  recipientAccountInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    height: 55,
    borderRadius: 10,
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
});
