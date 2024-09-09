import React, {useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';

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
    borderWidth: 1,
    borderColor: colors.GRAY_75,
    padding: deviceHeight > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_25,
    color: colors.GRAY_100,
  },
});

export default InputField;
