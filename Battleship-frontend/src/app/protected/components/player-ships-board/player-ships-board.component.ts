import { Component, Input } from '@angular/core';

@Component({
  selector: 'player-ships-board',
  templateUrl: './player-ships-board.component.html',
  styleUrls: ['./player-ships-board.component.css']
})
export class PlayerShipsBoardComponent {
  @Input() gameBoard = [];
}
