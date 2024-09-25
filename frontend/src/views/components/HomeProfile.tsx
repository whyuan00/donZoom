import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

interface Props {
  name: string;
}

const HomeProfile = ({name}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/characterImage.webp')}
          style={styles.image}
        />
        <Text style={styles.text}>
          <Text style={styles.textName}>{name}</Text>님 어서오세요!
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#FFE37F',
    borderRadius: 50,
  },
  text: {
    marginBottom: 10,
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: '700',
  },
  textName: {
    width: 80,
    textAlign: 'center',
    fontSize: 32,
    color: colors.BLUE_100,
    fontWeight: '700',
  },
});

export default HomeProfile;
