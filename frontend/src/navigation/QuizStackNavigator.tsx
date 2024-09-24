import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import QuizHomeScreen from '@/views/screens/quiz/QuizHomeScreen';
import QuizScreen from '@/views/screens/quiz/QuizScreen';
import QuizExplanationScreen from '@/views/screens/quiz/QuizExplanationScreen';

const QuizStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="퀴즈" component={QuizHomeScreen} />
      <Stack.Screen name="오늘의 퀴즈" component={QuizScreen} />
      <Stack.Screen name="해설" component={QuizExplanationScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default QuizStackNavigator;
