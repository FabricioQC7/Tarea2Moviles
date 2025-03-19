import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {


  interface Producto {
    title: string;
    image: string;
  }

  const [productos, serProductos] = useState<Producto[]>([])
  const [cambiarBTM, setCambiarBTM] = useState(false)
  const [cambiarText, setCambiarText] = useState("Presione aqui para cargar la informacion")


  async function conexion() {
    const response = await fetch("https://fakestoreapi.com/products")
    const info = await response.json()
    serProductos(info)

  }

  function cambiarMS() {

    if (cambiarBTM) {
      setCambiarText("Actualmente se corto la conexion")
    } else {
      setCambiarText("Informacion actual ")
    }
  }

  function cambiaC() {
    setCambiarBTM(!cambiarBTM);
    cambiarMS();
    conexion()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PruebasTarea2</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <div style={{ backgroundColor: "white" }}>
          <button style={{ backgroundColor: cambiarBTM ? "blue" : "red", width: "150px", height: "75px", marginRight: "" }}
            onClick={cambiaC}>{cambiarText}</button>


        </div>

        <span>
          {
            cambiarBTM &&
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {productos.map((product) => {
                return (
                  <>
                    <span>{product.title}</span>
                  </>

                )
              })}
            </div>
          }

        </span>


      </IonContent>


    </IonPage>
  );
};

export default Tab3;
