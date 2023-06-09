import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly uri: string = 'http://localhost:3000';
  username: string = '';

  // messages: string[] = [];
  // newMessage: string = "";

  constructor() {
    this.socket = io(this.uri);

    // this.socket.on('message', (message: string) => {
    //   this.messages.push(message);
    // });
   }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  setUserName(name: string) {
    this.username = name;
  }
}
