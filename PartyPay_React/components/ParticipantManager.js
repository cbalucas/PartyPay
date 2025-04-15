// components/ParticipantManager.js
import React, { useState } from 'react';
import {   View,   Text,   FlatList,   TouchableOpacity,   Modal,   TextInput,   Button } from 'react-native';
import participantStyles from '../styles/ParticipantManagerStyles';

const ParticipantManager = ({ participants, onParticipantsChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cbu, setCbu] = useState('');
  const [telefono, setTelefono] = useState('');

  // Abre el modal para agregar nuevo participante
  const openModalForNew = () => {
    setEditingParticipant(null);
    setNombre('');
    setEmail('');
    setCbu('');
    setTelefono('');
    setModalVisible(true);
  };

  // Abre el modal para editar el participante seleccionado
  const openModalForEdit = (participant) => {
    setEditingParticipant(participant);
    setNombre(participant.nombre);
    setEmail(participant.email);
    setCbu(participant.CBU);
    setTelefono(participant.telefono.toString());
    setModalVisible(true);
  };

  // Guarda el participante (nuevo o editado)
  const saveParticipant = () => {
    if (!nombre || !email || !cbu || !telefono) {
      alert('Por favor, completa todos los campos');
      return;
    }
    let updatedParticipants = [...participants];
    if (editingParticipant) {
      // Actualizar participante existente
      updatedParticipants = updatedParticipants.map(p =>
        p.participantId === editingParticipant.participantId
          ? { ...p, nombre, email, CBU: cbu, telefono }
          : p
      );
    } else {
      // Agregar participante nuevo (se genera un ID único con Date.now())
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

  // Elimina un participante
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
            <Text style={participantStyles.modalTitle}>
              {editingParticipant ? 'Editar Participante' : 'Nuevo Participante'}
            </Text>
            <TextInput
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              style={participantStyles.modalInput}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={participantStyles.modalInput}
            />
            <TextInput
              placeholder="CBU"
              value={cbu}
              onChangeText={setCbu}
              style={participantStyles.modalInput}
            />
            <TextInput
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono}
              style={participantStyles.modalInput}
            />
            <View style={participantStyles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={saveParticipant} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ParticipantManager;
