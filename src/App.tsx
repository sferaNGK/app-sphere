import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.tsx';
import { useSocket } from './stores/socket.ts';
import { useEffect } from 'react';
import CodeActivation from '@/pages/code-activation.tsx';

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
