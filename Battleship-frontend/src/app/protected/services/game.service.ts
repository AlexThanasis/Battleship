import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Environments } from 'src/app/environments';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socket: null | Socket = null;

  constructor(private http: HttpClient) { }

  connect() {
    this.socket = io(Environments.SOCKET_ENDPOINT);
  }

  getOppenent = () => {
    console.log("getOpponent()");
    // this.http.post
  }
}
