import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Main />}> */}
          <Route index element={<HomePage />} />

          {/* 2024.12.16 공민혁 oauth를 안쓰는 상황에선 해당 url 사용 필요 없다고 판단되어 주석처리 */}
          {/* <Route path="/oauth2/idpresponse" element={<Home />}></Route> */}

          <Route path="/practice/:practiceId" element={<PracticePage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
