import { Button, Container } from '@/components';
import { useSocket } from '@/stores';

export const Dashboard = () => {
  const socket = useSocket((state) => state.socket);

  const handleStart = () => {
    socket?.emit('game:start', { isAdmin: true });
  };

  return (
    <Container className="flex justify-center items-center flex-col">
      <Button onClick={handleStart}>Начать игру</Button>
    </Container>
  );
};
