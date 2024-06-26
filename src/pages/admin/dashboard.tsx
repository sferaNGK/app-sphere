import {
  Button,
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Typography,
  SpecialtyForm,
} from '@/components';
import { useSocket } from '@/stores';
import { Check, Gamepad2, Brain, Play, X, Container } from 'lucide-react';
import { SessionForm } from '@/components/session-form';
import { useEffect, useState } from 'react';
import { CreateGameSessionHandler, GameSession, Specialty } from '@/types';
import { useToast } from '@/components/ui/use-toast.ts';
import { GameSessionService, SpecialtyService } from '@/services';

export const Dashboard = () => {
  const { toast } = useToast();
  const socket = useSocket((state) => state.socket);
  const [error, setError] = useState<string | undefined>();
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [specialties, setSpecialities] = useState<Specialty[]>([]);

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
        setGameSessions(gameSessions);
      }
    },
  );

  useEffect(() => {
    GameSessionService.getGameSessions().then((res) => {
      setGameSessions(res.data);
    });

    SpecialtyService.getSpecialties().then((res) => {
      setSpecialities(res.data);
    });

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
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon">
            <Brain />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground">
                  <Gamepad2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Сессии и запуск игр
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Контейнеры Docker">
                  <Container />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Контейнеры Docker (игры)
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2"></nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Дашборд</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm">
            <a href="https://github.com/M4cr0s3">Developed By @M4cr0s3</a>
          </Button>
        </header>
        <main className="md:grid max-md:flex max-md:flex-col flex-1 gap-8 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex-col items-start gap-8 md:flex">
            <SessionForm className="w-full" error={error} setError={setError} />
            <div className="flex flex-col w-full">
              <Typography
                variant="title"
                tag="h2"
                className="font-semibold my-3">
                Сессии
              </Typography>
              <div className="space-y-2">
                {gameSessions.length ? (
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
                  <p className="text-sm">
                    На данный момент сессии отсутствуют.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="relative flex-col items-start gap-8 md:flex">
            <div className="space-y-2">
              <Typography variant="title" tag="h2" className="font-semibold">
                Начало игры
              </Typography>
              <SpecialtyForm specialties={specialties} onStart={handleStart}>
                <Button>
                  <Play size={18} />
                  <span className="ml-1.5">Начать игру</span>
                </Button>
              </SpecialtyForm>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
