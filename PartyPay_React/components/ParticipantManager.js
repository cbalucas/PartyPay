/* ParticipantManager.js */ 
import React, { useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
 import participantStyles from '../styles/ParticipantManagerStyles';

const ParticipantManager = ({ participants, onParticipantsChange, whatsappActive }) => { const [modalVisible, setModalVisible] = useState(false); const [editingParticipant, setEditingParticipant] = useState(null); const [nombre, setNombre] = useState(''); const [email, setEmail] = useState(''); const [cbu, setCbu] = useState(''); const [telefono, setTelefono] = useState('');

// Estados para errores 
const [errorNombre, setErrorNombre] = useState(''); const [errorTelefono, setErrorTelefono] = useState('');

const openModalForNew = () => { setEditingParticipant(null); setNombre(''); setEmail(''); setCbu(''); setTelefono(''); setErrorNombre(''); setErrorTelefono(''); setModalVisible(true); };


const openModalForEdit = (participant) => { setEditingParticipant(participant); setNombre(participant.nombre); setEmail(participant.email); setCbu(participant.CBU); setTelefono(participant.telefono ? participant.telefono.toString() : ''); setErrorNombre(''); setErrorTelefono(''); setModalVisible(true); };

const saveParticipant = () => { let valid = true; if (!nombre) { setErrorNombre('error'); valid = false; } else { setErrorNombre(''); } if (whatsappActive && !telefono) { setErrorTelefono('error'); valid = false; } else { setErrorTelefono(''); } if (!valid) return;

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

  const deleteParticipant = (participantId) => { const updatedParticipants = participants.filter(p => p.participantId !== participantId); onParticipantsChange(updatedParticipants); };
  

  return ( <View style={participantStyles.container}> {/* Encabezado con botón para agregar participante y título */} <View style={participantStyles.headerRow}> <TouchableOpacity onPress={openModalForNew}> <Image source={require('../assets/iconos/participantesadd.png')} style={participantStyles.headerIcon} /> </TouchableOpacity> <Text style={participantStyles.title}>Participantes</Text> </View>

  {/* Encabezado para las columnas de la lista */}
  <View style={participantStyles.listHeader}>
    <Text style={participantStyles.headerCellName}>Nombre Participante</Text>
    <Text style={participantStyles.headerCellTel}>Teléfono</Text>
    <Text style={participantStyles.headerCellCBU}>CBU</Text>
    <Text style={participantStyles.headerCellEmail}>Email</Text>
    {/* <Text style={participantStyles.headerCellAction}>Editar</Text>
    <Text style={participantStyles.headerCellAction}>Eliminar</Text> */}
  </View>

  {/* Visualización de participantes en formato de fila */}
  <FlatList
    data={participants}
    keyExtractor={(item) => item.participantId.toString()}
    scrollEnabled={false}
    renderItem={({ item }) => (
      <View style={participantStyles.itemRow}>
        <Text style={participantStyles.itemCellName}>{item.nombre}</Text>
        <Text style={participantStyles.itemCellTel}>{item.telefono}</Text>
        <Text style={participantStyles.itemCellCBU}>{item.CBU}</Text>
        <Text style={participantStyles.itemCellEmail}>{item.email}</Text>
        <TouchableOpacity onPress={() => openModalForEdit(item)}>
          <Image 
            source={require('../assets/iconos/lapicera.png')}
            style={participantStyles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteParticipant(item.participantId)}>
          <Image 
            source={require('../assets/iconos/papelera.png')}
            style={participantStyles.actionIcon}
          />
        </TouchableOpacity>
      </View>
    )}
  />

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
}

export default ParticipantManager;
