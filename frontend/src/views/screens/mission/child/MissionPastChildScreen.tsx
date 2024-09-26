import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '@/api/axios';
import {colors} from '@/constants/colors';

interface Mission {
  missionId: number;
  contents: string;
  dueDate: string;
  reward: number;
}

const MissionPastChildScreen = () => {
  const [childId, setChildId] = useState<number>(0); //TODO: childId zustand에 저장한다음에 불러와야함
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMissionBox, setSelectedMissionBox] = useState<number | null>(
    null,
  );
  const [missionPastData, setMissionPastData] = useState<Mission[]>([]);

  useFocusEffect(
    useCallback(() => {
      const getData = async (childId: number) => {
        try {
          const response = await axiosInstance.get(
            `/mission?status=accepted&childId=${childId}`,
          );
          const {missions} = response.data;
          setMissionPastData(missions);
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
    setSelectedMissionBox(missionId === selectedMissionBox ? null : missionId);
  }, []);

  const handleMissionDelete = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.delete(`/mission/${missionId}`);
      setMissionPastData(prevData =>
        prevData.filter(mission => mission.missionId !== missionId),
      );
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
            {missionPastData.map((mission: Mission) => (
              <View key={mission.missionId}>
                <TouchableOpacity
                  onPress={() => handleMissionPress(mission.missionId)}
                  style={[
                    styles.boxContainer,
                    selectedMissionBox === mission.missionId &&
                      styles.boxContainerActive,
                  ]}>
                  {selectedMissionBox === mission.missionId && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleMissionDelete(mission.missionId)}>
                      <Text style={{fontSize: 18}}>삭제</Text>
                    </TouchableOpacity>
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
              </View>
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
    color: colors.BLACK,
    textAlign: 'right',
    fontWeight: '700',
  },
  smalltext: {
    fontSize: 15,
    margin: 3,
    color: colors.BLACK,
    textAlign: 'right',
    fontWeight: '400',
  },
});

export default MissionPastChildScreen;
