import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button, ActivityIndicator, FlatList, Alert } from 'react-native';
import CrearEventoScreen from './screens/CrearEventoScreen';
import EditarEventoScreen from './screens/EditarEventoScreen';
import { useState, useEffect } from 'react';

// Importamos estilos desde nuestro archivo separado
import appStyles from './styles/AppStyles';

// Función para calcular el status de un evento
const getStatus = (fecha) => {
  return new Date(fecha) >= new Date() ? "Proximo" : "Cerrado";
};

const Stack = createNativeStackNavigator();

function PantallaCSharp({ navigation }) {
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);

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
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Pantalla API C#</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={appStyles.message}>{apiMessage}</Text>
      )}
      <Button title="Ir a API Node.js" onPress={() => navigation.navigate('PantallaNode')} />
    </View>
  );
}

function PantallaNode({ navigation }) {
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);

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
    <View style={appStyles.container}>
      <Text style={appStyles.title}>Pantalla API Node.js</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={appStyles.message}>{apiMessage}</Text>
      )}
      <Button title="Ver Eventos" onPress={() => navigation.navigate('Eventos')} />
      <Button title="Volver a API C#" onPress={() => navigation.goBack()} />
    </View>
  );
}

function EventosScreen({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Actualizar la fecha cada minuto para recalcular status en tiempo real
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const cargarEventos = () => {
    setLoading(true);
    fetch('http://192.168.0.120:3000/api/eventos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener eventos:', error);
        setLoading(false);
      });
  };

  // Actualizar eventos cada vez que la pantalla gana foco
  React.useEffect(() => {
    cargarEventos();
  }, []);

  const eliminarEvento = (id) => {
    fetch(`http://192.168.0.120:3000/api/eventos/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        Alert.alert('Éxito', 'Evento eliminado');
        cargarEventos();
      })
      .catch(error => {
        Alert.alert('Error', 'No se pudo eliminar el evento');
      });
  };

  // Header de FlatList
  const ListHeader = () => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
        Eventos PartyPay
      </Text>
      <Button title="Recargar Eventos" onPress={cargarEventos} />
    </View>
  );

  return (
    <View style={appStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.eventoId.toString()}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <View style={appStyles.item}>
              <Text style={appStyles.itemTitle}>{item.titulo}</Text>
              <Text>Fecha: {item.fecha}</Text>
              <Text>Dirección: {item.direccion}</Text>
              <Text>Maps: {item.maps}</Text>
              <Text>Status: {getStatus(item.fecha)}</Text>
              <Text>Whatsapp: {item.whatsapp ? 'Sí' : 'No'}</Text>
              <Text>Gasto Total: {item.gastoTotal}</Text>
              <Text>Gasto por Cabeza: {item.gastoCU}</Text>
              <Text>Participantes: {item.participantesNro}</Text>
              <View style={appStyles.buttonRow}>
                <Button title="Editar" onPress={() => navigation.navigate('EditarEvento', { evento: item })} />
                <Button title="Eliminar" onPress={() => eliminarEvento(item.eventoId)} />
              </View>
            </View>
          )}
        />
      )}
      <Button title="Agregar Evento" onPress={() => navigation.navigate('CrearEvento')} />
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
        <Stack.Screen name="CrearEvento" component={CrearEventoScreen} options={{ title: 'Crear Evento' }} />
        <Stack.Screen name="EditarEvento" component={EditarEventoScreen} options={{ title: 'Editar Evento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
