import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Role} from "./_models/role";
import {AuthGuard} from "./_services/auth-guard.service";

import {RecipesComponent} from './_components/articles/recipes/recipes.component';
import {DiscussionsComponent} from './_components/articles/discussions/discussions.component';
import {ConceptsComponent} from './_components/articles/concepts/concepts.component';
import {FullArticleComponent} from './_components/full-article/full-article.component';
import {AccountComponent} from './_components/account/account.component';
import {LoginComponent} from "./_components/login/login.component";
import {RegisterComponent} from "./_components/register/register.component";
import {AddEditComponent} from "./_components/add-edit/add-edit.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: 'discussions', component: DiscussionsComponent, canActivate: [AuthGuard] },
  { path: 'concepts', component: ConceptsComponent, canActivate: [AuthGuard] },
  { path: 'account/:user', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'article/:collection/:id', component: FullArticleComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddEditComponent, canActivate: [AuthGuard] },
  { path: 'edit/:collection/:id', component: AddEditComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: 'recipes', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
