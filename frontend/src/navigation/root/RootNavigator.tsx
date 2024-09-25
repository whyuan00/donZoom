import useAuth from '@/hooks/queries/useAuth';
import AuthStackNavigator from '../AuthStackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Footer from '../Footer';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {isLogin} = useAuth();

  console.log('isLogin', isLogin);

  return (
    <Stack.Navigator>
      {isLogin ? (
        <Stack.Screen
          name="Footer"
          component={Footer}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
