import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(credentials: object) : Promise<void>;
    signOut() : void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    useEffect(() => {
        const storageToken = localStorage.getItem('@App:token');
        if (storageToken) {
            // validar o token com o backend se necessário
            setUser({ authenticated: true});
        }
    }, []);

    async function signIn(credentials: any) {
        // chama a API para autenticar
        const response = await api.post('/auth/login/', credentials);

        const { access } = response.data;
        localStorage.setItem('@App:token', access);
        setUser({ authenticated: true });
    }

    function signOut() {
        localStorage.removeItem('@App:token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);