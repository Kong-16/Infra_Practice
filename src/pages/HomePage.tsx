import Card from '../components/Card';
import LogoButton from '../components/LogoButton';
import Title from '../components/Title';
import AuthToggleButton from '../components/AuthToggleButton';
import useUserStore from '../store/userStore';
import { PracticeCard } from '../interfaces/card.types';

const cardData: PracticeCard[] = [
  {
    id: 1,
    title: 'AWS 인프라 자동화 실습',
    description:
      'AWS 인프라를 자동화하고, 보안을 강화하는 전체 프로세스를 학습합니다.',
    active: false,
  },
  {
    id: 2,
    title: 'DevOps 파이프라인 구축 실습',
    description:
      '자동화된 테스트, 배포가 가능한 GitOps 기반 CI/CD 파이프라인을 구축하고 카나리 배포 전략을 통해 안전한 애플리케이션 배포를 학습합니다.',
    active: false,
  },
  {
    id: 3,
    title: '데이터 파이프라인 구축 실습',
    description: '설명입니다',
    active: false,
  },
];

function HomePage() {
  const {userId} = useUserStore();

  const HomeHeader = () => (
    <div className="header-container w-screen px-10 fixed top-0">
      <LogoButton />
      <Title />
      <div className="right-container h-full flex items-center">
        <div className="mx-2">{userId}</div>
        <AuthToggleButton />
      </div>
    </div>
  );

  const CardList = () =>
    cardData.map((data) => (
      <Card
        id={data.id}
        key={data.id}
        title={data.title}
        description={data.description}
        active={data.active}
      />
    ));

  return (
    <div className="home-page">
      <HomeHeader />
      <div className="practice-card-container w-full flex flex-col pt-[3%] px-[10%] mt-20">
        <CardList />
      </div>
    </div>
  );
}

export default HomePage;
