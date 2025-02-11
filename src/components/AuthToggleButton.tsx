import { useAuth } from 'react-oidc-context';
function AuthToggleButton() {
  const auth = useAuth();

  /**
   * 2024.12.16 공민혁
   * 인증 필터 구현 시 메인페이지 / 로그인 페이지로 자동 리다이렉션 될 예정 이므로 현재는 필요 없는 기능이라 주석처리
   */
  // const signOutRedirect = () => {
  //   const clientId = "4u15vsm6ire7311h2deaopj8lk";
  //   const logoutUri = "http://localhost:5173";
  //   const cognitoDomain = "https://<user pool domain>";
  //   window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  // };

  // if (auth.isAuthenticated) {
  //   console.log('accessToken : ' + auth.user?.access_token);
  //   console.log('refreshToken : ' + auth.user?.refresh_token);
  // } else console.log('not logged in !');

  /**
   * 로그아웃 로직 수행
   * store의 accessToken, sessionStorage의 refreshToken, useAuth의 로그인 정보 삭제
   */
  const handleSignoutClick = () => {
    sessionStorage.clear();
    auth.removeUser();
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
      <button
        className='button-reverse'
        onClick={() => handleSignoutClick()}
      >
        Sign out
      </button>
    </div>
  );

  return <AuthStatus />;
}

export default AuthToggleButton;
