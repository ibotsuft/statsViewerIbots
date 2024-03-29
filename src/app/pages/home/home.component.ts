import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FileShareService } from '../../services/file-share.service';

@Component({
  selector: 'app-home',
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
