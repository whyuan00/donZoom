import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {fonts} from '@/constants/font';
import {Path, Svg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Fontisto';

interface Props {
  name?: string;
}

const HomeProfile = ({name}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {name ? (
          <View>
            <Image
              source={require('../../assets/images/characterImage.webp')}
              style={styles.image}
            />
            <Text style={styles.text}>
              <Text style={styles.textName}>{name}</Text>님
            </Text>
          </View>
        ) : (
          <View style={styles.svgContainer}>
            <Icon name="plus-a" />
            {/* <Text style={{marginTop:5}}> 아이 찾기</Text> */}
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  profileContainer: {},
  image: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.BLUE_100,
    borderRadius: 50,
  },
  svgContainer: {
    // paddingTop:15,
    width: 75,
    height: 75,
    backgroundColor:colors.GRAY_25,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    fontWeight: '700',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textName: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.BOLD,
    color: colors.BLUE_100,
    fontWeight: '700',
  },
});

export default HomeProfile;
