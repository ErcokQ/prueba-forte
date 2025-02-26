# Finance Manager - Monorepo de Microservicios

Este proyecto es una aplicación de gestión financiera compuesta por varios microservicios desarrollados en Node.js y TypeScript, que se comunican mediante HTTP y un patrón basado en eventos. La aplicación consta de los siguientes microservicios:

- **Transactions**: Gestión de transacciones financieras (CRUD).
- **Reports**: Generación de reportes en formato XLSX basado en transacciones.
- **Metrics**: Cálculo y generación de gráficos y métricas (distribución, resumen y evolución).

## Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Prerequisitos](#prerequisitos)
- [Instalación](#instalaci%C3%B3n)
- [Configuración](#configuraci%C3%B3n)
- [Ejecución de los Microservicios](#ejecuci%C3%B3n-de-los-microservicios)
- [Endpoints](#endpoints)
- [Semilla de Datos](#semilla-de-datos)
- [Consideraciones Adicionales](#consideraciones-adicionales)

## Arquitectura

La aplicación se ha desarrollado siguiendo un **patrón de microservicios** en un monorepo. Cada microservicio es un proyecto independiente que se comunica vía HTTP. Además, se utiliza un patrón basado en eventos para notificar acciones entre servicios (por ejemplo, el microservicio de Transactions emite un evento `transactionCreated` que puede ser consumido por otros servicios).

# Prerequisitos

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- **MongoDB** instalado y en ejecución (local o remoto)

## Instalación

Cada microservicio tiene su propio `package.json`. Para instalar las dependencias, sigue estos pasos:

1. **Transactions**  
   ```bash
   cd services/Transactions
   npm install
    ```
2. **Reports**  
   ```bash
   cd services/Reportes
   npm install
    ```
2. **Metrics**  
   ```bash
   cd services/Metrics
   npm install
    ```
## Configuración

Cada microservicio utiliza variables de entorno. Crea un archivo `.env` en la carpeta de cada microservicio con la configuración necesaria. 

Por ejemplo, en **Transactions** podrías tener:

    ```ini
    PORT=3000
    MONGO_URI=mongodb://127.0.0.1:27017/Finance-manager
    ```
En Reports:

    ```ini
    REPORTS_PORT=3002
    TRANSACTIONS_SERVICE_URL=http://localhost:3001/api/transacciones
    ```

En Metrics:
```ini
    METRICS_PORT=3003
    TRANSACTIONS_SERVICE_URL=http://localhost:3001/api/transacciones
```

## Ejecutando los Microservicios

Cada microservicio se ejecuta de forma independiente.

### Transactions
Desde `services/Transactions`:
```bash
npm run dev
```

## Endpoints

### Transactions Microservicio (http://localhost:3000/api/transacciones)

- **POST** `/`  
  Crear una nueva transacción.

- **GET** `/`  
  Listar todas las transacciones.

- **GET** `/:id`  
  Obtener una transacción por ID.

- **PUT** `/:id`  
  Actualizar una transacción.

- **PATCH** `/:id/deactivate`  
  Desactivar una transacción.

---

### Reports Microservicio (http://localhost:3002/api/reportes)

- **POST** `/generar`  
  Genera un reporte XLSX basado en parámetros:
  - **Body**:  
    ```json
    {
      "fechaDesde": "YYYY-MM-DD",
      "fechaHasta": "YYYY-MM-DD",
      "cliente": "Cliente X",
      "categoria": "Categoría Y"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Reporte generado con éxito",
      "downloadURL": "http://url-de-descarga-del-archivo.xlsx"
    }
    ```

---

### Metrics Microservicio (http://localhost:3003/api/metrics)

- **GET** `/distribution`  
  Retorna la distribución de ingresos/gastos por categoría.

- **GET** `/client-summary`  
  Retorna un resumen de transacciones por cliente.

- **GET** `/evolution`  
  Retorna la evolución de ingresos y gastos por mes.

---

## Semilla de Datos

Para poblar la base de datos del microservicio de **Transactions** con datos de prueba:

1. Dirígete a la carpeta `services/Transactions`.
2. Asegúrate de tener configurado el archivo `.env` con `MONGO_URI` apuntando a tu base de datos.
3. Ejecuta el script de semilla:
    ```bash
    npm run seed -- 30
    ```
   El número `30` es opcional y se usará para generar 30 registros. Si no se pasa argumento, se generarán 30 registros por defecto.

   El script se encargará de **borrar los datos existentes** .

---

## Consideraciones Adicionales no Desarrolladas
## Consideraciones Adicionales no desarrolladas

- **Manejo de Errores**: Cada servicio debería manejar de forma adecuada los errores y responder con el código de estado HTTP correspondiente.
- **Seguridad**: Uso de tokens de autenticación (JWT) o un Gateway centralizado para manejar la seguridad y el enrutamiento.
- **Despliegue**: Contenerizar cada microservicio usando Docker y orquestarlos con Kubernetes o Docker Compose.
