import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axiosInstance from '@/api/axios';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MissionBox from '../../components/MissionBox';
import {colors} from '@/constants/colors';
import InputField from '@/views/components/InputField';
import CustomCalendar from '@/views/components/CustomCalendar';
import KeyPad from '@/views/components/KeyPad';

interface Mission {
  missionId: number;
  contents: string;
  dueDate: string;
  reward: number;
}

const MissionOngoingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [textCount, setTextCount] = useState(0); //글자수 제한
  const [showCalendar, setShowCalendar] = useState(false); //캘린더 토글
  const [showKeyPad, setShowKeyPad] = useState(false); //캘린더 토글
  const [showModifyModal, setShowModifyModal] = useState(false); // 모달 토글
  // 미션 수정할때 활용하는 변수
  const [selectedMissionId, setSelectedMissionId] = useState<number>(-1);
  const [missionTitleModify, setMissionTitleModify] = useState<string>('');
  const [missionPayModify, setMissionPayModify] = useState(-1);
  const [missionDateModify, setMissionDateModify] = useState<string>('');
  const [selectedMissionBox, setSelectedMissionBox] = useState<number | null>(
    null,
  );

  const [missionData, setMissionData] = useState<Mission[]>([]);
  const missionDateModifyString = missionDateModify.replaceAll('-', '.');
  const [childId, setChildId] = useState<number>(0); //TODO: childId zustand에 저장한다음에 불러와야함

  useFocusEffect(
    useCallback(() => {
      const getData = async (childId: number) => {
        try {
          const response = await axiosInstance.get(
            `/mission?status=created&childId=${childId}`,
          );
          console.log('진행중 탭 업데이트');
          // const missions: Mission[] = response.data.map((mission: any) => ({
          //   missionId: mission.id,
          //   contents: mission.contents,
          //   dueDate: mission.dueDate || null,
          //   reward: mission.reward,
          // }));
          const {missions} = response.data;
          setMissionData(missions);
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

  const handleButtonModify = useCallback(
    (missionId: number) => {
      const mission = missionData.find(m => m.missionId === missionId);
      if (mission) {
        setSelectedMissionId(missionId);
        setMissionTitleModify(mission.contents);
        setMissionPayModify(mission.reward);
        setMissionDateModify(mission.dueDate);
      }
      setShowModifyModal(true);
    },
    [missionData],
  );

  const handleButtonDelete = useCallback(async (missionId: number) => {
    try {
      await axiosInstance.delete(`/mission/${missionId}`);
      console.log('진행중인 미션 삭제');
      setMissionData(prevData =>
        prevData.filter(mission => mission.missionId !== missionId),
      ); // api 재호출 없이 로컬에서 처리
    } catch (error) {
      console.log(error);
    }
    // setSelectedMissionId(-1); // 필요없음?
  }, []);

  const onChangeText = useCallback((input: string) => {
    if (input.length <= 20) {
      setMissionTitleModify(input);
      setTextCount(input.length);
    }
  }, []);

  // 캘린더 토글
  const toggleCalendar = () => {
    if (showKeyPad) setShowKeyPad(!showKeyPad);
    setShowCalendar(!showCalendar);
  };
  const handleDateSelect = (date: string) => {
    setMissionDateModify(date);
  };
  // 키패드 토글
  const toggleKeypad = () => {
    if (showCalendar) setShowCalendar(!showCalendar);
    setShowKeyPad(!showKeyPad);
  };
  const updateMissionPay = useCallback((newValue: number) => {
    if (newValue >= 100000) {
      setMissionPayModify(100000);
      // setAlertText('※ 금액은 100,000원을 초과할 수 없습니다');
    } else if (newValue > 0) {
      setMissionPayModify(newValue);
      // setAlertText('');
    } else {
      setMissionPayModify(0);
      // setAlertText('');
    }
  }, []);

  const handleConfirm = async (
    id: number,
    title: string,
    pay: number,
    date: string,
  ) => {
    try {
      await axiosInstance.patch(`/mission/${id}`, {
        contents: title,
        due_date: date,
        reward: pay,
      });
      console.log('진행중인 미션수정');
      setMissionData(prevData =>
        prevData.map(mission =>
          mission.missionId === id
            ? {
                ...mission,
                contents: title,
                dueDate: date,
                reward: pay,
              }
            : mission,
        ),
      ); // api호출없이 데이터 수정
      setShowModifyModal(false);
    } catch (error) {
      console.log(error);
    }
  };

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
            {missionData?.map((mission: Mission, index) => (
              <MissionBox
                key={mission.missionId}
                missionTitle={mission.contents}
                missionPay={mission.reward}
                missionDate={mission.dueDate}
                onPress={() => {
                  handleMissionPress(mission.missionId);
                }}
                isSelected={selectedMissionBox === mission.missionId}
                buttonOne="수정"
                buttonTwo="취소"
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
        <Modal visible={showModifyModal} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <InputField
                style={{
                  color: colors.GRAY_100,
                  fontSize: 15,
                  marginTop: 23,
                  padding: 0,
                }}
                onChangeText={onChangeText}
                value={missionTitleModify}
                autoFocus={!showCalendar && !showKeyPad}
              />

              <TouchableOpacity onPress={toggleKeypad}>
                <Text style={styles.payText}>{missionPayModify} 원</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleCalendar}>
                <Text style={{color: colors.GRAY_100}}>
                  <Text style={{fontSize: 15, color: colors.BLUE_100}}>
                    {missionDateModifyString}
                  </Text>
                  까지 미션을 완료해주세요!
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() =>
                handleConfirm(
                  selectedMissionId,
                  missionTitleModify,
                  missionPayModify,
                  missionDateModify,
                )
              }>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: colors.BLACK,
                }}>
                수정 완료하기
              </Text>
            </TouchableOpacity>
            {showCalendar ? (
              <View style={{position: 'absolute', top: 470}}>
                <CustomCalendar
                  selectedDate={missionDateModify}
                  onDateSelect={handleDateSelect}></CustomCalendar>
              </View>
            ) : (
              <></>
            )}
            {showKeyPad ? (
              <View
                style={{
                  position: 'absolute',
                  top: 470,
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: colors.YELLOW_25,
                }}>
                <KeyPad
                  onInput={updateMissionPay}
                  currentValue={missionPayModify}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  modalContainer: {
    marginTop: 230,
    width: 330,
    height: 150,
    backgroundColor: colors.YELLOW_50,
    borderRadius: 10,
    alignItems: 'center',
  },
  payText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.BLUE_100,
    marginTop: 8,
    marginBottom: 15,
  },
  confirmButton: {
    marginTop: 10,
    width: 300,
    height: 50,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
});

export default MissionOngoingScreen;
