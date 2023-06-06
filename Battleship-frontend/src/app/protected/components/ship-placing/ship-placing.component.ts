import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ship-placing',
  templateUrl: './ship-placing.component.html',
  styleUrls: ['./ship-placing.component.css']
})
export class ShipPlacingComponent {
  @Output() phaseClose: EventEmitter<any> = new EventEmitter();
  setShips = () => {
    this.phaseClose.emit(true);
    // this.gameServive.setShips()
  }

  constructor() {
  }
}
