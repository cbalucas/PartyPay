// screens/EditarEventoScreen.js
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
import editarEventoStyles from '../styles/EditarEventoStyles';
import ParticipantManager from '../components/ParticipantManager';
import GastosManager from '../components/GastosManager';

export default function EditarEventoScreen({ route, navigation }) {
  const { evento } = route.params;

  // Estados generales del evento
  const [titulo, setTitulo] = useState(evento.titulo);
  const [fecha, setFecha] = useState(evento.fecha);
  const [direccion, setDireccion] = useState(evento.direccion);
  const [maps, setMaps] = useState(evento.maps);
  
  // Estado para Whatsapp (usando valor del evento en caso de edición)
  const [whatsapp, setWhatsapp] = useState(evento.whatsapp || false);
  const computedStatusFecha = fecha ? ((new Date(fecha) >= new Date()) ? "Proximo" : "Vencido") : "";

  // Estados para participantes y gastos
  const [participants, setParticipants] = useState(evento.participantes || []);
  const [gastos, setGastos] = useState(evento.gastos || []);

 // La función cancelarEvento simplemente regresa a la pantalla previa.
 const cancelarEvento = () => {
  navigation.goBack();
  };

  const actualizarEvento = () => {
    const updatedEvent = {
      titulo,
      fecha,
      direccion,
      maps,
      status: computedStatusFecha,
      whatsapp,
      participantes: participants,
      gastos: gastos
    };

    fetch(`http://192.168.0.120:3000/api/eventos/${evento.eventoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    })
      .then(response => response.json())
      .then(() => {
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
      <View style={editarEventoStyles.modalHeader}>
                <Image 
                  source={require('../assets/iconos/calendarioedit.png')} 
                  style={editarEventoStyles.modalTitleIcon} 
                />
      <Text style={editarEventoStyles.modalTitle}>Editar Evento</Text>
      </View>
      <View style={editarEventoStyles.switchRow}>
        <Text style={{ marginRight: 10 }}>Whatsapp:</Text>
        <Switch value={whatsapp} onValueChange={setWhatsapp} />
      </View>
     
      <View style={editarEventoStyles.inputContainer}>
        <Image source={require('../assets/iconos/participantesadd.png')} style={editarEventoStyles.inputIcon} />
        <TextInput
          style={editarEventoStyles.input}
          placeholder="Nombre del Evento"
          value={titulo}
          onChangeText={setTitulo}
        />
      </View>

        {fecha ? (
        <Text style={editarEventoStyles.statusText}>
          Status del evento: {computedStatusFecha}
        </Text>
      ) : null}
      <View style={editarEventoStyles.inputContainer}>
        <Image 
          source={require('../assets/iconos/calendario.png')}
          style={editarEventoStyles.inputIcon} 
        />
      <TextInput
        style={editarEventoStyles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      </View>
      <View style={editarEventoStyles.inputContainer}>
        <Image 
          source={require('../assets/iconos/direccion.png')}
          style={editarEventoStyles.inputIcon} 
        />
      <TextInput
        style={editarEventoStyles.input}
        placeholder="Dirección del Evento"
        value={direccion}
        onChangeText={setDireccion}
      />
      </View>
      <View style={editarEventoStyles.inputContainer}>
        <Image 
          source={require('../assets/iconos/geo.png')}
          style={editarEventoStyles.inputIcon} 
        />
      <TextInput
        style={editarEventoStyles.input}
        placeholder="URL de Maps"
        value={maps}
        onChangeText={setMaps}
      />
      </View>
{/* Botones de Cancelar y Guardar (Actualizar) */}
    <View style={editarEventoStyles.itemRow}>
      <TouchableOpacity onPress={actualizarEvento}>
        <Image 
            source={require('../assets/iconos/participantesadd.png')}
            style={editarEventoStyles.modalTitleIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={actualizarEvento}>
          <Image 
            source={require('../assets/iconos/billete.png')}
            style={editarEventoStyles.modalTitleIcon}
          />
        </TouchableOpacity>
                <TouchableOpacity onPress={actualizarEvento}>
          <Image 
            source={require('../assets/iconos/save.png')}
            style={editarEventoStyles.modalTitleIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={cancelarEvento}>
          <Image 
            source={require('../assets/iconos/back.png')}
            style={editarEventoStyles.actionIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
