import { Plus } from "lucide-react";

export const DashboardHeader = ({ onOpenModal }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
    <div>
      <h1 className="text-3xl font-bold text-slate-800">Painel de Controle</h1>
      <p className="text-slate-500 mt-1">Gerencie produtos e níveis de estoque.</p>
    </div>
    <button
      onClick={onOpenModal}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
    >
      <Plus size={20} /> Novo Produto
    </button>
  </header>
);