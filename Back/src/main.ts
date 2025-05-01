import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde cualquier origen
  app.enableCors();

  // Usar validación global con ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()  // Agregar autenticación por Bearer Token (si es necesario)
    .setTitle('Backend API Nest')  // Título del API
    .setDescription('Backend API Nest')  // Descripción del API
    .setVersion('1.0')  // Versión de la API
    .addTag('Api Rest')  // Etiqueta para agrupar las rutas
    .build();

  const document = SwaggerModule.createDocument(app, config);  // Crear el documento de Swagger
  SwaggerModule.setup('api', app, document);  // Rutas de Swagger en el endpoint '/api'

  // Escuchar el puerto 3000
  await app.listen(3000);
}

bootstrap();
