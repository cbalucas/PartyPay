// screens/CrearEventoScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  ScrollView, 
  Switch 
} from 'react-native';
import crearEventoStyles from '../styles/CrearEventoStyles';
import ParticipantManager from '../components/ParticipantManager';
import GastosManager from '../components/GastosManager';

export default function CrearEventoScreen({ navigation }) {
  // Estados generales del evento
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [maps, setMaps] = useState('');
  
  // Estado para el campo Whatsapp (true = se enviará el resumen)
  const [whatsapp, setWhatsapp] = useState(false);
  
  // Se calcula el status en función de la fecha (dinámico)
  const computedStatus = fecha ? ((new Date(fecha) >= new Date()) ? "Proximo" : "Cerrado") : "";

  // Estados para subcomponentes de participantes y gastos
  const [participants, setParticipants] = useState([]);
  const [gastos, setGastos] = useState([]);

  const crearEvento = () => {
    if (!titulo || !fecha || !direccion || !maps) {
      Alert.alert('Error', 'Complete todos los campos del evento');
      return;
    }

    const nuevoEvento = {
      titulo,
      fecha,
      direccion,
      maps,
      status: computedStatus, // Campo calculado
      whatsapp,             // Campo booleano
      participantes,        // Desde el subcomponente
      gastos                // Desde el subcomponente
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

      {fecha ? (
        <Text style={crearEventoStyles.statusText}>
          Status del evento: {computedStatus}
        </Text>
      ) : null}

      <View style={crearEventoStyles.switchRow}>
        <Text style={{ marginRight: 10 }}>Enviar resumen por Whatsapp:</Text>
        <Switch value={whatsapp} onValueChange={setWhatsapp} />
      </View>

      {/* Se envuelve cada subcomponente en un contenedor de altura fija para evitar problemas de scroll */}
      <View style={{ height: 250, marginBottom: 10 }}>
      <ParticipantManager 
        participants={participants} 
        onParticipantsChange={setParticipants} 
        whatsappActive={whatsapp}  
      />
      </View>
      <View style={{ height: 250, marginBottom: 10 }}>
        <GastosManager 
          gastos={gastos} 
          onGastosChange={setGastos} 
        />
      </View>

      <Button title="Crear Evento" onPress={crearEvento} />
    </ScrollView>
  );
}
