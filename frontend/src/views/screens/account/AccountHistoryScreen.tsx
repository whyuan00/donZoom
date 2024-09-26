import {colors} from '@/constants/colors';
import React, {useState} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

function AccountHistoryScreen({navigation}: any) {
  const isParent = true; // 임시 변수
  const [selected, setSelected] = useState('아이');
  const transactionData = [
    {
      date: '2024.9.2. 14시 23분 03초',
      marketName: '싸피문구점',
      historyType: '사용한 금액',
      amount: '-25000원',
      remainingBalance: '1,234,567원',
    },
    {
      date: '2024.9.1. 10시 10분 45초',
      marketName: '싸피커피',
      historyType: '사용한 금액',
      amount: '-4500원',
      remainingBalance: '1,209,567원',
    },
    {
      date: '2024.8.30. 09시 05분 12초',
      marketName: '싸피마트',
      historyType: '사용한 금액',
      amount: '-12000원',
      remainingBalance: '1,197,567원',
    },
    {
      date: '2024.8.29. 17시 45분 55초',
      marketName: '싸피서점',
      historyType: '사용한 금액',
      amount: '-32000원',
      remainingBalance: '1,165,567원',
    },
    {
      date: '2024.8.28. 12시 22분 10초',
      marketName: '싸피식당',
      historyType: '사용한 금액',
      amount: '-15000원',
      remainingBalance: '1,150,567원',
    },
    {
      date: '2024.8.27. 16시 33분 44초',
      marketName: '급여 입금',
      historyType: '입금',
      amount: '+200000원',
      remainingBalance: '1,350,567원',
    },
    {
      date: '2024.8.26. 14시 11분 19초',
      marketName: '싸피옷가게',
      historyType: '사용한 금액',
      amount: '-45000원',
      remainingBalance: '1,305,567원',
    },
    {
      date: '2024.8.25. 18시 00분 00초',
      marketName: '싸피영화관',
      historyType: '사용한 금액',
      amount: '-12000원',
      remainingBalance: '1,293,567원',
    },
    {
      date: '2024.8.24. 13시 55분 27초',
      marketName: '보너스 지급',
      historyType: '입금',
      amount: '+100000원',
      remainingBalance: '1,393,567원',
    },
    {
      date: '2024.8.23. 10시 40분 33초',
      marketName: '싸피슈퍼',
      historyType: '사용한 금액',
      amount: '-8000원',
      remainingBalance: '1,385,567원',
    },
  ];
  return (
    <View style={styles.container}>
      {isParent ? (
        <View style={styles.accountInfoContainer}>
          <View style={styles.parentAccountInfoContainer}>
            <View style={styles.parentInfoTop}>
              <Text>아이 계좌 번호</Text>
              <Text style={styles.parentInfoTopBankInfo}>싸피은행</Text>
              <Text>110-449-965876</Text>
            </View>
            <View style={styles.parentInfoMiddle}>
              <Text style={styles.parentBalanceHeader}>남은 금액</Text>
              <Text style={styles.parentBalanceText}>1,234,567 원</Text>
            </View>
            <Pressable
              style={styles.parentInfoBottom}
              onPress={() => navigation.navigate('송금')}>
              <Text>용돈 보내기</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.accountInfoContainer}>
          <View style={styles.infoTop}>
            <View style={styles.infoTopTop}>
              <View style={styles.accountNumberHeaderContainer}>
                <Text>계좌 번호</Text>
              </View>
            </View>
            <View style={styles.infoTopBottom}>
              <View style={styles.accountNumberContentsContainer}>
                <View>
                  <Text>싸피은행</Text>
                </View>
                <View style={styles.accountNumber}>
                  <Text>110-449-965876</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.infoBottom}>
            <View style={styles.balanceContainer}>
              <View style={styles.balanceHeaderContainer}>
                <Text style={styles.balanceHeader}>남은 금액</Text>
              </View>
              <View style={styles.balanceTextContainer}>
                <Text style={styles.balanceText}>1,234,567 원</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={styles.accountHistoryContainer}>
        <View style={styles.accountHistoryHeader}>
          <Text>왼쪽아이콘</Text>
          <Text>거래내역 헤더</Text>
          <Text>오른쪽아이콘</Text>
        </View>
        <ScrollView
          style={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          {transactionData.map((transaction, index) => (
            <View key={index} style={styles.accountHistoryCard}>
              <View style={styles.cardTopContainer}>
                <Text>{transaction.date}</Text>
              </View>
              <View style={styles.cardMiddleContainer}>
                <View>
                  <Text style={styles.marketName}>
                    {transaction.marketName}
                  </Text>
                </View>
                <View style={styles.cardMiddleRightContainer}>
                  <Text style={styles.historyType}>
                    {transaction.historyType}
                  </Text>
                  <Text style={styles.amount}>{transaction.amount}</Text>
                </View>
              </View>
              <View style={styles.cardBottomContainer}>
                <Text>남은 금액</Text>
                <Text>{transaction.remainingBalance}</Text>
              </View>
            </View>
          ))}
          <View style={styles.bottomConatiner}>
            <View style={styles.moreButtonContainer}>
              <Text>더보기</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountInfoContainer: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_100,
    paddingHorizontal: 29,
  },
  parentAccountInfoContainer: {
    width: 309,
    height: 166,
    backgroundColor: colors.WHITE,
    borderRadius: 6,
  },
  parentInfoTop: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  parentInfoTopBankInfo: {
    marginLeft: 'auto',
    marginRight: 7,
  },
  parentInfoMiddle: {
    flexDirection: 'row',
    width: '100%',
    flexGrow: 1,
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1,
  },
  parentBalanceHeader: {
    marginTop: 'auto',
    marginBottom: 16,
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 16,
  },
  parentBalanceText: {
    marginTop: 'auto',
    marginBottom: 16,
    marginLeft: 10,
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 25,
  },
  parentInfoBottom: {
    flexDirection: 'row',
    width: '100%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTop: {
    width: '100%',
    flexGrow: 1,
  },
  infoTopTop: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  accountNumberHeaderContainer: {
    width: 66,
    height: 22,
    backgroundColor: colors.YELLOW_50,
    borderRadius: 6,
    marginTop: 'auto',
    textAlign: 'center',
    alignItems: 'center',
  },
  infoTopBottom: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  accountNumberContentsContainer: {
    flexDirection: 'row',
  },
  accountNumber: {
    fontFamily: 'GmarketSansTTFBold',
    marginLeft: 8,
  },
  infoBottom: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  balanceContainer: {
    marginLeft: 5,
    flexDirection: 'row',
  },
  balanceHeaderContainer: {
    justifyContent: 'flex-end',
  },
  balanceTextContainer: {
    justifyContent: 'flex-end',
  },
  balanceHeader: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 16,
  },
  balanceText: {
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 25,
  },
  accountHistoryContainer: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  accountHistoryHeader: {
    flexDirection: 'row',
    height: 58,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1,
  },
  accountHistoryCard: {
    height: 115,
    flexShrink: 0,
    paddingHorizontal: 9,
    backgroundColor: colors.WHITE,
    borderBottomColor: colors.GRAY_100,
    borderBottomWidth: 1,
  },
  cardTopContainer: {
    marginTop: 14,
  },
  cardMiddleContainer: {
    height: 40,
    marginTop: 10,
    flexDirection: 'row',
  },
  marketName: {
    marginTop: 'auto',
    fontSize: 18,
  },
  cardMiddleRightContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  historyType: {
    marginTop: 'auto',
    fontSize: 12,
  },
  amount: {
    marginLeft: 4,
    marginTop: 'auto',
    fontSize: 18,
  },
  cardBottomContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  scrollViewContent: {
    paddingBottom: 20,
  },

  bottomConatiner: {
    height: 78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonContainer: {
    width: 102,
    height: 29,
    backgroundColor: colors.YELLOW_100,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountHistoryScreen;
