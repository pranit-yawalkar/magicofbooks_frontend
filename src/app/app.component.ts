import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'magicofbooks_frontend';

  showMenu!: boolean;
  constructor(private shared: SharedService) { }
  ngOnInit(): void {
    this.getSharedData();
  }

  getSharedData() {
    this.shared.getData().subscribe(data => {
      this.showMenu = data;
    })
  }
}
