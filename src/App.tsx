import AppRoutes from './AppRoutes';
import AuthStoreSyncProvider from './AuthStoreSyncProvider';

function App() {
  return (
    <div className="App w-full">
      <AuthStoreSyncProvider>
        <AppRoutes />
      </AuthStoreSyncProvider>
    </div>
  );
}

export default App;
