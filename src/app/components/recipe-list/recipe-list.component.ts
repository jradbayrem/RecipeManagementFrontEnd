import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Recipe } from '../../model/recipe';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

 

  recipes: Recipe[];

  recipe_in_progress: Recipe;

  constructor(private router: Router, private recipeService: RecipeServiceService) {


    this.getAllRecipes();


  }

  public getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((response) => {
      console.log(response['_body']);
      this.recipes = response;
      console.log(this.recipes);
    });
  }
  public addRecipeClicked() {
    console.log(JSON.stringify(this.recipe_in_progress, null, 2));
    this.recipes.unshift(this.recipe_in_progress);
    this.recipe_in_progress = Recipe.createBlank();
  }

  userClickedOnRecipe(recipe_id): void {
    this.router.navigateByUrl('/recipes/' + recipe_id);
  }

  addNewRecipePressed(): void {
    this.router.navigateByUrl('/editnewrecipe');
  }

}
