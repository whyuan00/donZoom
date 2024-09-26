import { colors } from '@/constants/colors';
import { fonts } from '@/constants/font';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function UnsafeAssetDetailScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1일'); // 기본 기간 선택
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 메뉴 표시 상태
  const [selectedStock, setSelectedStock] = useState<string>('종목 선택'); // 기본 종목 선택 상태

  // 종목 선택 옵션
  const domesticStocks = ['삼성전자', 'LG전자', '네이버', '카카오'];
  const foreignStocks = ['Apple', 'Google', 'Tesla'];

  // 종목 선택 시
  const handleStockChange = (stock: string) => {
    setSelectedStock(stock);
    setIsDropdownVisible(false); // 드롭다운 메뉴 닫기
  };

  // 드롭다운 버튼 토글
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // 기간 선택 변경
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  // 선택된 종목과 기간에 따라 데이터를 렌더링하는 함수
  const renderStockData = () => {
    if (selectedStock === '종목 선택') {
      return <Text>먼저 종목을 선택해주세요.</Text>;
    }

    return (
      <Text>
        {selectedStock}의 {selectedPeriod} 동안의 데이터
      </Text>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.assetTitle}>위험자산</Text>

        {/* 우측 상단 종목 선택 버튼 */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
            <View style={styles.dropdownButtonContainer}>
              <Text style={styles.dropdownButtonText}>{selectedStock}</Text>
              <Icon name={isDropdownVisible ? "up" : "down"} size={15} color="#6B7280" style={styles.dropdownIcon} />
            </View>
          </TouchableOpacity>

          {/* 드롭다운 메뉴 */}
          {isDropdownVisible && (
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownSectionTitle}>국내주식</Text>
              <View style={styles.leftBorder}></View>
              {domesticStocks.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOption}
                  onPress={() => handleStockChange(option)}
                >
                  <Text style={[styles.dropdownText, selectedStock === option && styles.selectedText]}>{option}</Text>
                </TouchableOpacity>
              ))}
              <Text style={styles.dropdownSectionTitle}>해외주식</Text>
              <View style={styles.leftBorder}></View>
              {foreignStocks.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOption}
                  onPress={() => handleStockChange(option)}
                >
                  <Text style={[styles.dropdownText, selectedStock === option && styles.selectedText]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 기간 선택 */}
      <View style={styles.periodButtonContainer}>
        {['1일', '1주', '3달', '1년', '5년', '전체'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton,
            ]}
            onPress={() => handlePeriodChange(period)}
          >
            <Text
              style={
                selectedPeriod === period ? styles.selectedPeriodText : styles.unselectedPeriodText
              }
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 선택된 종목과 기간에 따른 데이터 렌더링 */}
      <View style={styles.stockDataContainer}>
        {renderStockData()}
      </View>

      {/* 추가 UI 예시 */}
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.buyButton]}>
          <Text style={styles.buttonText}>매수</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.sellButton]}>
          <Text style={styles.buttonText}>매도</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  assetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
  },
  dropdownButton: {
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dropdownContainer: {
    position: 'absolute', // 절대 위치를 설정하여 다른 요소 위에 나타남
    top: 20, // 상단에 위치한 버튼으로부터 아래로 약간 떨어짐
    right: 0,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 0,
    width:91,
    height:193,
    zIndex: 9999, // 드롭다운이 다른 모든 요소들보다 위에 나타나도록 zIndex를 크게 설정
  },
  dropdownOption: {},
  dropdownText: {
    fontSize: 9,
    color: '#000',
    lineHeight: 16,
    textAlign: 'right',
  },
  dropdownSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    paddingVertical: 5,
    marginLeft: 5,
  },
  selectedText: {
    fontWeight: 'bold',
  },
  periodButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  periodButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedPeriodButton: {
    backgroundColor: '#FFE999',
    borderColor: '#FFE999',
  },
  selectedPeriodText: {
    color: '#000',
    fontWeight: 'bold',
  },
  unselectedPeriodText: {
    color: '#ccc',
  },
  stockDataContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  actionButton: {
    width: 100,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    backgroundColor: 'red',
  },
  sellButton: {
    backgroundColor: 'blue',
  },
  dropdownButtonContainer: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 정렬
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    textDecorationLine: 'underline', // 텍스트에만 밑줄 적용
  },
  dropdownIcon: {
    marginLeft: 5, // 텍스트와 아이콘 사이에 약간의 간격 추가
  },
  dropdownTitleText: {
    fontFamily: fonts.LIGHT,
    color: '#6B7280',
    fontSize: 15,
  },
  leftBorder: {
    borderTopWidth: 1,
    borderTopColor: '#6B7280',
    width: '75%', // 상단 경계선의 길이를 75%로 설정
    alignSelf: 'left', // 왼쪽 정렬
  },
});
