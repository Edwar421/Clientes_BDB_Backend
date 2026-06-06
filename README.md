# Clientes BDB Backend

Backend simple para registrar y consultar clientes sin autenticación.

## Requisitos

- Node.js
- Base de datos PostgreSQL configurada con las variables del archivo `.env`

## Build

```bash
npm run build
```

## Ejecutar en DEV

Configura el entorno con `APP_MODE=dev`, `APP_NAME=customers-dev`, `APP_LOG_MESSAGE=Ejecutando en DEV` y un puerto como `8080`.

```bash
npm start
```

## Ejecutar en PROD simulado

Configura el entorno con `APP_MODE=prod`, `APP_NAME=customers-prod`, `APP_LOG_MESSAGE=Ejecutando en PROD` y un puerto como `9090`.

```bash
npm start
```

## Endpoints

- `POST /api/customers`
- `GET /api/customers`

## Ejemplo de creación

```json
{
  "identification": "1234567",
  "name": "Juan Perez",
  "age": 32,
  "email": "juan@email.com",
  "product": "cuenta de ahorros"
}
```