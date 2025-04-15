import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Button 
} from 'react-native';
import gastosStyles from '../styles/GastosManagerStyles';

const GastosManager = ({ gastos, onGastosChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGasto, setEditingGasto] = useState(null);

  // Campos para el formulario del gasto
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [fecha, setFecha] = useState('');

  // Abre el modal para agregar un nuevo gasto
  const openModalForNew = () => {
    setEditingGasto(null);
    setDescripcion('');
    setMonto('');
    setParticipantId('');
    setFecha('');
    setModalVisible(true);
  };

  // Abre el modal para editar un gasto existente
  const openModalForEdit = (gasto) => {
    setEditingGasto(gasto);
    setDescripcion(gasto.descripcion);
    setMonto(gasto.monto.toString());
    setParticipantId(gasto.participantId.toString());
    setFecha(gasto.fecha);
    setModalVisible(true);
  };

  // Guarda el gasto (nuevo o editado)
  const saveGasto = () => {
    if (!descripcion || !monto || !participantId || !fecha) {
      alert('Por favor, completa todos los campos del gasto');
      return;
    }

    const montoNumber = parseFloat(monto);
    const participantIdNumber = parseInt(participantId, 10);
    let updatedGastos = [...gastos];

    if (editingGasto) {
      // Actualiza el gasto existente
      updatedGastos = updatedGastos.map(g =>
        g.gastosId === editingGasto.gastosId
          ? { ...g, descripcion, monto: montoNumber, participantId: participantIdNumber, fecha }
          : g
      );
    } else {
      // Crea un nuevo gasto (ID único usando Date.now)
      const newGasto = {
        gastosId: Date.now(),
        descripcion,
        monto: montoNumber,
        participantId: participantIdNumber,
        fecha
      };
      updatedGastos.push(newGasto);
    }
    onGastosChange(updatedGastos);
    setModalVisible(false);
  };

  // Elimina un gasto
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
            <Text style={gastosStyles.itemText}>ParticipantID: {item.participantId}</Text>
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
            <Text style={gastosStyles.modalTitle}>
              {editingGasto ? 'Editar Gasto' : 'Nuevo Gasto'}
            </Text>
            <TextInput
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              style={gastosStyles.modalInput}
            />
            <TextInput
              placeholder="Monto"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
              style={gastosStyles.modalInput}
            />
            <TextInput
              placeholder="ParticipantID"
              value={participantId}
              onChangeText={setParticipantId}
              keyboardType="numeric"
              style={gastosStyles.modalInput}
            />
            <TextInput
              placeholder="Fecha (dd/mm/yyyy)"
              value={fecha}
              onChangeText={setFecha}
              style={gastosStyles.modalInput}
            />
            <View style={gastosStyles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={saveGasto} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GastosManager;
