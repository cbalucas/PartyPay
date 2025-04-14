# PartyPay

PartyPay es un proyecto que integra tres componentes principales:

- **PartyPay_CSharp:** API desarrollada en C# con ASP.NET Core.
- **PartyPay_Node:** Servidor en Node.js.
- **PartyPay_React:** Aplicación móvil desarrollada en React Native (con Expo).

---

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

    > cd PartyPay/PartyPay_Node

2. Ejecuta el comando para iniciar el servidor:

    > node server.js

El servidor estará escuchando en el puerto configurado (por ejemplo, 3000).

### 3. Ejecutar la Aplicación en React Native (PartyPay_React)
1. Navega a la carpeta del proyecto React Native:

    > cd PartyPay/PartyPay_React

2. Inicia Expo:

    > expo start

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
