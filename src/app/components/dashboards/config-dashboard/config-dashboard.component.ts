import { Component, OnInit } from '@angular/core';
import { CsvSampleService } from '../../../services/csv-samples.service';

@Component({
  selector: 'app-config-dashboard',
  templateUrl: './config-dashboard.component.html',
  styleUrl: './config-dashboard.component.css',
})
export class ConfigDashboardComponent implements OnInit {
  csvData: string[][] = [];

  constructor(private csvFiles: CsvSampleService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.csvFiles.getCsvFiles().subscribe((data) => {
      data.forEach((csvFile) => {
        const lines = csvFile.split('\n');
        const rows: string[] = [];

        lines.forEach((line: string) => {
          rows.push(line);
        });

        this.csvData.push(rows);
      });
    });
  }
}
