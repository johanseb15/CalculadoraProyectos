import { useEffect, useState } from "react";
import WebAgencyEstimator from "./components/WebAgencyEstimator";

function App(){
  const [mensaje, setMensaje] = useState('');

useEffect(() => {
  fetch('http://localhost:3001/api/saludo')
    .then(res => res.json())
    .then(data => setMensaje(data.mensaje))
    .catch(err => {
      console.error('Error al conectar con el backend:', err);
      setMensaje('Error al conectar con el backend');
    });
}, []);

return (
  <div>
    <h1>Web Agency Estimator</h1>
    <p>Respuesta del servidor: {mensaje}</p>
    <WebAgencyEstimator />
  </div>
);
}

export default App;