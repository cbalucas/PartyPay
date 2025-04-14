import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditarEventoScreen({ route, navigation }) {
  const { evento } = route.params;
  const [titulo, setTitulo] = useState(evento.titulo);
  const [fecha, setFecha] = useState(evento.fecha);
  const [direccion, setDireccion] = useState(evento.direccion);
  const [maps, setMaps] = useState(evento.maps);

  const actualizarEvento = () => {
    const updatedEvent = { titulo, fecha, direccion, maps };

    fetch(`http://192.168.0.120:3000/api/eventos/${evento.eventoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
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
    <View style={styles.container}>
      <Text style={styles.title}>Editar Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Título del Evento"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección del Evento"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de Maps"
        value={maps}
        onChangeText={setMaps}
      />
      <Button title="Actualizar Evento" onPress={actualizarEvento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '100%'
  },
});
