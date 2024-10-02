import React, {useState, useCallback} from 'react';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const ChartTabScreen = ({navigation, route}: any) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1일'); // 기본 기간 선택

  // 기간 선택 변경
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <View style={styles.container}>
      {
        <View style={{width: 350, height: 330, borderWidth: 1}}>
          <Text style={styles.text}>hi Real Asset ChartTabScreen</Text>
          <Text>{selectedPeriod}</Text>
        </View>
      }

      {/* 기간 선택 */}
      <View style={styles.periodButtonContainer}>
        {['1일', '1주', '3달', '1년', '5년', '전체'].map(period => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton,
            ]}
            onPress={() => handlePeriodChange(period)}>
            <Text
              style={
                selectedPeriod === period
                  ? styles.selectedPeriodText
                  : styles.unselectedPeriodText
              }>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 추가 UI 예시 */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.buyButton]}
          onPress={() => navigation.navigate('Trade', {trade: 'buy', type:'Real'})}>
          <Text
            style={{
              color: colors.WHITE,
              fontFamily: fonts.MEDIUM,
              fontSize: 16,
            }}>
            매수
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.sellButton]}
          onPress={() => navigation.navigate('Trade', {trade: 'sell', type:'Real'})}>
          <Text
            style={{
              color: colors.WHITE,
              fontFamily: fonts.MEDIUM,
              fontSize: 16,
            }}>
            매도
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default ChartTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.WHITE
  },
  text: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 100,
  },
  periodButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginTop: 10,
    borderWidth: 1,
  },
  //이하 기간버튼디자인
  periodButton: {
    width: 55,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  selectedPeriodButton: {
    backgroundColor: colors.GRAY_25,
  },
  selectedPeriodText: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_100,
    fontSize: 15,
    fontWeight: '700',
    margin: 'auto',
  },
  unselectedPeriodText: {
    color: colors.GRAY_75,
    fontFamily: fonts.MEDIUM,
    fontSize: 15,
    fontWeight: '500',
    margin: 'auto',
  },
  // 매수매도버튼
  actionButtonContainer: {
    flexDirection: 'row',
    borderWidth: 3,
    marginTop: 10,
  },
  actionButton: {
    width: 155,
    height: 35,
    marginHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    backgroundColor: 'red',
  },
  sellButton: {
    backgroundColor: 'blue',
  },
});
