import { Component, OnInit } from '@angular/core';
import {ArticlesComponent} from '../articles.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent extends ArticlesComponent implements OnInit{

  // constructor() { }

  ngOnInit() {
  }

}
