import {
  TeamForm,
  Typography,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components';
import { useBoard, useCode, useSocket } from '@/stores';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterTeamHandler } from '@/types';

export const Home = () => {
  const [socket, setClientId, reconnect] = useSocket((state) => [
    state.socket,
    state.setClientId,
    state.reconnect,
  ]);
  const setCode = useCode((state) => state.setCode);
  const setBoard = useBoard((state) => state.setBoard);
  const [error, setError] = React.useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on(
      'user:registerTeam',
      ({ code, board, error }: RegisterTeamHandler) => {
        error && setError(error);

        if (code && board) {
          setClientId();
          setCode(code);
          setBoard(board);
          reconnect();
          navigate(`/code`);
        }
      },
    );

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
            Пожалуйста, введите название команды и нажмите кнопку "Давайте!".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamForm error={error} setError={setError} />
        </CardContent>
      </Card>
    </div>
  );
};
