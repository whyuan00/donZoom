import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from '@/views/screens/investment/DetailScreen';
import InvestmentHomeScreen from '@/views/screens/investment/InvestmentHomeScreen';
import RealAssetDetailScreen from '@/views/screens/investment/RealAssetDetailScreen';
import UnsafeAssetDetailScreen from '@/views/screens/investment/UnsafeAssetDetailScreen';
import {fonts} from '@/constants/font';
import SafeAssetDetailScreen from '@/views/screens/investment/SafeAssetDetailScreen';
import ChartTabScreen from '@/views/screens/investment/RealAssetTabScreen/RealAssetChartTabScreen';
import NewsTabScreen from '@/views/screens/investment/RealAssetTabScreen/RealAssetNewsTabScreen';
import ReportTabScreen from '@/views/screens/investment/RealAssetTabScreen/RealAssetReportTabScreen';
import InvestTradeScreen from '@/views/screens/investment/InvestTradeScreen';
import InvestTabNavigator from './InvestRealAssetTabNavigator';
import RealAssetPastScreen from '@/views/screens/investment/RealAssetPastScreen';
const Stack = createNativeStackNavigator();

const InvestStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: '모의 투자',
        headerTitleStyle: {
          fontFamily: fonts.MEDIUM,
          fontWeight: '500',
          fontSize: 20,
        },
        headerTitleAlign: 'center', // 헤더 제목 정렬
      }}>
      <Stack.Screen name="Home" component={InvestmentHomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Safe" component={SafeAssetDetailScreen} />
      <Stack.Screen
        name="Real"
        component={RealAssetDetailScreen}
        initialParams={{selectedAssetType: 'Real'}}
      />
      <Stack.Screen
        name="Unsafe"
        component={UnsafeAssetDetailScreen}
        initialParams={{selectedAssetType: 'Unsafe'}}
      />

      <Stack.Screen name="InvestTab" component={InvestTabNavigator} />
      <Stack.Screen name="Trade" component={InvestTradeScreen} />
      <Stack.Screen name="RealAssetPast" component={RealAssetPastScreen} 
      options={{title:'금 현물 뉴스'}}
      />
    </Stack.Navigator>
  );
};
export default InvestStackNavigator;
