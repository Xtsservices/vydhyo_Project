"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return !isAuthenticated ? <>{children}</> : null;
};

export default PublicRoute;