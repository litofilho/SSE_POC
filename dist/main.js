"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const https = require("https");
const express = require('express');
async function bootstrap() {
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept',
    });
    const httpsOptions = {
        key: fs.readFileSync('/home/carloscoelho/projects/ouribank/sse-api/server.key'),
        cert: fs.readFileSync('/home/carloscoelho/projects/ouribank/sse-api/server.cert'),
    };
    const httpsServer = https.createServer(httpsOptions, server);
    await app.init();
    httpsServer.listen(3000, () => {
        console.log('NestJS server running with HTTP/2 on https://localhost:3000');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map