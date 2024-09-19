import React, {useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';

const deviceHeight = Dimensions.get('screen').height;

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const InputField = ({
  disabled = false,
  error,
  touched,
  ...props
}: InputFieldProps) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 200, // 인풋필드 너비 미정으로 바꿔둠 
    height: 40,
  },
  input: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.BLACK,
    fontFamily: fonts.LIGHT,
  },
  disabled: {
    backgroundColor: colors.GRAY_25,
    color: colors.GRAY_100,
  },
});

export default InputField;
