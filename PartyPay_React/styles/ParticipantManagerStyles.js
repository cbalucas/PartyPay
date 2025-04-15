/* ParticipantManagerStyles.js */ 
import { StyleSheet } from 'react-native';

export default StyleSheet.create({ 
  container: { padding: 10, marginVertical: 10, backgroundColor: '#f9f9f9', borderRadius: 5, }, 
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, }, 
  headerIcon: { width: 30, height: 30, marginRight: 10, resizeMode: 'contain', }, 
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, }, 
  /* Estilo para la fila que muestra cada participante */ 
  itemRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5, marginBottom: 5, },
  /* Estilos para cada "celda" dentro de la fila, se asignan diferentes flex para controlar el ancho */ 
  itemCellName: { flex: 2, fontSize: 16, paddingHorizontal: 4, }, 
  itemCellTel: { flex: 1, fontSize: 16, paddingHorizontal: 4, },
   itemCellCBU: { flex: 1, fontSize: 16, paddingHorizontal: 4, }, 
   itemCellEmail: { flex: 2, fontSize: 16, paddingHorizontal: 4, },
    /* Estilo para los iconos de editar y eliminar */ 
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
        /* Encabezado de columnas para la lista */ 
        listHeader: { flexDirection: 'row', backgroundColor: '#e0e0e0', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ccc', }, 
        headerCellName: { flex: 2, fontWeight: 'bold', fontSize: 14, textAlign: 'left', paddingHorizontal: 4, },
         headerCellTel: { flex: 1, fontWeight: 'bold', fontSize: 14, textAlign: 'center', paddingHorizontal: 4, },
          headerCellCBU: { flex: 1, fontWeight: 'bold', fontSize: 14, textAlign: 'center', paddingHorizontal: 4, }, headerCellEmail: { flex: 2, fontWeight: 'bold', fontSize: 14, textAlign: 'left', paddingHorizontal: 4, }, headerCellAction: { flex: 0.5, fontWeight: 'bold', fontSize: 14, textAlign: 'center', paddingHorizontal: 4, }, 
      });