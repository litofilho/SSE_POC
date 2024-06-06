import { Controller, Get, Sse, OnModuleInit } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { WebSocket } from 'ws';

@Controller('sse')
export class SseController implements OnModuleInit {
  private eventSubject: Subject<MessageEvent> = new Subject<MessageEvent>();
  private ws: WebSocket;

  onModuleInit() {
    this.connectWebSocket();
  }

  private connectWebSocket() {
    this.ws = new WebSocket('');

    this.ws.on('open', () => {
      console.log('Connected to WebSocket server');
    });

    this.ws.on('message', (data: Buffer) => {
        console.log('message')
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

  @Get()
  @Sse()
  sendEvents(): Observable<MessageEvent> {
    if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send('New SSE connection');
        console.log('connect')
      } else {
        console.error('WebSocket is not open');
      }
    return this.eventSubject.asObservable();
  }
}
