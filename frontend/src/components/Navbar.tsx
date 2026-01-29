import React from "react";
import { Box, LogOut } from "lucide-react";

export const Navbar = ({ onSignOut }) => {
  return (
    <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-blue-600">
        <Box className="w-8 h-8" />
        <span className="text-xl font-bold text-slate-800 tracking-tight">
          Inventory
        </span>
      </div>
      
      <button
        onClick={onSignOut}
        className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors font-medium"
      >
        <LogOut size={18} /> Sair
      </button>
    </nav>
  );
};