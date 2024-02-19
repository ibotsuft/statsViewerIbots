import { Component } from '@angular/core';
import { GroupmatchesModule } from '../../components/groupmatches/groupmatches.module';

@Component({
  selector: 'app-csvsaver',
  standalone: true,
  imports: [GroupmatchesModule],
  templateUrl: './csvsaver.component.html',
  styleUrl: './csvsaver.component.css',
})
export class CsvsaverComponent {}
