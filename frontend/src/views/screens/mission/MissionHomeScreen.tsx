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

const MissionHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <MissionProfile name="이아이" />
      <MissionTabNavigator />
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
