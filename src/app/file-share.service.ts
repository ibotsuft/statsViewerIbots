import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileShareService {
  private selectedFileSubject: BehaviorSubject<File | null> =
    new BehaviorSubject<File | null>(null);
  selectedFile$: Observable<File | null> =
    this.selectedFileSubject.asObservable();

  constructor() {}

  setSelectedFile(file: File | null): void {
    this.selectedFileSubject.next(file);
  }
}
