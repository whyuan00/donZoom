import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // 실제 웹 클라이언트 ID로 대체
    offlineAccess: true,
  });
}
