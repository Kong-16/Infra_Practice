import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { HashLoader } from 'react-spinners';
import useUserStore from './store/userStore';
import { createErrorMessage } from './utils/error';

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
    // console.log(auth);
    // 에러 시 로직 추가 필요
    if (auth.error) {
      console.error(createErrorMessage('syncToken', auth.error.message));
      return;
    }
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      await auth.signinRedirect();
    } else {
      setUser('userId', auth.user?.profile['cognito:username']! as string);
      setUser('accessToken', auth.user?.access_token!);
    }
  };

  // 상태 추적 대상 변경 가능성
  useEffect(() => {
    syncToken();
  }, [auth.isLoading, auth.isAuthenticated]);
  if (auth.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <HashLoader color="#1e3a8a" />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AuthStoreSyncProvider;
