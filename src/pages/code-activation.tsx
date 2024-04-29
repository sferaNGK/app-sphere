import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CodeForm,
  Typography,
} from '@/components';
import { useCode, useSocket } from '@/stores';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CodeActivation = () => {
  const socket = useSocket((state) => state.socket);
  const setIsVerified = useCode((state) => state.setIsVerified);
  const [error, setError] = React.useState<string | undefined>();
  const navigate = useNavigate();

  React.useEffect(() => {
    socket?.on(
      'user:verifyCode',
      ({ success, error }: { success: boolean; error?: string }) => {
        if (!success) {
          error && setError(error);
          return;
        }

        setIsVerified();
        navigate('/game');
      },
    );

    return () => {
      socket?.off('user:verifyCode');
    };
  }, [socket]);

  return (
    <div className="container max-w-7xl flex justify-center items-center flex-col">
      <Card>
        <CardHeader>
          <Typography
            variant="title"
            tag="h1"
            className="text-4xl font-bold mb-5 max-lg:text-center">
            Введите код активации
          </Typography>
          <CardDescription className="max-lg:text-center">
            Введите код с вашего мобильного телефона
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <CodeForm error={error} setError={setError} />
        </CardContent>
      </Card>
    </div>
  );
};
