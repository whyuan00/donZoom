import React, {useState, useEffect, useCallback} from 'react';
import axiosInstance from '@/api/axios';
import MissionBox from '../../components/MissionBox';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {colors} from '@/constants/colors';

interface Mission {
  missionId: number;
  contents: string;
  dueDate: string;
  reward: number;
}

const MissionCompleteScreen = () => {

    const [childId, setChildId] = useState<number>(0); //TODO: childId zustand에 저장한다음에 불러와야함
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMissionBox, setSelectedMissionBox] = useState<
      number | null
    >();
    const [requireCompleteMission, setRequireCompleteMission] = useState<
      Mission[]
    >([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async (childId:number) => {
        try {
          const response = await axiosInstance.get(`/mission?status=done&childId=${childId}`);
          console.log('완료요청 탭 업데이트');
          // const missions: Mission[] = response.data.map((mission: any) => ({
          //   missionId: mission.id,
          //   contents: mission.contents,
          //   dueDate: mission.dueDate || null,
          //   reward: mission.reward,
          // }));
          // console.log(response.data);
          const {missions} = response.data;
          setRequireCompleteMission(missions);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      getData(childId);
    }, []),
  );

  const handleMissionPress = useCallback((missionId: number) => {
    setSelectedMissionBox(missionId == selectedMissionBox ? null : missionId);
  }, []);
  const handleButtonConfirm = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.patch(`/mission/${missionId}`, {
        status: 'accepted',
      });
      console.log('미션 상태 accepted로 변경');
    } catch (error) {
      console.log(error);
    }
    setRequireCompleteMission(prevData =>
      prevData.filter(mission => mission.missionId !== missionId),
    );
  }, []);
  const handlebuttonDelete = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.patch(`/mission/${missionId}`, {
        status: 'created',
      });
      console.log('미션 상태 created로 변경');
    } catch (error) {
      console.log(error);
    }
    setRequireCompleteMission(prevData =>
      prevData.filter(mission => mission.missionId !== missionId),
    );
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
            {requireCompleteMission?.map((mission: Mission, index) => (
              <MissionBox
                key={mission.missionId}
                missionTitle={mission.contents}
                missionPay={mission.reward}
                missionDate={mission.dueDate}
                onPress={() => {
                  handleMissionPress(mission.missionId);
                }}
                isSelected={selectedMissionBox === mission.missionId}
                buttonOne="승인"
                buttonTwo="거절"
                onPressButtonOne={() => {
                  handleButtonConfirm(mission.missionId);
                }}
                onPressButtonTwo={() => {
                  handlebuttonDelete(mission.missionId);
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {},
  loadingText: {},
  container: {
    margin: 20,
    alignItems: 'center',
  },
});

export default MissionCompleteScreen;
