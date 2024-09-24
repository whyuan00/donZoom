import CustomButton from '@/views/components/CustomButton';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

interface MainScreenProps {}

function MainScreen({}: MainScreenProps) {
  const {logoutMutation} = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        console.log('로그아웃 되었습니다.');
      },
    });
  };

  return (
    <View>
      <Text>메인화면임.</Text>
      <CustomButton label="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default MainScreen;
