import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import MyInformationScreen from '@/views/screens/myPage/MyInformationScreen';

const MyInformationNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="더보기" component={MyInformationScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MyInformationNavigator;
