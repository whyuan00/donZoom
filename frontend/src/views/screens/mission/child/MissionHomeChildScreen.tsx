import React from 'react';
import {StyleSheet, Text, View,SafeAreaView} from 'react-native';
import MissionProfile from '../../../components/MissionProfile';
import MissionChildTabNavigator from '@/navigation/MissionChildTabNavigator';
import {colors} from '@/constants/colors';

const MissionHomeChildScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MissionProfile name="이아이(닉네임)" />
      <MissionChildTabNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.WHITE,
  },
});

export default MissionHomeChildScreen;
