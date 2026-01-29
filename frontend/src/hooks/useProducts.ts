import { useState, useEffect } from 'react';
import api from '../services/api';
import type { Product, ProductStats } from '@/types/inventory';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [stats, setStats] = useState<ProductStats>({
        total_products: 0,
        critical_items: 0,
        total_value: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            setLoading(true);
            // Fazemos as duas chamadas em paralelo para performance
            const [productsRes, statsRes] = await Promise.all([
                api.get('/inventory/products/'),
                api.get('/inventory/products/status-stock/')
            ]);

            setProducts(productsRes.data);
            setStats(statsRes.data);
        } catch (err) {
            setError('Erro ao carregar dados do inventário.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Função para atualizar manualmente os dados após uma ação (create/update/delete)
    const refreshData = () => loadData();

    return { products, stats, loading, error, setProducts, refreshData };
}