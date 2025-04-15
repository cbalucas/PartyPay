// components/GastosManager.js
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import gastosStyles from '../styles/GastosManagerStyles';

const GastosManager = ({ gastos, onGastosChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGasto, setEditingGasto] = useState(null);

  // Campos del formulario
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [fecha, setFecha] = useState('');
  
  // Estados para mensajes de error (usados solo para pintar el borde)
  const [errorMonto, setErrorMonto] = useState('');
  const [errorParticipant, setErrorParticipant] = useState('');
  const [errorFecha, setErrorFecha] = useState('');

  // DatePicker
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const openModalForNew = () => {
    setEditingGasto(null);
    setDescripcion('');
    setMonto('');
    setParticipantId('');
    setFecha('');
    setErrorMonto('');
    setErrorParticipant('');
    setErrorFecha('');
    setModalVisible(true);
  };

  const openModalForEdit = (gasto) => {
    setEditingGasto(gasto);
    setDescripcion(gasto.descripcion);
    setMonto(gasto.monto ? gasto.monto.toString() : '');
    setParticipantId(gasto.participantId ? gasto.participantId.toString() : '');
    setFecha(gasto.fecha);
    setErrorMonto('');
    setErrorParticipant('');
    setErrorFecha('');
    setModalVisible(true);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    // Formatear fecha a "YYYY-MM-DD"
    const formattedDate = date.toISOString().split('T')[0];
    setFecha(formattedDate);
    hideDatePicker();
  };

  const saveGasto = () => {
    let valid = true;
    if (!monto) {
      setErrorMonto('error');
      valid = false;
    } else {
      setErrorMonto('');
    }
    if (!participantId) {
      setErrorParticipant('error');
      valid = false;
    } else {
      setErrorParticipant('');
    }
    if (!fecha) {
      setErrorFecha('error');
      valid = false;
    } else {
      setErrorFecha('');
    }
    if (!valid) return;

    const montoNumber = parseFloat(monto);
    const participantIdNumber = parseInt(participantId, 10);
    let updatedGastos = [...gastos];

    if (editingGasto) {
      updatedGastos = updatedGastos.map(g =>
        g.gastosId === editingGasto.gastosId
          ? { ...g, descripcion, monto: montoNumber, participantId: participantIdNumber, fecha }
          : g
      );
    } else {
      const newGasto = {
        gastosId: Date.now(),
        descripcion,
        monto: montoNumber,
        participantId: participantIdNumber,
        fecha,
      };
      updatedGastos.push(newGasto);
    }
    onGastosChange(updatedGastos);
    setModalVisible(false);
  };

  const deleteGasto = (gastosId) => {
    const updatedList = gastos.filter(g => g.gastosId !== gastosId);
    onGastosChange(updatedList);
  };

  return (
    <View style={gastosStyles.container}>
      <Text style={gastosStyles.title}>Gastos</Text>
      <FlatList
        data={gastos}
        keyExtractor={(item) => item.gastosId.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={gastosStyles.item}>
            <Text style={gastosStyles.itemText}>Descripción: {item.descripcion}</Text>
            <Text style={gastosStyles.itemText}>Monto: {item.monto}</Text>
            <Text style={gastosStyles.itemText}>Participante: {item.participantId}</Text>
            <Text style={gastosStyles.itemText}>Fecha: {item.fecha}</Text>
            <View style={gastosStyles.itemButtons}>
              <TouchableOpacity onPress={() => openModalForEdit(item)}>
                <Text style={gastosStyles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteGasto(item.gastosId)}>
                <Text style={gastosStyles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Agregar Gasto" onPress={openModalForNew} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={gastosStyles.modalBackground}>
          <View style={gastosStyles.modalContainer}>
            <View style={gastosStyles.modalHeader}>
              <Image 
                source={require('../assets/iconos/bank.png')}
                style={gastosStyles.modalTitleIcon}
              />
              <Text style={gastosStyles.modalTitle}>
                {editingGasto ? 'Editar Gasto' : 'Nuevo Gasto'}
              </Text>
            </View>
            <View style={gastosStyles.inputGrid}>
              <View style={gastosStyles.inputContainer}>
                <Image source={require('../assets/iconos/texto.png')} style={gastosStyles.inputIcon} />
                <TextInput
                  placeholder="Descripción"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  style={gastosStyles.modalInput}
                />
              </View>
              <View style={gastosStyles.inputContainer}>
                <Image source={require('../assets/iconos/billete.png')} style={gastosStyles.inputIcon} />
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Monto"
                    value={monto}
                    onChangeText={setMonto}
                    style={[gastosStyles.modalInput, errorMonto ? { borderColor: 'red' } : null]}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={gastosStyles.inputContainer}>
                <Image source={require('../assets/iconos/participante.png')} style={gastosStyles.inputIcon} />
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Participante"
                    value={participantId}
                    onChangeText={setParticipantId}
                    style={[gastosStyles.modalInput, errorParticipant ? { borderColor: 'red' } : null]}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={gastosStyles.inputContainer}>
                <Image source={require('../assets/iconos/calendario.png')} style={gastosStyles.inputIcon} />
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={showDatePicker} style={gastosStyles.datePickerButton}>
                    <Text style={gastosStyles.datePickerText}>
                      {fecha ? fecha : 'Selecciona fecha'}
                    </Text>
                  </TouchableOpacity>
                  {errorFecha ? null : null}
                </View>
              </View>
            </View>
            <View style={gastosStyles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1 }}>
                <Text style={gastosStyles.cancelLink}>Cancelar</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Button title="Guardar" onPress={saveGasto} />
              </View>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Modal>
    </View>
  );
};

export default GastosManager;
