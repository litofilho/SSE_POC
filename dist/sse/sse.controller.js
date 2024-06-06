"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const ws_1 = require("ws");
let SseController = class SseController {
    constructor() {
        this.eventSubject = new rxjs_1.Subject();
    }
    onModuleInit() {
        this.connectWebSocket();
    }
    connectWebSocket() {
        this.ws = new ws_1.WebSocket('wss://staging-socket.ourinvestdigital.com.br/pusher?system=trader&rates=true&authorization=eyJraWQiOiIwVFwvZTV4c2xKYkZ5aW0wOW51SmV6alZpSWF5K2ZrRitBUXgrXC9qOFwvNjBBPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoibks4TllfdU1OLXNndXdqNHVfT2QtUSIsInN1YiI6IjVjZjgwMDkwLWY5M2UtNGU1ZC1iNDI3LWU5ODJmY2YxZWRhYiIsImNvZ25pdG86Z3JvdXBzIjpbInNhLWVhc3QtMV9nVG1GOWN5RkFfQXp1cmUtQUQtT3VyaW52ZXN0Il0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnNhLWVhc3QtMS5hbWF6b25hd3MuY29tXC9zYS1lYXN0LTFfZ1RtRjljeUZBIiwiY29nbml0bzp1c2VybmFtZSI6ImF6dXJlLWFkLW91cmludmVzdF90YWxpdGhhLnJvZHJpZ3Vlc0BvdXJpbnZlc3QuY29tLmJyIiwibm9uY2UiOiJPUzg2QmM4U0xmRzdRRm9NNFZlNVRjQUdFNGtadk9yanpZek8xTEFXQjVyZHJDTkh3cFdMVm1YTXBmQ09HbUFuZDBuY0o1UXpiS1VNVGtueG5OR2xsSjVrYXFsc01aNWpxSFpicDlTQi1qeUhVZmZBVVVqMGdfbV83YXhkMEl6ZGYwdzNrV29hZDhiN1drZG4tYTJ0Yk04NFM0VmY5XzdCa25NbGxtdmpmSGMiLCJvcmlnaW5fanRpIjoiMjcwN2IwMzQtZjMwMi00YzUzLWIyY2ItNzE4M2Q4ZDhlNWYyIiwiYXVkIjoiNjFicHA5MHBiYW9lMzBscGg5a2EzamVtaGYiLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiJ0YWxpdGhhLnJvZHJpZ3Vlc0BvdXJpbnZlc3QuY29tLmJyIiwicHJvdmlkZXJOYW1lIjoiQXp1cmUtQUQtT3VyaW52ZXN0IiwicHJvdmlkZXJUeXBlIjoiU0FNTCIsImlzc3VlciI6Imh0dHBzOlwvXC9zdHMud2luZG93cy5uZXRcLzIyMzgyMGRmLTlkOTUtNDdiMC1hZmQ0LWM2Y2Y2ZjI3Mjk3ZlwvIiwicHJpbWFyeSI6InRydWUiLCJkYXRlQ3JlYXRlZCI6IjE3MTUyODQxNjU3MDEifV0sInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzE3Njc4NDA0LCJleHAiOjE3MTc2ODIwMDQsImlhdCI6MTcxNzY3ODQwNCwianRpIjoiZjhjYjAwMWMtMzQ3MS00YWQ2LTg1MzktNWU3ZWRkY2FmMTgyIiwiZW1haWwiOiJ0YWxpdGhhLnJvZHJpZ3Vlc0BvdXJpYmFuay5jb20ifQ.xjzc_eZNZRg4XUSFOfSDrOFxdN6CbeRVfZC7CaDlslMowUkS_lTlimuPCd_NPlgEmM0PacsXJxQacf0jpBbJt87oWmd7OTjHkoswK8OXsRD9IZNTPXwYrb6iJCy9M1R8-L-DhcmEpU1zO5rko7YKZ4x4GkewFVv1fHAVJYHEjY_DSQ0Pf_TLdTux5k3YChLNePtFBivLI25IaPcKM3UFTtc2CZ3nng_8aBdY8-X4Wo2xHi6bnFs-lRWcYV8AMP7fNM7Hwgd7LrXGxN1aXQoS1O-dasvV0NBdlqG7K8ygtcsEkFXfVZg9UsgF7-tutXQjQvoCN1yYtT-JL401NoBynw');
        this.ws.on('open', () => {
            console.log('Connected to WebSocket server');
        });
        this.ws.on('message', (data) => {
            console.log('message');
            const message = data.toString();
            this.eventSubject.next(new MessageEvent('message', { data: message }));
        });
        this.ws.on('close', () => {
            console.log('Disconnected from WebSocket server');
            setTimeout(() => this.connectWebSocket(), 5000);
        });
        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error.message);
        });
    }
    sendEvents() {
        if (this.ws.readyState === ws_1.WebSocket.OPEN) {
            this.ws.send('New SSE connection');
            console.log('connect');
        }
        else {
            console.error('WebSocket is not open');
        }
        return this.eventSubject.asObservable();
    }
};
exports.SseController = SseController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Sse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], SseController.prototype, "sendEvents", null);
exports.SseController = SseController = __decorate([
    (0, common_1.Controller)('sse')
], SseController);
//# sourceMappingURL=sse.controller.js.map