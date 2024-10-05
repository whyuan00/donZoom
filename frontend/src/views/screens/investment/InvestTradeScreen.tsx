import React, {useState} from 'react';
import {colors} from '@/constants/colors';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import KeyPad from '@/views/components/KeyPad';
import {fonts} from '@/constants/font';

const InvestTradeScreen = ({route,navigation}: any) => {
  const trade = route.params.trade || '';
  const type = route.params.type || '';
  const [cost, setCost] = useState<number>(159335);
  const [dollar, setDollar] = useState<number>(119.37);
  const [ableBuyNum, setAbleBuyNum] = useState<number>(0);
  const [ableSellNum, setAbleSellNum] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  

  const setModalState = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 1000);
  };
  const updateValue = (newValue: number) => {
    setCurrentValue(newValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.yellowContainer}>
        {trade === 'buy' ? (
          <Text style={styles.titleText}>구매할 가격</Text>
        ) : (
          <Text style={styles.titleText}>판매할 가격</Text>
        )}
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.contentText, styles.textColorBlack]}>
            {cost.toLocaleString()} 머니
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: fonts.LIGHT,
              color: colors.BLACK,
            }}>
            ${dollar.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.yellowContainer}>
        <Text style={styles.titleText}>수량</Text>
        {trade === 'buy' ? (
          <View>
            {currentValue > 0 ? (
              <Text style={[styles.contentText, styles.textColorBlack]}>
                {currentValue} {type === 'Real' ? '온스' : '주'}
              </Text>
            ) : (
              <Text style={styles.contentText}>
                {type === 'Real'
                  ? '몇 온스(once)구매할까요?'
                  : '몇 주 구매할까요?'}
              </Text>
            )}
            <Text
              style={{
                fontFamily: fonts.LIGHT,
                color: colors.BLACK,
              }}>
              구매 가능 최대 {ableBuyNum} {type === 'Real' ? '온스' : '주'} |{' '}
              {currentValue * ableBuyNum} 머니
            </Text>
          </View>
        ) : (
          <View>
            {currentValue > 0 ? (
              <Text style={[styles.contentText, styles.textColorBlack]}>
                {currentValue}
              </Text>
            ) : (
              <Text style={styles.contentText}>
                {type === 'Real'
                  ? '몇 온스(once)판매할까요?'
                  : '몇 주 판매할까요?'}
              </Text>
            )}
            <Text
              style={{
                fontFamily: fonts.LIGHT,
                color: colors.BLACK,
              }}>
              핀매 가능 최대 {ableSellNum}주 | {currentValue * ableSellNum} 머니
            </Text>
          </View>
        )}
      </View>

      <KeyPad onInput={updateValue} currentValue={currentValue} />
      {currentValue > 0 ? (
        <TouchableOpacity
          style={
            trade === 'buy'
              ? [styles.buyButton, styles.buttonBox]
              : [styles.sellButton, styles.buttonBox]
          }
          onPress={setModalState}>
          <Text
            style={{
              color: colors.WHITE,
              fontFamily: fonts.MEDIUM,
              fontWeight: '500',
            }}>
            {trade === 'buy' ? '매수' : '매도'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.inactiveButton, styles.buttonBox]}>
          <Text
            style={{
              color: colors.WHITE,
              fontFamily: fonts.MEDIUM,
              fontWeight: '500',
            }}>
            {trade === 'buy' ? '매수' : '매도'}
          </Text>
        </View>
      )}

      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text
              style={{
                fontFamily: fonts.MEDIUM,
                fontWeight: '500',
                fontSize: 20,
                color: colors.BLACK,
              }}>
              {' '}
              {trade === 'buy' ? '매수 되었습니다' : '매도 되었습니다'}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InvestTradeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingTop: 35,
  },
  yellowContainer: {
    marginBottom: 20,
    width: 320,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_25,
    paddingLeft: 18,
    paddingVertical: 20,
  },
  titleText: {
    fontFamily: fonts.BOLD,
    fontWeight: '500',
    fontSize: 11,
    marginBottom: 10,
    color: colors.BLACK,
  },
  contentText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 25,
    marginBottom: 10,
  },
  textColorBlack: {
    color: colors.BLACK,
  },
  buttonBox: {
    width: 310,
    height: 45,
    marginTop: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: colors.RED_100,
  },
  sellButton: {
    backgroundColor: colors.BLUE_100,
  },
  inactiveButton: {
    backgroundColor: colors.GRAY_50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  modalBox: {
    width: 320,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: colors.YELLOW_50,
  },
});
