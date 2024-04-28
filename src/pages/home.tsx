import {
  TeamForm,
  Typography,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components';
import { useCode, useSocket } from '@/stores';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [socket] = useSocket((state) => [state.socket]);
  const setCode = useCode((state) => state.setCode);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on('user:registerTeam', ({ code, gameId }) => {
      if (code && gameId) {
        setCode(code);
        navigate(`/code`);
      }
    });

    return () => {
      socket?.off('user:registerTeam');
    };
  }, [socket]);

  return (
    <div className="container max-w-7xl flex justify-center items-center flex-col">
      <Typography
        variant="title"
        tag="h1"
        className="mb-2 text-4xl font-bold max-lg:text-center">
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
};
