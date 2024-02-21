import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvSampleService {
  csvSampleOne = '../../assets/data/rcssserver.csv';
  csvSampleTwo = '../../assets/data/rcssserver.csv';

  constructor(private http: HttpClient) {}

  getCsvFiles(): Observable<any[]> {
    const csvOne$ = this.http.get(this.csvSampleOne, { responseType: 'text' });
    const csvTwo$ = this.http.get(this.csvSampleTwo, { responseType: 'text' });

    return forkJoin([csvOne$, csvTwo$]);
  }
}
