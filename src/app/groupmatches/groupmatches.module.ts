import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { GroupmatchesComponent } from './groupmatches.component';

@NgModule({
  declarations: [GroupmatchesComponent],
  imports: [CommonModule],
  exports: [GroupmatchesComponent],
})
export class GroupmatchesModule {}
