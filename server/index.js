const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/saludo", (req, res) => {
    res.json({ mensaje: "¡Hola desde el backend!"});
});

//Ejemplo de endpoint para estimaciones (ajustalo segun tus necesidades)
app.post('/api/estimate', (req, res) => {
    const input = req.body;
    //Logica de estimacion (esto es un ejemplo fijo)
    const estimate = { costo: 123456, tiempo: '3 semanas'};
    res.json(estimate);
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
