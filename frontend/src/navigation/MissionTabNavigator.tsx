import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MissionOngoingScreen from '../views/screens/mission/MissionOngoingScreen';
import MissionCompleteScreen from '../views/screens/mission/MissionCompleteScreen';
import MissionPastScreen from '../views/screens/mission/MissionPastScreen';

import { colors } from '../constants/colors';

const Tab = createMaterialTopTabNavigator();

export default function MissionTabNavigator() {
  return (
      <Tab.Navigator
        initialRouteName="진행중" 
        screenOptions={{
          tabBarActiveTintColor: colors.BLUE_100,
          tabBarInactiveTintColor: colors.BLACK,
          tabBarLabelStyle: {fontSize: 16},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="진행중"
          component={MissionOngoingScreen}
          options={{tabBarLabel: '진행중'}}
        />
        <Tab.Screen
          name="완료요청"
          component={MissionCompleteScreen}
          options={{tabBarLabel: '완료요청'}}
        />
        <Tab.Screen
          name="지난미션"
          component={MissionPastScreen}
          options={{tabBarLabel: '지난미션'}}
        />
      </Tab.Navigator>
  );
}
