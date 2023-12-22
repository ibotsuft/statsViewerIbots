import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { PlayersStatsComponent } from '../players-stats/players-stats.component';
import { Subscription } from 'rxjs';
import { FileShareService } from '../file-share.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonToggleModule, MatButtonModule, PlayersStatsComponent],
  template: `
    <main class="content">
      <section class="general">
        <h2 style="text-align: center;">Match Stats</h2>
        <div>
          <table>
            <thead>
              <th>{{ data.ourTeamName }}</th>
              <th>Stat</th>
              <th>{{ data.opponentTeamName }}</th>
            </thead>
            <tbody>
              <tr>
                <td>{{ data.ourNumberGoals }}</td>
                <td>Goals</td>
                <td>{{ data.opponentNumberGoals }}</td>
              </tr>
              <tr>
                <td>{{ data.shots.ourShots }}</td>
                <td>Shots</td>
                <td>{{ data.shots.opponentShots }}</td>
              </tr>
              <tr>
                <td>{{ data.shots.ourShotsOnTarget }}</td>
                <td>Shots On Goal</td>
                <td>{{ data.shots.opponentShotsOnTarget }}</td>
              </tr>
              <tr>
                <td>{{ data.passes.ourPasses }}</td>
                <td>Passes</td>
                <td>{{ data.passes.opponentPasses }}</td>
              </tr>
              <tr>
                <td>{{ data.passes.ourCorrectPasses }}</td>
                <td>Corrected Passes</td>
                <td>{{ data.passes.opponentCorrectPasses }}</td>
              </tr>
              <tr>
                <td>{{ data.passes.ourMissedPasses }}</td>
                <td>Missed Passes</td>
                <td>{{ data.passes.opponentMissedPasses }}</td>
              </tr>
              <tr>
                <td>{{ data.passes.ourPercentualCorrectedPasses }}%</td>
                <td>Passes Precision</td>
                <td>{{ data.passes.opponentPercentualCorrectedPasses }}%</td>
              </tr>
              <tr>
                <td>{{ data.ballPossession.ourBallPossession }}</td>
                <td>Time with Ball Possession</td>
                <td>{{ data.ballPossession.opponentBallPossession }}</td>
              </tr>
              <tr>
                <td>{{ data.ballPossession.ourBallPossessionPercentual }}</td>
                <td>Time with Ball Possession %</td>
                <td>
                  {{ data.ballPossession.opponentBallPossessionPercentual }}
                </td>
              </tr>
              <tr>
                <td>{{ data.ourFouls }}</td>
                <td>Fouls</td>
                <td>{{ data.opponentFouls }}</td>
              </tr>
              <tr>
                <td>{{ data.ourCorners }}</td>
                <td>Corners</td>
                <td>{{ data.opponentCorners }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <!-- <app-players-stats></app-players-stats> -->
    </main>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private fileSubscription: Subscription = new Subscription();
  data: any;

  constructor(
    private http: HttpClient,
    private fileShareService: FileShareService
  ) {}

  ngOnInit() {
    this.fileSubscription = this.fileShareService.selectedFile$.subscribe(
      (selectedFile) => {
        if (selectedFile) {
          this.readUploadedFile(selectedFile);
        } else {
          // Make an HTTP request to fetch the default JSON data
          this.http.get('../../assets/example.json').subscribe((jsonData) => {
            this.data = jsonData;
            console.log('Received default JSON data:', this.data);
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.fileSubscription.unsubscribe();
  }

  readUploadedFile(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Parse the JSON data from the uploaded file
      this.data = JSON.parse(reader.result as string);
      console.log('Received uploaded JSON data:', this.data);
    };

    reader.readAsText(file);
  }
}
