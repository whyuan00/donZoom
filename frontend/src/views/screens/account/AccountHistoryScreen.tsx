import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useAccount from '@/hooks/queries/useAccount';
import useAccountBalance from '@/hooks/useAccountInfo';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

function AccountHistoryScreen({navigation}: any) {
  const isParent = true;
  const [selected, setSelected] = useState('아이');
  const {account, balance, error, refetch} = useAccountBalance();
  const {useGetAccountHistory} = useAccount();
  const {data} = useGetAccountHistory(
    account,
    '20241001',
    '20241004',
    'A',
    'ASC',
  );

  const transactionList = data?.rec.list;

  interface RawTransaction {
    transactionUniqueNo: string;
    transactionDate: string;
    transactionTime: string;
    transactionType: string;
    transactionTypeName: string;
    transactionAccountNo: string;
    transactionBalance: string;
    transactionAfterBalance: string;
    transactionSummary: string;
    transactionMemo: string;
  }

  interface TransformedTransaction {
    date: string;
    marketName: string;
    historyType: string;
    amount: string;
    remainingBalance: string;
  }

  const transformTransactionData = (
    rawData: RawTransaction[] | undefined,
  ): TransformedTransaction[] => {
    if (!rawData) return [];

    return rawData.map((transaction: RawTransaction) => {
      const date = new Date(
        parseInt(transaction.transactionDate.slice(0, 4)),
        parseInt(transaction.transactionDate.slice(4, 6)) - 1,
        parseInt(transaction.transactionDate.slice(6, 8)),
        parseInt(transaction.transactionTime.slice(0, 2)),
        parseInt(transaction.transactionTime.slice(2, 4)),
        parseInt(transaction.transactionTime.slice(4, 6)),
      );

      const formattedDate = `${date.getFullYear()}.${
        date.getMonth() + 1
      }.${date.getDate()}. ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;

      const historyType =
        transaction.transactionType === '1' ? '입금된 금액' : '사용한 금액';
      const amount =
        transaction.transactionType === '1'
          ? `+${parseInt(transaction.transactionBalance).toLocaleString()}원`
          : `-${parseInt(transaction.transactionBalance).toLocaleString()}원`;

      return {
        date: formattedDate,
        marketName: transaction.transactionSummary,
        historyType: historyType,
        amount: amount,
        remainingBalance: `${parseInt(
          transaction.transactionAfterBalance,
        ).toLocaleString()}원`,
      };
    });
  };

  const transactionData = transformTransactionData(transactionList);

  return (
    <View style={styles.container}>
      {isParent ? (
        <View style={styles.accountInfoContainer}>
          <View style={styles.parentAccountInfoContainer}>
            <View style={styles.parentInfoTop}>
              <Text style={styles.parentInfoTopBankInfo}>아이 계좌 번호</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.parentInfoTopBankInfo}>싸피은행</Text>
                <Text style={styles.parentInfoTopBankInfo}>{account}</Text>
              </View>
            </View>
            <View style={styles.parentInfoMiddle}>
              <Text style={styles.parentBalanceHeader}>남은 금액</Text>
              <Text style={styles.parentBalanceText}>
                {parseInt(balance).toLocaleString()}원
              </Text>
            </View>
            <Pressable
              style={styles.parentInfoBottom}
              onPress={() => navigation.navigate('송금')}>
              <Text style={styles.text}>용돈 보내기</Text>
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
  text: {
    fontFamily: fonts.LIGHT,
    color: colors.BLACK,
  },
  accountInfoContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLOW_100,
    paddingHorizontal: 29,
  },
  parentAccountInfoContainer: {
    width: 309,
    height: 166,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
  parentInfoTop: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  parentInfoTopBankInfo: {
    fontFamily: fonts.LIGHT,
    fontSize: 12,
    color: colors.BLACK,
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
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    color: colors.BLACK,
  },
  parentBalanceText: {
    marginTop: 'auto',
    marginBottom: 16,
    marginLeft: 10,
    fontFamily: fonts.MEDIUM,
    fontSize: 25,
    color: colors.BLACK,
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
    backgroundColor: 'red',
  },
  infoTopTop: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  accountNumberHeaderContainer: {
    width: 66,
    height: 22,
    // backgroundColor: colors.YELLOW_50,
    borderRadius: 6,
    marginTop: 'auto',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
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
    fontFamily: fonts.LIGHT,
    fontSize: 16,
    color: colors.BLACK,
  },
  balanceText: {
    fontFamily: fonts.LIGHT,
    fontSize: 25,
    color: colors.BLACK,
  },
  accountHistoryContainer: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: colors.WHITE,
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
  balance: {
    fontFamily: fonts.LIGHT,
    color: colors.BLACK,
  },
});

export default AccountHistoryScreen;
