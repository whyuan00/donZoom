import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '@/constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MakeNewMissionCompleteScreen = ({navigation, route}: any) => {
  const {text, selectedDate, pay} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* 아이콘 */}
      <Icon name="clipboard-text-outline" size={135} />
      <Text style={{margin:12,fontSize: 25, fontWeight: '500', color: colors.BLACK}}>
        미션 생성 완료
      </Text>
      <View style={styles.missionbox}>
        <Text style={styles.missionText}>{text}</Text>
        <Text style={styles.payText}>{pay} 원</Text>
        <Text style={styles.missionText}>
          <Text style={{color: colors.BLUE_100}}>{selectedDate}</Text> 까지
          미션을 완료해주세요!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          navigation.navigate('Mission');
        }}>
        <Text style={{color:colors.BLACK,fontSize:18,fontWeight:'500',textAlign:'center',padding:10,}}>확인</Text>
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
    fontWeight: '700',
    color: colors.BLUE_100,
  },
  missionText: {
    fontSize: 15,
    color: colors.GRAY_100,
    fontWeight: '500',
  },
  confirmButton: {
    position: 'absolute',
    bottom:35,
    width: 300,
    height: 50,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
});

export default MakeNewMissionCompleteScreen;
