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
  @Output() selectedPosition: EventEmitter<any> = new EventEmitter();
  rows: any = [];
  shipPositions: any = [];

  constructor() {}

  handleBackground = (elementType: string): string => {
    if (elementType === 'hitship') {
      return 'hit';
    }
    else if (elementType === 'unknown') {
      return 'unknown'
    }
    else if (elementType === 'hitempty') {
      return 'water';
    } else {
      return '';
    }
  }
  // createTestCells = (length = 8) => {
  //   const rowsTotal = length;
  //   const cellsInRowTotal = length;
  //   let testData: any = [];

  //   for (let i = 0; i < rowsTotal; i++) {
  //     testData.push([])
  //     for (let j = 0; j < cellsInRowTotal; j++) {
  //       testData[i].push(new Position(i, j));
  //     }
  //   }

  //   return testData;
  // }

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
    this.rows = this.gameBoard;
    // this.service.getLastHighScore();
    // this.gameBoard.forEach((s: Ship) => s.getPositions().forEach(ss => this.shipPositions.push(ss)));
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
