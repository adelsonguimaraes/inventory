import React from "react";
import { Clock, Trash2 } from "lucide-react";

export const StockTable = ({ products, onUpdate, onDelete, onShowHistory }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-400">
        <p>Nenhum produto cadastrado.</p>
      </div>
    );
  }

  return (
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
            <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{product.name}</span>
                  <button 
                    onClick={() => onShowHistory(product)}
                    className="text-slate-300 hover:text-blue-500 transition-colors"
                  >
                    <Clock size={14} />
                  </button>
                </div>
                <div className="text-xs text-slate-400 uppercase">{product.category_name}</div>
              </td>
              <td className="px-6 py-4 text-sm font-mono text-slate-500">{product.sku}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onUpdate(product.id, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 transition-all font-bold"
                  > - </button>
                  <span className={`px-3 py-1 rounded-full text-xs font-black min-w-[70px] text-center ${
                    product.stock_quantity < 10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {product.stock_quantity}
                  </span>
                  <button
                    onClick={() => onUpdate(product.id, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-600 transition-all font-bold"
                  > + </button>
                </div>
              </td>
              <td className="px-6 py-4 text-right font-bold text-slate-600">
                {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};