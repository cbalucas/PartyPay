// screens/EditarEventoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import editarEventoStyles from '../styles/EditarEventoStyles';
import ParticipantManager from '../components/ParticipantManager';
import GastosManager from '../components/GastosManager';

export default function EditarEventoScreen({ route, navigation }) {
  const { evento } = route.params;

  const [titulo, setTitulo] = useState(evento.titulo);
  const [fecha, setFecha] = useState(evento.fecha);
  const [direccion, setDireccion] = useState(evento.direccion);
  const [maps, setMaps] = useState(evento.maps);

  const [participants, setParticipants] = useState(evento.participantes || []);
  const [gastos, setGastos] = useState(evento.gastos || []);

  const actualizarEvento = () => {
    const updatedEvent = {
      titulo,
      fecha,
      direccion,
      maps,
      participantes: participants,
      gastos,
    };

    fetch(`http://192.168.0.120:3000/api/eventos/${evento.eventoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Éxito', 'Evento actualizado');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error al actualizar evento:', error);
        Alert.alert('Error', 'No se pudo actualizar el evento');
      });
  };

  return (
    <ScrollView contentContainerStyle={editarEventoStyles.container}>
      <Text style={editarEventoStyles.title}>Editar Evento</Text>

      <TextInput
        style={editarEventoStyles.input}
        placeholder="Título del Evento"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={editarEventoStyles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={editarEventoStyles.input}
        placeholder="Dirección del Evento"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={editarEventoStyles.input}
        placeholder="URL de Maps"
        value={maps}
        onChangeText={setMaps}
      />

      {/* Participantes (si aplica) */}
       <ParticipantManager participants={participants} onParticipantsChange={setParticipants} /> 

      {/* Gastos */}
      <GastosManager gastos={gastos} onGastosChange={setGastos} />

      <Button title="Actualizar Evento" onPress={actualizarEvento} />
    </ScrollView>
  );
}
