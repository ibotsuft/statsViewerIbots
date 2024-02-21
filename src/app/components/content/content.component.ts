import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Item } from '../../interface/item.interface';

@Component({
  selector: 'app-content',
  template: '<div>{{ selectedItem }}</div>',
})
export class ContentComponent implements OnInit {
  @Input() item: Item | undefined;
  selectedItem!: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.selectedItem = this.dataService.getSelectedItem();
  }
}
