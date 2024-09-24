import CustomButton from '@/views/components/CustomButton';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth';

interface TestScreenProps {}

function TestScreen({}: TestScreenProps) {
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
      <Text>안녕하세용</Text>
      <CustomButton label="로그아웃" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default TestScreen;
