import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  // isGameInitializationPhase = false;
  isGameNamingPhase = true;
  isShipSetPhase = false;
  isGamePhase = false;
  username = '';

  // constructor() {}
  messages: string[] = [];
  newMessage: string = "";

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    // this.webSocketService.listen('message').subscribe((data: any) => {
    //   console.log(data);
    //   this.messages.push(data);
    // });
  }

  getOpponentPhaseClose(close: boolean) {
    // this.isGameInitializationPhase = false;
    this.isShipSetPhase = true;
  }

  shipSetPhaseClose(close: boolean) {
    this.isShipSetPhase = false;
    this.isGamePhase = true;
  }

  // sendMessage() {
  //   this.webSocketService.emit('message', this.newMessage);
  //   this.newMessage = '';
  // }

  getUsername() {
    this.isShipSetPhase = true;
    this.isGameNamingPhase = false;
    this.webSocketService.setUserName(this.username);
    localStorage.setItem("playername",this.username);
  }
}
