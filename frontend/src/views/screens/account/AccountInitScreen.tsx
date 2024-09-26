import useAccount from '@/hooks/queries/useAccount';
import useForm from '@/hooks/useForm';
import {validateAccount} from '@/utils';
import CustomButton from '@/views/components/CustomButton';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AccountInitScreenProps {}

function AccountInitScreen({}: AccountInitScreenProps) {
  const {initAccountMutation} = useAccount();
  const account = useForm({
    initialValue: {},
    validate: validateAccount,
  });
  const handelInitAccount = () => {
    initAccountMutation.mutate(account.values);
  };

  return (
    <View>
      <Text>계좌개설 스크린</Text>
      <CustomButton label="계좌개설" onPress={handelInitAccount}></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AccountInitScreen;
