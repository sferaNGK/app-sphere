import { Route, Routes } from 'react-router-dom';
import { useSocket } from '@/stores';
import { useEffect } from 'react';
import { CodeActivation, Home } from '@/pages';

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
      <Route path={'/code-activation'} element={<CodeActivation />} />
    </Routes>
  );
}
