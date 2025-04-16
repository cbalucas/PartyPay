// styles/ParticipantManagerStyles.js
import { StyleSheet } from 'react-native';
import { ICON_SIZES } from './GlobalConstants';

export default StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff', // Fondo blanco para dar un look limpio
    borderRadius: 8,
    // Sombra ligera para efecto de tarjeta (iOS y Android)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcon: {
    width: ICON_SIZES.header,
    height: ICON_SIZES.header,
    marginRight: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  listHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
  },
  // Se pueden unificar en una celda base y aplicar luego propiedades específicas
  headerCell: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
    color: '#444444',
  },
  headerCellName: {
    flex: 2,
    textAlign: 'left',
  },
  headerCellTel: {
    flex: 1,
  },
  headerCellCBU: {
    flex: 1,
  },
  headerCellEmail: {
    flex: 2,
    textAlign: 'left',
  },
  headerCellAction: {
    flex: 0.5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  // Se define una celda base para cada dato en la fila
  itemCell: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: '#555555',
  },
  itemCellName: {
    flex: 2,
    textAlign: 'left',
  },
  itemCellTel: {
    flex: 1,
    textAlign: 'center',
  },
  itemCellCBU: {
    flex: 1,
    textAlign: 'center',
  },
  itemCellEmail: {
    flex: 2,
    textAlign: 'left',
  },
  actionIcon: {
    width: ICON_SIZES.action,
    height: ICON_SIZES.action,
    marginHorizontal: 8,
    resizeMode: 'contain',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitleIcon: {
    width: ICON_SIZES.header,
    height: ICON_SIZES.header,
    marginRight: 10,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#333333',
  },
  modalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputContainer: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputIcon: {
    width: ICON_SIZES.input,
    height: ICON_SIZES.input,
    marginRight: 5,
    resizeMode: 'contain',
  },
  cancelLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 3,
  },
});
