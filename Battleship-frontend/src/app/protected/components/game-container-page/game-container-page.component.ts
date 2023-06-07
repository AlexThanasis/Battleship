import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from 'src/app/protected/models/player';

import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat, Ship } from "../../models/ship";
import { TypeOfPlayerBoardElement, TypeOfOpponentBoardElement } from "../../models/TypeOfObject";
import { Observable, map, catchError, tap } from 'rxjs';
import { OpponentGameBoardPosition, PlayerGameBoardPosition, ShipPosition, Position } from 'src/app/protected/models/position';

@Component({
  selector: 'game-container-page',
  templateUrl: './game-container-page.component.html',
  styleUrls: ['./game-container-page.component.css']
})
export class GameContainerPageComponent implements OnInit {
  player: Player | null = null;
  opponent: Player | null = null;
  selectedPosition: any | Position;

  isPlayerTurn: boolean = true;
  isOpponentTurn: boolean = false;

  playerBoard: any = [];
  opponentBoard: any = [];

  switchTurn = (): void => {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.isOpponentTurn = !this.isOpponentTurn;

    
    this.isOpponentTurn && this.mockOpponentMove();
  } 

  mockOpponentMove = (): void => {
    setTimeout(() => {
      const x = Math.floor((Math.random() * 9) + 1);
      const y = Math.floor((Math.random() * 9) + 1);

      this.opponentFire(new Position(x, y), this.playerBoard);
      this.switchTurn();
    }, 3000); 
  }

  opponentFire = (position: Position, playerBoard: PlayerGameBoardPosition[][]): void => {
    console.log("Fire on position: ", position);
    
    const firedAtPos = playerBoard[position.getXPos()][position.getYPos()]
    firedAtPos && firedAtPos.setIsHit();
    
    console.log("Fire on position: ", firedAtPos, playerBoard);
  }
    
  fireOnSelectedPosition(position: Position): void {
    console.log("Fire on position: ", position.getXPos(), position.getYPos());
    this.switchTurn();
    this.selectedPosition = position;
    this.updateOpponentBoard();
  }

  isPosShip(shipPositions: any, i: number, j: number): boolean {
    console.log(shipPositions.length)
    return shipPositions.filter((sp: Position) => sp.getXPos() === i && sp.getYPos() === j).length > 0;
  }

  createPlayerBoard = (length = 10) => {
    if (!this.mockedShipsOfPlayer) {
      return;
    }

    const rowsTotal = length;
    const cellsInRowTotal = length;

    // const shipPositions = ships.map((s: Ship) => s.getPositions());
    const shipPositions: any = [];
    this.mockedShipsOfPlayer.forEach((s: Ship) => s.getPositions().forEach(ss => shipPositions.push(ss)));
    // console.log("Player:", shipPositions);
    
    let board: any = [];

    for (let i = 0; i < rowsTotal; i++) {
      board.push([])
      for (let j = 0; j < cellsInRowTotal; j++) {
        board[i].push(new PlayerGameBoardPosition(i, j, this.isPosShip(shipPositions, i, j) ? TypeOfPlayerBoardElement.Ship : TypeOfPlayerBoardElement.Water));
      }
    }

    return board;
  }

  updateOpponentBoard = () => {
    console.log(this.opponentBoard[this.selectedPosition.getYPos()][this.selectedPosition.getXPos()]);
    const x = this.selectedPosition.getXPos();
    const y = this.selectedPosition.getYPos();
    this.opponentBoard[x][y].setIsHit();
  }

  createOpponentBoard = (length = 10) => {
    if (!this.mockedShipsOfPlayer) {
      return;
    }

    const rowsTotal = length;
    const cellsInRowTotal = length;

    const shipPositions: any = [];
    this.mockedShipsOfOpponent.forEach((s: Ship) => s.getPositions().forEach(ss => shipPositions.push(ss)));
    // console.log("Opponent's:", shipPositions);

    let board: any = [];

    for (let i = 0; i < rowsTotal; i++) {
      board.push([])
      for (let j = 0; j < cellsInRowTotal; j++) {
        // const shipPos = ships.find();
        // console.log("O's:", i, j, this.isPosShip(shipPositions, i, j));

        board[i].push(new OpponentGameBoardPosition(i, j, this.isPosShip(shipPositions, i, j), TypeOfOpponentBoardElement.Unknown));
      }
    }
    console.log(board);

    return board;
  }



  
  playerShips = [];
  mockedShipsOfPlayer: any = [];
  mockedShipsOfOpponent: any = [];
  // availablePlayers = [];

  // constructor(private service: ApiServiceService) {}
  constructor() {
    // this.service.connect();
    }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    /*this.service.getAvailablePlayers().subscribe(
      data => {
        this.availablePlayers.push(data);
      }
    )*/

    
    this.player = new Player("A player");
    this.opponent = new Player("B player");
    
    this.mockedShipsOfPlayer.push(
      new PatrolBoat(
        [
          new ShipPosition(0, 0),
          new ShipPosition(1, 0),
        ]
      )
    )
    this.mockedShipsOfPlayer.push(
      new Submarine(
        [
          new ShipPosition(3, 0),
          new ShipPosition(4, 0),
        ]
      )
    )
    
    this.mockedShipsOfPlayer.push(
      new Destroyer(
        [
          new ShipPosition(8, 8),
          new ShipPosition(7, 8),
          new ShipPosition(6, 8),
        ]
      )
    )
    
    this.mockedShipsOfPlayer.push(
      new Battleship(
        [
          new ShipPosition(3, 3),
          new ShipPosition(3, 4),
          new ShipPosition(3, 5),
          new ShipPosition(3, 6),
        ]
      )
    )
    
    this.mockedShipsOfPlayer.push(
      new Carrier(
        [
          new ShipPosition(5, 1),
          new ShipPosition(5, 2),
          new ShipPosition(5, 3),
          new ShipPosition(5, 4),
          new ShipPosition(5, 5),
        ]
      )
    )
    

    this.mockedShipsOfOpponent.push(
      new PatrolBoat(
        [
          new ShipPosition(0, 0),
          new ShipPosition(1, 0),
        ]
      )
    )
    this.mockedShipsOfOpponent.push(
      new Submarine(
        [
          new ShipPosition(2, 0),
          new ShipPosition(3, 0),
        ]
      )
    )
    
    this.mockedShipsOfOpponent.push(
      new Destroyer(
        [
          new ShipPosition(8, 8),
          new ShipPosition(7, 8),
          new ShipPosition(6, 8),
        ]
      )
    )
    
    this.mockedShipsOfOpponent.push(
      new Battleship(
        [
          new ShipPosition(3, 3),
          new ShipPosition(3, 4),
          new ShipPosition(3, 5),
          new ShipPosition(3, 6),
        ]
      )
    )
    
    this.mockedShipsOfOpponent.push(
      new Carrier(
        [
          new ShipPosition(5, 1),
          new ShipPosition(5, 2),
          new ShipPosition(5, 3),
          new ShipPosition(5, 4),
          new ShipPosition(5, 5),
        ]
      )
    )
    
    this.playerBoard = this.createPlayerBoard();
    this.opponentBoard = this.createOpponentBoard();
  }

}
