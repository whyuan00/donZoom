import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {colors} from '@/constants/colors';
import {useFocusEffect} from '@react-navigation/native';
import axiosInstance from '@/api/axios';
import axios from 'axios';
import { fonts } from '@/constants/font';

interface Mission {
  missionId: number;
  contents: string;
  dueDate: string;
  reward: number;
}

const MissionCompleteChildScreen = () => {
  const [childId, setChildId] = useState<number>(0); //TODO: childId zustand에 저장한다음에 불러와야함
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMissionBox, setSelectedMissionBox] = useState<number | null>(
    null,
  );
  const [requireCompleteMission, setRequireCompleteMission] = useState<
    Mission[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async (childId: number) => {
        try {
          const response = await axiosInstance.get(
            `/mission?status=done&childId=${childId}`,
          );
          console.log('완료요청한 미션업데이트');
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

  const handleMissionPress = (missionId: number) => {
    setSelectedMissionBox(missionId == selectedMissionBox ? null : missionId);
  };

  // 완료취소: created로 이동
  const handleMissionDelete = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.patch(`/mission/${missionId}`, {
        status: 'created',
      });
      console.log('미션 완료요청 취소');
      setRequireCompleteMission(prevData =>
        prevData.filter(mission => mission.missionId !== missionId),
      ); // api호출없이 데이터 수정
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
            {requireCompleteMission?.map((mission: Mission, index) => (
              <TouchableOpacity
                onPress={() => handleMissionPress(mission.missionId)}
                style={[
                  styles.boxContainer,
                  selectedMissionBox === mission.missionId &&
                    styles.boxContainerActive,
                ]}>
                {selectedMissionBox === mission.missionId ? (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleMissionDelete(mission.missionId)}>
                    <Text style={{fontFamily: fonts.MEDIUM, fontSize: 18}}>
                      완료 취소
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.cancelButton}>
                    <Text style={{fontFamily: fonts.MEDIUM, fontSize: 18}}>
                      대기중
                    </Text>
                  </View>
                )}

                <View style={{position: 'absolute', right: 25}}>
                  <Text
                    style={[
                      styles.largetext,
                      selectedMissionBox === mission.missionId && {
                        color: colors.GRAY_100,
                      },
                    ]}>
                    {mission.contents}
                  </Text>
                  <Text
                    style={[
                      styles.largetext,
                      selectedMissionBox === mission.missionId && {
                        color: colors.GRAY_100,
                      },
                    ]}>
                    {mission.reward.toLocaleString()}원
                  </Text>
                  <Text style={styles.smalltext}>
                    {mission.dueDate.replaceAll('-', '.')}까지
                  </Text>
                </View>
              </TouchableOpacity>
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
  boxContainer: {
    width: 350,
    height: 130,
    padding: 20,
    borderColor: colors.BLACK,
    backgroundColor: colors.YELLOW_50,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    justifyContent: 'center',
    marginLeft: 25,
  },
  boxContainerActive: {
    backgroundColor: colors.YELLOW_25,
  },
  largetext: {
    fontSize: 20,
    margin: 3,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    textAlign: 'right',
    fontWeight: '700',
  },
  smalltext: {
    fontSize: 15,
    margin: 3,
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    textAlign: 'right',
    fontWeight: '400',
  },
});

export default MissionCompleteChildScreen;
