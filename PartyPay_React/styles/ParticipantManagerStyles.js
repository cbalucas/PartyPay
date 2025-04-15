/* ParticipantManagerStyles.js */ 
import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
  container: { padding: 10, marginVertical: 10, backgroundColor: '#f9f9f9', borderRadius: 5, },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, }, 
  headerIcon: { width: 30, height: 30, marginRight: 10, resizeMode: 'contain', }, 
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, }, 
  item: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5, marginBottom: 5, }, 
  itemText: { fontSize: 16, }, 
  itemButtons: { flexDirection: 'row', marginTop: 5, }, 
  // Nuevo estilo para los iconos de acción "editar" y "eliminar" 
  actionIcon: { width: 24, height: 24, marginHorizontal: 10, resizeMode: 'contain', }, 
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', }, 
  modalContainer: { width: '85%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5, }, 
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, }, 
  modalTitleIcon: { width: 30, height: 30, marginRight: 10, resizeMode: 'contain', }, 
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'left', }, 
  modalInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, }, 
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }, 
  inputGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 10, }, 
  inputContainer: { width: '48%', flexDirection: 'row', alignItems: 'center', marginBottom: 10, }, 
  inputIcon: { width: 20, height: 20, marginRight: 5, resizeMode: 'contain', }, 
  cancelLink: { color: 'blue', textDecorationLine: 'underline', fontSize: 16, }, 
  errorText: { color: 'red', fontSize: 12, marginTop: 3, },
  editButton: { color: 'blue', marginRight: 15, }, 
  deleteButton: { color: 'red', }, 
 });