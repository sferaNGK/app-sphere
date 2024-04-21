import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface SocketStore {
  socket: Socket | null;
  connect: () => void;
}

export const useSocket = create<SocketStore>((set) => ({
  socket: null,
  connect: () => {
    set({
      socket: io(import.meta.env.VITE_WEBSOCKET_URL, {
        transports: ['websocket'],
      }),
    });
  },
}));
