export interface RegisterTeamHandler {
  code?: string;
  board: Board;
  error?: string;
}

export interface NewBoardHandler extends RegisterTeamHandler {
  clientIdPhone: string;
}

export type WaitingGameHandler = Pick<NewBoardHandler, 'clientIdPhone'> & {
  isWaiting: boolean;
};

export interface CreateGameSessionHandler {
  isCreated: boolean;
  gameSessions?: GameSession[];
  error?: string;
}

export interface GameSession {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  place: number;
  ip: string;
  isBusy: boolean;
}

export interface Specialty {
  id: number;
  title: string;
}

export interface User {
  id: number;
  teamName: string;
  points: number;
}

export interface StartGameHandler {
  isStarted: boolean;
  game: {
    id: number;
    title: string;
    url: string;
  };
  clientIdPhone: string;
}
