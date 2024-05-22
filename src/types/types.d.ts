export interface RegisterTeamHandler {
  code?: string;
  error?: string;
}

export interface CreateGameSessionHandler {
  isCreated: boolean;
  error?: string;
}
