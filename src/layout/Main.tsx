import Header from './Header';
import { Outlet } from 'react-router-dom';

function Main() {
  return (
    <div>
      <div className="main-page w-full min-h-screen flex flex-col">
        <Header />
        <div className="content-container flex justify-center flex-grow w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
