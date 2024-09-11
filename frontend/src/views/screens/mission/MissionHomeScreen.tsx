import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MissionProfile from '../../components/MissionProfile';
import MissionTabNavigator from '../../../navigation/MissionTabNavigator';

const MissionHomeScreen = () => {
  return (
    <View style={styles.container}>
        <MissionProfile name="이아이" />
      <MissionTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정
    justifyContent: 'flex-start', // 내용이 화면 상단에 위치하도록 설정
    alignItems: 'stretch', // 자식 컴포넌트가 화면의 가로를 채우도록 설정
  },
});

export default MissionHomeScreen;
