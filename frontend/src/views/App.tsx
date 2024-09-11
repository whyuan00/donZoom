import React from 'react';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import DrawStackNavigator from '../navigation/DrawStackNavigator';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      {/* <AuthStackNavigator /> */}
      <DrawStackNavigator />
    </NavigationContainer>
  );
}

export default App;
