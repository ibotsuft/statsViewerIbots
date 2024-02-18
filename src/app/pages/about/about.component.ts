import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PrettyJsonPipe } from '../../prettyjson.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PrettyJsonPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  jsonData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const jsonFilePath = '../../assets/example.json';

    this.http.get(jsonFilePath).subscribe(
      (data: any) => {
        this.jsonData = data;
      },
      (error) => {
        console.error('Error fetching JSON:', error);
      }
    );
  }
}
