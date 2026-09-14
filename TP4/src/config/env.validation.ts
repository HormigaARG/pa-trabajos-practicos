import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';

// Clase que valida las variables de entorno al arrancar (fail-fast).
// Si falta alguna o está mal formada, la app NO arranca (requisito del TP).
class EnvironmentVariables {
  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  STRIPE_SECRET: string;

  @IsUrl({ require_tld: false })
  STRIPE_SUCCESS_URL: string;

  @IsUrl({ require_tld: false })
  STRIPE_CANCEL_URL: string;

  @IsString()
  STRIPE_ENDPOINT_SECRET: string;
}

// Función que se pasa a ConfigModule.forRoot({ validate }).
// Recibe el objeto plano del .env, lo valida con class-validator y devuelve la config tipada.
export function validate(config: Record<string, unknown>) {
  // Convertimos el objeto crudo del .env en una instancia de la clase decorada
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  // Obtenemos los errores de validación; si hay alguno, cortamos el arranque (fail-fast)
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false, // las que no están cuentan como error
  });

  if (errors.length > 0) {
    throw new Error(
      `Configuración inválida en .env: ${errors.toString()}`,
    );
  }

  // Devuelvo la config ya validada y tipada para que el resto de la app la use
  // (retorno y dejo disponible validatedConfig; el retorno es del tipo esperado por Nest).
  return validatedConfig;
}
