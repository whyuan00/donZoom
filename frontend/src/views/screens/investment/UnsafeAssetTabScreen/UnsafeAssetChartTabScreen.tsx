import React, {useState, useCallback, useEffect} from 'react';
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

const UnsafeAssetChartTabScreen = ({
  navigation,
  selectedStock,
  selectedStockIndex,
}: any) => {
  const {useGetStock} = useStock();
  const [stockMessage, setStockMessage] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1달'); // 기본 기간 선택
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const mapPeriodToApiParam = (period: string): string => {
    switch (period) {
      case '1분':
        return 'min';
      case '1일':
        return 'day';
      case '1주':
        return 'week';
      case '1달':
        return 'month';
      default:
        return 'month'; // 기본값
    }
  };

  let candleData: CandleData[] = [];

  const {
    data: rawData,
    isLoading,
    error,
  } = useGetStock(selectedStockIndex, mapPeriodToApiParam(selectedPeriod));

  if (isLoading) {
    console.log('Loading stock data...');
  } else if (error) {
    console.error('Error fetching stock data:', error);
  } else if (rawData) {
    candleData = transformStockData(rawData);
  } else {
    console.log('No stock data available');
  }

  const {
    data: currentPriceData,
    isLoading: isLoadingCurrentPrice,
    error: currentPriceError,
  } = useGetStock(selectedStockIndex, 'min');

  useEffect(() => {
    if (currentPriceData && currentPriceData.stockHistories.length > 0) {
      setCurrentPrice(currentPriceData.stockHistories[0].open);
    }
  }, [currentPriceData]);

  const handleBuyStock = () => {
    navigation.navigate('Trade', {
      trade: 'buy',
      type: 'Unsafe',
      price: currentPrice,
    });
  };

  return (
    <View style={styles.container}>
      {
        <View style={{width: 350, height: 330, borderWidth: 1}}>
          <CandlestickChartComponent data={candleData} />
        </View>
      }

      {/* 기간 선택 */}
      <View style={styles.periodButtonContainer}>
        {['1분', '1일', '1주', '1달'].map(period => (
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
          onPress={handleBuyStock}>
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
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    padding: 10,
  },
  //이하 기간버튼디자인
  periodButton: {
    width: '25%',
    height: 40,
    borderRadius: 5,
  },
  selectedPeriodButton: {
    backgroundColor: colors.GRAY_25,
  },
  selectedPeriodText: {
    fontFamily: fonts.BOLD,
    color: colors.GRAY_100,
    fontSize: 15,
    margin: 'auto',
  },
  unselectedPeriodText: {
    color: colors.GRAY_75,
    fontFamily: fonts.MEDIUM,
    fontSize: 15,
    margin: 'auto',
  },
  // 매수매도버튼
  actionButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },
  actionButton: {
    width: '50%',
    height: 40,
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
