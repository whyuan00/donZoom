import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransferScreen2 from '@/views/screens/account/TransferScreen2';
import TransferScreen3 from '@/views/screens/account/TransferScreen3';
import TransferScreen4 from '@/views/screens/account/TransferScreen4';
import TransferScreen from '@/views/screens/account/TransferScreen';
import AccountHistoryScreen from '@/views/screens/account/AccountHistoryScreen';

const TransferNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="계좌관리홈"
        component={AccountHistoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="송금"
        component={TransferScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="송금2"
        component={TransferScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="송금3"
        component={TransferScreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="송금4"
        component={TransferScreen4}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default TransferNavigator;
