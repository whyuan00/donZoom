import React from 'react';
import {Button, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';

const AuthHomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인화면으로 이동"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View>
        <Button
          title="미션페이지로 이동"
          onPress={() => navigation.navigate('Mission')}
        />
      </View>
      <View>
        <Button
          title="거래내역 이동"
          onPress={() => navigation.navigate('AccountHistory')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthHomeScreen;
