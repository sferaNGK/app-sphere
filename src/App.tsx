import { Route, Routes } from 'react-router-dom';
import { useCode, useSocket } from '@/stores';
import { useEffect } from 'react';
import { Code, CodeActivation, Game, Home } from '@/pages';
import { ProtectedRoute } from '@/components';

export default function App() {
  const [connect, disconnect] = useSocket((state) => [
    state.connect,
    state.disconnect,
  ]);
  const checkCode = useCode((state) => state.checkCode);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <ProtectedRoute callbackCondition={checkCode} redirectPath={'/code'}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/code'}
        element={
          <ProtectedRoute
            callbackCondition={checkCode}
            redirectPath={'/'}
            invertCondition={true}>
            <Code />
          </ProtectedRoute>
        }
      />
      <Route path={'/code-activation'} element={<CodeActivation />} />
      <Route path={'/game'} element={<Game />} />
    </Routes>
  );
}
