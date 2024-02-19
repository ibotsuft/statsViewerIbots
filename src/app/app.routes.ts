import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CsvsaverComponent } from './pages/csvsaver/csvsaver.component';
import { IbotsdataComponent } from './pages/ibotsdata/ibotsdata.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'csvsaver', component: CsvsaverComponent },
  { path: 'ibotsdata', component: IbotsdataComponent },
];
