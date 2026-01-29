import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Clock, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export const HistoryModal = ({ productId, productName, onClose }: any) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        api.get(`/inventory/products/${productId}/history/`)
           .then(res => setLogs(res.data));
    }, [productId]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                        <Clock className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-slate-800">Histórico: {productName}</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-2xl">&times;</button>
                </div>

                <div className="overflow-y-auto p-6">
                    <table className="w-full">
                        <thead className="text-left text-xs text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="pb-4">Tipo</th>
                                <th className="pb-4">Qtd</th>
                                <th className="pb-4">Data</th>
                                <th className="pb-4">Usuário</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log: any) => (
                                <tr key={log.id} className="text-sm">
                                    <td className="py-3 flex items-center gap-2">
                                        {log.type === 'IN' ? 
                                            <ArrowUpCircle className="text-emerald-500" size={16}/> : 
                                            <ArrowDownCircle className="text-red-500" size={16}/>
                                        }
                                        <span className="font-medium text-slate-700">{log.type}</span>
                                    </td>
                                    <td className="py-3 text-slate-600">{log.quantity}</td>
                                    <td className="py-3 text-slate-500">{log.date}</td>
                                    <td className="py-3 text-slate-400">ID: {log.user_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};