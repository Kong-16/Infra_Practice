import { HashLoader } from 'react-spinners';
import IconCopy from '../assets/IconCopy';
import {
  StackOutput,
  StackStatus,
  StackStatusSchema,
} from '../interfaces/stack.types';
import { useEffect, useState } from 'react';
import { copyToClipboard } from '../utils/general';

const StackCard = ({
  status,
  stackList,
}: {
  status: StackStatus;
  stackList: StackOutput[];
}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    switch (status) {
      case StackStatusSchema.Values.CREATE_IN_PROGRESS:
        setMessage('실습 환경 생성 중...');
        break;
      case StackStatusSchema.Values.DELETE_IN_PROGRESS:
        setMessage('실습 환경 삭제 중...');
        break;
      case StackStatusSchema.Values.ROLLBACK_IN_PROGRESS:
        setMessage('실습 환경 삭제 중...');
        break;
      case StackStatusSchema.Values.ROLLBACK_COMPLETE:
        setMessage('실습 환경 삭제가 필요합니다.');
        break;
      case StackStatusSchema.Values.DOES_NOT_EXIST:
        setMessage('실습 환경이 생성되지 않았습니다.');
        break;
      default:
        setMessage('');
    }
  }, [status]);

  const NoStack = () => <div>{message}</div>;

  const StackInProgress = () => (
    <div className="flex flex-col items-center pb-16">
      <div className="flex justify-center items-center m-8">{message}</div>
      <HashLoader color="#1e3a8a" />
    </div>
  );

  const StackList = () =>
    stackList.map((stack, index) => (
      <div key={index} className="order-gray-500 rounded-lg p-4 min-w-80">
        <div className="text-ellipsis overflow-hidden font-bold">
          {stack.OutputKey}
        </div>
        <div className="flex justify-between">
          <div className="text-ellipsis overflow-hidden">
            {stack.OutputValue}
          </div>
          <div className="copy-icon-container cursor-pointer ml-2 flex items-center">
            <IconCopy
              size="1rem"
              onClick={() => copyToClipboard(stack.OutputValue)}
            />
          </div>
        </div>
      </div>
    ));

  switch (status) {
    case StackStatusSchema.Values.CREATE_IN_PROGRESS:
    case StackStatusSchema.Values.DELETE_IN_PROGRESS:
    case StackStatusSchema.Values.ROLLBACK_IN_PROGRESS:
      return <StackInProgress />;
    case StackStatusSchema.Values.CREATE_COMPLETE:
      return <StackList />;
    default:
      return <NoStack />;
  }
};

export default StackCard;
