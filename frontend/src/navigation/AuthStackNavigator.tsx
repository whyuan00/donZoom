import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

import AuthHomeScreen from '../views/screens/auth/AuthHomeScreen';
import LoginScreen from '../views/screens/auth/LoginScreen';
import MissionHomeScreen from '../views/screens/mission/MissionHomeScreen';
import MakeNewMissionScreen from '../views/screens/mission/MakeNewMissionScreen';
import MakeNewMissionPayScreen from '@/views/screens/mission/MakeNewMissionPayScreen';
import MakeNewMissionCompleteScreen from '@/views/screens/mission/MakeNewMIssionCompleteScreen';
import SignupScreen from '../views/screens/auth/SignupScreen';
import CheckFamilyScreen from '@/views/screens/auth/CheckFamilyScreen';
import NickNameScreen from '@/views/screens/auth/NickNameScreen';

import AccountHistoryScreen from '@/views/screens/account/AccountHistoryScreen';
import DrawMachineScreen from '@/views/screens/draw/DrawMachineScreen';
import DrawCollectionScreen from '@/views/screens/draw/DrawCollectionScreen';
import CollectionButton from '@/assets/collectionButton.svg';
import QuizHomeScreen from '@/views/screens/quiz/QuizHomeScreen';
import MyInformationScreen from '@/views/screens/myPage/MyInformationScreen';
import AlarmSettingScreen from '@/views/screens/myPage/AlarmSettingScreen';
import SecuritySettingScreen from '@/views/screens/myPage/SecuritySettingScreen';
import AlarmScreen from '@/views/screens/alarm/AlarmScreen';
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Check" component={CheckFamilyScreen} />
      <Stack.Screen name="NickName" component={NickNameScreen} />

      <Stack.Screen
        name="AccountChildHistory"
        component={AccountHistoryScreen}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({});
export default AuthStackNavigator;
