import { Component, OnInit } from '@angular/core';
import {ArticlesComponent} from '../articles.component';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent extends ArticlesComponent implements OnInit {

  //constructor() { }

  ngOnInit() {
  }

}
