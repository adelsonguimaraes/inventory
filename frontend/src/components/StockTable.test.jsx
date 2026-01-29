import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StockTable } from './StockTable';

const mockProducts = [
  { id: '1', name: 'Teclado', stock_quantity: 5, price: 100, sku: 'TEC1', category_name: 'TI' },
  { id: '2', name: 'Mouse', stock_quantity: 15, price: 50, sku: 'MOU2', category_name: 'TI' },
];

describe('StockTable Component', () => {
  it('deve aplicar cor de alerta (amber) quando o estoque for menor que 10', () => {
    render(<StockTable products={mockProducts} onUpdate={vi.fn()} onDelete={vi.fn()} onShowHistory={vi.fn()} />);
    
    const lowStockElement = screen.getByText('5');
    // Verifica se a classe de cor de alerta está presente
    expect(lowStockElement).toHaveClass('bg-amber-100');
  });

  it('deve aplicar cor de sucesso (emerald) quando o estoque for saudável', () => {
    render(<StockTable products={mockProducts} onUpdate={vi.fn()} onDelete={vi.fn()} onShowHistory={vi.fn()} />);
    
    const healthyStockElement = screen.getByText('15');
    expect(healthyStockElement).toHaveClass('bg-emerald-100');
  });

  it('deve chamar onUpdate com +1 quando o botão de incremento for clicado', () => {
    const mockOnUpdate = vi.fn();
    render(<StockTable products={mockProducts} onUpdate={mockOnUpdate} onDelete={vi.fn()} onShowHistory={vi.fn()} />);
    
    // Selecionamos todos os botões "+", e clicamos no primeiro (do Teclado)
    const plusButtons = screen.getAllByText('+');
    fireEvent.click(plusButtons[0]);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', 1);
  });
});