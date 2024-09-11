
import React, {useState} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {colors} from '@/constants/colors';
import InputField from '@/views/components/InputField';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MakeNewMissionScreen = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>어떤 미션을 요청할까요?</Text>
      <View style={styles.missionBox}>
        <InputField style={styles.input} placeholder="미션 내용을 입력하세요">
          {/* 내용 */}
        </InputField>
        <View style={styles.dateSettingContainer}>
          <Icon name="edit-calendar" size={32} />
          <Text style={styles.dateSettingText}>기한 설정하기</Text>
          {/* 아이콘 넣기, 달력 라이브러리 불러오기 */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  missionBox: {
    alignItems: 'center',
    width: 300,
    height: 150,
    paddingTop: 30,
    borderRadius: 10,
    backgroundColor: colors.YELLOW_100,
  },
  input: {
    backgroundColor: colors.WHITE,
    height:50,
    borderRadius: 10,
    padding: 10,
  },
  dateSettingContainer: {
    marginTop:15,
    marginLeft:150,
    flexDirection:'row',
    alignItems:'center',
  },
  dateSettingText: {
    fontWeight: '700',
  },
});

export default MakeNewMissionScreen;
