import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Package } from 'lucide-react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await signIn({ email, password });

            // redireciona para o dashboard
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha no login. Credenciais inválidas.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-lg shadow-lg mb-4">
                        <Package className="text-white w-8 h-8" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800">Inventory System</h2>
                    <p className="text-slate-500 text-sm">Acesse sua conta no Inventário</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                        <input 
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-transparent outline-none transaction"
                            placeholder="seuemail@spassu.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                        <input 
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Insira sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Carregando...' : (
                            <>
                                <LogIn size={18} />
                                Entrar no Sistema
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}