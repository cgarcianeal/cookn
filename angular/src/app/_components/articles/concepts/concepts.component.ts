import { Component, OnInit } from '@angular/core';
import {ArticlesComponent} from '../articles.component';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.css']
})
export class ConceptsComponent implements OnInit {

  //constructor() { }


  private collectionName = 'Concepts';

  ngOnInit() {
  }

}
