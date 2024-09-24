import CustomButton from '@/views/components/CustomButton';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TestScreenProps {}

function TestScreen({}: TestScreenProps) {
  return (
    <View>
      <Text>안녕하세용</Text>
      <CustomButton label="로그아웃" />
    </View>
  );
}

const styles = StyleSheet.create({});

export default TestScreen;
