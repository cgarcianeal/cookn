import { Component, OnInit } from '@angular/core';
import {ArticlesComponent} from '../articles.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  private collectionName = 'Recipes';

  // constructor() { }

  ngOnInit() {
  }

}
