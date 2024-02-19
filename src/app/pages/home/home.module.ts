import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home.component';
import { OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { PlayersStatsComponent } from '../../components/players-stats/players-stats.component';
import { Subscription } from 'rxjs';
import { FileShareService } from '../../services/file-share.service';
import { GroupmatchesModule } from '../../components/groupmatches/groupmatches.module';
import { LogdashboardModule } from '../../components/logdashboard/logdashboard.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    MatButtonToggleModule,
    MatButtonModule,
    PlayersStatsComponent,
    GroupmatchesModule,
    LogdashboardModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
