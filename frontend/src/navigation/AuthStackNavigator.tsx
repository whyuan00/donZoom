import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthHomeScreen from '../views/screens/auth/AuthHomeScreen';
import LoginScreen from '../views/screens/auth/LoginScreen';
import SignupScreen from '../views/screens/auth/SignupScreen';
import CheckFamilyScreen from '@/views/screens/auth/CheckFamilyScreen';
import NickNameScreen from '@/views/screens/auth/NickNameScreen';
import AccountHistoryScreen from '@/views/screens/account/AccountHistoryScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Check" component={CheckFamilyScreen} />
      <Stack.Screen name="NickName" component={NickNameScreen} />
    </Stack.Navigator>
  );
};
export default AuthStackNavigator;
