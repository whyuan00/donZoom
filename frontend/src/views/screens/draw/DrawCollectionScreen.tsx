import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {usePigStore} from '@/stores/pigStore';

import CloseButton from '@/assets/closeButton.svg';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';

function DrawCollectionScreen() {
  const {pigs, selectedCard, setSelectedCard} = usePigStore();
  const [filter, setFilter] = useState('전체보기');
  const [isModalVisible, setModalVisible] = useState(false);

  // 필터
  const getFilteredPigs = () => {
    switch (filter) {
      case '보유한 돼지':
        return pigs.filter(pig => pig.owned);
      case '미보유 돼지':
        return pigs.filter(pig => !pig.owned);
      default:
        return pigs;
    }
  };

  const filteredPigs = getFilteredPigs().sort((a, b) => a.id - b.id);

  // 모달
  const handleCardPress = (pig: typeof selectedCard) => {
    setSelectedCard(pig);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={itemValue => setFilter(itemValue)}>
          <Picker.Item
            label="전체보기"
            value="전체보기"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="보유한 돼지"
            value="보유한 돼지"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="미보유 돼지"
            value="미보유 돼지"
            style={styles.pickerItem}
          />
        </Picker>
        {filter === '전체보기' && (
          <View>
            <Text style={styles.hasPig}>
              {pigs.filter(pig => pig.owned).length} / {pigs.length}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.collectionContainer}>
        <FlatList
          data={filteredPigs}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              <View style={styles.pigContainer}>
                {item.owned ? (
                  <item.image width={70} height={70} />
                ) : (
                  <item.silhouette width={70} height={70} />
                )}
                <Text style={styles.pigName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={styles.modalBackground}
          onTouchEnd={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <CloseButton />
            </TouchableOpacity>
            {selectedCard && (
              <>
                {selectedCard.owned ? (
                  <selectedCard.image
                    width={180}
                    height={180}
                    marginBottom={30}
                  />
                ) : (
                  <selectedCard.silhouette
                    width={180}
                    height={180}
                    marginBottom={30}
                  />
                )}
                <Text style={styles.pigNameModal}>{selectedCard.name}</Text>
                <Text style={styles.pigDescriptionModal}>
                  {selectedCard.description}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    alignItems: 'center',
  },
  picker: {
    width: 150,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  pickerItem: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  hasPig: {
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_100,
  },
  collectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 200,
  },
  pigContainer: {
    width: 110,
    height: 150,
    backgroundColor: colors.YELLOW_75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 13,
    elevation: 4,
    paddingTop: 10,
  },
  pigName: {
    marginTop: 15,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  pigNameModal: {
    marginBottom: 15,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 20,
  },
  pigDescriptionModal: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 280,
    height: 400,
    backgroundColor: colors.YELLOW_100,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default DrawCollectionScreen;
