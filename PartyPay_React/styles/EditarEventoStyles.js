// styles/EditarEventoStyles.js
import { StyleSheet } from 'react-native';
import { ICON_SIZES } from './GlobalConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    //height: 40
  },
    inputIcon: {
      width: ICON_SIZES.input,
      height: ICON_SIZES.input,
      marginRight: 5,
      resizeMode: 'contain',
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#cccccc',
      //borderWidth: 1,
      //borderRadius: 5,
      //marginVertical: 8,
      //paddingHorizontal: 10,
    },
    statusText: {
      marginVertical: 10,
      fontStyle: 'italic',
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
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    actionIcon: {
      width: ICON_SIZES.action,
      height: ICON_SIZES.action,
      marginHorizontal: 8,
      resizeMode: 'contain',
    }
});
