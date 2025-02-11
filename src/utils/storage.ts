import { STORAGE } from '../constants';
import { createErrorMessage } from './error';

export const getRefreshToken = () => {
  return sessionStorage.getItem(STORAGE.REFRESH_TOKEN);
};

export const setRefreshToken = (token: string | undefined) => {
  if (!token) {
    throw new Error(
      createErrorMessage('setRefreshToken', 'refreshToken not exists')
    );
  }
  sessionStorage.setItem(STORAGE.REFRESH_TOKEN, token);
};

export const deleteRefreshToken = () => {
  sessionStorage.removeItem(STORAGE.REFRESH_TOKEN);
};
