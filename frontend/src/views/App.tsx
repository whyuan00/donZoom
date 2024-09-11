import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../navigation/AuthStackNavigator';

function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator/>
    </NavigationContainer>
  );
}
export default App;
