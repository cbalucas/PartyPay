// screens/CrearEventoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import crearEventoStyles from '../styles/CrearEventoStyles';
import ParticipantManager from '../components/ParticipantManager'; // Si tienes participantes
import GastosManager from '../components/GastosManager';          // Nuevo subcomponente de gastos

export default function CrearEventoScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [maps, setMaps] = useState('');

  const [participants, setParticipants] = useState([]); // Por si usas participantes
  const [gastos, setGastos] = useState([]);             // Arreglo de gastos

  const crearEvento = () => {
    if (!titulo || !fecha || !direccion || !maps) {
      Alert.alert('Error', 'Completa todos los campos del evento');
      return;
    }

    const nuevoEvento = {
      titulo,
      fecha,
      direccion,
      maps,
      gastos,         // Se envía el array de gastos
      participantes: participants, // Si también tienes participantes
    };

    fetch('http://192.168.0.120:3000/api/eventos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEvento)
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Éxito', `Evento creado: ${data.titulo}`);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error al crear evento:', error);
        Alert.alert('Error', 'No se pudo crear el evento');
      });
  };

  return (
    <ScrollView contentContainerStyle={crearEventoStyles.container}>
      <Text style={crearEventoStyles.title}>Crear Nuevo Evento</Text>

      <TextInput
        style={crearEventoStyles.input}
        placeholder="Nombre del Evento"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="Dirección del Evento"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="URL de Maps (ej. Google Maps)"
        value={maps}
        onChangeText={setMaps}
      />

      {/* Ejemplo si usas participantes */}
       <ParticipantManager participants={participants} onParticipantsChange={setParticipants} /> 

      {/* Subcomponente Gastos */}
      <GastosManager gastos={gastos} onGastosChange={setGastos} />

      <Button title="Crear Evento" onPress={crearEvento} />
    </ScrollView>
  );
}
