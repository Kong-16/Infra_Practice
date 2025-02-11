import axios from 'axios';
import { COGNITO_CONFIG } from '../constants';
import { createErrorMessage } from './error';

/**
 * @author 공민혁
 * aws cognito에 토큰 재발급 요청을 보내 accessToken 및 idToken을 갱신함
 * client_id, url 환경변수 지정 필요
 * @param token 현재 refreshToken
 * @returns data {access_token, expires_in, id_token, token_type}
 */
export async function tokenRefreshRequest(
  token: string
): Promise<OAuthTokenResponse> {
  const urlParam = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: token,
    client_id: COGNITO_CONFIG.CLIENT_ID,
  });

  const options = {
    method: 'POST',
    url: COGNITO_CONFIG.TOKEN_REFRESH_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: urlParam.toString(),
  };

  try {
    const res = await axios(options);
    return res.data as OAuthTokenResponse;
  } catch (err) {
    console.error(err);
    return Promise.reject(new Error(createErrorMessage('tokenRefresh', err)));
  }
}
