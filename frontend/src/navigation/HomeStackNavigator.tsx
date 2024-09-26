import DrawMachineScreen from '@/views/screens/draw/DrawMachineScreen';
import HomeScreen from '@/views/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

import CollectionButton from '@/assets/collectionButton.svg';
import DrawCollectionScreen from '@/views/screens/draw/DrawCollectionScreen';
import QuizHomeScreen from '@/views/screens/quiz/QuizHomeScreen';
import QuizScreen from '@/views/screens/quiz/QuizScreen';
import QuizExplanationScreen from '@/views/screens/quiz/QuizExplanationScreen';
import MakeNewMissionScreen from '@/views/screens/mission/MakeNewMissionScreen';
import MissionHomeScreen from '@/views/screens/mission/MissionHomeScreen';
import {colors} from '@/constants/colors';
import AccountHistoryScreen from '@/views/screens/account/AccountHistoryScreen';
import AlarmScreen from '@/views/screens/alarm/AlarmScreen';
import MyInformationScreen from '@/views/screens/myPage/MyInformationScreen';
import QRCodeScanner from '@/views/components/QRCodeScanner';
import TransferNavigator from './TransferNavigator';
import AccountInitScreen from '@/views/screens/account/AccountInitScreen';
import MissionStackNavigator from './MissionStackNavigator';
import MyInformationNavigator from './MyInformationNavigator';

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="홈화면"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="알림" component={AlarmScreen} />
      <Stack.Screen
        name="설정"
        component={MyInformationNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="계좌관리" component={TransferNavigator} />
      <Stack.Screen name="계좌개설" component={AccountInitScreen} />
      <Stack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="부모미션"
        component={MissionStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="아이미션"
        component={MissionStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="퀴즈" component={QuizHomeScreen} />
      <Stack.Screen name="오늘의 퀴즈" component={QuizScreen} />
      <Stack.Screen name="해설" component={QuizExplanationScreen} />
      <Stack.Screen
        name="돼지뽑기"
        component={DrawMachineScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('돼지수집함')}>
              <CollectionButton width={24} height={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="돼지수집함" component={DrawCollectionScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStackNavigator;
