import { Component, EventEmitter, Output } from '@angular/core';
import { GameService } from '../../services/game.service';

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

  constructor(private gameServive: GameService) {}
}
