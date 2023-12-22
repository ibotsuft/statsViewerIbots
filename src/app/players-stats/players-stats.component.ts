import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-players-stats',
  standalone: true,
  imports: [MatButtonToggleModule, MatButtonModule],
  templateUrl: './players-stats.component.html',
  styleUrl: './players-stats.component.css',
})
export class PlayersStatsComponent {}
