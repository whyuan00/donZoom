import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '@/constants/colors';
import InputField from '@/views/components/InputField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomCalendar from '@/views/components/CustomCalendar';

const MakeNewMissionScreen = () => {
  const [text, setText] = useState('');
  const [textCount, setTextCount] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const onChangeText = input => {
    if (input.length <= 20) {
      setText(input);
      setTextCount(input.length);
    }
  };

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>어떤 미션을 요청할까요?</Text>
      <View style={styles.missionBox}>
        <View style={styles.input}>
          <InputField
            style={{color: colors.BLACK}}
            placeholder="미션 내용을 입력하세요"
            onChangeText={onChangeText}
            value={text}
          />
          <Text>{textCount}/20</Text>
        </View>
        <TouchableOpacity
          onPress={toggleCalendar}
          style={styles.dateSettingContainer}>
          <Icon name="edit-calendar" size={30} />
          <Text style={styles.dateSettingText}>
            {selectedDate ? `기한: ${selectedDate}` : '기한 설정하기'}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={showCalendar}
        onRequestClose={toggleCalendar}>
        <TouchableWithoutFeedback onPress={toggleCalendar}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <CustomCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity style={styles.goNextButtonAcitve}>
        <Text style={styles.goNextButtonAcitveText}>다음</Text>
      </TouchableOpacity>
      {
        //액티브 설정
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  missionBox: {
    alignItems: 'center',
    width: 300,
    padding: 30,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_100,
  },
  input: {
    width: 250,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dateSettingContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  dateSettingText: {
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  goNextButtonAcitve: {
    marginTop: 10,
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.BLUE_100,
    justifyContent: 'center',
  },
  goNextButtonAcitveText: {
    color: colors.WHITE,
    textAlign: 'center',
  },
});

export default MakeNewMissionScreen;
