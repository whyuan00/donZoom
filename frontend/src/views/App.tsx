import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import DrawStackNavigator from '../navigation/DrawStackNavigator';
import QuizStackNavigator from '@/navigation/QuizStackNavigator';


function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
      {/* <DrawStackNavigator /> */}
      {/* <QuizStackNavigator /> */}
    </NavigationContainer>
  );
}
export default App;
