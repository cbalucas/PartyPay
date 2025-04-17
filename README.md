# PartyPay

PartyPay es un proyecto que integra tres componentes principales:

- **PartyPay_CSharp:** API desarrollada en C# con ASP.NET Core.
- **PartyPay_Node:** Servidor en Node.js.
- **PartyPay_React:** Aplicación móvil desarrollada en React Native (con Expo).

---

## Webs y Datos

Web: Suprabase
Login: github
Url: https://supabase.com/dashboard/project/uabkngefsxyryimczdef
Proyect: PartyPay Project
Pass: P@rty_P@y@2025


## Ejecución del Proyecto

### 1. Ejecutar la API en C# (PartyPay_CSharp)
1. Navega a la carpeta del proyecto C#:
   ```bash
   
    > cd PartyPay/PartyPay_CSharp

2. Ejecuta el siguiente comando para iniciar la API:

    > dotnet run

La API se ejecutará en la URL configurada (por ejemplo, http://0.0.0.0:5000).

### 2. Ejecutar el Servidor en Node.js (PartyPay_Node)
1. Navega a la carpeta del proyecto Node.js:

    > cd PartyPay_Node

2. Ejecuta el comando para iniciar el servidor:

    > node server.js

El servidor estará escuchando en el puerto configurado (por ejemplo, 3000).

### 3. Ejecutar la Aplicación en React Native (PartyPay_React)
1. Navega a la carpeta del proyecto React Native:

    > cd PartyPay_React

2. Inicia Expo:

    > npx expo start

Esto abrirá Expo DevTools; escanea el código QR con tu dispositivo o usa un emulador para ver la aplicación.

### 4. Actualizaciones en GitHub
Subir Actualizaciones al Repositorio
Para actualizar el repositorio en GitHub, realiza los siguientes pasos (desde la raíz del proyecto, es decir, la carpeta PartyPay):

Verificar el estado de los cambios:

    > git status

Agregar todos los archivos modificados y nuevos:

    > git add .

Realizar un commit:

    > git commit -m "Descripción del commit: actualizaciones y nuevas funcionalidades"

Subir los cambios a la rama main:

    > git push -u origin main

### 5. Traer lo Nuevo Desde GitHub
Para actualizar tu copia local con los últimos cambios del repositorio remoto:

    > git pull origin main

### 6. Crear un Nuevo Branch y Cambiar a Ello
Crear y cambiar a una nueva rama:

    > git checkout -b nombre-de-la-rama

Esto crea una nueva rama llamada nombre-de-la-rama y te cambia a ella.
Verificar la rama actual:

    > git branch

La rama en la que te encuentras estará marcada con un asterisco (*).

Para volver a la rama main, ejecuta:

    > git checkout main

-------------------------------------------------------------
-------------------------------------------------------------

# PartyPay - Proyecto Integrado

## Visión General

PartyPay es un proyecto integrado que combina tres tecnologías principales:

### C# (ASP.NET Core)
Proporciona una API básica en el puerto 5000 con un controlador de prueba.

### Node.js (Express)
Ofrece una API para la gestión de eventos (creación, actualización, eliminación y listado) en el puerto 3000, utilizando datos en memoria y un modelo de Evento que incluye participantes y gastos.

### React Native
Permite la interacción a través de una aplicación móvil que consume las APIs anteriormente mencionadas, ofreciendo pantallas para visualizar, crear y editar eventos, además de gestionar subcomponentes para participantes y gastos.

## Funcionalidades Principales

### API C# (ASP.NET Core):
Un controlador de prueba que responde con un mensaje para confirmar la conectividad.

### API Node.js:
Gestión de eventos con endpoints para:
    Obtener la lista de eventos.
    Crear nuevos eventos.
    Actualizar eventos existentes (incluyendo el cálculo dinámico de algunos campos, como “gastoTotal”, “participantesNro” y “gastoCU”).
    Eliminar eventos.
Utiliza un arreglo en memoria para almacenar los eventos (mock data).

### Aplicación React Native:
Pantalla de Lista de Eventos:
    Se muestra la lista de eventos con información clave (título, fecha, dirección, mapas, status y si se envía resumen por Whatsapp).
    Se permite editar o eliminar eventos.
    Status se calcula en tiempo real (“Proximo” o “Cerrado” dependiendo de la fecha).

Pantalla de Creación de Eventos:
    Formulario para ingresar los datos del evento (título, fecha, dirección, URL de Maps, y el campo WhatsApp mediante un Switch).
    Integración de dos subcomponentes:
        ParticipantManager: Para agregar, listar, editar y eliminar participantes asociados a un evento.
        GastosManager: Para agregar, listar, editar y eliminar gastos asociados a un evento, incluyendo la selección de fecha mediante un calendario.

Pantalla de Edición de Eventos:
    Permite actualizar los datos generales del evento.
    Incluye secciones de participantes y gastos, presentados en formato de tabla con íconos para agregar, editar y eliminar ítems.

## Estructura del Proyecto

PartyPay/
├── App.js                   # Configuración central de navegación y rutas (actualmente todo centralizado)
├── package.json             # Dependencias y scripts
├── /assets
│    └── iconos/             # Imágenes e íconos usados (ej.: nombre.png, email.png, bank.png, phone.png, participantesadd.png, gastosadd.png, lapicera.png, papelera.png, etc.)
├── /components
│    ├── ParticipantManager.js   # Lógica para gestión de participantes
│    └── GastosManager.js          # Lógica para gestión de gastos (incluye selector de fecha)
├── /screens
│    ├── CrearEventoScreen.js     # Pantalla para crear un nuevo evento
│    ├── EditarEventoScreen.js     # Pantalla para editar eventos existentes
│    └── (Otras pantallas, por ejemplo, PantallaCSharp, PantallaNode, EventosScreen, etc.)
└── /styles
     ├── AppStyles.js              # Estilos generales de la aplicación
     ├── CrearEventoStyles.js      # Estilos para la pantalla de creación de eventos
     ├── EditarEventoStyles.js     # Estilos para la pantalla de edición de eventos
     ├── ParticipantManagerStyles.js  # Estilos para el subcomponente de participantes
     └── GastosManagerStyles.js         # Estilos para el subcomponente de gastos

Nota: En esta versión se optó por mantener el código en App.js en lugar de separar todas las pantallas, aunque la refactorización a archivos separados es una mejora a implementar en fases futuras.

## Observaciones Críticas y Áreas de Mejora

### Modularización y Separación:
    Aunque la división de componentes (p.ej., subcomponentes ParticipantManager y GastosManager) se ha realizado, la separación completa de las pantallas en archivos individuales (como EventosScreen, PantallaCSharp, etc.) aún es pendiente.
    Se recomienda refactorizar gradualmente App.js para distribuir la lógica en archivos separados, mejorando la mantenibilidad.

### Validaciones y Manejo de Errores:
    Se han implementado validaciones visuales en los formularios (pintando bordes de TextInput en rojo en caso de campos obligatorios no completados).
    Sin embargo, se podría mejorar el feedback al usuario utilizando componentes de mensajes de error estandarizados o validación en tiempo real.

### Integración de Calendario:
    En GastosManager se incorporó un selector de fecha (DateTimePickerModal) para elegir la fecha. Se recomienda confirmar la compatibilidad y el estilo en diferentes plataformas (Android/iOS).

### Estética y UX:
    Se ha trabajado en la disposición en dos columnas para los formularios de los modales y se han incorporado íconos para cada campo.
    Se pueden mejorar márgenes, tipografías y espacios para lograr una interfaz más amigable.
    La alineación de botones (por ejemplo, "Cancelar" como link en azul a la izquierda y "Guardar" a la derecha) es un buen comienzo; se pueden realizar pruebas de usabilidad para ajustar estos detalles.

### Persistencia y Back-end:
    Actualmente el back-end de Node.js utiliza un array en memoria. Para producción se debería migrar a una base de datos (SQL, NoSQL) para persistencia real, además de implementar mecanismos de autenticación y control de acceso según sea necesario.

### Pruebas y Robustez:
    Se recomienda agregar pruebas unitarias y de integración tanto en el lado del back-end (Node.js y C# API) como en la aplicación React Native para asegurar la robustez de la solución.

## Conclusión
Hasta el momento, se ha logrado integrar una solución multi-tecnológica que permite gestionar eventos, con funcionalidades para crear, editar, listar y eliminar eventos, así como gestionar participantes y gastos asociados. Existen áreas de mejora, principalmente en la modularización del código, manejo de validaciones y persistencia de datos en el back-end. Estas mejoras serán clave para la siguiente fase del proyecto.