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
import CandlestickChartComponent, {CandleData} from '../CandleChart';
import useStock from '@/hooks/queries/useStock';
import useWebSocket from '@/hooks/useWebSocket';
import transformStockData from '../StockDataConvertor';

const UnsafeAssetChartTabScreen = ({navigation, selectedStock}: any) => {
  const {useGetStock} = useStock();
  const [stockMessage, setStockMessage] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1일'); // 기본 기간 선택
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  useWebSocket([4], message => {
    setStockMessage(message);
  });

  let candleData: CandleData[] = [];

  const {data: rawData, isLoading, error} = useGetStock(4);

  if (isLoading) {
    console.log('Loading stock data...');
  } else if (error) {
    console.error('Error fetching stock data:', error);
  } else if (rawData) {
    candleData = transformStockData(rawData);
  } else {
    console.log('No stock data available');
  }

  return (
    <View style={styles.container}>
      {
        <View style={{width: 350, height: 330, borderWidth: 1}}>
          {/* <Text style={styles.text}>{selectedPeriod}</Text> */}
          {/* <Text style={styles.text}>{selectedStock}</Text> */}
          {/* <Text style={styles.text}>hi unsafe UnsafeAssetChartTabScreen</Text> */}
          <CandlestickChartComponent data={candleData} />
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
          onPress={() =>
            navigation.navigate('Trade', {trade: 'buy', type: 'Unsafe'})
          }>
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
          onPress={() =>
            navigation.navigate('Trade', {trade: 'sell', type: 'Unsafe'})
          }>
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

export default UnsafeAssetChartTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  text: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 50,
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
