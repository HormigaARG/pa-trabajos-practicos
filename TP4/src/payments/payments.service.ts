import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentSessionDto } from './dto/payment-session.dto';
import Stripe from 'stripe';
import type { Request } from 'express';

@Injectable()
export class PaymentsService {
  //Instancia y configuracion el cliente de Stripe usando la llave secreta del archivo .env
  private readonly stripe = new Stripe(
    process.env.STRIPE_SECRET || 'fake_secret',
    {
      // NO hardcodeamos apiVersion: dejamos que el SDK use su versión vigente por defecto.
      // Si hardcodeamos una vieja (ej. 2025-02-28.acacia), Stripe la rechaza con 400. (fail-safe)
    },
  );

  //Método principal que recibe los datos validados del DTO para procesar la sesión
  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId } = paymentSessionDto;

    //Transformamos cada ítem del arreglo al formato estricto que pide la API de Stripe
    const lineItems = items.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          //Stripe trabaja con montos enteros en centavos; por eso multiplicamos por 100 y redondeamos
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    //se comunica con Stripe para crear la sesión de pago (Checkout Session)
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Indicamos que aceptamos tarjetas
      line_items: lineItems, // Pasamos los productos mapeados arriba
      mode: 'payment', // Modo de pago unico (no suscripción)

      // URLs a donde redirige Stripe según el resultado del pago (vienen del .env)
      success_url:
        process.env.STRIPE_SUCCESS_URL ||
        'http://localhost:3003/payments/success',
      cancel_url:
        process.env.STRIPE_CANCEL_URL ||
        'http://localhost:3003/payments/cancel',

      //Guardamos el orderId en los metadatos para rastrearlo luego en el Webhook (requisito del TP)
      //Lo ponemos a nivel de la sesión (fuente confiable para checkout.session.completed)
      //y también en el PaymentIntent (por si querés rastrearlo desde charge.succeeded).
      metadata: {
        orderId: orderId,
      },
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },
    });

    //Retornamos la respuesta hacia el controlador con el ID de la sesión y la URL de redirección
    return {
      cancelUrl: session.url,
      url: session.url,
      id: session.id,
    };
  }

  //Método para verificar la firma del webhook y procesar el evento de Stripe
  async stripeWebhook(req: Request) {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    let event: Stripe.Event;

    try {
      //Obtenemos el cuerpo crudo (rawBody) configurado en el main.ts
      const rawBody = req['rawBody'];

      //Validamos la firma oficial de Stripe usando el secret del endpoint
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        endpointSecret!,
      );
    } catch (err: any) {
      // Si la firma falla, lanzamos error (el controlador lo atrapará como 400)
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    //Evaluamos qué tipo de evento nos envió Stripe
    switch (event.type) {
      //Evento canónico de Checkout: se dispara cuando el cliente completó el pago.
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Obtenemos el orderId desde la metadata que guardamos al crear la sesión
        const orderId = session.metadata?.orderId;
        console.log(`[Webhook] ¡Pago exitoso! Order ID recibido: ${orderId}`);
        // Aquí para el TP alcanza con el log (requisito de la Entrega 2)
        break;

      default:
        // Para cualquier otro evento que no manejemos, respondemos OK para que Stripe no reintente eternamente
        console.log(`[Webhook] Evento no manejado: ${event.type}`);
    }

    return { received: true };
  }
}
