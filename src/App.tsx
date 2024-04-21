import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { useSocket } from './stores/socket.ts';
import { useEffect } from 'react';

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
    </Routes>
  );
}
