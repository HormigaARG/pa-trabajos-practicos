import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import type { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  //Inyectamos el PaymentsService para poder usar su lógica de negocio aquí
  constructor(private readonly paymentsService: PaymentsService) {}

  //Endpoint POST para crear la sesión de pago en Stripe (Entrega 1)
  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  //Ruta de apoyo GET para cuando el pago es exitoso (redirección de Stripe)
  @Get('success')
  paymentSuccess() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  //Ruta de apoyo GET para cuando el pago es cancelado (redirección de Stripe)
  @Get('cancel')
  paymentCancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }

  // Endpoint POST para recibir las notificaciones (webhooks) de Stripe
  @Post('webhook')
  async stripeWebhook(@Req() req: Request) {
    return this.paymentsService.stripeWebhook(req);
  }
}
