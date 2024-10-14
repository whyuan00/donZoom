import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MissionProfile from '../../components/MissionProfile';
import MissionTabNavigator from '../../../navigation/MissionTabNavigator';
import { colors } from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const MissionHomeScreen = ({route}:any) => {
  const child = route.params?.child
  return (
    <SafeAreaView style={styles.container}>
      <MissionProfile name={child ? `${child.name}의 미션 현황` : '선택된 아이가 없습니다'} />
      <MissionTabNavigator childId={child?.id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
    backgroundColor:colors.WHITE,
  },
});

export default MissionHomeScreen;
