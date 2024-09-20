import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import QuizHomeScreen from '@/views/screens/quiz/QuizHomeScreen';

const QuizStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="퀴즈" component={QuizHomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default QuizStackNavigator;
