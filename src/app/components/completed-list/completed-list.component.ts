import { Component, OnInit } from '@angular/core';
import { CompletedItem } from 'src/app/models/completed-item';
import { CompletedlistService } from 'src/app/services/completedlist.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})
export class CompletedListComponent implements OnInit {
  completedList!: CompletedItem[];
  constructor(private completedlistService: CompletedlistService) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.completedlistService.getAllItems().subscribe(data => {
      console.log(data);
      this.completedList = data;
    }, err => {
      console.log(err);
    })
  }
}
