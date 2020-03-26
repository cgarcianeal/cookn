import { Component, OnInit } from '@angular/core';
import {ArticlesComponent} from '../articles.component';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent extends ArticlesComponent implements OnInit {

  //constructor() { }

  ngOnInit() {
  }

}
