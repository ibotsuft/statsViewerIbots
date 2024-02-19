import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  selectedItem: string = 'Item 1';

  getSelectedItem(): string {
    return this.selectedItem;
  }

  setSelectedItem(item: string): void {
    this.selectedItem = item;
  }
}
