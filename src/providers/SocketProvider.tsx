// import React, { useEffect } from 'react';
// import { io } from 'socket.io-client';
//
// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const socket = io('http://localhost:8080', {
//     transports: ['websocket'],
//   });
//   const SocketContext = React.createContext(socket);
//
//   useEffect(, []);
//
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
