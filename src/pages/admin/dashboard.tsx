import { Button, Container } from '@/components';
import { useSocket } from '@/stores';
import { useEffect } from 'react';

export const Dashboard = () => {
  const [connect, socket, disconnect] = useSocket((state) => [
    state.connect,
    state.socket,
    state.disconnect,
  ]);

  useEffect(() => {
    connect('game');

    return () => {
      disconnect();
    };
  }, []);

  const handleStart = () => {
    socket?.emit('game:start', { isAdmin: true });
  };

  return (
    <Container className="flex justify-center items-center flex-col">
      <Button onClick={handleStart}>Начать игру</Button>
    </Container>
  );
};
