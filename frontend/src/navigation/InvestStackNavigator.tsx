import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '@/views/screens/investment/DetailScreen';
import InvestmentHomeScreen from '@/views/screens/investment/InvestmentHomeScreen';
import RealAssetDetailScreen from '@/views/screens/investment/RealAssetDetailScreen';
import UnsafeAssetDetailScreen from '@/views/screens/investment/UnsafeAssetDetailScreen';

const Stack = createNativeStackNavigator();

const InvestStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={InvestmentHomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Real" component={RealAssetDetailScreen} />
      <Stack.Screen name="Unsafe" component={UnsafeAssetDetailScreen} />
    </Stack.Navigator>
  );
};
export default InvestStackNavigator;
