import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, ActivityIndicator, FlatList, ScrollView } from 'react-native';

const Stack = createNativeStackNavigator();

function PantallaCSharp({ navigation }) {
  const [apiMessage, setApiMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://192.168.0.120:5000/api/test')
      .then(response => response.json())
      .then(data => {
        setApiMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error en API C#: ', error);
        setApiMessage('Error al conectar con la API de C#');
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pantalla API C#</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.message}>{apiMessage}</Text>
      )}
      <Button title="Ir a API Node.js" onPress={() => navigation.navigate('PantallaNode')} />
    </ScrollView>
  );
}

function PantallaNode({ navigation }) {
  const [apiMessage, setApiMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://192.168.0.120:3000/api')
      .then(response => response.json())
      .then(data => {
        setApiMessage(data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error en API Node.js: ', error);
        setApiMessage('Error al conectar con la API de Node.js');
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pantalla API Node.js</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.message}>{apiMessage}</Text>
      )}
      <Button title="Ver Eventos" onPress={() => navigation.navigate('Eventos')} />
      <Button title="Volver a API C#" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

function EventosScreen({ navigation }) {
  const [eventos, setEventos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://192.168.0.120:3000/api/eventos')
      .then(response => response.json())
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener eventos: ', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos PartyPay</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.nombre} - {item.fecha}</Text>
            </View>
          )}
        />
      )}
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaCSharp">
        <Stack.Screen name="PantallaCSharp" component={PantallaCSharp} options={{ title: 'C# API' }} />
        <Stack.Screen name="PantallaNode" component={PantallaNode} options={{ title: 'Node.js API' }} />
        <Stack.Screen name="Eventos" component={EventosScreen} options={{ title: 'Eventos PartyPay' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
});
