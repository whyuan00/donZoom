import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

import AuthHomeScreen from '../views/screens/auth/AuthHomeScreen';
import LoginScreen from '../views/screens/auth/LoginScreen';
import MissionHomeScreen from '../views/screens/mission/MissionHomeScreen';
import MakeNewMissionScreen from '../views/screens/mission/MakeNewMissionScreen';
import SignupScreen from '../views/screens/auth/SignupScreen';
import CheckFamilyScreen from '@/views/screens/auth/CheckFamilyScreen';
import NickNameScreen from '@/views/screens/auth/NickNameScreen';

import AccountHistoryScreen from '@/views/screens/account/AccountHistoryScreen';
import DrawMachineScreen from '@/views/screens/draw/DrawMachineScreen';
import DrawCollectionScreen from '@/views/screens/draw/DrawCollectionScreen';
import CollectionButton from '@/assets/collectionButton.svg';
import QuizHomeScreen from '@/views/screens/quiz/QuizHomeScreen';
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Check" component={CheckFamilyScreen} />
      <Stack.Screen name="NickName" component={NickNameScreen} />

      {/* 임시로 미션페이지로 가는 링크 생성함 */}
      <Stack.Screen
        name="MakeNewMission"
        component={MakeNewMissionScreen}
        options={{title: '미션 생성'}}
      />
      <Stack.Screen
        name="Mission"
        component={MissionHomeScreen}
        options={({navigation}) => ({
          title: '미션',
          headerRight: () => {
            return (
              <Text
                onPress={() => navigation.navigate('MakeNewMission')}
                style={{color: colors.BLUE_100}}>
                추가
              </Text>
            );
          },
        })}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Check" component={CheckFamilyScreen} />
      <Stack.Screen
        name="AccountChildHistory"
        component={AccountHistoryScreen}
      />
      <Stack.Screen
        name="돼지뽑기"
        component={DrawMachineScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('돼지들')}>
              <CollectionButton width={24} height={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="돼지들" component={DrawCollectionScreen} />
      <Stack.Screen name="퀴즈" component={QuizHomeScreen} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({});
export default AuthStackNavigator;
