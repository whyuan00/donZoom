import {colors} from '@/constants/colors';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {useState} from 'react';
import ChildrenMainScreen from './main/ChildrenMainScreen';
import ParentsMainScreen from './main/ParentsMainScreen';

function HomeScreen() {
  const [isParent] = useState(true);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentsContainer}>
          {isParent ? <ParentsMainScreen /> : <ChildrenMainScreen />}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  contentsContainer: {},
});

export default HomeScreen;
