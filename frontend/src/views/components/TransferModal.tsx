import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

interface Bank {
  id: string;
  name: string;
}

interface Recipient {
  bank: Bank;
  accountNumber: string;
}

interface TransferRecipientModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRecipient: (recipient: Recipient) => void;
}

const banks: Bank[] = [
  {id: '1', name: '신한은행'},
  {id: '2', name: '국민은행'},
  {id: '3', name: '우리은행'},
  // 다른 은행들 추가
];

const TransferRecipientModal: React.FC<TransferRecipientModalProps> = ({
  visible,
  onClose,
  onSelectRecipient,
}) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>('');

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank);
  };

  const handleConfirm = () => {
    if (selectedBank && accountNumber) {
      onSelectRecipient({bank: selectedBank, accountNumber});
      onClose();
    } else {
      Alert.alert('입력 오류', '은행과 계좌번호를 모두 입력해주세요.', [
        {text: '확인'},
      ]);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>이체 대상 선택</Text>

          <Text style={styles.label}>은행 선택</Text>
          <FlatList
            data={banks}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.bankItem,
                  selectedBank?.id === item.id && styles.selectedBankItem,
                ]}
                onPress={() => handleSelectBank(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            horizontal
          />

          <Text style={styles.label}>계좌번호</Text>
          <TextInput
            style={styles.input}
            placeholder="계좌번호를 입력하세요"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}>
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  bankItem: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedBankItem: {
    backgroundColor: '#e0e0e0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransferRecipientModal;
