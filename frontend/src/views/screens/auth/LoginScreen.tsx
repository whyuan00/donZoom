import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '@/views/components/InputField';
import CustomButton from '@/views/components/CustomButton';
import {colors} from '@/constants/colors';
import Svg, {Line, Path} from 'react-native-svg';
import {fonts} from '@/constants/font';
import {validateLogin} from '@/utils';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';

function LoginScreen({navigation}: any) {
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginText}>
        <Text style={styles.text}>돈 줌(Zoom) 로그인</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputIdContainer}>
          <View style={[styles.inputSvg]}>
            <Svg width="19" height="16" viewBox="0 0 19 16" fill="none">
              <Path
                d="M13.0625 0C11.8512 0 10.8063 0.699126 10.165 1.7578C11.2338 2.83645 11.875 4.31461 11.875 6.01248C11.875 6.59176 11.8038 7.11111 11.6612 7.63046C12.1125 7.85019 12.5638 8.00999 13.0625 8.00999C15.0337 8.00999 16.625 6.21223 16.625 4.01498C16.625 1.81773 15.0337 0.019975 13.0625 0.019975V0ZM5.9375 1.9975C3.96625 1.9975 2.375 3.79526 2.375 5.99251C2.375 8.18976 3.96625 9.98752 5.9375 9.98752C7.90875 9.98752 9.5 8.18976 9.5 5.99251C9.5 3.79526 7.90875 1.9975 5.9375 1.9975ZM17.2188 8.30961C16.1975 9.32834 14.7963 9.94757 13.205 9.98752C13.8462 10.7466 14.25 11.6654 14.25 12.6642V13.9825H19V10.6667C19 9.62796 18.2638 8.72909 17.2188 8.28964V8.30961ZM1.78125 10.3071C0.73625 10.7466 0 11.6454 0 12.6841V16H11.875V12.6841C11.875 11.6454 11.1388 10.7466 10.0938 10.3071C9.025 11.3658 7.57625 11.985 5.9375 11.985C4.29875 11.985 2.85 11.3458 1.78125 10.3071Z"
                fill="black"
              />
            </Svg>
          </View>
          <InputField
            placeholder="아이디"
            {...login.getTextInputProps('email')}
          />
        </View>
        <View style={styles.inputIdContainer}>
          <View style={[styles.inputSvg]}>
            <Svg width="15" height="17" viewBox="0 0 15 17" fill="none">
              <Path
                d="M7.5 0C4.75 0 2.5 2.18571 2.5 4.85714V7.28571H0V17H15V7.28571H12.5V4.85714C12.5 2.18571 10.25 0 7.5 0ZM7.5 2.42857C8.9 2.42857 10 3.49714 10 4.85714V7.28571H5V4.85714C5 3.49714 6.1 2.42857 7.5 2.42857Z"
                fill="black"
              />
            </Svg>
          </View>
          <InputField
            placeholder="비밀번호"
            {...login.getTextInputProps('password')}
          />
        </View>
      </View>
      <CustomButton label="로그인" variant="auth" onPress={handleSubmit} />
      <View style={styles.saveIdContainer}>
        <Svg
          width="15"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={styles.svg}>
          <Path
            d="M11.805 5.52833C11.867 5.59025 11.9162 5.66377 11.9497 5.74471C11.9833 5.82564 12.0005 5.91239 12.0005 6C12.0005 6.08761 11.9833 6.17436 11.9497 6.25529C11.9162 6.33623 11.867 6.40975 11.805 6.47167L7.13833 11.1383C7.07642 11.2003 7.00289 11.2495 6.92196 11.283C6.84103 11.3166 6.75428 11.3339 6.66667 11.3339C6.57906 11.3339 6.49231 11.3166 6.41137 11.283C6.33044 11.2495 6.25692 11.2003 6.195 11.1383L4.195 9.13833C4.06991 9.01324 3.99963 8.84358 3.99963 8.66667C3.99963 8.48976 4.06991 8.32009 4.195 8.195C4.32009 8.06991 4.48976 7.99963 4.66667 7.99963C4.84358 7.99963 5.01324 8.06991 5.13833 8.195L6.66667 9.72417L10.8617 5.52833C10.9236 5.46635 10.9971 5.41718 11.078 5.38363C11.159 5.35008 11.2457 5.33281 11.3333 5.33281C11.4209 5.33281 11.5077 5.35008 11.5886 5.38363C11.6696 5.41718 11.7431 5.46635 11.805 5.52833ZM16 1.33333V14.6667C16 15.0203 15.8595 15.3594 15.6095 15.6095C15.3594 15.8595 15.0203 16 14.6667 16H1.33333C0.979711 16 0.640573 15.8595 0.390524 15.6095C0.140476 15.3594 0 15.0203 0 14.6667V1.33333C0 0.979711 0.140476 0.640573 0.390524 0.390524C0.640573 0.140476 0.979711 0 1.33333 0H14.6667C15.0203 0 15.3594 0.140476 15.6095 0.390524C15.8595 0.640573 16 0.979711 16 1.33333ZM14.6667 14.6667V1.33333H1.33333V14.6667H14.6667Z"
            fill="black"
          />
        </Svg>
        <Text style={styles.saveIdText}>로그인유지</Text>
        <View style={styles.signupContainer}>
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate('Signup')}>
            회원가입
          </Text>
          <Svg height="13" width="1" style={styles.verticalLine}>
            <Line
              x1="0"
              y1="0"
              x2="0"
              y2="13"
              stroke="#000000"
              strokeWidth="2"
            />
          </Svg>
          <Text style={styles.signupText}>정보찾기</Text>
        </View>
      </View>
      <View style={styles.snsContainer}>
        <Svg height="1" width="30" style={styles.verticalLine}>
          <Line x1="0" y1="0" x2="20" y2="0" stroke="#E0E0E0" strokeWidth="1" />
        </Svg>
        <Text style={styles.snsText}>SNS계정으로 로그인</Text>
        <Svg height="1" width="30" style={styles.verticalLine}>
          <Line x1="0" y1="0" x2="20" y2="0" stroke="#E0E0E0" strokeWidth="1" />
        </Svg>
      </View>
      <View style={styles.snsButton}>
        <CustomButton label="G" variant="sns" />
        <CustomButton label="F" variant="sns" />
        <CustomButton label="K" variant="sns" />
        <CustomButton label="N" variant="sns" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  loginText: {
    fontFamily: fonts.LIGHT,
    marginTop: 100,
    justifyContent: 'center',
    gap: 20,
    marginBottom: 26,
    fontSize: 18,
  },
  inputContainer: {
    width: 250,
    justifyContent: 'center',
    gap: 13,
    marginBottom: 33,
  },
  text: {
    fontSize: 18,
    fontFamily: 'GmarketSansTTFBold',
    color: colors.BLACK,
    textAlign: 'center',
  },
  saveIdContainer: {
    marginTop: 18,
    width: 250,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  saveIdText: {
    marginTop: 3,
    marginLeft: 4,
    color: colors.BLACK,
    fontFamily: fonts.LIGHT,
    fontSize: 14,
  },
  signupText: {
    marginTop: 3,
    color: colors.BLACK,
    fontFamily: fonts.LIGHT,
    fontSize: 14,
  },
  verticalLine: {
    height: '100%',
    width: 10,
    backgroundColor: colors.BLACK,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  inputSvg: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 15,
    alignItems: 'center',
  },
  svg: {
    width: 15,
    alignItems: 'center',
  },
  signupContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIdContainer: {
    position: 'relative',
    width: 250,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_75,
    borderRadius: 5,
  },
  snsContainer: {
    marginTop: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snsText: {
    fontFamily: fonts.LIGHT,
    fontSize: 14,
    letterSpacing: 0.25,
    color: colors.BLACK,
  },
  snsButton: {
    marginTop: 20,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default LoginScreen;
