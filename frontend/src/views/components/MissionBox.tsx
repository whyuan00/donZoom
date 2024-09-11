import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {colors} from '../../constants/colors';

interface MissionProps {
  missionTitle: string;
  missionPay: number;
  missionDate: string;
  onPress: () => void;
  isSelected: boolean;
}

const MissionBox = ({
  missionTitle,
  missionPay,
  missionDate,
  onPress,
  isSelected,
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
          <Text style={styles.largetext}>    {missionTitle} </Text>
          <Text style={styles.largetext}>    {missionPay}원 </Text>
          <Text style={styles.smalltext}>    {missionDate}까지 </Text>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.buttonContainer,
          {
            width: animatedButtonWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80], //글자 길이도 이거보다 짧아야함 
            }),
            opacity: animatedButtonWidth,
          },
        ]}>
        <TouchableOpacity style={styles.modifyButton} onPress={() => {}}>
          <Text style={styles.buttonText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {}}>
          <Text style={styles.buttonText}>삭제</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonContainer: {
    marginLeft:20,
    overflow: 'hidden',
  },
  modifyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 5,
    borderColor:colors.BLACK,
    borderRadius: 10,
    backgroundColor: colors.BLUE_100,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 5,
    borderColor:colors.BLACK,
    borderRadius: 10,
    backgroundColor: colors.WHITE,
  },
  buttonText: {
    fontSize: 15,
    color: colors.BLACK,
  },
  boxContainer: {
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
