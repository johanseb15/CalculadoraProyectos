import { useEffect, useState } from "react";

interface Estimacion {
  costo: number;
  tiempo: string;
}

const WebAgencyEstimator = () => {
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("landing");
  const [paginas, setPaginas] = useState(1);
  const [resultado, setResultado] = useState<Estimacion | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/saludo")
      .then((res) => res.json())
      .then((data) => setMensaje(data.mensaje))
      .catch((err) => {
        console.error("Error al conectar con el backend:", err);
        setMensaje("Error al conectar con el backend");
      });
  }, []);

  const calcularEstimacion = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, paginas }),
      });
      const data = await res.json();
      setResultado(data);
    } catch (error) {
      console.error("Error al obtener la estimación:", error);
    }
  };

  return (
    <div>
      <h1>Web Agency Estimator</h1>
      <p>Respuesta del servidor: {mensaje}</p>

      <label>
        Tipo de sitio:
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="landing">Landing Page</option>
          <option value="ecommerce">E-commerce</option>
          <option value="blog">Blog</option>
        </select>
      </label>

      <label>
        Cantidad de páginas:
        <input
          type="number"
          value={paginas}
          onChange={(e) => setPaginas(parseInt(e.target.value))}
          min={1}
        />
      </label>

      <button onClick={calcularEstimacion}>Calcular</button>

      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <p>Costo estimado: ${resultado.costo}</p>
          <p>Tiempo estimado: {resultado.tiempo}</p>
        </div>
      )}
    </div>
  );
};

export default WebAgencyEstimator;
