import { useEffect, useState } from 'react';
import useStackStore from '../store/stackStore';
import { PRACTICE_GUIDE_NUM } from '../constants';
import { getPartialGuide } from '../utils/api';
import { toast } from 'react-toastify';

const useGuideList = () => {
  const { practiceId } = useStackStore();
  const [guideList, setGuideList] = useState<Guide[]>([]);

  useEffect(() => {
    const asyncSetGuideList = async () => {
      try {
        // 미리 정의된 실습별 가이드 개수에 따라 api 세팅 후 일괄 호출
        const guidePromises = Array.from(
          { length: PRACTICE_GUIDE_NUM[practiceId] + 1 },
          (_, i) => getPartialGuide(practiceId, i.toString())
        );
        const fetchedGuides = await Promise.all(guidePromises);

        const guidesWithTitle = fetchedGuides.map((value: string) => {
          // 분리 기준 단어 (개행)
          const searchingWord = '\n';
          // 첫 개행을 기준으로 제목과 본문 분리
          const indexOfFirstNewLine = value.indexOf(searchingWord);

          // 개행 없는 경우 예외 처리
          if (indexOfFirstNewLine < 0) {
            return { title: 'No title', content: value } as Guide;
          }

          // "# " 으로 시작하므로 첫 두 글자 제외
          const title = value.substring(2, indexOfFirstNewLine);
          const content = value.substring(indexOfFirstNewLine + 1);

          return { title, content } as Guide;
        });

        setGuideList(guidesWithTitle);
      } catch {
        toast.error('가이드 불러오기에 실패했습니다.');
      }
    };
    asyncSetGuideList();
  }, [practiceId]);

  return guideList;
};

export default useGuideList;
