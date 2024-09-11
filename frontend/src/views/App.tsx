import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import DrawStackNavigator from '../navigation/DrawStackNavigator';


function App() {
  return (
    <NavigationContainer>
      {/* <AuthStackNavigator /> */}
      <DrawStackNavigator />
    </NavigationContainer>
  );
}
export default App;
