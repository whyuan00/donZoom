import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UnsafeAssetChartTabScreen from '@/views/screens/investment/UnsafeAssetTabScreen/UnsafeAssetChartTabScreen'
import UnsafeChartTabScreen from '@/views/screens/investment/UnsafeAssetTabScreen/UnsafeAssetChartTabScreen';
import UnsafeNewsTabScreen from '@/views/screens/investment/UnsafeAssetTabScreen/UnsafeAssetNewsTabScreen';
import UnsafeReportTabScreen from '@/views/screens/investment/UnsafeAssetTabScreen/UnsafeAssetReportTabScreen';
import {colors} from '@/constants/colors';
import {fonts} from '@/constants/font';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const InvestTabNavigator = ({selectedAssetType}: any) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="차트"
      screenOptions={{
        tabBarActiveTintColor: colors.BLACK,
        tabBarLabelStyle: {fontFamily: fonts.MEDIUM, fontSize: 16},
        tabBarIndicatorStyle: {backgroundColor: colors.YELLOW_100},
      }}
      style={styles.tabNavigator}>
      <Tab.Screen
        name="차트"
        component={UnsafeAssetChartTabScreen}
        initialParams={{selectedAssetType}}
      />
      <Tab.Screen
        name="뉴스"
        component={UnsafeNewsTabScreen}
        initialParams={{selectedAssetType}}
      />
      <Tab.Screen
        name="리포트"
        component={UnsafeReportTabScreen}
        initialParams={{selectedAssetType}}
      />
    </Tab.Navigator>
  );
};

export default InvestTabNavigator;

const styles = StyleSheet.create({
  tabNavigator: {
    flex: 1,
    borderWidth: 3,
    height: 1000,
    backgroundColor: colors.BLACK,
  },
});
