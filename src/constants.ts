/**
 * 코드 내에 사용되는 상수를 저장하는 파일입니다.
 *
 * 1. Object명과 key값은 모두 대문자 SNAKE_CASE로 작성합니다.
 * 2. key값은 해당 상수가 의미하는 용도를 명확히 나타냅니다.
 * 3. value는 실제 사용될 값입니다.
 *
 */
export const STORAGE = {
  REFRESH_TOKEN: 'refreshToken',
};

export const COGNITO_CONFIG = {
  AUTHORITY:import.meta.env.VITE_COGNITO_AUTHORITY,
  CLIENT_ID: import.meta.env.VITE_COGNITO_CLIENT_ID,
  REDIRECT_URI: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  RESPONSE_TYPE: import.meta.env.VITE_COGNITO_RESPONSE_TYPE,
  SCOPE: import.meta.env.VITE_COGNITO_SCOPE,
  TOKEN_REFRESH_URL: import.meta.env.VITE_COGNITO_TOKEN_REFRESH_URL,
};
