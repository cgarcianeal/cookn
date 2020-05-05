import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { ArticlesComponent } from './_components/articles/articles.component';
import { RecipesComponent } from './_components/articles/recipes/recipes.component';
import { DiscussionsComponent } from './_components/articles/discussions/discussions.component';
import { ConceptsComponent } from './_components/articles/concepts/concepts.component';
import { FullArticleComponent } from './_components/full-article/full-article.component';
import { SearchComponent } from './_components/search/search.component';
import { AccountComponent } from './_components/account/account.component';
import { RegisterComponent } from './_components/register/register.component';
import { LoginComponent } from './_components/login/login.component';
import { AddEditComponent } from './_components/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    RecipesComponent,
    DiscussionsComponent,
    ConceptsComponent,
    FullArticleComponent,
    SearchComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
