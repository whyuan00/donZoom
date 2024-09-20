import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

interface Props {
  name: string;
}

const MissionProfile = ({name}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/characterImage.webp')}
        style={styles.image}
      />
      <Text style={styles.text}> {name} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  image: {
    width: 64,
    height: 64,
    borderWidth: 3,
    borderColor: colors.BLUE_100,
    borderRadius: 50,
  },
  text: {
    fontSize: 26,
    marginLeft: 12,
    color: colors.BLUE_100,
    fontWeight: '700',
  },
});

export default MissionProfile;
