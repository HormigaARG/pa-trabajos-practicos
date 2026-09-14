import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //Creamos la app habilitando rawBody: true (vital para que el webhook de Stripe funcione y verifique la firma)
  const app = await NestFactory.create(AppModule, { rawBody: true });

  //Activamos el ValidationPipe global con las reglas de seguridad exigidas por el TP
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Rechaza con error 400 si envían propiedades extra
    }),
  );

  //Configuramos el puerto sugerido por el TP (3003 o el del .env)
  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`Payments Microservice running on port: ${port}`);
}
bootstrap();
