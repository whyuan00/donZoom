import {useState} from 'react';
import {usePigStore} from '@/stores/pigStore';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {colors} from '../../../constants/colors';
import DrawList from '../../components/DrawList';

import DrawMachineSVG from '../../../assets/drawMachine.svg';
import CloseButton from '../../../assets/closeButton.svg';

function DrawMachineScreen({}) {
  const {
    pigs,
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
  } = usePigStore();
  const [isModalVisible, setModalVisible] = useState(false);

  // 1회 뽑기
  const drawCard = () => {
    // 카드 랜덤으로 뽑기
    const randomCard = Math.floor(Math.random() * pigs.length);
    const selected = pigs[randomCard];

    setSelectedCard(selected);
    addPigHistory(selected);

    // 뽑은 카드인지 체크
    const isNew = !selected.owned;
    setIsNewCard(isNew);
    if (isNew) addOwnedPig(selected);

    // 1회 뽑기 모달창 열기
    setIsManyDraws(false);
    setModalVisible(true);
  };

  // 5회 뽑기
  const drawManyCard = () => {
    const drawnCards = [];
    const newCards = [];

    // 5회 뽑은 카드 배열 만들기
    for (let i = 0; i < 5; i++) {
      const randomCard = Math.floor(Math.random() * pigs.length);
      const card = pigs[randomCard];
      drawnCards.push(card);
      addPigHistory(card);

      // 뽑은 카드인지 체크
      const isNew = !card.owned;
      newCards.push(isNew);
      if (isNew) addOwnedPig(card);
    }

    setSelectedManyCards(drawnCards); // 이번에 뽑은 카드 내역
    setIsNewCards(newCards);

    // 5회 뽑기 모달창 열기
    setIsManyDraws(true);
    setModalVisible(true);
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
      <View>
        <Text style={styles.listTitle}>나의 돼지 뽑기 내역</Text>
        {pigHistory
          .slice()
          .reverse()
          .map((drewItem, index) => (
            <DrawList
              key={`${drewItem.id}-${index}`} // key값이 고유해야하기 때문에 id와 date 조합
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
                    <card.image width={60} height={60} />
                    <Text style={styles.manyPigName}>{card.name}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.modalRow}>
                {selectedManyCards?.slice(3, 5).map((card, index) => (
                  <View key={index + 3} style={styles.manyCardsContainer}>
                    {isNewCards && isNewCards[index + 3] && (
                      <Text style={styles.manyNewText}>New!</Text>
                    )}
                    <card.image width={60} height={60} />
                    <Text style={styles.manyPigName}>{card.name}</Text>
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
                <selectedCard.image
                  width={180}
                  height={180}
                  marginBottom={30}
                />
              )}

              {selectedCard && (
                <>
                  <Text style={styles.pigName}>{selectedCard.name}</Text>
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
  pigImage: {
    marginBottom: 40,
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
