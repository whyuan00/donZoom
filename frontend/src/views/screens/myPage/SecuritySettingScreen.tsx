import { colors } from '@/constants/colors';
import { fonts } from '@/constants/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

function SecuritySettingScreen() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((previousState) => !previousState);
  };
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.optionContainer}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionHeaderText}>
              지문인증 설정
            </Text>
          </View>
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={toggleSwitch}>
              <FontAwesome
                name={isOn ? 'toggle-on' : 'toggle-off'}
                size={30}
                color={isOn ? colors.BLUE_100 : '#B0BEC5'} // 'on'일 때 초록색, 'off'일 때 회색
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionHeaderText}>
              비밀번호 변경
            </Text>
          </View>
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={toggleSwitch}>
              <Text>]</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop:20,
    height:'100%',
    backgroundColor:colors.WHITE,
  },
  optionContainer: {
    flexDirection: 'row',
    height: 70,
  },
  optionTextContainer: {
    marginLeft: 23,
    width: 235,
  },
  optionHeaderText: {
    fontFamily: fonts.BOLD,
    marginTop: 6,
    fontSize: 16,
  },
  optionContextText: {
    fontFamily: fonts.MEDIUM,
    marginTop: 8,
    fontSize: 12,
  },
  toggleContainer: {
    marginRight: 23,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },

});

export default SecuritySettingScreen;
