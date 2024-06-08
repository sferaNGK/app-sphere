import { Button, Typography, SpecialtyForm } from '@/components';
import { useSocket } from '@/stores';
import { Check, Play, X } from 'lucide-react';
import { SessionForm } from '@/components/session-form';
import { useEffect, useState } from 'react';
import { CreateGameSessionHandler } from '@/types';
import { useToast } from '@/components/ui/use-toast.ts';
import { GameSessionService, SpecialtyService } from '@/services';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const Dashboard = () => {
  const { toast } = useToast();
  const socket = useSocket((state) => state.socket);
  const [error, setError] = useState<string | undefined>();
  // const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const queryClient = useQueryClient();
  const { data: gameSessions } = useQuery({
    queryKey: ['gameSessions'],
    queryFn: GameSessionService.getGameSessions,
  });
  const { data: specialties } = useQuery({
    queryKey: ['specialties'],
    queryFn: SpecialtyService.getSpecialties,
  });

  const handleStart = (specialtyId: number) => {
    if (!specialtyId) return;
    socket?.emit('game:start', { isAdmin: true, specialtyId });
  };

  socket?.on(
    'game:createGameSession',
    ({ isCreated, gameSessions, error }: CreateGameSessionHandler) => {
      error && setError(error);

      if (isCreated && gameSessions) {
        toast({
          title: 'Сессия успешно создана!',
          description: 'Теперь вы можете начать игру.',
        });
      }
      queryClient.setQueryData(['gameSessions'], gameSessions);
    },
  );

  useEffect(() => {
    if (socket) {
      socket.on('game:start', ({ error }: { error?: string }) => {
        if (error)
          toast({
            variant: 'destructive',
            title: error,
            description:
              'Создайте сессию, после чего Вы сможете начать игру с выбранной специальностью.',
          });
      });
    }

    return () => {
      socket?.off('game:createGameSession');
      socket?.off('game:start');
    };
  }, [socket]);

  return (
    <>
      <div className="relative flex-col items-start gap-8 md:flex">
        <SessionForm className="w-full" error={error} setError={setError} />
        <div className="flex flex-col w-full">
          <Typography variant="title" tag="h2" className="font-semibold my-3">
            Сессии
          </Typography>
          <div className="space-y-2">
            {gameSessions && gameSessions.length ? (
              gameSessions.map((gameSession) => (
                <div
                  key={gameSession.id}
                  className="w-full rounded-lg border max-lg:space-y-2 lg:grid flex flex-col lg:grid-cols-3 items-center shadow-sm p-2">
                  <span className="text-center font-semibold">
                    {gameSession.title}
                  </span>
                  <span>
                    {new Date(gameSession.createdAt).toLocaleDateString(
                      'ru-RU',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      },
                    )}
                  </span>
                  <span className="text-center flex justify-center">
                    {gameSession.isCompleted ? <Check /> : <X />}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm">На данный момент сессии отсутствуют.</p>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex-col items-start gap-8 md:flex">
        <div className="space-y-2">
          <Typography variant="title" tag="h2" className="font-semibold">
            Начало игры
          </Typography>
          {specialties && (
            <SpecialtyForm specialties={specialties} onStart={handleStart}>
              <Button>
                <Play size={18} />
                <span className="ml-1.5">Начать игру</span>
              </Button>
            </SpecialtyForm>
          )}
        </div>
      </div>
    </>
  );
};
