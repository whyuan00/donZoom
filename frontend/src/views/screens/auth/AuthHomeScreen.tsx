import React from 'react';
import {Button, Pressable, SafeAreaView, StyleSheet, View} from 'react-native';

const AuthHomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <Pressable>
        <View>
          <Button
            title="로그인화면으로 이동"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthHomeScreen;
