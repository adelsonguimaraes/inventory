import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useInventoryActions } from "@/hooks/useInventoryActions";
import { ProductModal } from "@/components/ProductModal";
import { StockTable } from "@/components/StockTable";
import { DashboardHeader } from "@/components/DashboardHeader";
import { HistoryModal } from "@/components/HistoryModal";
import { StatsGrid } from "@/components/StatsGrid";
import { Navbar } from "@/components/Navbar";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingScreen } from "@/components/LoadingScreen";

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, stats, loading, error, setProducts, refreshData } = useProducts();
  const [historyProduct, setHistoryProduct] = useState<any>(null);
  const { handleUpdateStock, handleDeleteProduct } = useInventoryActions(setProducts, refreshData);
  const { signOut } = useAuth();

  if (loading)
    return <LoadingScreen message="Carregando dados..." />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onSignOut={signOut} />

      <main className="p-8 max-w-7xl mx-auto">
        <DashboardHeader onOpenModal={() => setIsModalOpen(true)} />

        <ErrorMessage message={error} />

        <StatsGrid stats={stats} />

        <StockTable 
          products={products} 
          onUpdate={handleUpdateStock} 
          onDelete={handleDeleteProduct}
          onShowHistory={setHistoryProduct}
        />
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refreshData}
      />

      {historyProduct && (
          <HistoryModal 
              productId={historyProduct.id} 
              productName={historyProduct.name} 
              onClose={() => setHistoryProduct(null)} 
          />
      )}
    </div>
  );
};