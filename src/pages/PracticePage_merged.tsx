/**
 * 실습 페이지
 * url : /practice/[실습 번호]
 */
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LogoButton from '../components/LogoButton';
import Title from '../components/Title';
import StackCard from '../components/StackCard';
import useButtonHandler from '../hooks/useButtonHandler';
import { createErrorMessage } from '../utils/general';
import useStackInfoPoller from '../hooks/useStackInfoPoller';
import { StackStatusSchema } from '../interfaces/stack.types';
import Guide from '../components/Guide';
import useStackStore from '../store/stackStore';

const PracticePage_m = () => {
  const { practiceId } = useParams();
  const { status, outputs: stackList, setStack, clearStack } = useStackStore();
  const { startPolling } = useStackInfoPoller();
  const { handleStackCreation, handleOpenConsole, handleStackDeletion } =
    useButtonHandler();

  useEffect(() => {
    if (!practiceId) {
      alert('잘못된 접근입니다.');
      console.log(createErrorMessage('PracticePage', 'practiceId not exists'));
    } else {
      setStack('practiceId', practiceId);
      startPolling();
    }
    // 실습 페이지 나가면 실습에 대한 스택 초기화
    return () => {
      clearStack();
    };
  }, [practiceId]);

  const StackCreateButton = () => (
    <button className="practice-button" onClick={() => handleStackCreation()}>
      실습 환경 생성
    </button>
  );

  const StackDeleteButton = () => (
    <button className="practice-button" onClick={() => handleStackDeletion()}>
      실습 환경 정리
    </button>
  );

  const DisabledButton = () => (
    <button className="practice-button" disabled={true}>
      작업 진행중
    </button>
  );

  const StackToggleButton = () => {
    switch (status) {
      case StackStatusSchema.Values.DOES_NOT_EXIST:
        return <StackCreateButton />;
      case StackStatusSchema.Values.CREATE_COMPLETE:
        return <StackDeleteButton />;
      default:
        return <DisabledButton />;
    }
  };

  const ButtonSection = () => (
    <div className="button-container flex justify-start">
      <StackToggleButton />
      <button className="practice-button" onClick={() => handleOpenConsole()}>
        콘솔 접근
      </button>
    </div>
  );

  const PracticeHeader = () => (
    <div className="header-container w-screen fixed top-0 px-10">
      <LogoButton />
      <Title />
      <div className="right-container h-full flex items-center">
        <ButtonSection />
      </div>
    </div>
  );

  return (
    <div className="practice-page">
      <PracticeHeader />
      <div className="flex mt-20">
        <div className="sticky-container sticky top-24 ml-10 min-w-[21rem] min-h-[21rem] h-fit">
          <div className="stack-info-container ml-2 border rounded-xl border-gray-300 shadow-md min-h-80 min-w-80 text-gray-700 bg-white flex flex-col justify-center items-center">
            <StackCard status={status} stackList={stackList} />
          </div>
        </div>
        <div className="guide-container flex flex-col min-w-f w-full prose p-20">
          <Guide />
        </div>
      </div>
    </div>
  );
};

export default PracticePage_m;
