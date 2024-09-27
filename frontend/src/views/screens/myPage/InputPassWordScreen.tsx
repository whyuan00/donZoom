import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import PasswordPad from '@/views/components/PasswordPad';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function InputPassWordScreen() {
  const [password, setPassword] = useState<string>('');
  const updateValue = (newValue: string) => {
    if (newValue.length <= 6) {
      setPassword(newValue);
    }
  };
  const renderPasswordCircles = () => {
    const circles = [];
    const passwordLength = password.length;

    for (let i = 0; i < 6; i++) {
      circles.push(
        <View
          key={i}
          style={[styles.circle, i < passwordLength && styles.filledCircle]}
        />,
      );
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.inputText}>비밀번호를 입력해주세요</Text>
        <View style={styles.passwordContainer}>{renderPasswordCircles()}</View>
      </View>
      <View style={styles.padContainer}>
        <PasswordPad onInput={updateValue} currentValue={password} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: colors.WHITE,
  },
  textContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    color: colors.BLACK,
    fontFamily: fonts.MEDIUM,
    fontSize: 24,
    marginBottom: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    marginBottom: 20,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  filledCircle: {
    backgroundColor: colors.BLACK,
  },
  padContainer: {
    backgroundColor: colors.YELLOW_25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputPassWordScreen;
