import React, {useCallback, useState, useEffect} from 'react';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import axiosInstance from '@/api/axios';

interface News {
  newsId: number;
  title: string;
  contents: string;
  createdAt: string;
  source: string;
}

const RealAssetPastScreen = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(`/news/5`);
        const news = response.data;
        setNewsData(news);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  },[]);

 const switchSortOrder = () => {
   setNewsData(prevData => [...prevData].reverse());
   setSortedByCreatedAt(prev => !prev);
 };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={switchSortOrder}>
        {sortedByCreatedAt ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.buttonText}>최신순 </Text>
            <Icon name="chevron-down" size={25} />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.buttonText}>시간순 </Text>
            <Icon name="chevron-up" size={25} />
          </View>
        )}
      </TouchableOpacity>
      <ScrollView>
        {newsData.map(news => (
          <TouchableOpacity key={news.newsId} style={styles.newsContainer}>
            <View style={{flex: 0.8, marginRight: 15}}>
              <Text style={styles.headText}>{news.title}</Text>
              <Text style={styles.sourceText}>
                {news.createdAt.slice(0, 20).replaceAll('-', '.')} ·{' '}
                {news.source}
              </Text>
            </View>
            <Image
              style={styles.image}
              source={require('@/assets/gold.png')}></Image>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RealAssetPastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  buttonContainer: {
    marginTop:20,
    marginLeft:30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText:{
    fontFamily:fonts.BOLD,
  },
  newsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 0.5,
  },
  headText: {
    fontFamily: fonts.MEDIUM,
    color:colors.BLACK,
    fontSize: 16,
  },
  sourceText: {
    fontFamily: fonts.LIGHT,
    fontSize: 12,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
});
