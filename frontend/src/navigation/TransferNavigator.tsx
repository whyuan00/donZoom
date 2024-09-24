import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import TransferScreen2 from '@/views/screens/account/TransferScreen2';
import TransferScreen3 from '@/views/screens/account/TransferScreen3';
import TransferScreen4 from '@/views/screens/account/TransferScreen4';
import TransferScreen from '@/views/screens/account/TransferScreen';

export default function TransferNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {/* <Stack.Screen name="송금" component={TransferScreen} /> */}
      <Stack.Screen name="송금2" component={TransferScreen2} />
      <Stack.Screen name="송금3" component={TransferScreen3} />
      <Stack.Screen name="송금4" component={TransferScreen4} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
