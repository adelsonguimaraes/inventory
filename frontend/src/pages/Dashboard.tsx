import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { Package, LogOut, LayoutDashboard, Box } from 'lucide-react';
import api from '../services/api';

export const Dashboard = () => {
  const { products, loading, error, setProducts } = useProducts();
  const { signOut } = useAuth();
  const handleUpdateStock = async (id: string, amount: number) => {
    try {
        const response = await api.patch(`/inventory/products/${id}/update-stock/`, {
            quantity: amount
        });

        setProducts(prev => prev.map(p => p.id === id ? { ...p, stock_quantity: response.data.stock_quantity } : p));
    } catch (err) {
        alert('Falha ao atualizar o estoque do produto.');
    }
 };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-blue-600 font-medium">Sincronizando inventário...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Superior */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-blue-600">
          <Box className="w-8 h-8" />
          <span className="text-xl font-bold text-slate-800">StockMaster</span>
        </div>
        
        <button 
          onClick={signOut}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium text-sm"
        >
          <LogOut size={18} />
          Sair do Sistema
        </button>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Painel de Controle</h1>
            <p className="text-slate-500 mt-1">Gerencie produtos e níveis de estoque.</p>
          </div>
          
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md flex items-center gap-2 hover:bg-blue-700 cursor-pointer transition">
            <Package size={20} />
            Novo Produto
          </div>
        </header>

        {/* Listagem de Produtos (Tabela) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Produto</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold text-center">Estoque</th>
                <th className="px-6 py-4 font-semibold text-right">Preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{product.name}</div>
                    <div className="text-xs text-slate-400">{product.category_name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{product.sku}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                    <button 
                        onClick={() => handleUpdateStock(product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-red-100 hover:text-red-600 transition"
                    >-</button>
                    
                    <span className={`min-w-[80px] px-3 py-1 rounded-full text-xs font-bold ${
                        product.stock_quantity < 10 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                        {product.stock_quantity} un
                    </span>

                    <button 
                        onClick={() => handleUpdateStock(product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 transition"
                    >+</button>
                    </div>
                </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-700">
                    R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              Nenhum produto encontrado no inventário.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};