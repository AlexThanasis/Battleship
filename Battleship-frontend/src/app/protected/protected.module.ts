import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './components/game-page/game-page.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { GameContainerPageComponent } from './components/game-container-page/game-container-page.component';
import { PlayerShipsBoardComponent } from './components/player-ships-board/player-ships-board.component';
import { PlayerFireBoardComponent } from './components/player-fire-board/player-fire-board.component';
import { ShipPlacingComponent } from './components/ship-placing/ship-placing.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    GamePageComponent,
    GameContainerPageComponent,
    PlayerShipsBoardComponent,
    PlayerFireBoardComponent,
    ShipPlacingComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class ProtectedModule { }
