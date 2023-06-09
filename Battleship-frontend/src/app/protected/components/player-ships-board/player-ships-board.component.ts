import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Position, ShipPosition } from 'src/app/protected/models/position';
import { Ship } from 'src/app/protected/models/ship';

@Component({
  selector: 'player-ships-board',
  templateUrl: './player-ships-board.component.html',
  styleUrls: ['./player-ships-board.component.css']
})
export class PlayerShipsBoardComponent {
  @Input() gameBoard = [];
  @Input() isOpponentTurn: boolean = false;
  @Output() selectedPosition: EventEmitter<any> = new EventEmitter();
  rows: any = [];
  shipPositions: any = [];

  constructor() {}

  createTestCells = (length = 8) => {
    const rowsTotal = length;
    const cellsInRowTotal = length;
    let testData: any = [];

    for (let i = 0; i < rowsTotal; i++) {
      testData.push([])
      for (let j = 0; j < cellsInRowTotal; j++) {
        testData[i].push(new Position(i, j));
      }
    }

    return testData;
  }

  handleBackground = (elementType: string): string => {
    if (elementType === 'hitship') {
      return 'hit';
    }
    else if (elementType === 'hitempty') {
      return 'missed'
    }
    else if (elementType === 'ship') {
      return 'ship'
    }
    else if (elementType === 'water') {
      return 'water';
    } else {
      return '';
    }
  }

  // fillWithTestCells = (length: number = 8, ships: Ship[]): void => {
  //   if (!ships) {
  //     return;
  //   }

  //   const rowsTotal = length;
  //   const cellsInRowTotal = length;

  //   // const shipPositions = ships.map((s: Ship) => s.getPositions());
  //   const shipPositions: any = [];
  //   ships.forEach((s: Ship) => s.getPositions().forEach(ss => shipPositions.push(ss)));
  //   console.log(shipPositions);
    

  //   let board: any = [];

  //   for (let i = 0; i < rowsTotal; i++) {
  //     board.push([])
  //     for (let j = 0; j < cellsInRowTotal; j++) {
  //       // const shipPos = ships.find();
  //       board[i].push(new Position(i, j));
  //     }
  //   }

  //   return board;
  // }

  ngOnInit(): void {
    // this.rows = this.fillWithTestCells(10, this.gameBoard);
    // this.service.getLastHighScore();
    this.rows = this.gameBoard;
    // this.gameBoard.forEach((s: Ship) => s.getPositions().forEach(ss => this.shipPositions.push(ss)));
  }

  // fire(e: any) {
  //   const rowIndex = e.target.getAttribute('row-index');
  //   const cellIndex = e.target.getAttribute('cell-index');
  //   this.selectedPosition.emit(new Position(rowIndex, cellIndex));
  // }

  isPosShip(i: number, j: number): boolean {
    return this.shipPositions.filter((sp: Position) => sp.getXPos() === i && sp.getYPos() === j).length > 0;
  }
}
