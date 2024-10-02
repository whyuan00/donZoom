import React, {useCallback,useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '@/constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axiosInstance from '@/api/axios';
import { fonts } from '@/constants/font';

const MakeNewMissionCompleteScreen = ({navigation, route}: any) => {
  const {text, selectedDate, pay} = route.params;
  const [childId, setChildId] = useState<number>(0); //TODO: childId zustand에 저장한다음에 불러와야함

  const sendMissionInfo= async(text:String,pay:number,selectedDate:string) =>{
    try{
      await axiosInstance.post(`/mission&childId=${childId}`,{
        contents:text,
        due_date:selectedDate,
        reward:pay
      })
      console.log('새로운 미션 생성')
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Icon name="clipboard-text-outline" size={135} />
      <Text
        style={{
          margin: 12,
          fontFamily: fonts.MEDIUM,
          fontSize: 25,
          fontWeight: '500',
          color: colors.BLACK,
        }}>
        미션 생성 완료
      </Text>
      <View style={styles.missionbox}>
        <Text style={styles.missionText}>{text}</Text>
        <Text style={styles.payText}>{pay.toLocaleString()} 원</Text>
        <Text style={styles.missionText}>
          <Text style={{color: colors.BLUE_100}}>
            {selectedDate.replaceAll('-', '.')}
          </Text>{' '}
          까지 미션을 완료해주세요!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          console.log('Button pressed');
          sendMissionInfo(text, pay, selectedDate);
          navigation.navigate('MissionParent', {screen: '진행중'});
        }}>
        <Text
          style={{
            color: colors.BLACK,
            fontSize: 18,
            fontFamily: fonts.MEDIUM,
            fontWeight: '500',
            textAlign: 'center',
            padding: 10,
          }}>
          확인
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.YELLOW_25,
    alignItems: 'center',
    paddingTop: 100,
  },
  missionbox: {
    marginTop: 15,
    width: 330,
    height: 150,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'space-evenly',
  },
  payText: {
    fontSize: 24,
    fontFamily: fonts.BOLD,
    fontWeight: '700',
    color: colors.BLUE_100,
  },
  missionText: {
    fontSize: 15,
    fontFamily: fonts.MEDIUM,
    color: colors.GRAY_100,
    fontWeight: '500',
  },
  confirmButton: {
    position: 'absolute',
    bottom: 40,
    width: 300,
    height: 50,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
});

export default MakeNewMissionCompleteScreen;
