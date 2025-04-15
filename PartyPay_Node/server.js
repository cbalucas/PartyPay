const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const Evento = require('./models/EventoModel');

// Permite parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Lista en memoria para almacenar los eventos
let eventos = [
  { eventoId: 1, titulo: 'Fiesta de Lanzamiento', fecha: '2025-05-01', direccion: 'Calle Falsa 123', maps: 'https://maps.example.com', gastos: [], participantes: [],whatsapp: false },
  { eventoId: 2, titulo: 'Noche PartyPay', fecha: '2025-06-15', direccion: 'Avenida Siempre Viva 742', maps: 'https://maps.example.com', gastos: [], participantes: [] ,whatsapp: false},
  { eventoId: 3, titulo: 'Evento Exclusivo', fecha: '2025-07-20', direccion: 'Boulevard de los Sueños Rotos 456', maps: 'https://maps.example.com', gastos: [], participantes: [] ,whatsapp: false},
  { eventoId: 4, titulo: 'Reunión de Desarrolladores', fecha: '2025-08-10', direccion: 'Calle de la Innovación 789', maps: 'https://maps.example.com', gastos: [], participantes: [], whatsapp: false },
  { eventoId: 5, titulo: 'Conferencia de Tecnología', fecha: '2025-09-25', direccion: 'Avenida del Futuro 321', maps: 'https://maps.example.com', gastos: [], participantes: [] ,whatsapp: true},
  { eventoId: 6, titulo: 'Fiesta de Fin de Año', fecha: '2025-12-31', direccion: 'Calle de la Celebración 654', maps: 'https://maps.example.com', gastos: [], participantes: [], whatsapp: true},
  { eventoId: 7, titulo: 'Encuentro de Amigos', fecha: '2025-11-11', direccion: 'Calle de la Amistad 987', maps: 'https://maps.example.com', gastos: [], participantes: [],whatsapp: true },
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

// Endpoint para actualizar un evento existente
app.put('/api/eventos/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Buscar el índice del evento con eventoId igual a id
  const eventIndex = eventos.findIndex(ev => ev.eventoId == id);
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Evento no encontrado' });
  }

  // Actualizar los datos (se permiten actualizar título, fecha, dirección y maps)
  eventos[eventIndex] = {
    ...eventos[eventIndex],
    ...updatedData,
  };

  // Recalcular los campos derivados:
  eventos[eventIndex].gastoTotal = eventos[eventIndex].gastos.reduce((total, gasto) => total + (gasto.monto || 0), 0);
  eventos[eventIndex].participantesNro = eventos[eventIndex].participantes.length;
  eventos[eventIndex].gastoCU =
    eventos[eventIndex].participantesNro > 0
      ? eventos[eventIndex].gastoTotal / eventos[eventIndex].participantesNro
      : 0;

  res.json(eventos[eventIndex]);
});

// Endpoint para eliminar un evento existente
app.delete('/api/eventos/:id', (req, res) => {
  const { id } = req.params;
  const eventIndex = eventos.findIndex(ev => ev.eventoId == id);
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Evento no encontrado' });
  }
  const deletedEvent = eventos.splice(eventIndex, 1);
  res.json({ message: 'Evento eliminado', evento: deletedEvent });
});

// Endpoint para mostrar un mensaje de prueba (GET)
app.get('/api', (req, res) => {
  res.json({ message: 'Hola PartyPay desde Node.js' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor PartyPay escuchando en http://0.0.0.0:${port}`);
});
