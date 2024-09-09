import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../../constants/colors';

function LoginScreen({}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>돈 줌(Zoom) 로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField placeholder="아이디"></InputField>
        <InputField placeholder="비밀번호"></InputField>
      </View>
      <CustomButton label="로그인" variant="filled" size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
    textAlign: 'center',
  },
});

export default LoginScreen;
