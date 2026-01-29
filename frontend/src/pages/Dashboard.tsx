import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { ProductModal } from "@/components/ProductModal";
import api from "@/services/api";
import { Package, LogOut, Box, Plus, Trash2, AlertTriangle, DollarSign } from "lucide-react";
import { StatCard } from '@/components/StatCard';

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, setProducts, loading, error } = useProducts();
  const { signOut } = useAuth();

  const stats = React.useMemo(() => {
    const totalItems = products.length;
    const lowStockItems = products.filter(p => p.stock_quantity < 10).length;
    const totalValue = products.reduce((acc, p) => {
      return acc + (Number(p.price) * p.stock_quantity);
    }, 0);

    return { totalItems, lowStockItems, totalValue };
  }, [products]);

  const handleRefresh = async () => {
    const response = await api.get("/inventory/products/");
    setProducts(response.data);
  };

  const handleUpdateStock = async (id: string, amount: number) => {
    try {
      const response = await api.patch(
        `/inventory/products/${id}/update-stock/`,
        {
          quantity: amount,
        },
      );
      setProducts((prev) => prev.map((p) => (p.id === id ? response.data : p)));
    } catch (err: any) {
      alert(err.response?.data?.error || "Erro ao atualizar estoque.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await api.delete(`/inventory/products/${id}/`);
      // Atualiza a lista local removendo o item deletado
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Erro ao excluir produto.");
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Carregando inventário...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-blue-600">
          <Box className="w-8 h-8" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Inventory
          </span>
        </div>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors font-medium"
        >
          <LogOut size={18} /> Sair
        </button>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Painel de Controle
            </h1>
            <p className="text-slate-500 mt-1">
              Gerencie produtos e níveis de estoque.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
          >
            <Plus size={20} /> Novo Produto
          </button>
        </header>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Seção de Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total de Produtos"
            value={stats.totalItems}
            icon={Package}
            color="bg-blue-500"
          />
          <StatCard 
            title="Estoque Crítico"
            value={stats.lowStockItems}
            icon={AlertTriangle}
            color="bg-amber-500"
          />
          <StatCard 
            title="Valor em Estoque"
            value={stats.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            icon={DollarSign}
            color="bg-emerald-500"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4 text-center">Estoque</th>
                <th className="px-6 py-4 text-right">Preço</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700">
                      {product.name}
                    </div>
                    <div className="text-xs text-slate-400 uppercase">
                      {product.category_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleUpdateStock(product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 transition-all font-bold"
                      >
                        -
                      </button>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black min-w-[70px] text-center ${
                          product.stock_quantity < 10
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {product.stock_quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateStock(product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 transition-all font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-600">
                    R${" "}
                    {Number(product.price).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Excluir produto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center p-20 text-slate-400">
              <Package size={48} className="mb-4 opacity-20" />
              <p>Nenhum produto cadastrado.</p>
            </div>
          )}
        </div>
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleRefresh}
      />
    </div>
  );
};
