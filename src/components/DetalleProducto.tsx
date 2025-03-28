import {
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from '@ionic/react';
import { ProductoL } from '../constantes/Producto';

const ProductosList = () => {
    const { productosVisibles, cargarMas } = ProductoL();

    const handleScroll = (ev: CustomEvent<void>) => {
        setTimeout(() => {
            const productoB = cargarMas();
            const infiniteScroll = ev.target as HTMLIonInfiniteScrollElement;
            
            if (productoB) {
                infiniteScroll.disabled = true;
            }
            infiniteScroll.complete();
        }, 1000);
    };

    return (
        <>
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

            <IonInfiniteScroll 
                onIonInfinite={handleScroll} 
                threshold="50px"
            >
                <IonInfiniteScrollContent 
                    loadingText="Cargando más productos..." 
                />
            </IonInfiniteScroll>
        </>
    );
};

export default ProductosList;