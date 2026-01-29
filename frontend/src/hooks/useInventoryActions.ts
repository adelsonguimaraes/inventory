import api from "@/services/api";

export const useInventoryActions = (setProducts, refreshData) => {
  const handleUpdateStock = async (id, amount) => {
    try {
      const response = await api.patch(`/inventory/products/${id}/update-stock/`, {
        quantity: amount,
      });
      setProducts((prev) => prev.map((p) => (p.id === id ? response.data : p)));
      refreshData();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao atualizar estoque.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/inventory/products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      refreshData();
    } catch (err) {
      alert("Erro ao excluir produto.");
    }
  };

  return { handleUpdateStock, handleDeleteProduct };
};