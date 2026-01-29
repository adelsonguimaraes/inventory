import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean; // Adicionado para gerenciar o refresh
    signIn(credentials: object) : Promise<void>;
    signOut() : void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true); // Começa como true

    useEffect(() => {
        function loadStorageData() {
            const storageToken = localStorage.getItem('@App:token');
            
            if (storageToken) {
                // Configura o token no axios para o primeiro carregamento pós-refresh
                api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
                setUser({ authenticated: true });
            }
            
            // Independente de ter token ou não, terminou de checar o storage
            setLoading(false); 
        }

        loadStorageData();
    }, []);

    async function signIn(credentials: any) {
        const response = await api.post('/auth/login/', credentials);
        const { access } = response.data;

        localStorage.setItem('@App:token', access);
        
        // Configura o token nas requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        
        setUser({ authenticated: true });
    }

    function signOut() {
        localStorage.removeItem('@App:token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    }

    return (
        // Passamos o loading no provider
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);