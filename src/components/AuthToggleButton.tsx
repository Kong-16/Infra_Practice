import { useAuth } from 'react-oidc-context';
import useUserStore from '../store/userStore';
import { COGNITO_CONFIG } from '../constants';
const AuthToggleButton = () => {
  const auth = useAuth();
  const { clearUser } = useUserStore();

  /**
   * 로그아웃 로직 수행
   * store의 accessToken, sessionStorage의 refreshToken, useAuth의 로그인 정보 삭제
   */
  const handleSignoutClick = async () => {
    clearUser();
    await auth.removeUser();
    window.location.href = `${COGNITO_CONFIG.DOMAIN}/logout?client_id=${
      COGNITO_CONFIG.CLIENT_ID
    }&logout_uri=${encodeURIComponent(COGNITO_CONFIG.REDIRECT_URI)}`;
  };

  const AuthStatus = () => {
    if (auth.isLoading) return <LoadingButton />;
    if (auth.isAuthenticated) return <SignoutButton />;
    if (!auth.isAuthenticated) return <SigninButton />;
    if (auth.error) {
      console.error('error in SignIn : ' + auth.error.message);
      return <ErrorButton />;
    }
  };

  const LoadingButton = () => <button>Loading...</button>;

  const ErrorButton = () => <button>Error</button>;

  const SigninButton = () => (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign In</button>
    </div>
  );

  const SignoutButton = () => (
    <div className="flex flex-nowrap items-center">
      <button className="button-reverse" onClick={() => handleSignoutClick()}>
        Sign out
      </button>
    </div>
  );

  return <AuthStatus />;
};

export default AuthToggleButton;
