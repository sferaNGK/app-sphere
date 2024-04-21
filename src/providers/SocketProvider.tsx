// import React, { useEffect } from 'react';
// import { useSocket } from '../stores/socket.ts';
//
// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, connect] = useSocket((state) => [state.socket, state.connect]);
//   const SocketContext = React.createContext(socket);
//
//   useEffect(() => connect(), [connect]);
//
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
