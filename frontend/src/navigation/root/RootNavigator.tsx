import useAuth from '@/hooks/queries/useAuth';
import AuthStackNavigator from '../AuthStackNavigator';
import MainScreen from '@/views/screens/main/MainScreen';

function RootNavigator() {
  const {isLogin} = useAuth();

  console.log('isLogin', isLogin);

  return <>{isLogin ? <MainScreen /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
