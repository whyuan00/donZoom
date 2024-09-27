import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from '../navigation/AuthStackNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import RootNavigator from '@/navigation/root/RootNavigator';
import DrawStackNavigator from '../navigation/DrawStackNavigator';
import QuizStackNavigator from '@/navigation/QuizStackNavigator';
import Footer from '../navigation/Footer';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'; 

const firebaseConfig = {
  apiKey: "AIzaSyDSUTJysXrGAo2kxrgyEAVNiiVcr4Xfj40",
  authDomain: "donzoom.firebaseapp.com",
  projectId: "donzoom",
  storageBucket: "donzoom.appspot.com",
  messagingSenderId: "1005190129327",
  appId: "1:1005190129327:android:5f3155457bc18b39c7965a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); // Firebase 초기화
} else {
  console.log('Firebase app already initialized');
}

function App() {
  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };
  
    requestPermission();
  }, []);
  
  useEffect(() => {
    // FCM 토큰 가져오기
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };

    // FCM 메시지 수신 대기
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('새 FCM 메시지 도착:', JSON.stringify(remoteMessage));
    });

    getToken(); // 토큰 가져오기

    

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default App;
