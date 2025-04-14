const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Endpoint de prueba que responde con un mensaje JSON
app.get('/api', (req, res) => {
  res.json({ message: 'Hola PartyPay desde Node.js' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor PartyPay escuchando en http://localhost:${port}`);
});

// Endpoint para obtener una lista de eventos
app.get('/api/eventos', (req, res) => {
  res.json([
    { id: 1, nombre: 'Fiesta de Lanzamiento', fecha: '2025-05-01' },
    { id: 2, nombre: 'Noche PartyPay', fecha: '2025-06-15' },
    { id: 3, nombre: 'Evento Exclusivo', fecha: '2025-07-20' }
  ]);
});