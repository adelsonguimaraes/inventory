export interface Product {
    id: string;
    name: string;
    sku: string;
    category_name: string;
    stock_quantity: number;
    price: number;
}

export interface ProductStats {
    total_products: number;
    critical_items: number;
    total_value: number;
    message?: string;
}