import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SseController implements OnModuleInit {
    private eventSubject;
    private ws;
    onModuleInit(): void;
    private connectWebSocket;
    sendEvents(): Observable<MessageEvent>;
}
