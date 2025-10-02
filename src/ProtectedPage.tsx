import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminAuth } from './adminApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const { isAdmin: adminStatus } = await checkAdminAuth();
        setIsAdmin(adminStatus);
        
        // Synchronizuj s localStorage
        if (adminStatus) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.removeItem('isAdmin');
          window.location.reload();
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
        window.location.reload();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedPage;