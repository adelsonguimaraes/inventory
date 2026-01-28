import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { signed } = useAuth();

    return signed ? children : <Navigate to="/login" replace />;
};