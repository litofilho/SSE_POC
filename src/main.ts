import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as https from 'https';

const express = require('express');

async function bootstrap() {
  // Configuração do Express para NestJS
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Habilitar CORS (ajuste conforme necessário)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  // Carregar os certificados SSL/TLS
  const httpsOptions = {
    key: fs.readFileSync('/home/carloscoelho/projects/ouribank/sse-api/server.key'),
    cert: fs.readFileSync('/home/carloscoelho/projects/ouribank/sse-api/server.cert'),
  };

  // Criar servidor HTTP/2 usando o módulo https com HTTP/2 habilitado
  const httpsServer = https.createServer(httpsOptions, server);

  await app.init();
  
  // Iniciar o servidor HTTP/2
  httpsServer.listen(3000, () => {
    console.log('NestJS server running with HTTP/2 on https://localhost:3000');
  });
}

bootstrap();
