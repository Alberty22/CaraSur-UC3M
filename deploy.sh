#!/bin/bash

# Capturar señales para detener Redis
trap stop_redis EXIT

# Cambiar al directorio del cliente
cd ./client || exit

# Ejecutar el build del cliente
echo "Ejecutando el build del cliente..."
npm run build

# Verificar si el build se realizó correctamente
if [ $? -ne 0 ]; then
  echo "Error durante el build del cliente. Abortando."
  exit 1
fi

# Cambiar al directorio del servidor
cd ..
cd ./server || exit

# Iniciar el servidor
echo "Iniciando el servidor..."
node index.js

# Verificar si el servidor se inició correctamente
if [ $? -ne 0 ]; then
  echo "Error al iniciar el servidor. Abortando."
  exit 1
fi

echo "El servidor se está ejecutando correctamente."

# Esperar a que el servidor termine
wait
