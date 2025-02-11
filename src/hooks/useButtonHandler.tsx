import useUserStore from '../store/userStore';
import { createStack, deleteStack, getConsoleUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import useStackInfoPoller from './useStackInfoPoller';

const useButtonHandler = (practiceId: string | undefined) => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { startPolling } = useStackInfoPoller(practiceId);
  // const { setStack } = useStackStore();

  const handleStackCreation = async (practiceId: string | undefined) => {
    await createStack(practiceId, userId);

    // api 호출 성공 시 임의로 스택 상태값 바꿔 useStackInfoPoller 트리거
    startPolling();
    // setStack('status', StackStatusSchema.Values.CREATE_IN_PROGRESS);
  };

  const handleOpenConsole = async (practiceId: string | undefined) => {
    const url = await getConsoleUrl(practiceId, userId);
    window.open(url, '_blank');
  };

  const handleStackDeletion = async (practiceId: string | undefined) => {
    await deleteStack(practiceId, userId);

    // api 호출 성공 시 임의로 스택 상태값 바꿔 useStackInfoPoller 트리거
    startPolling();
    // setStack('status', StackStatusSchema.Values.DELETE_IN_PROGRESS);
    navigate('/');
  };

  return { handleStackCreation, handleOpenConsole, handleStackDeletion };
};

export default useButtonHandler;