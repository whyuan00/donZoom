import React from 'react';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

export default App;
