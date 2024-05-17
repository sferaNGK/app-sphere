import {
  Card,
  CardDescription,
  CardHeader,
  Container,
  IframeGame,
  Typography,
} from '@/components';
import { useEffect, useState } from 'react';
import { useSocket } from '@/stores';

export const Game = () => {
  const [socket, connect, disconnect] = useSocket((state) => [
    state.socket,
    state.connect,
    state.disconnect,
  ]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    connect('game');
    return () => {
      socket?.off('game:start');
      disconnect();
    };
  }, []);

  useEffect(() => {
    socket &&
      socket.on('game:start', ({ isStarted }: { isStarted: boolean }) => {
        console.log(socket);
        console.log(isStarted);
        isStarted && setIsStarted(true);
      });
  }, [socket]);

  console.log(socket?.hasListeners('game:start'));

  return (
    <div>
      {isStarted ? (
        <IframeGame gameSrc={'http://localhost:3001'} />
      ) : (
        <Container>
          <Card>
            <CardHeader>
              <Typography
                variant="title"
                tag="h1"
                className="text-4xl font-bold mb-5 max-lg:text-center">
                Ожидайте начала игры...
              </Typography>
              <CardDescription>
                Подождите, пока администратор запустит игру.
              </CardDescription>
            </CardHeader>
          </Card>
        </Container>
      )}
    </div>
  );
};
