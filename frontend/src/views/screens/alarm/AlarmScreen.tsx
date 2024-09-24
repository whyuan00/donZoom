import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import AlarmTabNavigator from '@/navigation/AlarmTabNavigator';
import MissionProfile from '@/views/components/MissionProfile';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
export default function AlarmScreen(){
  return (
    <View style={styles.container}>
      <AlarmTabNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, // 화면 전체를 차지하도록 설정
    justifyContent: 'flex-start', // 내용이 화면 상단에 위치하도록 설정
    alignItems: 'stretch', // 자식 컴포넌트가 화면의 가로를 채우도록 설정
  },
});
