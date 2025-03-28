import { renderHook, act, waitFor } from '@testing-library/react';
import { ProductoL } from '../constantes/Producto';
import { vi } from 'vitest';

describe('ProductoL Hook', () => {

  const mockProductos = Array.from({ length: 20 }, (_, i) => ({
    title: `Producto ${i + 1}`,
    image: 'https://via.placeholder.com/150',
  }));

  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProductos),
      }) as Promise<Response>
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Debe cargar 10 productos iniciales', async () => {
    const { result } = renderHook(() => ProductoL());
    
    await waitFor(() => {
      expect(result.current.productosVisibles).toHaveLength(10);
      expect(result.current.productosVisibles).toEqual(mockProductos.slice(0, 10));
    });
  });

  it('Debe cargar exactamente 5 productos adicionales en cada carga', async () => {
    const { result } = renderHook(() => ProductoL());
    
    await waitFor(() => expect(result.current.productosVisibles).toHaveLength(10));
    
    act(() => result.current.cargarMas());
    expect(result.current.productosVisibles).toHaveLength(15);
    
    act(() => result.current.cargarMas());
    expect(result.current.productosVisibles).toHaveLength(20);
  });

  it('No debe cargar más productos si ya se han cargado todos', async () => {
    const { result } = renderHook(() => ProductoL());

   
    await waitFor(() => expect(result.current.productosVisibles).toHaveLength(10));

   
    act(() => {
      for (let i = 0; i < 4; i++) {
        result.current.cargarMas();
      }
    });

   
    act(() => {
      const hasMore = result.current.cargarMas();
      
      expect(hasMore).toBe(true);
    });

    expect(result.current.productosVisibles).toHaveLength(20);
  });
});