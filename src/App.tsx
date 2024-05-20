import { Navigate, Route, Routes } from 'react-router-dom';
import { useCode, useSocket } from '@/stores';
import { useEffect } from 'react';
import { Code, Home, Authorization, Dashboard } from '@/pages';
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
      <Route path={'/admin/auth'} element={<Authorization />} />
      <Route path={'/admin/dashboard'} element={<Dashboard />} />
      <Route path={'*'} element={<Navigate to={'/'} replace />} />
    </Routes>
  );
}
