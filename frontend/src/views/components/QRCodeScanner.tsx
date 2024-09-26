import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import CloseButton from '@/assets/closeButton.svg';
import {useNavigation} from '@react-navigation/native';

function QRCodeScanner() {
  const [scaned, setScaned] = useState<boolean>(true);
  const navigation = useNavigation();
  const ref = useRef(null);

  useEffect(() => {
    setScaned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    console.log('Scanned event: ', event);
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate(100);
    Alert.alert('QR Code', event.nativeEvent.codeStringValue, [
      {text: 'OK', onPress: () => setScaned(true)},
    ]);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.scanner}
        ref={ref}
        cameraType={CameraType.Back}
        scanBarcode
        showFrame={true}
        laserColor="rgba(0,0,0,0)"
        surfaceColor="rgba(0,0,0,0)"
        onReadCode={onBarCodeRead}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <CloseButton width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scanner: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
});

export default QRCodeScanner;
