import React from 'react';
import { useCode } from '@/stores';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const checkCode = useCode((state) => state.checkCode);

  if (!checkCode()) {
    return <Navigate to={'/'} />;
  }

  return children;
};
