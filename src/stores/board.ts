import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board } from '@/types';

interface BoardStore {
  board: Board | null;
  setBoard: (board: Board) => void;
  isWaiting: boolean;
  setIsWaiting: (isWaiting: boolean) => void;
}

export const useBoard = create<BoardStore>()(
  persist(
    (set) => ({
      board: null,
      isWaiting: false,
      setBoard: (board: Board) => set({ board: board }),
      setIsWaiting: (isWaiting: boolean) => set({ isWaiting: isWaiting }),
    }),
    {
      name: 'board-storage',
    },
  ),
);
