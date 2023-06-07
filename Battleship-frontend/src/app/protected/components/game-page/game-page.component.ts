import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  // isGameInitializationPhase = false;
  isShipSetPhase = false;
  isGamePhase = false;

  ngOnInit(): void {
    // this.isGameInitializationPhase = true;
    this.isShipSetPhase = true;
  }

  getOpponentPhaseClose(close: boolean) {
    // this.isGameInitializationPhase = false;
    this.isShipSetPhase = true;
  }

  shipSetPhaseClose(close: boolean) {
    this.isShipSetPhase = false;
    this.isGamePhase = true;
  }
}
