import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {colors} from '../../constants/colors';
import DrawList from '../components/DrawList';

import DrawMachineSVG from '../../assets/drawMachine.svg';
import SunoPig from '../../assets/sunoPig.svg';
import CloseButton from '../../assets/closeButton.svg';

interface Card {
  id: number;
  name: string;
  description: string;
  image: any;
}

interface drewCard {
  id: number;
  date: string;
}

// dummy 데이터
const dummyCards = [
  {
    id: 1,
    name: '기본 돼지',
    description: '이 돼지는 기본 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 2,
    name: '황금 돼지',
    description: '황금으로 빛나는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 3,
    name: '행운의 돼지',
    description: '행운을 가져다 주는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 4,
    name: '건강 돼지',
    description: '건강한 삶을 위한 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 5,
    name: '부자 돼지',
    description: '부자가 되길 바라는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 6,
    name: '사랑 돼지',
    description: '사랑을 가져다주는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 7,
    name: '성공 돼지',
    description: '성공을 향한 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 8,
    name: '행복 돼지',
    description: '행복을 나누는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 9,
    name: '평화 돼지',
    description: '평화를 상징하는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 10,
    name: '기적 돼지',
    description: '기적을 불러오는 돼지입니다.',
    image: SunoPig,
  },
  {
    id: 11,
    name: '순호 돼지',
    description: '순호는 돼지입니다.',
    image: SunoPig,
  },
];

function DrawMachineScreen({}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNewCard, setIsNewCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [getCardsTypeList, setGetCardsTypeList] = useState<Card[]>([]);
  const [drewCardsList, setDrewCardsList] = useState<drewCard[]>([]);

  // 1회 뽑기
  const drawCard = () => {
    // 카드 랜덤으로 뽑기
    const randomCard = Math.floor(Math.random() * dummyCards.length);
    const selectedCard = dummyCards[randomCard];
    setSelectedCard(selectedCard);

    // 뽑은 카드내역 리스트에 추가
    const currntDate = new Date().toLocaleString();
    setDrewCardsList([
      ...drewCardsList,
      {id: selectedCard.id, date: currntDate},
    ]);

    // 뽑은 카드인지 체크
    setIsNewCard(false);
    if (!getCardsTypeList.some(card => card.id === selectedCard.id)) {
      console.log("새로 뽑은 카드!");
      setIsNewCard(true);
      setGetCardsTypeList([...getCardsTypeList, selectedCard]);
    }

    // 모달창 열기
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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>5회 뽑기</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tempText}>돼지를 뽑아라!</Text>
      </View>
      <View>
        <Text style={styles.listTitle}>나의 돼지 뽑기 내역</Text>
        {drewCardsList.slice().reverse().map((drewItem, index) => {
          const cardInfo = dummyCards.find(card => card.id === drewItem.id);
          return (
            <DrawList
              key={`${drewItem.id}-${drewItem.date}`} // key값이 고유해야하기 때문에 id와 date 조합
              cardName={cardInfo?.name || '알 수 없는 카드'}
              date={drewItem.date}
              style={[
                styles.drawList,
                index % 2 === 0 ? styles.evenItem : styles.oddItem,
              ]}
            />
          );
        })}
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
            {selectedCard &&
              isNewCard && (
                <Text style={styles.newText}>New!</Text>
              )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <CloseButton />
            </TouchableOpacity>

            {selectedCard && (
              <selectedCard.image width={180} height={180} marginBottom={30} />
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
  newText: {
    position: 'absolute',
    top: 20,
    fontSize: 18,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
  },
  pigImage: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  pigName: {
    color: colors.BLACK,
    fontFamily: 'GmarketSansTTFBold',
    fontSize: 20,
    marginBottom: 20,
  },
  pigDescription: {
    color: colors.BLACK,
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 14,
  },
});

export default DrawMachineScreen;
