import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import {mergeRefs} from '@/utils/common';

const deviceHeight = Dimensions.get('screen').height;

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const InputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            placeholderTextColor={colors.GRAY_75}
            style={[styles.input, disabled && styles.disabled]}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

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
  inputError: {
    borderBottomWidth: 1,
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    padding: 5,
  },
});

export default InputField;
