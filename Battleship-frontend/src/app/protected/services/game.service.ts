import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
import { Environments } from 'src/app/environments';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // socket: null | Socket = null;
  joindToCreatedGame: boolean = true;
  isWon: boolean = false;
  isLost: boolean = false;

  constructor(private http: HttpClient) { }

  // connect() {
  //   this.socket = io(Environments.SOCKET_ENDPOINT);
  // }

  countingHitsOnOpponent = (hits: number, ships: number, total: number) => {
    if (hits >= total) {
      this.isWon = true;
    } 
    if (ships >= total) {
      this.isLost = true;
    } 
  }

  getOppenent = () => {
    console.log("getOpponent()");
    this.joindToCreatedGame = true;
  }

  createGame = () => {
    this.joindToCreatedGame = false;
  }
}
