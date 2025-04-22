/**
 * api 함수 호출 및 전, 후 작업
 * 매개변수 및 리턴 값 검증
 * 오류 시 에러 throw 
 */
import { z } from 'zod';
import apiInstance from '../apiInstance';
import { createErrorMessage } from './general';
import { StackStatusSchema } from '../interfaces/stack.types';
import {
  StackInfoResponse,
  StackInfoResponseSchema,
  UrlResponseSchema,
} from '../interfaces/apiResponse.types';
import axios from 'axios';

const idSchema = z.string().nonempty();

/**
 * 사용자에게 실습번호에 해당하는 실습 환경 생성
 * @param practiceId 실습 번호
 * @param userId 사용자 id
 */
export const createStack = async (
  practiceIdParam: unknown,
  userIdParam: unknown
) => {
  try {
    // validate
    const practiceId = idSchema.parse(practiceIdParam);
    const userId = idSchema.parse(userIdParam);

    // api호출
    await apiInstance.post(`${practiceId}/resources`, { userId });
  } catch (err) {
    console.error(createErrorMessage('createStack', err));
    throw Error('createStack');
  }
};

/**
 * 스택 작업 진행 여부 및 스택 정보 확인
 * @param practiceId 실습 번호
 * @param userId 사용자 id
 * @returns StackInfoResponse
 */
// 현재 스택 생성 안됐을 때 400 에러가 남. 백엔드단에서 에러가 아닌 200 + 생성안됨 상태를 내려줘야함.
export const getStackInfo = async (
  practiceIdParam: unknown,
  userIdParam: unknown
) => {
  try {
    // validate
    const practiceId = idSchema.parse(practiceIdParam);
    const userId = idSchema.parse(userIdParam);

    // api 호출
    const res = await apiInstance.get(`${practiceId}/status`, {
      params: { userId },
    });

    // validate 및 return
    return StackInfoResponseSchema.parse(res.data);
  } catch (err) {
    console.error(createErrorMessage('getStackInfo', err));

    // 에러 시에도 StatusResponse 리턴함으로써 일관된 타입 리턴 보장.
    return {
      stackStatus: { status: StackStatusSchema.Values.DOES_NOT_EXIST },
    } as StackInfoResponse;
  }
};

/**
 * 사용자의 실습번호에 해당하는 실습 환경 삭제
 * @param practiceId 실습 번호
 * @param userId 사용자 id
 */
export const deleteStack = async (
  practiceIdParam: unknown,
  userIdParam: unknown
) => {
  try {
    // validate
    const practiceId = idSchema.parse(practiceIdParam);
    const userId = idSchema.parse(userIdParam);

    // api호출
    await apiInstance.delete(`${practiceId}/resources`, {
      params: { userId },
    });
  } catch (err) {
    console.error(createErrorMessage('deleteStack', err));
    throw Error('deleteStack');
  }
};

/**
 * 실습 url을 받아 새 탭에서 해당 링크 오픈
 * @param practiceId 실습 번호
 * @param userId 사용자 id
 */
export const getConsoleUrl = async (
  practiceIdParam: unknown,
  userIdParam: unknown
) => {
  try {
    // validate
    const practiceId = idSchema.parse(practiceIdParam);
    const userId = idSchema.parse(userIdParam);

    // api 호출
    const res = await apiInstance.post(`${practiceId}/console`, {
      userId,
    });

    // validate 및 return
    return UrlResponseSchema.parse(res.data).ssoUrl;
  } catch (err) {
    console.error(createErrorMessage('getConsoleUrl', err));
    throw Error('getConsoleUrl');
  }
};

/**
 * 해당 실습의 가이드 호출
 * @param practiceId 실습 번호
 */
// 백엔드 api 생성 후 백엔드에서 텍스트 내려보내는 로직으로 변경 필요
export const getGuide = async (practiceIdParam: unknown) => {
  try {
    const practiceId = idSchema.parse(practiceIdParam);
    const res = await axios.get(
      `https://guide/guide${practiceId}.md`,
      { baseURL: '', headers: {} }
    );
    return res.data;
  } catch (err) {
    console.error(createErrorMessage('getGuide', err));
    throw Error('getGuide');
  }
};

/**
 * 해당 실습의 가이드 호출
 * @param practiceId 실습 번호
 */
// 백엔드 api 생성 후 백엔드에서 텍스트 내려보내는 로직으로 변경 필요
export const getPartialGuide = async (practiceIdParam: unknown, mdIdrParam : unknown) => {
  try {
    const practiceId = idSchema.parse(practiceIdParam);
    const mdId = idSchema.parse(mdIdrParam);
    const res = await axios.get(
      `https://guide/practice${practiceId}/0${mdId}.md`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return res.data;
  } catch (err) {
    console.error(createErrorMessage('getPartialGuide', err));
    throw Error('getPartialGuide');
  }
};
