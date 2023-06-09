import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from 'src/app/protected/models/player';

import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat, Ship } from "../../models/ship";
import { TypeOfPlayerBoardElement, TypeOfOpponentBoardElement } from "../../models/TypeOfObject";
import { Observable, map, catchError, tap } from 'rxjs';
import { OpponentGameBoardPosition, PlayerGameBoardPosition, ShipPosition, Position } from 'src/app/protected/models/position';
import { WebSocketService } from '../../services/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'game-container-page',
  templateUrl: './game-container-page.component.html',
  styleUrls: ['./game-container-page.component.css']
})
export class GameContainerPageComponent implements OnInit {
  player: Player | null = null;
  opponent: Player | null = null;
  selectedPosition: any | Position;
  totalShips: number = 15;

  gameId: number | null = 0;

  isPlayerTurn: boolean = !this.gameService.joindToCreatedGame;
  isOpponentTurn: boolean = this.gameService.joindToCreatedGame;

  playerBoard: any = [];
  opponentBoard: any = [];

  constructor(private weSocketService: WebSocketService, private gameService: GameService, private route: ActivatedRoute) {}

  switchTurn = (): void => {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.isOpponentTurn = !this.isOpponentTurn;
  } 

  // mockOpponentMove = (): void => {
  //   setTimeout(() => {
  //     const x = Math.floor((Math.random() * 9) + 1);
  //     const y = Math.floor((Math.random() * 9) + 1);

  //     this.opponentFire(new Position(x, y), this.playerBoard);
  //     this.switchTurn();
  //   }, 3000); 
  // }

  isEndOfGame = (): string => {
    if (this.gameService.isWon) {
      return "You have won the game!"
    } else if (this.gameService.isLost) {
      return "You have lost the game!"
    } else {
      return ''
    }
  }

  opponentFire = (position: Position, playerBoard: PlayerGameBoardPosition[][]): string => {
    console.log("Fire on position: ", position);
    
    const firedAtPos = playerBoard[position.getXPos()][position.getYPos()]
    firedAtPos && firedAtPos.setIsHit();
    
    console.log("Fire on position: ", firedAtPos, playerBoard);
    this.switchTurn();
    return firedAtPos.getElementType();
  }
    
  fireOnSelectedPosition(position: Position): void {
    console.log("Fire on position: ", position.getXPos(), position.getYPos());
    this.switchTurn();
    this.selectedPosition = position;
    this.weSocketService.emit('game', `Fire x:${position.getXPos()}, y:${position.getYPos()}; p:${this.weSocketService.username}`)
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
      board.push([]);
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

  getHits = (): number => {
    if (!this.playerBoard || this.playerBoard?.length === 0) {
      return 0;
    }
    let hitShips = 0;
    this.opponentBoard.forEach((row: any) => {
      console.log("row ", row)
      hitShips += row.filter((el: any) => el.getElementType() === TypeOfOpponentBoardElement.HitShip).length;
    });

    return hitShips;
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
        board[i].push(new OpponentGameBoardPosition(i, j, this.isPosShip(shipPositions, i, j), TypeOfOpponentBoardElement.Unknown));
      }
    }
    console.log(board);

    return board;
  }

  getShipsPoint = (): number => {
    if (!this.playerBoard || this.playerBoard?.length === 0) {
      return -1;
    }
    let ships: number = -1;
    // let hitShips: number = 1;
    this.playerBoard.forEach((row: any) => {
      // hitShips += row.filter((el: any) => el.getElementType() === TypeOfPlayerBoardElement.HitShip).length;
      ships += row.filter((el: any) => el.getElementType() === TypeOfPlayerBoardElement.Ship).length;
    });

    return ships; 
  }

  playerShips = [];
  mockedShipsOfPlayer: any = [];
  mockedShipsOfOpponent: any = [];

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    // this.weSocketService.listen(`game ${this.gameId}`, ).subscribe((data: any) => {
    this.weSocketService.listen(`game`).subscribe((data: any) => {
      if (!this.opponent) {
        this.opponent = new Player(data.slice(12));
        console.log(this.opponent.getName());
        this.weSocketService.emit('game', `Hello, I am your opponent, ${this.player?.getName()}`);
      }

      if(data.startsWith('Hello, I am your opponent')) {
        this.opponent = new Player(data.slice(12));
        console.log(this.opponent.getName());
      }

      if (data.startsWith('Fire') && this.opponent && this.isOpponentTurn && data.split("p:")[1] !== this.player?.getName()) {
        const x = data.substring(data.indexOf('x:') + 2, data.indexOf(','));
        const y = data.substring(data.indexOf('y:') + 2, data.indexOf(';'));
        console.log("X: ", x)
        console.log("Y: ", y)
        console.log("P: ", data.split("p:")[1])
        const typeOfPos = this.opponentFire(new Position(+x, +y), this.playerBoard);
        this.weSocketService.emit('game', `Answer, ${typeOfPos}`);
      }

      console.log(data);
    });
    
    this.player = new Player(this.weSocketService.username ?? 'Player');
    this.weSocketService.emit('game', `Hello, I am ${this.player?.getName()}`);
    
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
