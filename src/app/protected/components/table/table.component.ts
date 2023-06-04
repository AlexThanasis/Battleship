import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Position, ShipPosition } from 'src/app/protected/models/position';
import { Ship } from 'src/app/protected/models/ship';
// import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() gameBoard = [];
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

  fillWithTestCells = (length: number = 8, ships: Ship[]): void => {
    if (!ships) {
      return;
    }

    const rowsTotal = length;
    const cellsInRowTotal = length;

    // const shipPositions = ships.map((s: Ship) => s.getPositions());
    const shipPositions: any = [];
    ships.forEach((s: Ship) => s.getPositions().forEach(ss => shipPositions.push(ss)));
    console.log(shipPositions);
    

    let board: any = [];

    for (let i = 0; i < rowsTotal; i++) {
      board.push([])
      for (let j = 0; j < cellsInRowTotal; j++) {
        // const shipPos = ships.find();
        board[i].push(new Position(i, j));
      }
    }

    return board;
  }

  ngOnInit(): void {
    this.rows = this.fillWithTestCells(10, this.gameBoard);
    // this.service.getLastHighScore();
    this.gameBoard.forEach((s: Ship) => s.getPositions().forEach(ss => this.shipPositions.push(ss)));
  }

  fire(e: any) {
    const rowIndex = e.target.getAttribute('row-index');
    const cellIndex = e.target.getAttribute('cell-index');
    this.selectedPosition.emit(new Position(rowIndex, cellIndex));
  }

  isPosShip(i: number, j: number): boolean {
    return this.shipPositions.filter((sp: Position) => sp.getXPos() === i && sp.getYPos() === j).length > 0;
  }
  
}
