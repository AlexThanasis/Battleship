import { Component, Input } from '@angular/core';
import { Position } from 'src/app/protected/models/position';

@Component({
  selector: 'player-fire-board',
  templateUrl: './player-fire-board.component.html',
  styleUrls: ['./player-fire-board.component.css']
})
export class PlayerFireBoardComponent {
  @Input() gameBoard = [];
  selectedPosition: any | Position;

  fireOnSelectedPosition(position: Position): void {
    console.log("Fire on position: ", position.getXPos(), position.getYPos());
    this.selectedPosition = position;
  }

}
