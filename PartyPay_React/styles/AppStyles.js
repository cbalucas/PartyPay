// styles/AppStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%'
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
});
