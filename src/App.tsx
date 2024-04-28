import { Route, Routes } from 'react-router-dom';
import { useSocket } from '@/stores';
import { useEffect } from 'react';
import { Code, CodeActivation, Home } from '@/pages';
import { ProtectedRoute } from '@/components';

export default function App() {
  const [connect, disconnect] = useSocket((state) => [
    state.connect,
    state.disconnect,
  ]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route
        path={'/code'}
        element={
          <ProtectedRoute>
            <Code />
          </ProtectedRoute>
        }
      />
      <Route path={'/code-activation'} element={<CodeActivation />} />
    </Routes>
  );
}
