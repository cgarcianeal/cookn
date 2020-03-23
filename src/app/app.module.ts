import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { ArticlesComponent } from './_components/articles/articles.component';
import { RecipesComponent } from './_components/articles/recipes/recipes.component';
import { DiscussionsComponent } from './_components/articles/discussions/discussions.component';
import { ConceptsComponent } from './_components/articles/concepts/concepts.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    RecipesComponent,
    DiscussionsComponent,
    ConceptsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
