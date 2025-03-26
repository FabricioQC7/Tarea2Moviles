import { useState, useEffect } from 'react';

export interface Producto {
    title: string;
    image: string;
}

export const useProductosLogic = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [productosVisibles, setProductosVisibles] = useState<Producto[]>([]);
    const [contador, setContador] = useState(10);

    useEffect(() => {
        const cargarProductos = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProductos(data);
            setProductosVisibles(data.slice(0, 10));
        };
        cargarProductos();
    }, []);

    const cargarMas = (): boolean => {
        const nuevosProductos = productos.slice(0, contador + 5);
        setProductosVisibles(nuevosProductos);
        setContador(contador + 5);
        return nuevosProductos.length >= productos.length;
    };

    return { productosVisibles, cargarMas };
};