import useAccount from '@/hooks/queries/useAccount';
import useForm from '@/hooks/useForm';
import usePasswordStore from '@/stores/usePasswordStore';
import {validateAccount} from '@/utils';
import CustomButton from '@/views/components/CustomButton';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

function AccountInitScreen({navigation}: any) {
  const {initAccountMutation} = useAccount();
  const {password} = usePasswordStore();
  const handelInitAccount = () => {
    initAccountMutation.mutate(password, {
      onSuccess: () => {
        Alert.alert('계좌가 생성되었습니다!');
        navigation.navigate('홈화면');
      },
      onError: () => {
        Alert.alert('오류가 발생했습니다');
      },
    });
  };

  return (
    <View>
      <CustomButton label="계좌개설" onPress={handelInitAccount}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AccountInitScreen;
