import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board } from '@/types';

interface BoardStore {
  board: Board | null;
  setBoard: (board: Board) => void;
}

export const useBoard = create<BoardStore>()(
  persist(
    (set) => ({
      board: null,
      setBoard: (board: Board) => set({ board: board }),
    }),
    {
      name: 'board-storage',
    },
  ),
);
