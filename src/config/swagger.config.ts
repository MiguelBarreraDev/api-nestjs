import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRM Multilab')
  .setDescription('The CRM Multilab api description')
  .addBearerAuth(
    {
      description: `Please enter token JWT`,
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    },
    'access-token',
  )
  .setVersion('1.0')
  .addTag('App')
  .addTag('Authentication')
  .addTag('Users')
  .addTag('Panel de control (View)')
  .addTag('Departamento')
  .addTag('Provincia')
  .addTag('Distrito')
  .addTag('Centro Medico')
  .addTag('Visita Medica')
  .addTag('Hitos')
  .addTag('Hitos contacto')
  .addTag('Tareas')
  .addTag('Tareas Categorías')
  .addTag('Tipos de contacto')
  .addTag('Groups')
  .build();
