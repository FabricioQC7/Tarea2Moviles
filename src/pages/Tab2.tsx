import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList
  ,IonItem,IonAvatar,IonLabel
 } from '@ionic/react';

import { useEffect, useState } from 'react';
import './Tab2.css';


const Tab2: React.FC = () => {

  interface Producto {
    title: string;
    image: string;
  }

  const [productos, setProductos] = useState<Producto[]>([])


  useEffect(() => {
    const informacionP = async () => {
      const response = await fetch("https://fakestoreapi.com/products")
      const info = await response.json()
      setProductos(info)
    }
    informacionP()

  }, [])




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PruebaTarea #2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      <IonList>
          {productos.map((producto, index) => (
            <IonItem key={index}>
              <IonAvatar slot="start">
                <img src={producto.image} alt={producto.title} />
              </IonAvatar>
              <IonLabel>{producto.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
