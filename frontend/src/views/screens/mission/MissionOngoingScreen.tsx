import React, {useState} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, View} from 'react-native';

import MissionBox from '../../components/MissionBox';

// 미션데이터 예시
const missionData = [
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
  {
    missionTitle: '마트에서 두부 사오기',
    missionPay: 10000,
    missionDate: '2024.9.5',
  },
];

const MissionOngoingScreen = ({}) => {
  // -1 -> null로 바꾸고 인덱스 타입 추가
  const [selectedMissionBox, setSelectedMissionBox] = useState(-1);
  // 토글, 이미 선택되어있을때 다시 누르면 null -> isSelected False
  const handleMissionPress = (index: number) => {
    setSelectedMissionBox(index == selectedMissionBox ? -1 : index);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {missionData.map ( (mission,index) => (
          <MissionBox
          missionTitle={mission.missionTitle}
          missionPay={mission.missionPay}
          missionDate ={mission.missionDate}
          onPress={()=>{
            handleMissionPress(index)
          }}
          isSelected = {selectedMissionBox === index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

{
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
  },
});

export default MissionOngoingScreen;
