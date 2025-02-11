import { Link } from 'react-router-dom';
import Clock from '../assets/Clock';
import { CardProps } from '../interfaces/card.types';

const Card = ({ id, title, description, active }: CardProps) => {

  return (
    <div className="card-container min-w-[1000px] m-4 p-4 shadow-md rounded-xl border hover:shadow-xl">
      <div className="card-content-container p-2 flex flex-col m-2">
        <div className="flex justify-between">
          <div className="flex mb-4">
            <div className="practice-title text-wrap text-2xl font-semibold ">
              {title}
            </div>
            <div className="flex text-gray-400 items-center">
              <Clock size="1rem" stroke='#9CA3AF' className='ml-3 mr-1'/>
              2시간
            </div>
          </div>

          {active && <div className="status mr-1">실행 중</div>}
        </div>
        <div className="practice-description text-start text-wrap text-gray-600">
          {description}
        </div>
      </div>
      <div className="card-button-container border-gray-400 border-none flex justify-end">
        <Link
          to={`/practice/${id}`}
          className="bg-blue-600 text-white border rounded-lg m-2 w-16 h-10 font-semibold flex justify-center items-center"
        >
          시작
        </Link>
      </div>
    </div>
  );
};

export default Card;
