import {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Vibration, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';

function QRCodeScanner() {
  const [scaned, setScaned] = useState<boolean>(true);
  const ref = useRef(null);

  useEffect(() => {
    setScaned(true);
  });

  const onBarCodeRead = (event: any) => {
    if (!scaned) return;
    setScaned(false);
    Vibration.vibrate();
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
});

export default QRCodeScanner;
