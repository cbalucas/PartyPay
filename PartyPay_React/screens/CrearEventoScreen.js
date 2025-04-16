// screens/CrearEventoScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  ScrollView, 
  Switch,
  Image,
  TouchableOpacity,
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
  const computedStatusFecha = fecha ? ((new Date(fecha) >= new Date()) ? "Proximo" : "Cerrado") : "";

  // Estados para subcomponentes de participantes y gastos
  const [participants, setParticipants] = useState([]);
  const [gastos, setGastos] = useState([]);

  const cancelarEvento = () => {
    navigation.goBack();
    };

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
      status: computedStatusFecha, // Campo calculado
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
       <View style={crearEventoStyles.modalHeader}>
                      <Image 
                        source={require('../assets/iconos/calendarioadd.png')} 
                        style={crearEventoStyles.modalTitleIcon} 
                      />
      <Text style={crearEventoStyles.modalTitle}>Crear Nuevo Evento</Text>
      </View>
      <View style={crearEventoStyles.switchRow}>
        <Text style={{ marginRight: 10 }}>Whatsapp:</Text>
        <Switch value={whatsapp} onValueChange={setWhatsapp}/>
      </View>
      <View style={crearEventoStyles.inputContainer}>
        <Image source={require('../assets/iconos/participantesadd.png')} style={crearEventoStyles.inputIcon} />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="Nombre del Evento"
        value={titulo}
        onChangeText={setTitulo}
      />
      </View>
       {fecha ? (
        <Text style={crearEventoStyles.statusText}>
          Status del evento: {computedStatusFecha}
        </Text>
      ) : null}
      <View style={crearEventoStyles.inputContainer}>
         <Image source={require('../assets/iconos/calendario.png')} style={crearEventoStyles.inputIcon} />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      </View>
      <View style={crearEventoStyles.inputContainer}>
              <Image 
                source={require('../assets/iconos/direccion.png')}
                style={crearEventoStyles.inputIcon} 
              />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="Dirección del Evento"
        value={direccion}
        onChangeText={setDireccion}
      />
      </View>
      <View style={crearEventoStyles.inputContainer}>
        <Image source={require('../assets/iconos/geo.png')} style={crearEventoStyles.inputIcon} />
      <TextInput
        style={crearEventoStyles.input}
        placeholder="URL de Maps (ej. Google Maps)"
        value={maps}
        onChangeText={setMaps}
      />
      </View>

      {/* Botones de Cancelar y Guardar (Actualizar) */}
          <View style={crearEventoStyles.itemRow}>
            <TouchableOpacity onPress={crearEvento}>
              <Image 
                  source={require('../assets/iconos/participantesadd.png')}
                  style={crearEventoStyles.modalTitleIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={crearEvento}>
                <Image 
                  source={require('../assets/iconos/billete.png')}
                  style={crearEventoStyles.modalTitleIcon}
                />
              </TouchableOpacity>
                      <TouchableOpacity onPress={crearEvento}>
                <Image 
                  source={require('../assets/iconos/save.png')}
                  style={crearEventoStyles.modalTitleIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelarEvento}>
                <Image 
                  source={require('../assets/iconos/back.png')}
                  style={crearEventoStyles.actionIcon}
                />
              </TouchableOpacity>
            </View>
    </ScrollView>
  );
}
