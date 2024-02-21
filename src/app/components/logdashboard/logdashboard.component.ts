import { Component, OnInit } from '@angular/core';
import { Item } from '../../interface/item.interface';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-logdashboard',
  templateUrl: './logdashboard.component.html',
  styleUrl: './logdashboard.component.css',
})
export class LogdashboardComponent implements OnInit {
  items: Item[] = [];
  selectedItem: any;

  constructor(public itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }

  selectItem(item: Item): void {
    this.selectedItem = item;
  }
}
