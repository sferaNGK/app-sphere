export interface RegisterTeamHandler {
  code?: string;
  board: Board;
  error?: string;
}

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
