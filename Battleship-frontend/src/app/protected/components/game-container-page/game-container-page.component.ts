import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from 'src/app/protected/models/player';

import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from "../../models/ship";
import { Observable, map, catchError, tap } from 'rxjs';
import { ShipPosition } from 'src/app/protected/models/position';

@Component({
  selector: 'game-container-page',
  templateUrl: './game-container-page.component.html',
  styleUrls: ['./game-container-page.component.css']
})
export class GameContainerPageComponent implements OnInit {
  player: Player | null = null;
  opponent: Player | null = null;

  // liveData$ = this.service.messages$.pipe(
  //   map(rows => rows.data),
  //   catchError(error => { throw error }),
  //   tap(
  //     {
  //       error: error => console.log('[Live component] Error:', error),
  //       complete: () => console.log('[Live component] Connection Closed')
  //     }
  //   )
  // );
  
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
          new ShipPosition(2, 0),
          new ShipPosition(3, 0),
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
    
  }

}
