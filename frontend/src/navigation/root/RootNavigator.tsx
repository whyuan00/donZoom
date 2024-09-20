import useAuth from '@/hooks/queries/useAuth';
import AuthStackNavigator from '../AuthStackNavigator';
import MissionTabNavigator from '../MissionTabNavigator';
import TestScreen from '@/views/screens/auth/TestScreen';

function RootNavigator() {
  const {isLogin} = useAuth();

  console.log('isLogin', isLogin);

  return <>{isLogin ? <TestScreen /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
