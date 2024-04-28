import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CodeStore {
  code: string | null;
  setCode: (code: string) => void;
  checkCode: () => string | null;
}

export const useCode = create<CodeStore>()(
  persist(
    (set, get) => ({
      code: null,
      setCode: (code: string) => set({ code: code }),
      checkCode: () => get().code,
    }),
    {
      name: 'code-storage',
    },
  ),
);
