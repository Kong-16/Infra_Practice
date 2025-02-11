import { useEffect, useState } from 'react';
import { getGuide } from '../utils/api';

const useGuide = (practiceId: string | undefined) => {
  const [guide, setGuide] = useState('');


  // 페이지 실행 시 한 번만 실행
  useEffect(()=>{
  const asyncSetGuide = async () => {
    const guideText = await getGuide(practiceId);
    setGuide(guideText);
  };
    asyncSetGuide();
  },[])

  return guide;
};

export default useGuide;
