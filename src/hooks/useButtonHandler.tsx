import useUserStore from '../store/userStore';
import { createStack, deleteStack, getConsoleUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import useStackInfoPoller from './useStackInfoPoller';
import { toast } from 'react-toastify';
import useStackStore from '../store/stackStore';

const useButtonHandler = () => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { practiceId } = useStackStore();
  const { startPolling } = useStackInfoPoller();
  
  // 람다 깨우는 시간 때문에 await 응답이 늦어 요청 toast를 띄움. 추후 상의필요 공민혁
  /**
   * 스택 생성 버튼 클릭 동작
   * 스택 생성 api 요청 후 스택 상태 확인
   */
  const handleStackCreation = async () => {
    try {
      if (window.confirm('실습 환경을 생성하시겠습니까?')) {
        toast.success('실습 환경 생성 요청');
        await createStack(practiceId, userId);
        toast.success('실습 환경 생성 중입니다!');
      }

      startPolling();
    } catch {
      toast.error('실습 환경 생성에 실패했습니다.');
    }
  };

  /**
   * 콘솔 접근 버튼 클릭 동작
   * url api 요청 후 해당 url 새 창에서 오픈
   */
  const handleOpenConsole = async () => {
    try {
      const url = await getConsoleUrl(practiceId, userId);
      window.open(url, '_blank');
    } catch {
      toast.error('콘솔 접근에 실패했습니다.');
    }
  };

  // 람다 깨우는 시간 때문에 await 응답이 늦어 요청 toast를 띄움. 추후 상의필요 공민혁
  /**
   * 스택 삭제 버튼 클릭 동작
   * 스택 삭제 api 요청 후 메인 페이지로 이동
   */
  const handleStackDeletion = async () => {
    try {
      if (window.confirm('실습 환경을 삭제하시겠습니까?')) {
        toast.success('실습 환경 삭제 요청');
        await deleteStack(practiceId, userId);
        toast.success('실습 환경 삭제 중입니다.');
        navigate('/');
      }
    } catch {
      toast.error('실습 환경 삭제에 실패했습니다.');
    }
  };

  return { handleStackCreation, handleOpenConsole, handleStackDeletion };
};

export default useButtonHandler;
