import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;
  currentUser = "Alice";

  constructor(private router: Router, private data : DataService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
  }

  ngOnInit() {
    // this.currentUser = this.data.currentUser;
    
  }

}
