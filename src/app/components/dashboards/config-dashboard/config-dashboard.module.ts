import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigDashboardComponent } from './config-dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ConfigDashboardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [ConfigDashboardComponent],
})
export class ConfigDashboardModule {}
