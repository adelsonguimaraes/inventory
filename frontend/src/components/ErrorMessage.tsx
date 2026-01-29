import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div>
            <AlertCircle size={20} />
            <span className="font-medium">{message}</span>
        </div>
    );
};