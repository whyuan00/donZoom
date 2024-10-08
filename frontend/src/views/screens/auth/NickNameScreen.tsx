import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useSignupForm from '@/hooks/useSignupForm';
import {useSignupStore} from '@/stores/useAuthStore';
import {validateInit, validateSignup} from '@/utils/validate';
import CustomButton from '@/views/components/CustomButton';
import InputField from '@/views/components/InputField';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {launchImageLibrary} from 'react-native-image-picker';

interface NickNameScreenProps {}

function NickNameScreen({}: NickNameScreenProps) {
  const {signupMutation, loginMutation} = useAuth();
  const {values, errors, touched, getTextInputProps} = useSignupForm();
  const [profileImage, setProfileImage] = useState(null);
  const {role} = useSignupStore();
  const email = values.email;
  const password = values.password;
  const account = useForm({
    initialValue: {
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      name: '',
      nickname: '',
      role: role,
    },
    validate: validateInit,
  });
  const handleSubmit = () => {
    signupMutation.mutate(account.values, {
      onSuccess: () => loginMutation.mutate({email, password}),
    });
  };

  // const handleImagePick = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: false,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //   };

  //   launchImageLibrary(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       const source = {uri: response.assets[0].uri};
  //       setProfileImage(source);
  //     }
  //   });
  // };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={Keyboard.dismiss}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>정보를 입력해주세요.</Text>
      </View>
      <TouchableOpacity style={styles.profileImage}>
        <Svg
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill="none"
          style={styles.profileSvg}>
          <Path
            d="M26.5385 3.65217H22.5404L20.5745 0.541739C20.4692 0.375187 20.3266 0.238613 20.1593 0.144117C19.992 0.0496212 19.8052 0.000120225 19.6154 0H10.3846C10.1948 0.000120225 10.008 0.0496212 9.84073 0.144117C9.67343 0.238613 9.5308 0.375187 9.42548 0.541739L7.45817 3.65217H3.46154C2.54348 3.65217 1.66303 4.03696 1.01386 4.72187C0.364697 5.40679 0 6.33573 0 7.30435V24.3478C0 25.3164 0.364697 26.2454 1.01386 26.9303C1.66303 27.6152 2.54348 28 3.46154 28H26.5385C27.4565 28 28.337 27.6152 28.9861 26.9303C29.6353 26.2454 30 25.3164 30 24.3478V7.30435C30 6.33573 29.6353 5.40679 28.9861 4.72187C28.337 4.03696 27.4565 3.65217 26.5385 3.65217ZM20.1923 15.2174C20.1923 16.3009 19.8878 17.3601 19.3172 18.261C18.7467 19.1618 17.9358 19.864 16.987 20.2786C16.0382 20.6933 14.9942 20.8018 13.987 20.5904C12.9798 20.379 12.0546 19.8573 11.3285 19.0911C10.6023 18.325 10.1078 17.3488 9.90746 16.2861C9.70711 15.2235 9.80994 14.122 10.2029 13.121C10.5959 12.1199 11.2614 11.2643 12.1153 10.6624C12.9692 10.0604 13.9731 9.73913 15 9.73913C16.3771 9.73913 17.6978 10.3163 18.6715 11.3437C19.6453 12.371 20.1923 13.7645 20.1923 15.2174Z"
            fill="#77787B"
          />
        </Svg>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이름"
          style={styles.input}
          {...account.getTextInputProps('name')}
        />
        <InputField
          placeholder="닉네임"
          style={styles.input}
          {...account.getTextInputProps('nickname')}
        />
      </View>
      <CustomButton label="시작하기" onPress={handleSubmit} />
    </TouchableOpacity>
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
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: colors.BLACK,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 81,
  },
  profileImage: {
    width: 110,
    height: 110,
    marginTop: 39,
    borderRadius: 60,
    backgroundColor: colors.GRAY_25,
    position: 'relative',
  },
  profileSvg: {
    position: 'absolute',
    top: 41,
    left: 40,
  },
  inputContainer: {
    marginTop: 50,
    marginBottom: 32,
    width: 215,
  },
  input: {
    fontFamily: fonts.LIGHT,
    fontSize: 14,
    borderBottomColor: colors.GRAY_50,
    borderBottomWidth: 1,
    width: 215,
  },
});

export default NickNameScreen;
