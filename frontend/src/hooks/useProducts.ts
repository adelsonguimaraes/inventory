import { useState, useEffect} from 'react';
import api from '../services/api';
import type { Product } from '@/types/inventory'

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await api.get('/inventory/products/');
                setProducts(response.data);
            } catch (err) {
                setError('Erro ao carregar produtos.');
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return { products, loading, error, setProducts };
};