import { Navigate, Route, Routes } from 'react-router-dom';
import { useCode, useSocket } from '@/stores';
import { useEffect } from 'react';
import { Code, CodeActivation, Game, Home, Authorization } from '@/pages';
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
      <Route path={'/admin/auth'} element={<Authorization />} />
      <Route path={'*'} element={<Navigate to={'/'} replace />} />
    </Routes>
  );
}
