import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountInitScreen from '@/views/screens/account/AccountInitScreen';
import TermsAgreementScreen from '@/views/screens/account/TermsAgreementScreen';
import InputPassWordScreen from '@/views/screens/myPage/InputPassWordScreen';

const AccountInitNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="약관동의" component={TermsAgreementScreen} />
      <Stack.Screen name="비밀번호설정" component={InputPassWordScreen} />
      <Stack.Screen name="계좌개설" component={AccountInitScreen} />
    </Stack.Navigator>
  );
};

export default AccountInitNavigator;
