import {colors} from '@/constants/colors';
import MakeNewMissionScreen from '@/views/screens/mission/MakeNewMissionScreen';
import MissionHomeScreen from '@/views/screens/mission/MissionHomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Stack = createNativeStackNavigator();

const MissionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mission"
        component={MissionHomeScreen}
        options={({navigation}) => ({
          title: '미션',
          headerRight: () => {
            return (
              <Text
                onPress={() => navigation.navigate('MakeNewMission')}
                style={{color: colors.BLUE_100}}>
                추가
              </Text>
            );
          },
        })}
      />
      <Stack.Screen
        name="MakeNewMission"
        component={MakeNewMissionScreen}
        options={{title: '미션 생성'}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MissionStackNavigator;
