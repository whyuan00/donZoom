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

const UnsafeAssetChartTabScreen = ({navigation, selectedStock}: any) => {
  const {useGetStock} = useStock();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1일'); // 기본 기간 선택
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  console.log(useGetStock(4).data);

  const data: CandleData[] = [
    {x: 1, shadowH: 150.76, shadowL: 146.84, open: 148.12, close: 149.56},
    {x: 2, shadowH: 152.3, shadowL: 148.95, open: 149.7, close: 151.42},
    {x: 3, shadowH: 153.1, shadowL: 150.25, open: 151.55, close: 152.27},
    {x: 4, shadowH: 152.8, shadowL: 147.85, open: 152.35, close: 148.3},
    {x: 5, shadowH: 149.8, shadowL: 146.2, open: 148.5, close: 147.6},
    {x: 6, shadowH: 149.2, shadowL: 145.75, open: 147.8, close: 148.9},
    {x: 7, shadowH: 151.0, shadowL: 148.4, open: 149.1, close: 150.7},
    {x: 8, shadowH: 152.5, shadowL: 150.1, open: 150.9, close: 151.8},
    {x: 9, shadowH: 153.75, shadowL: 151.2, open: 152.0, close: 153.5},
    {x: 10, shadowH: 154.8, shadowL: 152.8, open: 153.6, close: 154.3},
    {x: 11, shadowH: 155.5, shadowL: 153.5, open: 154.4, close: 155.2},
    {x: 12, shadowH: 156.2, shadowL: 154.0, open: 155.3, close: 154.4},
    {x: 13, shadowH: 155.6, shadowL: 152.5, open: 154.5, close: 153.7},
    {x: 14, shadowH: 154.9, shadowL: 152.3, open: 153.8, close: 154.6},
    {x: 15, shadowH: 156.0, shadowL: 154.1, open: 154.7, close: 155.8},
    {x: 16, shadowH: 157.2, shadowL: 155.3, open: 155.9, close: 156.8},
    {x: 17, shadowH: 158.1, shadowL: 156.4, open: 156.9, close: 157.7},
    {x: 18, shadowH: 158.9, shadowL: 157.0, open: 157.8, close: 158.5},
    {x: 19, shadowH: 159.5, shadowL: 157.8, open: 158.6, close: 159.2},
    {x: 20, shadowH: 160.0, shadowL: 158.2, open: 159.3, close: 159.8},
  ];

  return (
    <View style={styles.container}>
      {
        <View style={{width: 350, height: 330, borderWidth: 1}}>
          <Text style={styles.text}>{selectedPeriod}</Text>
          <Text style={styles.text}>{selectedStock}</Text>
          {/* <Text style={styles.text}>hi unsafe UnsafeAssetChartTabScreen</Text> */}
          <CandlestickChartComponent data={data} />
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
