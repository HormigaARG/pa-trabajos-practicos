import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { validate } from './config/env.validation';

@Module({
  imports: [
    //Cargamos el .env a nivel global (isGlobal) para que cualquier módulo use process.env.
    //Además le pasamos la función validate: si falta alguna variable, fail-fast y la app NO arranca.
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
    }),
    UsersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
