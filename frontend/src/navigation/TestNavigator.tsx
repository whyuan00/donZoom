import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../constants/colors';

import AuthHomeScreen from '../views/screens/auth/AuthHomeScreen';
import LoginScreen from '../views/screens/auth/LoginScreen';
import MissionHomeScreen from '../views/screens/mission/MissionHomeScreen';
import MakeNewMissionScreen from '../views/screens/mission/MakeNewMissionScreen';
import SignupScreen from '../views/screens/auth/SignupScreen';
import CheckFamilyScreen from '@/views/screens/auth/CheckFamilyScreen';
import NickNameScreen from '@/views/screens/auth/NickNameScreen';
import TestScreen from '@/views/screens/auth/TestScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({});
export default AuthStackNavigator;
