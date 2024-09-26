import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {colors} from '../../constants/colors';
//TODO: 필요할경우 미션박스 컴포넌트 React.memo로 리팩토링
interface MissionProps {
  missionTitle: string;
  missionPay: number;
  missionDate: string;
  onPress: () => void;
  isSelected: boolean;
  buttonOne: string;
  buttonTwo: string;
  onPressButtonOne: () => void;
  onPressButtonTwo: () => void;
}

const MissionBox = ({
  missionTitle,
  missionPay,
  missionDate,
  onPress,
  isSelected,
  buttonOne,
  buttonTwo,
  onPressButtonOne,
  onPressButtonTwo,
}: MissionProps) => {
  const animatedWidth = useRef(new Animated.Value(1)).current;
  const animatedButtonWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedWidth, {
        toValue: isSelected ? 0.8 : 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(animatedButtonWidth, {
        toValue: isSelected ? 1 : 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isSelected]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={[
            styles.boxContainer,
            {
              width: animatedWidth.interpolate({
                inputRange: [0.8, 1],
                outputRange: [240, 350],
              }),
            },
          ]}>
          {/* 박스 크기 조정하*/}
          <Text style={styles.largetext}> {missionTitle} </Text>
          <Text style={styles.largetext}>{missionPay.toLocaleString()}원</Text>
          <Text style={styles.smalltext}>
            {missionDate && missionDate.replaceAll('-', '.')}까지
          </Text>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            width: animatedButtonWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100], //글자 길이도 이거보다 짧아야함
            }),
            opacity: animatedButtonWidth,
          },
        ]}>
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={onPressButtonOne}>
          <Text style={styles.buttonOneText}>{buttonOne}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onPressButtonTwo}>
          <Text style={styles.buttonTwoText}>{buttonTwo}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // 버튼 정렬
    marginVertical: 10,
  },
  buttonContainer: {
    overflow: 'hidden',
  },
  modifyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 20,
    marginBottom: 5,
    borderColor: colors.BLACK,
    borderRadius: 10,
    backgroundColor: colors.BLUE_100,
    borderWidth: 1,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 20,
    marginBottom: 5,
    borderColor: colors.BLACK,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
  },
  buttonOneText: {
    fontSize: 15,
    color: colors.WHITE,
  },
  buttonTwoText: {
    fontSize: 15,
    color: colors.BLACK,
  },
  boxContainer: {
    // 미션 박스 스타일
    height: 130,
    padding: 20,
    borderColor: colors.BLACK,
    backgroundColor: colors.YELLOW_50,
    borderRadius: 10,
  },
  largetext: {
    fontSize: 18,
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

export default MissionBox;
