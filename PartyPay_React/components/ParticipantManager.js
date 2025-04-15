// components/ParticipantManager.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Button,
  Image
} from 'react-native';
import participantStyles from '../styles/ParticipantManagerStyles';

const ParticipantManager = ({ participants, onParticipantsChange, whatsappActive }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cbu, setCbu] = useState('');
  const [telefono, setTelefono] = useState('');

  // Estados para marcar error (usaremos simplemente un string; si no está vacío, se pinta de rojo)
  const [errorNombre, setErrorNombre] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');

  const openModalForNew = () => {
    setEditingParticipant(null);
    setNombre('');
    setEmail('');
    setCbu('');
    setTelefono('');
    setErrorNombre('');
    setErrorTelefono('');
    setModalVisible(true);
  };

  const openModalForEdit = (participant) => {
    setEditingParticipant(participant);
    setNombre(participant.nombre);
    setEmail(participant.email);
    setCbu(participant.CBU);
    setTelefono(participant.telefono ? participant.telefono.toString() : '');
    setErrorNombre('');
    setErrorTelefono('');
    setModalVisible(true);
  };

  const saveParticipant = () => {
    let valid = true;
    if (!nombre) {
      setErrorNombre('error');
      valid = false;
    } else {
      setErrorNombre('');
    }
    if (whatsappActive && !telefono) {
      setErrorTelefono('error');
      valid = false;
    } else {
      setErrorTelefono('');
    }
    if (!valid) return;

    let updatedParticipants = [...participants];
    if (editingParticipant) {
      updatedParticipants = updatedParticipants.map(p =>
        p.participantId === editingParticipant.participantId
          ? { ...p, nombre, email, CBU: cbu, telefono }
          : p
      );
    } else {
      const newParticipant = {
        participantId: Date.now(),
        nombre,
        email,
        CBU: cbu,
        telefono,
      };
      updatedParticipants.push(newParticipant);
    }
    onParticipantsChange(updatedParticipants);
    setModalVisible(false);
  };

  const deleteParticipant = (participantId) => {
    const updatedParticipants = participants.filter(p => p.participantId !== participantId);
    onParticipantsChange(updatedParticipants);
  };

  return (
    <View style={participantStyles.container}>
      <Text style={participantStyles.title}>Participantes</Text>
      <FlatList
        data={participants}
        keyExtractor={(item) => item.participantId.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={participantStyles.item}>
            <Text style={participantStyles.itemText}>Nombre: {item.nombre}</Text>
            <Text style={participantStyles.itemText}>Email: {item.email}</Text>
            <Text style={participantStyles.itemText}>CBU: {item.CBU}</Text>
            <Text style={participantStyles.itemText}>Teléfono: {item.telefono}</Text>
            <View style={participantStyles.itemButtons}>
              <TouchableOpacity onPress={() => openModalForEdit(item)}>
                <Text style={participantStyles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteParticipant(item.participantId)}>
                <Text style={participantStyles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Agregar Participante" onPress={openModalForNew} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={participantStyles.modalBackground}>
          <View style={participantStyles.modalContainer}>
            <View style={participantStyles.modalHeader}>
              <Image 
                source={require('../assets/iconos/participante.png')} 
                style={participantStyles.modalTitleIcon} 
              />
              <Text style={participantStyles.modalTitle}>
                {editingParticipant ? 'Editar Participante' : 'Nuevo Participante'}
              </Text>
            </View>
            {/* Grid con dos columnas para los campos */}
            <View style={participantStyles.inputGrid}>
              <View style={participantStyles.inputContainer}>
                <Image source={require('../assets/iconos/nombre.png')} style={participantStyles.inputIcon} />
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    style={[
                      participantStyles.modalInput,
                      errorNombre ? { borderColor: 'red' } : null,
                    ]}
                  />
                </View>
              </View>
              <View style={participantStyles.inputContainer}>
                <Image source={require('../assets/iconos/email.png')} style={participantStyles.inputIcon} />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={participantStyles.modalInput}
                />
              </View>
              <View style={participantStyles.inputContainer}>
                <Image source={require('../assets/iconos/bank.png')} style={participantStyles.inputIcon} />
                <TextInput
                  placeholder="CBU"
                  value={cbu}
                  onChangeText={setCbu}
                  style={participantStyles.modalInput}
                />
              </View>
              <View style={participantStyles.inputContainer}>
                <Image source={require('../assets/iconos/phone.png')} style={participantStyles.inputIcon} />
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={setTelefono}
                    style={[
                      participantStyles.modalInput,
                      whatsappActive && errorTelefono ? { borderColor: 'red' } : null,
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={participantStyles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1 }}>
                <Text style={participantStyles.cancelLink}>Cancelar</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Button title="Guardar" onPress={saveParticipant} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ParticipantManager;
