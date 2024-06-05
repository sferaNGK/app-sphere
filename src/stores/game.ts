import { create } from 'zustand';
import { Game } from '@/types';
import { persist } from 'zustand/middleware';

interface GameStore {
  game: Game | null;
  setPersistedGame: (game: Game | null) => void;
}

export const useGame = create<GameStore>()(
  persist(
    (set) => ({
      game: null,
      setPersistedGame: (game: Game | null) => set({ game }),
    }),
    {
      name: 'game-storage',
    },
  ),
);
