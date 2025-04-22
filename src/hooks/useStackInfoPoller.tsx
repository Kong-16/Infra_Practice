import { useCallback, useEffect, useRef, useState } from 'react';
import { createErrorMessage } from '../utils/general';
import { getStackInfo } from '../utils/api';
import { StackStatusSchema } from '../interfaces/stack.types';
import useUserStore from '../store/userStore';
import useStackStore from '../store/stackStore';
import { StackInfoResponse } from '../interfaces/apiResponse.types';

/**
 * stack 생성 / 제거 작업이 진행 중인지 확인
 * [waitSeconds]초 마다 서버에 실습 스택 생성 여부를 확인하는 api를 보내 생성되었는지 확인
 * 최대 [limitSeconds]분 체크 후 생성되지 않았을 때는 에러로 간주
 * @returns 작업 완료 여부, 스택 정보
 */
const useStackInfoPoller = () => {
  // 인터벌 시간
  const waitSeconds = 30 * 1000;
  // const waitSeconds = 5 * 1000;

  // 타임아웃 시간
  // const limitSeconds = 60 * 1000;
  const limitSeconds = 10 * 60 * 1000;

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const { userId } = useUserStore();
  const { practiceId, setStack } = useStackStore();

  /**
   * interval 및 timeout 중단.
   */
  const clearLoop = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  /**
   * 생성 확인 후 스택 상태 반영
   */
  const checkCreated = useCallback(async () => {
    try {
      if (!(userId && practiceId)) {
        return;
      }
      const data = (await getStackInfo(
        practiceId,
        userId
      )) as StackInfoResponse;

      setStack('status', data.stackStatus.status);
      console.log('stack 생성 상태 : ', data.stackStatus.status);

      // 작업 완료 확인되면 인터벌 종료.
      switch (data.stackStatus.status) {
        case StackStatusSchema.Values.DOES_NOT_EXIST:
          setStack('outputs', []);
          clearLoop();
          break;
        case StackStatusSchema.Values.DELETE_COMPLETE:
          setStack('outputs', []);
          clearLoop();
          break;
        case StackStatusSchema.Values.ROLLBACK_COMPLETE:
        case StackStatusSchema.Values.CREATE_COMPLETE:
          setStack('outputs', data.stackStatus.outputs);
          clearLoop();
          break;
        // InProgress 일때만 interval 유지 추가 필요 공민혁
      }
    } catch (err) {
      console.error(createErrorMessage('checkCreated', err));
    }
  }, [userId, practiceId, clearLoop]);

  const startPolling = useCallback(() => {
    // 호출 직후 1회 실행
    checkCreated();

    // 예측하지 못한 동작 방지 위해 interval 초기화
    clearLoop();

    intervalId.current = setInterval(checkCreated, waitSeconds);

    timeoutId.current = setTimeout(() => {
      console.error(createErrorMessage('checkCreated', 'timeout'));
      alert('에러가 발생하였습니다. 다시 시도하여 주십시오.');
      clearLoop();
    }, limitSeconds);
  }, [checkCreated]);

  useEffect(() => {
    startPolling();
    return () => clearLoop();
  }, [practiceId, userId]);

  return { startPolling };
};

export default useStackInfoPoller;
