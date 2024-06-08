import { Navigate, Route, Routes } from 'react-router-dom';
import { useCode, useSocket } from '@/stores';
import { useEffect } from 'react';
import {
  Code,
  Home,
  Authorization,
  Dashboard,
  EndGame,
  Layout as AdminLayout,
} from '@/pages';
import { DockerLogs, ProtectedRoute } from '@/components';
import { Docker } from '@/pages/admin';

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
        path="/"
        element={
          <ProtectedRoute callbackCondition={checkCode} redirectPath="/code">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/code"
        element={
          <ProtectedRoute
            callbackCondition={checkCode}
            redirectPath="/"
            invertCondition={true}>
            <Code />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/auth" element={<Authorization />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="docker" element={<Docker />}>
          <Route path=":containerId/logs" element={<DockerLogs />} />
        </Route>
      </Route>
      <Route path="/end" element={<EndGame />} />
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </Routes>
  );
}
