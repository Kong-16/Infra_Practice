import { NavLink, useNavigate } from 'react-router-dom';
import AuthToggleButton from '../components/AuthToggleButton';
import { useAuth } from 'react-oidc-context';
import LogoButton from '../components/LogoButton';
import useUserStore from '../store/userStore';

const Header = () => {
  // zustand의 store 통해서 가져와야함.
  const {userId} = useUserStore();

  const LeftSection = () => (
    <div className="header-left-container">
      <LogoButton/>
    </div>
  );

  const CenterSection = () => (
    <div className="center-container flex justify-center flex-grow text-nowrap">
      Infra Camp
    </div>
  );

  const RightSection = () => (
    <div className="right-container h-full flex items-center">
      <div className="mx-2">{userId}</div>
      <AuthToggleButton />
    </div>
  );

  return (
    <div className="header-container">
      <LeftSection />
      <CenterSection />
      <RightSection />
    </div>
  );
};

// export default Header;
