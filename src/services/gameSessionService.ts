import { api } from '@/api';
import { GameSession } from '@/types';

class GameSessionService {
  static async getGameSessions() {
    return (await api.get<GameSession[]>('/sessions')).data;
  }
}

export { GameSessionService };
