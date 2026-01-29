import React from 'react';

export const LoadingScreen = ({ message = "Carregando..." }) => {
    return (
        <div className="flex h-screen items-center justify-center text-slate-500">
        <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>{message}</span>
        </div>
      </div>
    );
};