import { TeamForm, Typography } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card.tsx';
import { useSocket } from '@/stores/socket.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [socket] = useSocket((state) => [state.socket]);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('user:registeredTeam', ({ code, gameId }) => {
      if (code && gameId) {
        console.log(code, gameId);
        navigate(`/code-activation`);
      }
    });

    return () => {
      socket?.off('user:registeredTeam');
    };
  }, [socket]);

  return (
    <div className="container max-w-7xl flex justify-center items-center flex-col">
      <Typography variant="title" tag="h1" className="mb-2 text-4xl font-bold">
        Что ж, сыграем вместе?
      </Typography>
      <Card className="w-full max-w-sm p-2 mt-10">
        <CardHeader>
          <Typography
            variant="title"
            tag="h2"
            className="text-xl font-semibold">
            Регистрация команды
          </Typography>
          <CardDescription>
            Пожалуйста, введите свой email и нажмите кнопку "Давайте!".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamForm />
        </CardContent>
      </Card>
    </div>
  );
}
