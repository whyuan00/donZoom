import React from 'react';
import {createNativeStackNavigator,} from '@react-navigation/native-stack';
import {StyleSheet,TouchableOpacity,Text} from 'react-native';
import { colors } from '../constants/colors';


import AuthHomeScreen from '../views/screens/auth/AuthHomeScreen';
import LoginScreen from '../views/screens/auth/LoginScreen';
import MissionHomeScreen from '../views/screens/mission/MissionHomeScreen';
import MakeNewMissionScreen from '../views/screens/mission/MakeNewMissionScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* 임시로 미션페이지로 가는 링크 생성함 */}
      <Stack.Screen name="MakeNewMission" component={MakeNewMissionScreen} options={{title:'미션 생성'}} />
      <Stack.Screen
       name="Mission" 
       component={MissionHomeScreen} 
      options={{title: '미션', headerRight:() =>(
        <TouchableOpacity onPress={()=>{}}>
          <Text> 추가</Text>
        </TouchableOpacity>
      ),
      }}/>
    </Stack.Navigator>
  );

}
const styles = StyleSheet.create({});
export default AuthStackNavigator;
