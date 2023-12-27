import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groupmatches',
  templateUrl: './groupmatches.component.html',
  styleUrl: './groupmatches.component.css',
})
export class GroupmatchesComponent implements OnInit {
  data: any;
  dataJson: any;
  csvFileTest: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExampleDirectory();
    console.log('Data in ngOnInit:', this.data);
  }

  loadExampleDirectory(): void {
    const csvFilePath = '../../assets/test_directory/rcssserver.csv';

    this.http.get(csvFilePath, { responseType: 'text' }).subscribe(
      (data: any) => {
        // Assuming `data` is a string containing CSV content
        const blob = new Blob([data], { type: 'text/csv' });
        this.csvFileTest = new File([blob], 'rcssserver.csv', {
          type: 'text/csv',
        });

        const reader = new FileReader();

        reader.onload = (e) => {
          // Parse CSV content
          const csvContent: string = reader.result as string;
          const rows: string[] = csvContent.split('\n');

          // Process header row
          const headers = rows[0].split(',');

          // Process data rows
          const dataRows: string[][] = [];
          for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',');

            // Skip rows with null values
            if (rowData.some((value) => value.trim() === 'null')) {
              continue;
            }

            dataRows.push(rowData);
          }

          const columnsToKeep = [0, 1, 2, 5, 6];
          const filteredHeaders = headers.filter((_, index) =>
            columnsToKeep.includes(index)
          );
          const filteredDataRows = dataRows.map((row) =>
            row.filter((_, index) => columnsToKeep.includes(index))
          );

          // Update data property with CSV data
          this.data = {
            headers: filteredHeaders,
            rows: filteredDataRows,
          };

          console.log('Data after loading:', this.data);
          // Now, call the renderTable method
          this.renderTable(filteredHeaders, filteredDataRows);
        };

        reader.readAsText(this.csvFileTest);
      },
      (error) => {
        console.error('Error fetching CSV:', error);
      }
    );
  }

  renderTable(filteredHeaders: string[], filteredDataRows: string[][]): void {
    // Check if both data.headers and data.rows are defined
    if (this.data && this.data.headers && this.data.rows) {
      // Update data property with CSV data
      this.data = {
        headers: filteredHeaders,
        rows: filteredDataRows,
      };

      console.log('Data after loading:', this.data);
    }
  }

  getFilesList(directoryPath: string): Observable<string[]> {
    return this.http.get<string[]>(directoryPath);
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  processFiles(files: FileList): void {
    let csvFile: File | null = null;
    const jsonFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const fileType: string = file.name.split('.').pop()?.toLowerCase() || '';

      if (fileType === 'csv') {
        csvFile = file;
      } else if (fileType === 'json') {
        jsonFiles.push(file);
      }
    }

    if (!csvFile || jsonFiles.length === 0) {
      alert('Please select at least one CSV file and one JSON file.');
      return;
    }

    // Process CSV file content and display table
    this.processCsvFile(csvFile);

    // Process JSON files content and display table
    this.processJsonFiles(jsonFiles);
  }

  processCsvFile(csvFile: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Parse CSV content
      const csvContent: string = reader.result as string;
      const rows: string[] = csvContent.split('\n');

      // Process header row
      const headers = rows[0].split(',');
      // only 0, 1, 2, 5, 6

      // Process data rows
      const dataRows: string[][] = [];
      for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',');

        // Skip rows with null values
        if (rowData.some((value) => value.trim() === 'null')) {
          continue;
        }

        dataRows.push(rowData);
      }

      const columnsToKeep = [0, 1, 2, 5, 6];
      const filteredHeaders = headers.filter((_, index) =>
        columnsToKeep.includes(index)
      );
      const filteredDataRows = dataRows.map((row) =>
        row.filter((_, index) => columnsToKeep.includes(index))
      );

      // Update data property with CSV data
      this.data = {
        headers: filteredHeaders,
        rows: filteredDataRows,
      };

      console.log(filteredHeaders);
      console.log(filteredDataRows);
      console.log(this.data);
    };
    reader.readAsText(csvFile);
  }

  processJsonFiles(jsonFiles: File[]): void {
    jsonFiles.forEach((jsonFile) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonContent = JSON.parse(reader.result as string);
          const headers = Object.keys(jsonContent);
          const dataJson = Object.values(jsonContent);

          console.log(dataJson);

          this.dataJson = {
            headers: headers,
          };
        } catch (error) {
          console.error(
            `Erro ao analisar o arquivo ${jsonFile.name}: ${error}`
          );
        }
      };

      // Lê o conteúdo do arquivo como texto
      reader.readAsText(jsonFile);
    });
  }
}
