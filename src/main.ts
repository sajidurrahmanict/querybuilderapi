/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */

//* eslint-disable prettier/prettier */
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Global Validation Pipe - critical for DTOs to work properly
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,               // strips unrecognized properties
//       forbidNonWhitelisted: true,    // throws error for extra properties
//       transform: true,               // transforms input types using class-transformer
//     }),
//   );

//   // Swagger Configuration
//   const config = new DocumentBuilder()
//     .setTitle('My API')
//     .setDescription('API documentation for my project')
//     .setVersion('1.0')
//     .addTag('features')
//     .build();
// // in main.ts or app.module.ts setup
// app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//   prefix: '/uploads/',
// });
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document); // Swagger UI served at /api
//   app.enableCors();
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Create the Nest app as an Express-based app to enable static assets serving
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Apply global validation pipe for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Strip properties that do not have decorators
      forbidNonWhitelisted: true,   // Throw an error if non-whitelisted properties are found
      transform: true,              // Automatically transform payloads to DTO instances
    }),
  );

  // Serve the uploads folder as static assets at the /uploads route prefix
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Swagger configuration for API docs
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my project')
    .setVersion('1.0')
    .addTag('features')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors();

  // Start listening on the specified port (default 3000)
  const port = process.env.PORT ?? 3090;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();

