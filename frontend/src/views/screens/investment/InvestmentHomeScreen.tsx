import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Pressable,
  RefreshControl,
} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import Icon from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import useStock from '@/hooks/queries/useStock';
import {useSignupStore} from '@/stores/useAuthStore';
import usePig from '@/hooks/queries/usePig';
import {MyStock, ResponseMyStock} from '@/api/stock';
import {useErrorStore} from '@/stores/errorMessagesStore';

export default function InvestmentHomeScreen({navigation}: any) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const {useGetMyStock} = useStock();
  const {id} = useSignupStore();
  const {getMyCoinMutation} = usePig();
  const money = getMyCoinMutation.data?.coin;

  // console.log(useGetMyStock(id).data);

  const myStockData = useGetMyStock(id).data?.myStocks;
  console.log('myStockData:', myStockData);
  const stockData = Array.isArray(myStockData)
    ? myStockData.map(
        (item: {
          stockWalletId: number;
          stockId: number;
          stockName: string;
          totalInvestedPrice: number;
          amount: number;
          averagePrice: number;
        }) => ({
          name: item.stockName,
          currentPrice: item.averagePrice,
          change: '10%',
        }),
      )
    : [];

  useEffect(() => {}, [myStockData]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <View style={styles.assetHeaderContainer}>
            <View style={styles.assetInnerHeaderContainer}>
              <Text style={styles.headerText}>전체 순자산</Text>
              <View style={styles.notification}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.notificationText}>
                    {' '}
                    <Icon name="bell-fill" size={15} color="black" /> 투자 알림
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.assetInfoContainer}>
            <View style={styles.assetTextConainer}>
              <Text style={styles.assetAmount}>{money}머니</Text>
              <View style={styles.profitSection}>
                <Text style={styles.profitText}>수익률 변동</Text>
                <Text style={styles.profitAmount}>▲ 1,500머니 (100%)</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/* 안전자산버튼 */}
          <TouchableOpacity>
            <Pressable
              style={styles.safeAssetHeaderContainer}
              onPress={() =>
                navigation.navigate('Detail', {selectedAsset: '안전자산'})
              }>
              <Text style={styles.safeAssetHeaderText}>
                안전 자산 <Icon2 name="right" size={15} color="black" />
              </Text>
            </Pressable>
          </TouchableOpacity>

          {/* 적금 현황 */}
          <View style={styles.statusContainer}>
            <View style={styles.titleCell}>
              <Text style={styles.titleText}>적금 현황</Text>
            </View>
            <View style={styles.row}>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.text}>납부 현황</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  styles.borderTop,
                  styles.borderRight,
                  styles.borderBottom,
                ]}>
                <Text style={styles.text}>10,000</Text>
              </View>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.smallText}>만기 환급액</Text>
                <Text style={styles.smallText}>/만기 예상수익</Text>
              </View>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.smallText}>20,000</Text>
                <Text style={styles.smallText}>/1,500</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.cell, styles.bottomLeftRadiusCell]}>
                <Text style={styles.text}>월 납금액</Text>
              </View>
              <View style={[styles.cell, styles.borderRight]}>
                <Text style={styles.text}>5,000</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.smallText}>다음 납기일</Text>
                <Text style={styles.smallText}>/만기일</Text>
              </View>
              <View style={[styles.cell, styles.bottomRightRadiusCell]}>
                <Text style={styles.smallText}>D-15</Text>
                <Text style={styles.smallText}>/24.12.25</Text>
              </View>
            </View>
          </View>

          {/* 위험 자산 버튼 */}
          <TouchableOpacity style={{marginTop: 20}}>
            <Pressable
              style={styles.safeAssetHeaderContainer}
              onPress={() =>
                navigation.navigate('Detail', {selectedAsset: '실물자산'})
              }>
              <Text style={styles.safeAssetHeaderText}>
                실물 자산 <Icon2 name="right" size={15} color="black" />
              </Text>
            </Pressable>
          </TouchableOpacity>

          {/* 금 수익 현황 */}
          <View style={styles.statusContainer}>
            <View style={styles.titleCell}>
              <Text style={styles.titleText}>금 수익 현황</Text>
            </View>
            <View style={styles.row}>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.text}>원화매입금액</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  styles.borderTop,
                  styles.borderBottom,
                  styles.borderRight,
                ]}>
                <Text style={styles.text}>10,000</Text>
              </View>

              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.text}>수익률(%)</Text>
              </View>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={[styles.text, styles.redText]}>1%</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          {/* 위험 자산 버튼 */}
          <TouchableOpacity style={{marginTop: 20}}>
            <Pressable
              style={styles.safeAssetHeaderContainer}
              onPress={() =>
                navigation.navigate('Detail', {selectedAsset: '위험자산'})
              }>
              <Text style={styles.safeAssetHeaderText}>
                위험 자산 <Icon2 name="right" size={15} color="black" />
              </Text>
            </Pressable>
          </TouchableOpacity>

          {/* 주식 수익 현황 */}
          <View style={styles.statusContainer}>
            <View style={styles.titleCell}>
              <Text style={styles.titleText}>주식 수익 현황</Text>
            </View>
            <View style={styles.row}>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.text}>원화매입금액</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  styles.borderTop,
                  styles.borderBottom,
                  styles.borderRight,
                ]}>
                <Text style={styles.text}>10,000</Text>
              </View>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={styles.text}>원화평가손익</Text>
              </View>
              <View
                style={[styles.cell, styles.borderTop, styles.borderBottom]}>
                <Text style={[styles.text, styles.redText]}>1,500</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.cell, styles.bottomLeftRadiusCell]}>
                <Text style={styles.text}>원화평가금액</Text>
              </View>
              <View style={[styles.cell, styles.borderRight]}>
                <Text style={styles.text}>3,000</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>수익률(%)</Text>
              </View>
              <View style={[styles.cell, styles.bottomRightRadiusCell]}>
                <Text style={[styles.text, styles.redText]}>3,000</Text>
              </View>
            </View>
          </View>

          {/* 보유 주식 현황 */}
          <View style={styles.statusContainer}>
            <View style={styles.titleCell}>
              <Text style={styles.titleText}>보유 주식 현황</Text>
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.cell,
                  styles.borderTop,
                  styles.borderRight,
                  styles.yellow,
                ]}>
                <Text style={styles.unSafeTitleText}>종목명</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  styles.borderTop,
                  styles.borderRight,
                  styles.yellow,
                ]}>
                <Text style={styles.unSafeTitleText}>매입단가</Text>
              </View>
              <View style={[styles.cell, styles.borderTop, styles.yellow]}>
                <Text style={styles.unSafeTitleText}>수익률</Text>
              </View>
            </View>

            {/* 보유 주식 데이터 목록 */}
            {stockData.map((stock, index) => (
              <View key={index} style={styles.row}>
                <View
                  style={[
                    styles.cell,
                    styles.borderTop,
                    styles.borderRight,
                    index === stockData.length - 1
                      ? styles.bottomLeftRadiusCell
                      : null, // 마지막 행의 왼쪽 셀
                  ]}>
                  <Text style={styles.unSafeText}>{stock.name}</Text>
                </View>
                <View
                  style={[styles.cell, styles.borderTop, styles.borderRight]}>
                  <Text style={styles.unSafeText}>{stock.currentPrice}</Text>
                </View>
                {/* 마지막 행 처리 */}
                <View
                  style={[
                    styles.cell,
                    styles.borderTop,
                    index === stockData.length - 1
                      ? styles.bottomRightRadiusCell
                      : null,
                  ]}>
                  <Text style={[styles.unSafeText, styles.redText]}>
                    {stock.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: colors.YELLOW_25,
    borderRadius: 10,
    borderColor: '#FFE37F',
    borderWidth: 1,
    margin: 10,
    width: 307,
  },
  titleText: {
    fontSize: 16,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  row: {
    flexDirection: 'row',
  },
  titleCell: {
    width: 264,
    height: 38,
    marginLeft: 18,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    height: 50,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderColor: '#FFE37F',
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  borderTop: {
    borderTopWidth: 1,
  },
  borderRight: {
    borderRightWidth: 1,
  },
  yellow: {
    backgroundColor: colors.YELLOW_25,
  },
  text: {
    fontSize: 10,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  smallText: {
    fontSize: 8,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1, // 테두리 두께
    borderColor: colors.BLACK,
  },
  savingsStatusInnerConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  savingsStatusConainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  safeAssetHeaderContainer: {
    width: 308,
    marginLeft: 5,
  },
  safeAssetHeaderText: {
    fontSize: 20,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
  },
  unSafeTitleText: {
    fontSize: 14,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  assetInnerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetHeaderContainer: {
    width: 286,
    height: 40,
    marginTop: 8,
  },
  headerText: {
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
  },
  unSafeText: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 15,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    marginLeft: 5,
    fontSize: 14,
  },
  assetInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    height: 69,
    width: 279,
    margin: 0,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetTextConainer: {
    flexDirection: 'row', // 가로 정렬
    justifyContent: 'center',
  },
  assetAmount: {
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    fontSize: 20,
  },
  profitSection: {
    flexDirection: 'column', // 세로 정렬
    alignItems: 'flex-start', // 왼쪽 정렬
    marginLeft: 15,
  },
  profitChange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profitText: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 10,
    fontWeight: '500',
  },
  profitAmount: {
    fontSize: 10,
    fontFamily: fonts.MEDIUM,
    color: 'red', // 빨간색 텍스트
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  menuContainer: {
    backgroundColor: '#FFE999',
    width: 307,
    height: 127,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  bottomLeftRadiusCell: {
    borderBottomLeftRadius: 10, // 왼쪽 아래 둥글게
  },
  bottomRightRadiusCell: {
    borderBottomRightRadius: 10, // 오른쪽 아래 둥글게
  },
  redText: {
    color: colors.RED_100,
  },
});
