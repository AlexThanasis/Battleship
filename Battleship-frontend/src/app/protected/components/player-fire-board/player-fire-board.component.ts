import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Position, ShipPosition } from 'src/app/protected/models/position';
import { Ship } from 'src/app/protected/models/ship';

@Component({
  selector: 'player-fire-board',
  templateUrl: './player-fire-board.component.html',
  styleUrls: ['./player-fire-board.component.css']
})
export class PlayerFireBoardComponent {
  @Input() gameBoard = [];
  @Input() isPlayerTurn: boolean = false;
  @Output() selectedPosition: EventEmitter<any> = new EventEmitter();
  rows: any = [];
  shipPositions: any = [];

  constructor() {}

  handleBackground = (elementType: string): string => {
    if (elementType === 'hitship') {
      return 'hit';
    } else if (elementType === 'unknown') {
      return 'unknown'
    } else if (elementType === 'hitempty') {
      return 'water';
    } else {
      return '';
    }
  }


  ngOnInit(): void {
    this.rows = this.gameBoard;
  }

  fire(e: any) {
    console.log("###");
    
    const rowIndex = e.target.getAttribute('row-index');
    const cellIndex = e.target.getAttribute('cell-index');
    this.selectedPosition.emit(new Position(rowIndex, cellIndex));
  }

  isPosShip(i: number, j: number): boolean {
    return this.shipPositions.filter((sp: Position) => sp.getXPos() === i && sp.getYPos() === j).length > 0;
  }

}
