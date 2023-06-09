import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TypeOfPlayerBoardElement } from '../../models/TypeOfObject';
import { PlayerGameBoardPosition } from '../../models/position';

@Component({
  selector: 'app-ship-placing',
  templateUrl: './ship-placing.component.html',
  styleUrls: ['./ship-placing.component.css']
})
export class ShipPlacingComponent implements OnInit {
  @Output() phaseClose: EventEmitter<any> = new EventEmitter();
  @Input() username: string = '';
  rows: any = [];

  setShips = () => {
    this.phaseClose.emit(true);
    // this.gameServive.setShips()
  }

  handleBackground = (elementType: string): string => {
    if (elementType === 'ship') {
      return 'ship'
    } else if (elementType === 'water') {
      return 'water';
    } else {
      return '';
    }
  }

  createPlayerBoard = (length = 10) => {
    // if (!this.mockedShipsOfPlayer) {
    //   return;
    // }

    const rowsTotal = length;
    const cellsInRowTotal = length;

    // const shipPositions = ships.map((s: Ship) => s.getPositions());
    const shipPositions: any = [];
    // this.mockedShipsOfPlayer.forEach((s: Ship) => s.getPositions().forEach(ss => shipPositions.push(ss)));
    // console.log("Player:", shipPositions);
    
    let board: any = [];

    for (let i = 0; i < rowsTotal; i++) {
      board.push([])
      for (let j = 0; j < cellsInRowTotal; j++) {
        board[i].push(new PlayerGameBoardPosition(i, j,  TypeOfPlayerBoardElement.Water));
      }
    }

    return board;
  }

  constructor() {
  }
  ngOnInit(): void {
    this.rows = this.createPlayerBoard();
  }
}
