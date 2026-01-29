// src/components/StatsGrid.tsx
import { Package, AlertTriangle, DollarSign } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <StatCard
      title="Total de Produtos"
      value={stats.total_products}
      icon={Package}
      color="bg-blue-500"
    />
    <StatCard
      title="Estoque Crítico"
      value={stats.critical_items}
      icon={AlertTriangle}
      color="bg-amber-500"
    />
    <StatCard
      title="Valor em Estoque"
      value={stats.total_value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
      icon={DollarSign}
      color="bg-emerald-500"
    />
  </div>
);