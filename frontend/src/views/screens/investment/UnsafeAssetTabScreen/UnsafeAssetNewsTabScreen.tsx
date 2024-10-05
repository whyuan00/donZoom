import React, {useCallback, useState, useMemo} from 'react';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '@/api/axios';
import {useFocusEffect} from '@react-navigation/native';
import {getStock} from '@/api/stock';

interface News {
  newsId: number;
  title: string;
  contents: string;
  createdAt: string;
  source: string;
}
type StockName =
  | '삼성전자'
  | 'LG전자'
  | '네이버'
  | '카카오'
  | '금'
  | 'Apple'
  | 'Google'
  | 'Tesla';

const StockId: Record<StockName, number> = {
  삼성전자: 1,
  LG전자: 2,
  네이버: 3,
  카카오: 4,
  금: 5,
  Apple: 6,
  Google: 7,
  Tesla: 8,
};


const UnsafeAssetNewsTabScreen = ({navigation, selectedStock}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [todaysNews, setTodaysNews] = useState<News[]>([]);

  const getStockId = (selectedStock: string): number | undefined => {
    return StockId[selectedStock as StockName];
  };

  const stockId = useMemo(() => getStockId(selectedStock), [selectedStock]);
  
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const response = await axiosInstance.get(`/news/${stockId}/today`);
          const news = response.data;
          setTodaysNews(news);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }, [stockId]),
  );

  const openModal = (news: News) => {
    setSelectedNews(news);
    setModalVisible(true);
  };

  const formatTitle = (title: string) => {
    const words = title.split(' ');
    let formattedTitle = '';
    let currentLineLength = 0;
    for (let word of words) {
      if (currentLineLength + word.length + 1 > 15) {
        if (formattedTitle.includes('\n')) {
          formattedTitle += '...';
          break;
        }
        formattedTitle += '\n' + word + ' ';
        currentLineLength = word.length + 1;
      } else {
        formattedTitle += word + ' ';
        currentLineLength += word.length + 1;
      }
    }
    return formattedTitle.trim();
  };

  // 스톡아이디 없는경우
  if (!stockId) {
    return (
      <View style={styles.container}>
        <Text>종목을 선택해주세요</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {todaysNews.map(news => (
        <TouchableOpacity
          onPress={() => openModal(news)}
          key={news.newsId}
          style={styles.newsContainer}>
          <Text style={styles.headText}> {formatTitle(news.title)}</Text>
          <View style={{marginLeft: 210}}>
            <Text style={styles.headContentText}> {news.source}</Text>
            <Text style={styles.headContentText}>
              {news.createdAt.substring(0, 10).replaceAll('-', '.')}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <View>
        <Modal animationType="fade" visible={modalVisible} transparent={true}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.headText}> {selectedNews?.title}</Text>
                  <View style={{marginTop: 15, flex: 1}}>
                    <ScrollView>
                      <Text style={styles.modalBodyText}>
                        {selectedNews?.contents}
                      </Text>
                    </ScrollView>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('UnsafeAssetPastNews',{stockId})}>
        <View style={styles.button}>
          <Text style={{fontFamily: fonts.MEDIUM, color: colors.BLACK}}>
            지난 뉴스 보기
          </Text>
          <Icon name="chevron-right" size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UnsafeAssetNewsTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    backgroundColor: colors.WHITE,
  },
  newsContainer: {
    height: 110,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.YELLOW_100,
    borderRadius: 10,
    padding: 20,
    margin: 5,
  },
  headText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
    color: colors.BLACK,
    textAlign: 'center',
    marginTop: 20,
  },
  headContentText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: colors.BLACK,
  },
  // 모달컨테이너 기본디자인 
  modalContainer: {
    flex: 1,
    width: '90%',
    maxHeight: '60%',
    backgroundColor: colors.YELLOW_50,
    paddingTop:10,
    paddingBottom:30,
    paddingHorizontal: 30,
  },
  modalBodyText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 15,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 200,
  },
});
