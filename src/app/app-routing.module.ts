import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {RecipesComponent} from './_components/articles/recipes/recipes.component';
import {DiscussionsComponent} from './_components/articles/discussions/discussions.component';
import {ConceptsComponent} from './_components/articles/concepts/concepts.component';


const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'discussions', component: DiscussionsComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
