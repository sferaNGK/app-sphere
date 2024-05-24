import { api } from '@/api';
import { GameSession } from '@/types';

class GameSessionService {
  static async getGameSessions() {
    return api.get<GameSession[]>('/session');
  }
}

export { GameSessionService };
