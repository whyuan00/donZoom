import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import MyInformationScreen from '@/views/screens/myPage/MyInformationScreen';
import AlarmSettingScreen from '@/views/screens/myPage/AlarmSettingScreen';
import SecuritySettingScreen from '@/views/screens/myPage/SecuritySettingScreen';
import LoginScreen from '@/views/screens/auth/LoginScreen';

const MyInformationNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="설정" component={MyInformationScreen} />
      <Stack.Screen name="보안 설정" component={SecuritySettingScreen} />
      <Stack.Screen name="알림 설정" component={AlarmSettingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MyInformationNavigator;
