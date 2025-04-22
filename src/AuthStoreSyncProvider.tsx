import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import useUserStore from './store/userStore';
import { createErrorMessage } from './utils/general';
import LoadingPage from './pages/LoadingPage';

/**
 * Token 관리 및 갱신하는 Provider
 *
 * accessToken 저장 : userStore에 저장 (미 구현)
 *
 */
const AuthStoreSyncProvider = ({ children }: { children: any }) => {
  const auth = useAuth();
  const { setUser } = useUserStore();

  const syncToken = async () => {
    if (auth.error) {
      console.error(createErrorMessage('syncToken', auth.error.message));
      return;
    }
    if (auth.isLoading) {
      return;
    }
    if (!auth.isAuthenticated) {
      // setTimeout 하지 않을 경우 지워지지 않은 정보가 있어 바로 다시 로그인 되는 것으로 보임.
      setTimeout(() => {
        auth.signinRedirect();
      }, 1000);
    } else {
      setUser('userId', auth.user?.profile['cognito:username']! as string);
      setUser('accessToken', auth.user?.access_token!);
    }
  };

  // 로그인 상태가 아닌 경우 토큰 동기화 작업.
  useEffect(() => {
    syncToken();
  }, [auth.isLoading, auth.isAuthenticated]);

  if (auth.isLoading || !auth.isAuthenticated) {
    return (
      <LoadingPage/>
    );
  }

  // if(!auth.isAuthenticated) {
  //   return <ErrorPage/>
  // }

  return <div>{children}</div>;
};

export default AuthStoreSyncProvider;
