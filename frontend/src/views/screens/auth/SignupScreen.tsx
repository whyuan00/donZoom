import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useForm from '@/hooks/useForm';
import {validateSignup} from '@/utils/validate';
import CustomButton from '@/views/components/CustomButton';
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';

function SignupScreen({navigation}: any) {
  const [selected, setSelected] = useState('');
  const signup = useForm({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  return (
    <View
      style={{backgroundColor: 'white', padding: 0, margin: 0, flexGrow: 1}}>
      <View style={styles.imgContainer}>
        <Image
          source={require('@/assets/image/pig.png')}
          style={styles.pig}></Image>
      </View>
      <View style={styles.signupText}>
        <Text style={styles.text}>돈 줌(Zoom) 회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="아이디"
          style={[styles.input, selected === '아이디' && styles.selectedInput]}
          onPress={() => setSelected('아이디')}
        />
        <TextInput
          placeholder="비밀번호 (영문, 숫자, 특수문자)"
          style={[
            styles.input,
            selected === '비밀번호' && styles.selectedInput,
          ]}
          onPress={() => setSelected('비밀번호')}
        />
        <TextInput
          placeholder="비밀번호 확인"
          style={[
            styles.input,
            selected === '비밀번호 확인' && styles.selectedInput,
          ]}
          onPress={() => setSelected('비밀번호 확인')}
        />
      </View>
      <View style={styles.nextButtonContainer}>
        <CustomButton
          label="다음으로"
          variant="auth"
          onPress={() => navigation.navigate('Check')}></CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pig: {
    width: 152,
    height: 152,
    marginTop: 34,
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: fonts.LIGHT,
    marginTop: 13,
    justifyContent: 'center',
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
    textAlign: 'center',
  },
  input: {
    width: 215,
    fontSize: 14,
    fontFamily: fonts.LIGHT,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_100,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonContainer: {
    marginTop: 33,
  },
  selectedInput: {
    borderColor: colors.BLUE_100,
  },
});

export default SignupScreen;
