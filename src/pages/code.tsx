import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Typography,
} from '@/components';
import { useBoard, useCode, useGame, useSocket } from '@/stores';
import {
  NewBoardHandler,
  StartGameHandler,
  User,
  WaitingGameHandler,
} from '@/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Code = () => {
  const [socket, getClientId] = useSocket((state) => [
    state.socket,
    state.getClientId,
  ]);
  const code = useCode((state) => state.code);
  const [board, setBoard, persistedIsWaiting, setIsWaiting] = useBoard(
    (state) => [
      state.board,
      state.setBoard,
      state.isWaiting,
      state.setIsWaiting,
    ],
  );
  const [game, setPersistedGame] = useGame((state) => [
    state.game,
    state.setPersistedGame,
  ]);
  const navigate = useNavigate();

  const cleanLocalStorage = () => {
    localStorage.clear();
    location.reload();
  };

  const handleEndVR = () => {
    setPersistedGame(null);
    socket?.emit('game:end', { game: game, points: 0 });
  };

  useEffect(() => {
    if (socket) {
      socket.on(
        'game:newBoard',
        ({ board, clientIdPhone }: NewBoardHandler) => {
          if (getClientId() === clientIdPhone) {
            setBoard(board);
          }
        },
      );

      socket.on(
        'game:waiting',
        ({ isWaiting, clientIdPhone }: WaitingGameHandler) => {
          if (getClientId() === clientIdPhone) {
            setIsWaiting(isWaiting);
          }
        },
      );

      socket.on('game:VR', ({ game, clientIdPhone }: StartGameHandler) => {
        if (getClientId() === clientIdPhone && game.url === 'VR') {
          setPersistedGame(game);
        }
      });

      socket.on(
        'game:endGameSession',
        ({ isCompleted, users }: { isCompleted: boolean; users: User[] }) => {
          if (isCompleted) {
            localStorage.clear();
            setIsWaiting(false);
            navigate('/end', { state: { users } });
          }
        },
      );
    }

    return () => {
      socket?.off('game:newBoard');
      socket?.off('game:waiting');
      socket?.off('game:startVR');
      socket?.off('game:endGameSession');
    };
  }, [socket]);

  return (
    <Container className="flex justify-center items-center flex-col">
      <Card>
        <CardHeader>
          <Typography
            variant="title"
            tag="h1"
            className="text-4xl font-bold max-lg:text-center">
            {persistedIsWaiting ? 'Ожидайте...' : 'Ваш код'}
          </Typography>
        </CardHeader>
        <CardContent className="flex justify-center">
          {!persistedIsWaiting ? (
            <div className="flex flex-col space-y-3">
              <Badge variant="outline" className="flex justify-center">
                КОД
              </Badge>
              <div className="w-full flex justify-center">
                <InputOTP maxLength={6} value={code ? code : ''}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Badge
                variant="outline"
                className="flex flex-col justify-center p-3">
                Подойдите к доске
                <span className="font-bold">
                  {`Номер ${board?.place}`}
                  {game?.url === 'VR' ? ` игра ${game?.title}` : ''}
                </span>
              </Badge>
              {game?.url === 'VR' && (
                <Button onClick={handleEndVR}>Мы закончили играть в VR</Button>
              )}
            </div>
          ) : (
            <span className="font-medium text-center text-sm">
              Ожидайте, пока остальные игроки закончат игру.
            </span>
          )}
        </CardContent>
      </Card>
      <Button onClick={cleanLocalStorage}>Очистить</Button>
    </Container>
  );
};
