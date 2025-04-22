import { useEffect, useState } from 'react';
import { getGuide } from '../utils/api';
import { createErrorMessage } from '../utils/general';
import useStackStore from '../store/stackStore';

const useGuide = () => {
  const { practiceId } = useStackStore();
  const [guide, setGuide] = useState('');

  useEffect(() => {
    const asyncSetGuide = async () => {
      if (!practiceId) {
        console.error(
          createErrorMessage('useGuide', 'practiceId not exists')
        );
        return;
      }
      const fetchedGuide = await getGuide(practiceId);
      setGuide(fetchedGuide);
    };

    asyncSetGuide();
  }, [practiceId]);

  return guide;
};

export default useGuide;
