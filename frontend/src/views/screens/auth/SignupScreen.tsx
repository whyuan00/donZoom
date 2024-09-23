import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useForm from '@/hooks/useForm';
import {useSignupStore} from '@/stores/useAuthStore';
import {validateSignup} from '@/utils';
import CustomButton from '@/views/components/CustomButton';
import InputField from '@/views/components/InputField';
import React, {useRef, useState} from 'react';
import {TextInput, Alert} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';

function SignupScreen({navigation}: any) {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const [selected, setSelected] = useState('');
  const signup = useForm({
    initialValue: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignup,
  });
  const {
    email,
    password,
    passwordConfirm,
    setEmail,
    setPassword,
    setPasswordConfirm,
    validate,
  } = useSignupStore();

  const handleNext = () => {
    const validationResult = validate();
    navigation.navigate('Check');
  };

  return (
    <View
      style={{backgroundColor: 'white', padding: 0, margin: 0, flexGrow: 1}}>
      <View style={styles.imgContainer}>
        <Image source={require('@/assets/image/pig.png')} style={styles.pig} />
      </View>
      <View style={styles.signupText}>
        <Text style={styles.text}>돈 줌(Zoom) 회원가입</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
          style={[styles.input, selected === '아이디' && styles.selectedInput]}
          onFocus={() => setSelected('아이디')}
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호 (영문, 숫자, 특수문자)"
          textContentType="oneTimeCode"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
          style={[
            styles.input,
            selected === '비밀번호' && styles.selectedInput,
          ]}
          onFocus={() => setSelected('비밀번호')}
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          {...signup.getTextInputProps('passwordConfirm')}
          style={[
            styles.input,
            selected === '비밀번호 확인' && styles.selectedInput,
          ]}
          onFocus={() => setSelected('비밀번호 확인')}
          onChangeText={text => {
            setPasswordConfirm(text);
          }}
          value={passwordConfirm}
        />
      </View>
      <View style={styles.nextButtonContainer}>
        <CustomButton label="다음으로" variant="auth" onPress={handleNext} />
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default SignupScreen;
