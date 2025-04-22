/**
 * 로그인 후 진입하는 메인 페이지
 */
import Card from '../components/Card';
import LogoButton from '../components/LogoButton';
import Title from '../components/Title';
import AuthToggleButton from '../components/AuthToggleButton';
import useUserStore from '../store/userStore';
import { PracticeCard } from '../interfaces/card.types';

const cardData: PracticeCard[] = [
  {
    id: 1,
    title: 'Terraform과 Atlantis를 활용한 AWS 인프라 자동화 실습',
    description:
      'GitLab, Atlantis, Terraform을 통합하여 AWS 인프라를 자동화하고, 보안을 강화하는 전체 프로세스를 학습합니다.',
  },
  {
    id: 2,
    title: 'GitOps 기반의 컨테이너 환경 구축 실습',
    description:
      ' Kubernetes 환경에서 GitLab Runner와 ArgoCD를 활용한 GitOps 기반 CI/CD 파이프라인을 구축하고, 무중단 배포를 실습합니다. 또한, Fluent Bit와 S3를 활용한 로그 통합 및 Prometheus와 Grafana를 이용한 모니터링 구성 방법을 학습합니다.',
  },
];

const HomePage = () => {
  const { userId } = useUserStore();

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
};

export default HomePage;
