import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from 'react-native';
import RealAssetScreen from './RealAssetDetailScreen';
import RiskAssetScreen from './RiskAssetDetailScreen';
import Icon from 'react-native-vector-icons/AntDesign';

export default function DetailScreen() {
  const [selectedAsset, setSelectedAsset] = useState<string>('위험자산'); // 기본 자산 선택
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // 모달 상태
  const [selectedDescription, setSelectedDescription] = useState<string>(''); // 설명 상태

  // 자산 종류 변경
  const handleAssetChange = (asset: string) => {
    setSelectedAsset(asset);
  };

  // 설명 모달 열기
  const openDescriptionModal = (asset: string) => {
    let description = '';
    switch (asset) {
      case '안전자산':
        description = '안전자산이란 위험이 없는 금융 자산으로, 채무불이행 위험이 없어 "무위험자산"이라고도 합니다.';
        break;
      case '실물자산':
        description = '실물자산은 금, 부동산 등 실물로 존재하는 자산을 의미하며, 경제 변동에 강한 자산으로 간주됩니다.';
        break;
      case '위험자산':
        description = '위험자산은 주식이나 선물과 같이 수익률 변동성이 높은 자산을 의미합니다.';
        break;
      default:
        description = '설명할 자산이 선택되지 않았습니다.';
        break;
    }
    setSelectedDescription(description);
    setIsModalVisible(true);
  };

  // 설명 모달 닫기
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedDescription('');
  };

  // 선택한 자산에 따른 페이지 렌더링
  const renderSelectedAssetScreen = () => {
    switch (selectedAsset) {
      case '실물자산':
        return <RealAssetScreen />;
      case '위험자산':
        return <RiskAssetScreen />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 상단 자산 선택 버튼 */}
      <View style={styles.assetButtonContainer}>
        <TouchableOpacity
          style={[styles.assetButton, selectedAsset === '안전자산' && styles.selectedButton]}
          onPress={() => handleAssetChange('안전자산')}
        >
          <Text style={selectedAsset === '안전자산' ? styles.selectedText : styles.unselectedText}>
            안전자산
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.assetButton, selectedAsset === '실물자산' && styles.selectedButton]}
          onPress={() => handleAssetChange('실물자산')}
        >
          <Text style={selectedAsset === '실물자산' ? styles.selectedText : styles.unselectedText}>
            실물자산
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.assetButton, selectedAsset === '위험자산' && styles.selectedButton]}
          onPress={() => handleAssetChange('위험자산')}
        >
          <Text style={selectedAsset === '위험자산' ? styles.selectedText : styles.unselectedText}>
            위험자산
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoIcon}
          onPress={() => openDescriptionModal(selectedAsset)} // 설명 모달 열기
        >
          <Icon name="infocirlceo" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* 선택된 자산에 따른 페이지 렌더링 */}
      <View style={styles.assetDetailContainer}>{renderSelectedAssetScreen()}</View>

      {/* 설명 모달 */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedAsset} 설명</Text>
            <Text style={styles.modalDescription}>{selectedDescription}</Text>
            <Button title="닫기" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  assetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
  },
  assetButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: '#FFE999',
    borderColor: '#FFE999',
  },
  selectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#ccc',
  },
  assetDetailContainer: {
    flex: 1,
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoIcon:{
    paddingVertical: 10,
  },
});
