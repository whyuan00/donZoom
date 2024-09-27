import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import RootNavigator from '@/navigation/root/RootNavigator';
import {initializeFirebase} from '@/config/FireBaseConfig';
import {
  requestNotificationPermission,
  getFCMToken,
  setupMessageListener,
} from '@/utils/pushNotifications';
import {Alert} from 'react-native';

function App() {
  useEffect(() => {
    initializeFirebase();
    requestNotificationPermission();
    getFCMToken();
    const unsubscribe = setupMessageListener();
    Alert.alert('A new FCM message arrived!', JSON.stringify(unsubscribe));

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
