import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
  // QR 코드로 변환할 JSON 데이터
  const accountData = {
    accountNumber: "0017584956261876",
    bank: "싸피은행"
  };

  // JSON 데이터를 문자열로 변환
  const jsonData = JSON.stringify(accountData);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      {/* <Text>계좌번호: {accountData.accountNumber}</Text>
      <Text>은행: {accountData.bank}</Text> */}
      <QRCode
        value={jsonData}  // QR 코드로 변환할 데이터
        size={200}        // QR 코드 크기
      />
    </View>
  );
};

export default QRCodeGenerator;
