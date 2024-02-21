// item.service.ts
import { Injectable } from '@angular/core';
import { Item } from './interface/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  getItems(): Item[] {
    console.log('getItems() called');
    return [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
      { id: '4', label: 'Item 4' },
      { id: 'config', label: 'Setup' },
    ];
  }

  getItemById(id: string): Item | undefined {
    return this.getItems().find((item) => item.id === id);
  }
}
