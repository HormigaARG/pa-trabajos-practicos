# TP4 - Sesiones de pago y webhook Stripe (NestJS)

Microservicio HTTP (NestJS) que crea sesiones de pago con Stripe Checkout y recibe el
aviso (webhook) cuando un cobro se concreta.

## Configuración

1. Copiar `.env.template` a `.env`:

```bash
cp .env.template .env
```

2. Completar las variables:

| Variable                 | Uso                                   |
| ------------------------ | ------------------------------------- |
| `PORT`                   | Puerto HTTP (sugerido: `3003`)        |
| `STRIPE_SECRET`          | Clave secreta de test de Stripe       |
| `STRIPE_SUCCESS_URL`     | URL de redirección tras pago exitoso  |
| `STRIPE_CANCEL_URL`      | URL de redirección tras cancelar      |
| `STRIPE_ENDPOINT_SECRET` | Signing secret del webhook (`whsec_`) |

## Levantar el proyecto

```bash
npm install
npm run start:dev
```

El servidor arranca en `http://localhost:3003` validando al inicio que existan todas las
variables de entorno requeridas.

## Rutas principales

### 1. Crear sesión de pago

```
POST /payments/create-payment-session
```

Body de ejemplo:

```json
{
  "orderId": "ord-1",
  "currency": "usd",
  "items": [{ "name": "Producto", "price": 20, "quantity": 1 }]
}
```

Respuesta (la `url` redirige al Checkout de Stripe):

```json
{ "id": "cs_test_...", "url": "https://checkout.stripe.com/c/pay/cs_test_..." }
```

El `orderId` queda guardado en `payment_intent_data.metadata` para leerlo en el webhook.
Los request inválidos (sin `items`, precio negativo, campos extra) responden `400`.

### 2. Webhook de Stripe

```
POST /payments/webhook
```

Stripe lo invoca cuando se concreta el cobro, con el header `stripe-signature` y el cuerpo
crudo. El servicio verifica la firma con `stripe.webhooks.constructEvent(...)`:

- Firma inválida → `400` (no se procesa).
- `event.type === 'charge.succeeded'` → loguea el `orderId` y responde `200`.
- Otro tipo de evento → loguea "evento no manejado" y responde `200`.

Para probarlo en local:

```bash
stripe listen --forward-to localhost:3003/payments/webhook
```

Tomar el valor `whsec_...` que imprime la CLI como `STRIPE_ENDPOINT_SECRET` y pagar con
la tarjeta de prueba de Stripe.

### Rutas de apoyo (redirects del Checkout)

| Método | Ruta                | Respuesta                                         |
| ------ | ------------------- | ------------------------------------------------- |
| GET    | `/payments/success` | `{ "ok": true, "message": "Payment successful" }` |
| GET    | `/payments/cancel`  | `{ "ok": false, "message": "Payment cancelled" }` |

## Estructura

```
src/
  main.ts                         # Bootstrap: env vars, rawBody y ValidationPipe global
  app.module.ts                   # Módulo raíz
  payments/
    payments.module.ts
    payments.controller.ts        # Endpoints HTTP
    payments.service.ts           # Integración con Stripe (checkout + webhook)
    dto/
      payment-session.dto.ts    # Validación con class-validator
```
