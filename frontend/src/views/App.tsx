import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import RootNavigator from '@/navigation/root/RootNavigator';
import DrawStackNavigator from '../navigation/DrawStackNavigator';
import QuizStackNavigator from '@/navigation/QuizStackNavigator';
import MyInformationNavigator from '@/navigation/MyInformationNavigator';
import HomeStackNavigator from '@/navigation/HomeStackNavigator';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <RootNavigator /> */}
        {/* <QuizStackNavigator /> */}
        {/* <AuthStackNavigator /> */}
        {/* <MyInformationNavigator /> */}
        <HomeStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default App;
