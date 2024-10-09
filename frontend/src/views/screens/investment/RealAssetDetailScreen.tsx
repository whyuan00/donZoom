import axiosInstance from '@/api/axios';
import useStock from '@/hooks/queries/useStock';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import InvestRealAssetTabNavigator from '@/navigation/InvestRealAssetTabNavigator';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

type ResponseStockList = {
  stockId: number;
  stockName: string;
  stockPrice: number;
  lastCreatedAt: Date;
};

export default function RealAssetDetailScreen({navigation}: any) {
  const [selectedStock, setSelectedStock] = useState<string>('금'); // 기본 종목 선택 상태
  // const [realAssetMoney, setRealAssetMoney] = useState<number>(159335); // 현재 보유한 금을 머니로 환산한 값
  // const [realAssetDollar, setRealAssetDollar] = useState<number>(119.37); // 현재 보유한 금을 머니로 환산한 값

  const {useGetStock} = useStock();
  const {data: stockData, isLoading, error} = useGetStock(5, 'day');
  // console.log(stockData[0])
  const realAssetMoney = stockData?.price ?? 0;
  const realAssetDollar = realAssetMoney * 0.09;

  return (
    <View style={styles.container}>
      {/* 금, 머니환산 컨테이너 */}
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.assetTitle}>{selectedStock}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.moneyTitle}>
            {realAssetMoney.toLocaleString()}머니
          </Text>
          <Text style={styles.dollarTitle}>${realAssetDollar} 달러 </Text>
        </View>
      </View>
      <InvestRealAssetTabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    padding: 15,
  },
  tabNavigator: {
    flex: 1,
    borderWidth: 3,
    height: 1000,
    backgroundColor: colors.BLACK,
  },
  assetTitle: {
    fontSize: 23,
    fontFamily: fonts.BOLD,
    fontWeight: '700',
    color: colors.BLACK,
  },
  moneyTitle: {
    fontSize: 25,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontWeight: '700',
  },
  dollarTitle: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 12,
    color: colors.BLACK,
    fontFamily: fonts.LIGHT,
    fontWeight: '300',
  },
});
