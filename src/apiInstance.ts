import axios, { AxiosError } from 'axios';
import useUserStore from './store/userStore';
import { createErrorMessage } from './utils/error';

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * accessToken 있는 경우 header에 Authorization : Bearer [토큰] 추가
 */
apiInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  console.debug(
    `
    URL : ${config.baseURL! + config.url}
    METHOD : ${config.method}
    HEADERS : ${JSON.stringify(config.headers)}
    DATA : ${JSON.stringify(config.data)}
  `);

  if (config.method?.toUpperCase() !== 'OPTIONS' && token)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * response 처리
 * 에러 시에도 Promise.reject를 반환함으로써 response가 Promise 타입을 반환함을 보장
 */
apiInstance.interceptors.response.use(
  // 성공 시 response 반환
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;
    try {
      if (axiosError.config && axiosError.response?.status === 401) {
        if (axiosError.response.data === 'Expired Token') {
          // 토큰 재발급 로직 추가 필요
          return;
        } else {
          // 재 로그인 로직 추가 필요
          return;
        }
      } else {
        console.log(createErrorMessage('axios response', axiosError.message));
      }
    } catch (err) {
      // 정상적인 response를 받지 못한 경우
      console.error(
        createErrorMessage('axios response', 'Unexpected General Error' + err)
      );
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
