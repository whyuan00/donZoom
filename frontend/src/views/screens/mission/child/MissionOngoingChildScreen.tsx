import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MissionBox from '@/views/components/MissionBox';
import axiosInstance from '@/api/axios';
import {StyleSheet} from 'react-native';
import {colors} from '@/constants/colors';

interface Mission {
  missionId: number;
  contents: string;
  dueDate: string;
  reward: number;
}
const MissionOngoingChildScreen = () => {
  const [childId, setChildId] = useState<number>(0); //TODO: childId zustand에 저장한다음에 불러와야함
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMissionBox, setSelectedMissionBox] = useState<number | null>(null);
  const [missionData, setMissionData] = useState<Mission[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async (childId:number) => {
        try {
          const response = await axiosInstance.get(`/mission?status=created&childId=${childId}`);
          console.log('진행중인 미션업데이트')
          const {missions} = response.data;
          setMissionData(missions);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      getData(childId);
    }, [])
  );

  const handleMissionPress = (missionId: number) => {
    setSelectedMissionBox(missionId == selectedMissionBox ? null : missionId);
  };

  const handleButtonModify = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.patch(`/mission/${missionId}`, {
        status: 'done',
      });
      console.log('진행중인 미션 완료요청')
      setMissionData(prevData =>prevData.filter(mission => mission.missionId !== missionId),
      ); 
    } catch (error) {console.log(error)}
  }, []);

  const handleButtonDelete = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.delete(`/mission/${missionId}`);
      console.log('진행중인 미션 중단요청') //TODO: 부모에 알람처리 
      setMissionData(prevData =>
        prevData.filter(mission => mission.missionId !== missionId),
      ); // api 재호출 없이 로컬에서 처리
    } catch (error) {
      console.log(error);
    }
  }, []); 


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.BLUE_100} />
            <Text style={styles.loadingText}>미션 데이터를 불러오는 중...</Text>
          </View>
        ) : (
          <ScrollView>
            {missionData.map((mission: Mission, index) => (
              <MissionBox
                key={mission.missionId}
                missionTitle={mission.contents}
                missionPay={mission.reward}
                missionDate={mission.dueDate}
                onPress={() => {
                  handleMissionPress(mission.missionId);
                }}
                isSelected={selectedMissionBox === mission.missionId}
                buttonOne="완료"
                buttonTwo="중단"
                onPressButtonOne={() => {
                  handleButtonModify(mission.missionId);
                }}
                onPressButtonTwo={() => {
                  handleButtonDelete(mission.missionId);
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
export default MissionOngoingChildScreen;

const styles = StyleSheet.create({
  loadingContainer: {},
  loadingText: {},
  container: {
    margin: 20,
    alignItems: 'center',
  },
});
