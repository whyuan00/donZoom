import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {usePigStore} from '@/stores/pigStore';
import usePig from '@/hooks/queries/usePig';
import {StyleSheet, Vibration} from 'react-native';
import {colors} from '../../../constants/colors';
import DrawList from '../../components/DrawList';
import DrawMachineSVG from '../../../assets/drawMachine.svg';
import CloseButton from '../../../assets/closeButton.svg';

function DrawMachineScreen({}) {
  const {
    addOwnedPig,
    pigHistory,
    addPigHistory,
    selectedCard,
    setSelectedCard,
    selectedManyCards,
    setSelectedManyCards,
    isNewCard,
    setIsNewCard,
    isNewCards,
    setIsNewCards,
    isManyDraws,
    setIsManyDraws,
    setPigs,
  } = usePigStore();
  const {drawPigMutation, getAllPigMutation} = usePig();
  const [isModalVisible, setModalVisible] = useState(false);

  // 전체 돼지 불러오기
  useEffect(() => {
    if (getAllPigMutation.isSuccess && getAllPigMutation.data) {
      setPigs(getAllPigMutation.data);
      // console.log('전체 돼지 가져오기: ', getAllPigMutation.data);
    }
  }, [getAllPigMutation.data, setPigs]);

  // 1회 뽑기
  const drawCard = async () => {
    try {
      const drawnPigs = await drawPigMutation.mutateAsync(1);
      console.log('drawnPigs: ', drawnPigs);
      const selected = {
        pigId: drawnPigs[0].pigId,
        pigName: drawnPigs[0].pigName,
        owned: false,
        description: drawnPigs[0].description,
        imageUrl: drawnPigs[0].imageUrl,
        silhouetteImageUrl: drawnPigs[0].silhouetteImageUrl,
        createdAt: drawnPigs[0].createdAt || null,
      };
      console.log('이거 뽑았어! ', selected);
      setSelectedCard(selected);
      addPigHistory(selected);

      const isNew = !selected.owned;
      setIsNewCard(isNew);
      if (isNew) addOwnedPig(selected);
      console.log('selectedCard: ', selectedCard);
      console.log('imageUrl: ', selectedCard?.imageUrl);
      // 1회 뽑기 모달창 열기
      setIsManyDraws(false);
      setModalVisible(true);
      Vibration.vibrate(100);
    } catch (error) {
      console.error('돼지 1회 뽑기 실패:', error);
    }
  };

  // 5회 뽑기
  const drawManyCard = async () => {
    try {
      const drawnPigs = await drawPigMutation.mutateAsync(5);
      const newCards: boolean[] = [];

      const drawnCards = drawnPigs.map(pig => ({
        pigId: pig.pigId,
        pigName: pig.pigName,
        owned: pig.createdAt !== null,
        description: pig.description,
        imageUrl: pig.imageUrl,
        silhouetteImageUrl: pig.silhouetteImageUrl,
        createdAt: pig.createdAt || null,
      }));

      drawnCards.forEach(card => {
        const isNew = !card.owned;
        newCards.push(isNew);
        if (isNew) addOwnedPig(card);
        addPigHistory(card);
      });

      setSelectedManyCards(drawnCards);
      setIsNewCards(newCards);
      setIsManyDraws(true);
      setModalVisible(true);
      Vibration.vibrate(500);
    } catch (error) {
      console.error('돼지 5회 뽑기 실패:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <DrawMachineSVG style={styles.drawMachine} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={drawCard}>
            <Text style={styles.buttonText}>1회 뽑기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={drawManyCard}>
            <Text style={styles.buttonText}>5회 뽑기</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tempText}>돼지를 뽑아라!</Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>나의 돼지 뽑기 내역</Text>
        {pigHistory
          .slice()
          .reverse()
          .map((drewItem, index) => (
            <DrawList
              key={`${drewItem.id}-${index}`}
              cardName={drewItem.name}
              date={drewItem.date}
              style={[
                styles.drawList,
                index % 2 === 0 ? styles.evenItem : styles.oddItem,
              ]}
            />
          ))}
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={styles.modalBackground}
          onTouchEnd={() => setModalVisible(false)}>
          {isManyDraws ? (
            <View style={styles.modalManyContainer}>
              <View style={styles.modalRow}>
                {selectedManyCards?.slice(0, 3).map((card, index) => (
                  <View key={index} style={styles.manyCardsContainer}>
                    {isNewCards && isNewCards[index] && (
                      <Text style={styles.manyNewText}>New!</Text>
                    )}
                    <Image
                      source={{uri: card.imageUrl}}
                      style={{width: 60, height: 60}}
                    />
                    <Text style={styles.manyPigName}>{card.pigName}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.modalRow}>
                {selectedManyCards?.slice(3, 5).map((card, index) => (
                  <View key={index + 3} style={styles.manyCardsContainer}>
                    {isNewCards && isNewCards[index + 3] && (
                      <Text style={styles.manyNewText}>New!</Text>
                    )}
                    <Image
                      source={{uri: card.imageUrl}}
                      style={{width: 60, height: 60}}
                    />
                    <Text style={styles.manyPigName}>{card.pigName}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.modalContainer}>
              {selectedCard && isNewCard && (
                <Text style={styles.newText}>New!</Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <CloseButton />
              </TouchableOpacity>
              {selectedCard && (
                <Image
                  source={{uri: selectedCard.imageUrl}}
                  style={{width: 180, height: 180, marginBottom: 30}}
                />
              )}
              {selectedCard && (
                <>
                  <Text style={styles.pigName}>{selectedCard.pigName}</Text>
                  <Text style={styles.pigDescription}>
                    {selectedCard.description}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 680,
    backgroundColor: colors.YELLOW_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawMachine: {
    justifyContent: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFFCF2',
    borderColor: colors.BLACK,
    borderWidth: 1,
    borderRadius: 13,
    width: 140,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: colors.BLACK,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'GmarketSansTTFMedium',
  },
  tempText: {
    color: colors.BLACK,
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: 'GmarketSansTTFBold',
  },
  listContainer: {
    backgroundColor: colors.WHITE,
    paddingBottom: 56,
  },
  listTitle: {
    color: colors.BLACK,
    fontSize: 20,
    lineHeight: 24,
    marginLeft: 24,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'GmarketSansTTFBold',
  },
  drawList: {
    width: '100%',
    height: 120,
  },
  oddItem: {
    backgroundColor: colors.WHITE,
  },
  evenItem: {
    backgroundColor: colors.YELLOW_25,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalManyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  manyCardsContainer: {
    backgroundColor: colors.YELLOW_100,
    borderRadius: 13,
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop: 15,
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
  manyNewText: {
    position: 'absolute',
    top: 13,
    fontSize: 12,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
  },
  newText: {
    position: 'absolute',
    top: 20,
    fontSize: 18,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
  },
  pigName: {
    color: colors.BLACK,
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 20,
    marginBottom: 20,
  },
  manyPigName: {
    color: colors.BLACK,
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 14,
    marginTop: 10,
  },
  pigDescription: {
    color: colors.BLACK,
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 14,
  },
});

export default DrawMachineScreen;
