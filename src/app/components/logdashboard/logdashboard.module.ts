import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogdashboardComponent } from './logdashboard.component';
import { ContentModule } from '../content/content.module';
import { OnInit } from '@angular/core';
import { ConfigDashboardModule } from '../config-dashboard/config-dashboard.module';

import { ItemService } from '../../item.service';

@NgModule({
  declarations: [LogdashboardComponent],
  imports: [CommonModule, ContentModule, ConfigDashboardModule],
  exports: [LogdashboardComponent],
})
export class LogdashboardModule {}
