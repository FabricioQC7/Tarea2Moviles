import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import './Tab1.css';
import Productos from '../components/DetalleProducto';

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tarea #2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <Productos />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;