import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditNewRecipeComponent } from './components/edit-new-recipe/edit-new-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeSummaryComponent } from './components/recipe-summary/recipe-summary.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { SummarizePipePipe } from './pipes/summarize-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    EditNewRecipeComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    RecipeSummaryComponent,
    SummarizePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'editnewrecipe',
        component: EditNewRecipeComponent
      },
      {
        path: 'recipes',
        component: RecipeListComponent
      },
      {
        path: 'recipes/:recipe_id',
        component: RecipeDetailsComponent
      },
      {
        path: 'editnewrecipe/:recipe_id',
        component: EditNewRecipeComponent
      },
      {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
