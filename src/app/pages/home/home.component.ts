import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { PlayersStatsComponent } from '../../components/players-stats/players-stats.component';
import { Subscription } from 'rxjs';
import { FileShareService } from '../../file-share.service';
import { GroupmatchesModule } from '../../components/groupmatches/groupmatches.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatButtonModule,
    PlayersStatsComponent,
    GroupmatchesModule,
  ],
  templateUrl: './home.component.html',
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
          this.http.get('../../assets/example.json').subscribe((jsonData) => {
            this.data = jsonData;
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
      this.data = JSON.parse(reader.result as string);
    };

    reader.readAsText(file);
  }
}
