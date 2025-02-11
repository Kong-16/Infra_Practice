import { useCallback, useEffect, useRef, useState } from 'react';
import { createErrorMessage } from '../utils/error';
import { getStackInfo } from '../utils/api';
import {
  StackOutput,
  StackStatus,
  StackStatusSchema,
} from '../interfaces/stack.types';
import useUserStore from '../store/userStore';

/**
 * stack 생성 / 제거 작업이 진행 중인지 확인
 * [waitSeconds]초 마다 서버에 실습 스택 생성 여부를 확인하는 api를 보내 생성되었는지 확인
 * 최대 [limitSeconds]분 체크 후 생성되지 않았을 때는 에러로 간주
 * @param practiceId 실습 번호
 * @param userId 사용자 아이디
 * @returns 작업 완료 여부, 스택 정보
 */
const useStackInfoPoller = (practiceId: string | undefined) => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const { userId } = useUserStore();
  const [status, setStatus] = useState<StackStatus>(
    StackStatusSchema.Values.DOES_NOT_EXIST
  );
  const [stackList, setStackList] = useState<StackOutput[]>([]);

  // 인터벌 시간
  const waitSeconds = 30 * 1000;
  // const waitSeconds = 5* 1000;
  // 타임아웃 시간
  const limitSeconds = 20 * 60 * 1000;

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
   * 생성 확인.
   */
  const checkCreated = useCallback(async () => {
    try {
      if (!(userId && practiceId)) {
        clearLoop();
        return;
      }
      const data = await getStackInfo(practiceId, userId);

      setStatus(data.stackStatus.status);
      console.log('stack 생성 상태 : ', data.stackStatus.status);

      // 작업 완료 확인되면 인터벌 종료.
      switch (data.stackStatus.status) {
        case StackStatusSchema.Values.DELETE_COMPLETE:
          setStackList([]);
          clearLoop();
          break;
        case StackStatusSchema.Values.ROLLBACK_COMPLETE:
        case StackStatusSchema.Values.CREATE_COMPLETE:
          // stackList zod parse로 validate 필요 공민혁
          setStackList(data.stackStatus.outputs);
          clearLoop();
          break;
      }
    } catch (err) {
      console.error(createErrorMessage('checkCreated', err));
    }
  }, [userId, practiceId, clearLoop]);

  const startPolling = useCallback(() => {
    // console.log(`StackPoller 실행 : ${status}`);

    // 호출 직후 1회 실행;
    checkCreated();

    // 예측하지 못한 작동 방지 위해 interval 초기화.
    clearLoop();

    intervalId.current = setInterval(checkCreated, waitSeconds);

    timeoutId.current = setTimeout(() => {
      console.error(createErrorMessage('checkCreated', 'timeout'));
      alert('에러가 발생하였습니다. 다시 시도하여 주십시오.');
      console.error(createErrorMessage('checkCreated', 'timeout'));
    }, limitSeconds);
  }, [checkCreated]);

  // 훅 호출시 1회 실행.
  useEffect(() => {
    startPolling();
    return () => clearLoop();
  }, [practiceId,userId]); //

  return { status, stackList, startPolling };
};

export default useStackInfoPoller;