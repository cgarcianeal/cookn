import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RecipesComponent} from './_components/articles/recipes/recipes.component';
import {DiscussionsComponent} from './_components/articles/discussions/discussions.component';
import {ConceptsComponent} from './_components/articles/concepts/concepts.component';
import {FullArticleComponent} from './_components/full-article/full-article.component';
import {SearchComponent} from './_components/search/search.component';
import {AccountComponent} from './_components/account/account.component';


const routes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'discussions', component: DiscussionsComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: 'article/:id', component: FullArticleComponent },
  { path: '',   redirectTo: '/recipes', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
