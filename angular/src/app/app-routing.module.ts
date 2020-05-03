import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {RecipesComponent} from './_component/articles/recipes/recipes.component';
import {DiscussionsComponent} from './_component/articles/discussions/discussions.component';
import {SearchComponent} from './_component/search/search.component';
import {ConceptsComponent} from './_component/articles/concepts/concepts.component';
import {AccountComponent} from './_component/account/account.component';
import {FullArticleComponent} from './_component/full-article/full-article.component';


const routes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard] },
  { path: 'recipes',   redirectTo: '', pathMatch: 'full' },
  { path: 'discussions', component: DiscussionsComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: 'article/:id', component: FullArticleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]} },
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
