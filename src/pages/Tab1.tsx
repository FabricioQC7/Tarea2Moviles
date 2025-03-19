import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useEffect, useState } from 'react';
import {
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from '@ionic/react';

const Tab1: React.FC = () => {
    interface Producto {
        title: string;
        image: string;
    }

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



    const cargarMas = (ev: CustomEvent<void>) => {
        setTimeout(() => {
            const nuevosProductos = productos.slice(0, contador + 5);
            setProductosVisibles(nuevosProductos);
            setContador(contador + 5);
            
            if (nuevosProductos.length >= productos.length) {
                (ev.target as HTMLIonInfiniteScrollElement).disabled = true;
            }

            (ev.target as HTMLIonInfiniteScrollElement).complete();
        }, 1000); 
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tarea #2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {productosVisibles.map((producto, index) => (
                        <IonItem key={index}>
                            <IonAvatar slot="start">
                                <img src={producto.image} alt={producto.title} />
                            </IonAvatar>
                            <IonLabel>{producto.title}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>

                <IonInfiniteScroll onIonInfinite={cargarMas} threshold="50px">
                    <IonInfiniteScrollContent loadingText="Cargando más productos..." />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>


    );
};

export default Tab1;