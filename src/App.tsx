import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import AuthStoreSyncProvider from './AuthStoreSyncProvider';

function App() {
  return (
    <div className="App w-full">
      <AuthStoreSyncProvider>
        <ToastContainer
          position="top-center"
          limit={1}
          closeButton={false}
          autoClose={2000}
          hideProgressBar
        />
        <AppRoutes />
      </AuthStoreSyncProvider>
    </div>
  );
}

export default App;
