# Clientes BDB Backend

API REST backend para gestionar clientes bancarios con operaciones CRUD completas. Construido con **Express.js**, **TypeORM** y **PostgreSQL**.

---

## Descripción General

Este backend proporciona una API RESTful para administrar clientes de un banco. Los clientes pueden:
- **Crear** nuevos clientes con validaciones completas
- **Leer** todos los clientes o un cliente individual
- **Actualizar** información de clientes existentes
- **Eliminar** clientes de la base de datos

El proyecto está configurado para ejecutarse en dos entornos distintos: **Development** (DEV) y **Production** (PROD), cada uno con sus propias configuraciones, puertos y bases de datos.

---

## Estructura del Proyecto

```
Clientes_BDB_Backend/
├── src/
│   ├── app.ts                    # Punto de entrada principal
│   ├── server.ts                 # Configuración del servidor
│   ├── ormconfig.ts              # Configuración de TypeORM
│   ├── entities/
│   │   └── Customer.ts           # Entidad Customer (modelo de datos)
│   ├── modules/
│   │   └── customers/
│   │       └── customer.controller.ts  # Lógica de negocio y validaciones
│   └── routes/
│       └── customers.ts          # Definición de rutas
├── dist/                         # Código compilado (generado)
├── .env.dev                      # Configuración para Development
├── .env.prod                     # Configuración para Production
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
├── Dockerfile                    # Configuración para Docker
└── README.md                     # Este archivo
```

---

## Requisitos Previos

Para ejecutar este proyecto necesitas tener instalado:

- **Node.js** versión 16 o superior
- **npm** (incluido con Node.js)
- **PostgreSQL** versión 12 o superior

### Verificar instalación

```bash
node --version
npm --version
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Clientes_BDB_Backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` como punto de partida (o revisa `.env.dev` y `.env.prod`):

```bash
cp .env.example .env.dev
cp .env.example .env.prod
```

Edita los archivos según sea necesario (ver sección [Variables de Entorno](#variables-de-entorno)).

### 4. Crear la base de datos en PostgreSQL

```sql
CREATE DATABASE clientes_bdb;
```

---

## Entornos: Development vs Production

Este proyecto está configurado para ejecutarse en **dos entornos distintos**, cada uno optimizado para su caso de uso.

### Development (DEV)

**Propósito:** Desarrollo local y pruebas durante el desarrollo.

| Característica | Valor |
|---|---|
| **Archivo de configuración** | `.env.dev` |
| **Puerto** | `8080` |
| **Host de BD** | `localhost` |
| **Nombre de app** | `customers-dev` |
| **Modo de ejecución** | Con `nodemon` (recarga automática) |
| **Sincronización BD** | `synchronize: true` (auto-crea/actualiza tablas) |
| **Logging** | Deshabilitado en BD, visible en consola |

**Cómo se activa:**
```bash
npm run dev
```

**Ventajas:**
- ✅ Reload automático al guardar cambios
- ✅ Errores visibles en tiempo real
- ✅ Base de datos se actualiza automáticamente con cambios en entidades
- ✅ Ideal para prototipar y desarrollar

---

### Production (PROD)

**Propósito:** Despliegue en entornos reales/servidores.

| Característica | Valor |
|---|---|
| **Archivo de configuración** | `.env.prod` |
| **Puerto** | `9090` |
| **Host de BD** | `host.docker.internal` (Docker) |
| **Nombre de app** | `customers-prod` |
| **Modo de ejecución** | Código compilado ejecutado directamente |
| **Sincronización BD** | `synchronize: true` (automática) |
| **Logging** | Deshabilitado en BD |

**Cómo se activa:**
```bash
npm run prod
```

**Diferencias clave respecto a DEV:**
- ⚠️ **Sin reload automático** (debes reconstruir y reiniciar)
- ⚠️ **Código compilado** a JavaScript antes de ejecutarse
- ✅ Simulación de entorno real
- ✅ Optimizado para rendimiento

---

## Cómo Ejecutar

### Opción 1: Desarrollo Local (RECOMENDADO para desarrollo)

Abre una terminal en la raíz del proyecto:

```bash
npm run dev
```

**Resultado esperado:**
```
Database connected for customers-dev
Ejecutando en DEV
customers-dev running on port 8080
```

El servidor está listo en `http://localhost:8080`

### Opción 2: Producción Simulada (RECOMENDADO para pruebas finales)

```bash
npm run prod
```

**Resultado esperado:**
```
Database connected for customers-prod
Ejecutando en PROD
customers-prod running on port 9090
```

El servidor está listo en `http://localhost:9090`

### Opción 3: Compilación Manual

Si deseas compilar el código sin ejecutar:

```bash
npm run build
```

Esto genera la carpeta `dist/` con el código compilado.

---

## Endpoints del API

### 1. Obtener todos los clientes

```http
GET /api/customers
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "typeId": "cedula de ciudadania",
    "identification": "1234567",
    "name": "Juan Perez",
    "age": 32,
    "email": "juan@email.com",
    "product": "cuenta de ahorros",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 2. Crear un nuevo cliente

```http
POST /api/customers
Content-Type: application/json
```

**Body requerido:**
```json
{
  "typeId": "cedula de ciudadania",
  "identification": "1234567",
  "name": "Juan Perez",
  "age": 32,
  "email": "juan@email.com",
  "product": "cuenta de ahorros"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "typeId": "cedula de ciudadania",
  "identification": "1234567",
  "name": "Juan Perez",
  "age": 32,
  "email": "juan@email.com",
  "product": "cuenta de ahorros",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Errores posibles:**
- `400` - Datos inválidos o incompletos
- `409` - Ya existe un cliente con esa identificación

---

### 3. Actualizar un cliente existente

```http
PUT /api/customers/:id
Content-Type: application/json
```

**Ejemplo:**
```http
PUT /api/customers/1
```

**Body (mismo formato que POST):**
```json
{
  "typeId": "cedula de extranjeria",
  "identification": "9876543",
  "name": "Juan Pedro Perez",
  "age": 33,
  "email": "juanpedro@email.com",
  "product": "tarjeta de credito"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "typeId": "cedula de extranjeria",
  "identification": "9876543",
  "name": "Juan Pedro Perez",
  "age": 33,
  "email": "juanpedro@email.com",
  "product": "tarjeta de credito",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Errores posibles:**
- `400` - Datos inválidos o incompletos
- `404` - Cliente no encontrado
- `409` - Identificación duplicada con otro cliente

---

### 4. Eliminar un cliente

```http
DELETE /api/customers/:id
```

**Ejemplo:**
```http
DELETE /api/customers/1
```

**Respuesta exitosa (204):** Sin contenido (vacío)

**Errores posibles:**
- `404` - Cliente no encontrado

---

## Validaciones

Todas las operaciones (crear/actualizar) validan los siguientes campos:

| Campo | Validación | Ejemplo |
|---|---|---|
| **typeId** | Debe ser uno de: `cedula de ciudadania`, `cedula de extranjeria`, `pasaporte` | `cedula de ciudadania` |
| **identification** | Entre 7 y 10 dígitos numéricos | `1234567` |
| **name** | Entre 2 y 100 caracteres | `Juan Perez` |
| **age** | Número entero entre 1 y 120 | `32` |
| **email** | Formato de email válido | `juan@email.com` |
| **product** | Uno de: `cuenta de ahorros`, `cuenta corriente`, `tarjeta de credito`, `credito libre inversion`, `credito de vehiculo`, `credito rotativo` | `cuenta de ahorros` |

### Normalización de texto

El sistema normaliza automáticamente textos para ser flexible con mayúsculas/minúsculas y acentos:

| Entrada | Se guarda como |
|---|---|
| `CEDULA DE CIUDADANIA` | `cedula de ciudadania` |
| `Cédula de Ciudadanía` | `cedula de ciudadania` |
| `CUENTA DE AHORROS` | `cuenta de ahorros` |

---

## Variables de Entorno

### Archivo `.env.dev` (Development)

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=clientes_bdb

# Servidor y aplicación
APP_MODE=dev
APP_NAME=customers-dev
APP_LOG_MESSAGE=Ejecutando en DEV
SERVER_PORT=8080
```

### Archivo `.env.prod` (Production)

```env
# Base de datos (usa host.docker.internal para Docker)
DB_HOST=host.docker.internal
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_NAME=clientes_bdb

# Servidor y aplicación
APP_MODE=prod
APP_NAME=customers-prod
APP_LOG_MESSAGE=Ejecutando en PROD
SERVER_PORT=9090
```

### Descripción de variables

- **DB_HOST:** Host donde está corriendo PostgreSQL
- **DB_PORT:** Puerto de PostgreSQL (por defecto 5432)
- **DB_USERNAME:** Usuario de PostgreSQL
- **DB_PASSWORD:** Contraseña de PostgreSQL
- **DB_NAME:** Nombre de la base de datos
- **APP_MODE:** Modo de ejecución (`dev` o `prod`)
- **APP_NAME:** Nombre de la aplicación (usado en logs)
- **APP_LOG_MESSAGE:** Mensaje personalizado de inicio
- **SERVER_PORT:** Puerto donde escucha el servidor

---

## Ejemplos de Uso

### Usando cURL

#### Crear cliente
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "typeId": "cedula de ciudadania",
    "identification": "1234567",
    "name": "Juan Perez",
    "age": 32,
    "email": "juan@email.com",
    "product": "cuenta de ahorros"
  }'
```

#### Obtener todos los clientes
```bash
curl http://localhost:8080/api/customers
```

#### Actualizar cliente
```bash
curl -X PUT http://localhost:8080/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "typeId": "cedula de extranjeria",
    "identification": "9876543",
    "name": "Juan Pedro Perez",
    "age": 33,
    "email": "juanpedro@email.com",
    "product": "tarjeta de credito"
  }'
```

#### Eliminar cliente
```bash
curl -X DELETE http://localhost:8080/api/customers/1
```

### Usando Postman

1. Importa los ejemplos anteriores en Postman
2. Reemplaza `localhost:8080` con tu URL
3. Asegúrate de establecer el `Content-Type: application/json` en POST/PUT

---

## Estructura de la Base de Datos

### Tabla: `customer`

| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `INTEGER` | PRIMARY KEY, AUTO INCREMENT | Identificador único |
| `typeId` | `VARCHAR(40)` | NOT NULL | Tipo de identificación |
| `identification` | `VARCHAR(10)` | NOT NULL, UNIQUE | Número de identificación |
| `name` | `VARCHAR(100)` | NOT NULL | Nombre del cliente |
| `age` | `INTEGER` | NOT NULL | Edad del cliente |
| `email` | `VARCHAR(120)` | NOT NULL | Email del cliente |
| `product` | `VARCHAR(40)` | NOT NULL | Producto bancario contratado |
| `createdAt` | `TIMESTAMP` | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

---

## Despliegue con Docker

El proyecto incluye un `Dockerfile` para desplegar la aplicación en contenedores.

### Compilar imagen Docker

```bash
docker build -t clientes-bdb-backend .
```

### Ejecutar contenedor

```bash
docker run -p 9090:9090 \
  --env-file .env.prod \
  --network host \
  clientes-bdb-backend
```

**Notas:**
- El contenedor expone el puerto `9090` (Production)
- Usa `--network host` para acceder a `host.docker.internal`
- Asegúrate de que PostgreSQL esté corriendo en el host

---

## Flujo de Desarrollo Recomendado

1. **Durante desarrollo:** `npm run dev` - Desarrollo con reload automático
2. **Antes de commit:** `npm run build` - Verificar que compila sin errores
3. **Testing local:** `npm run prod` - Simular producción localmente
4. **Despliegue:** Usar Docker o servidor directo con `npm run prod`

---

## Troubleshooting

### Error: `Cannot find module 'typeorm'`
**Solución:** Ejecuta `npm install`

### Error: `listen EADDRINUSE: address already in use :::8080`
**Solución:** El puerto está en uso. Cambia `SERVER_PORT` en `.env.dev` o cierra la aplicación que usa ese puerto.

### Error: `connection refused` en PostgreSQL
**Solución:** Verifica que PostgreSQL esté corriendo y que `DB_HOST`, `DB_PORT`, usuario y contraseña sean correctos.

### Error: `database does not exist`
**Solución:** Crea la base de datos ejecutando en PostgreSQL:
```sql
CREATE DATABASE clientes_bdb;
```

---