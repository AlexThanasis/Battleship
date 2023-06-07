import { Component, EventEmitter, Output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  @Output() phaseClose: EventEmitter<any> = new EventEmitter();
  getOpponent = () => {
    this.phaseClose.emit(true);
    this.gameServive.getOppenent()
  }

  //npm i uuid
  constructor(private gameServive: GameService, private router: Router) {}

  createGame() {
    // const uuid = uuidv4();
    const uuid = 1;
    console.log(uuid);
    this.router.navigate(['/protected/game', uuid]);
  }
}
