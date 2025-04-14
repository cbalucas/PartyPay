import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CrearEventoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');

  const crearEvento = () => {
    if (!nombre || !fecha) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    const nuevoEvento = { nombre, fecha };

    fetch('http://192.168.0.120:3000/api/eventos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoEvento)
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Éxito', `Evento creado: ${data.nombre}`);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error al crear evento:', error);
        Alert.alert('Error', 'No se pudo crear el evento');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Evento"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <Button title="Crear Evento" onPress={crearEvento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  }
});
