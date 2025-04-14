const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const Evento = require('./models/EventoModel');

// Permite parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Lista en memoria para almacenar los eventos
let eventos = [
  { id: 1, nombre: 'Fiesta de Lanzamiento', fecha: '2025-05-01' },
  { id: 2, nombre: 'Noche PartyPay', fecha: '2025-06-15' },
  { id: 3, nombre: 'Evento Exclusivo', fecha: '2025-07-20' }
];

// Habilitar CORS para todas las rutas
app.use(cors());


// Endpoint para obtener la lista de eventos (GET)
app.get('/api/eventos', (req, res) => {
  res.json(eventos);
});

// Endpoint para crear un nuevo evento (POST)
app.post('/api/eventos', (req, res) => {
  const { titulo, fecha, direccion, maps, gastos, participantes } = req.body;
  // Crear una instancia del evento utilizando el modelo
  const nuevoEvento = new Evento({ titulo, fecha, direccion, maps, gastos, participantes });
  
  // Agrega el nuevo evento a tu lista de eventos en memoria
  eventos.push(nuevoEvento);
  
  res.status(201).json(nuevoEvento);
});


// Endpoint para mostrar un mensaje de prueba (GET)
app.get('/api', (req, res) => {
  res.json({ message: 'Hola PartyPay desde Node.js' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor PartyPay escuchando en http://0.0.0.0:${port}`);
});

