import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../model/recipe';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RecipeServiceService } from 'src/app/services/recipe-service.service';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {

  recipe_in_progress: Recipe;
  mode_access: String;
  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeServiceService) {
    this.recipe_in_progress = Recipe.createBlank();
    console.log(this.recipe_in_progress);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('recipe_id') != null) {
        console.log(params.get('recipe_id'));
        this.mode_access = 'MODIFICATION';
        this.recipeService.getRecipeById(parseInt(params.get('recipe_id'), 10)).subscribe(
          (response) => {
            this.recipe_in_progress = response;
          }
        )
      } else {
        this.mode_access = 'AJOUT';
        console.log('Good');
      }
      //this.recipe_in_progress = this.findRecipeById(parseInt(params.get('recipe_id'), 10));
    });
  }

  addIngredientPressed(): void {
    if (!this.recipe_in_progress.ingredients) {
      this.recipe_in_progress.ingredients = [{ ingredient: null, measure: null }];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null });
    }
  }

  addInstructionPressed(): void {
    if (!this.recipe_in_progress.instructions) {
      this.recipe_in_progress.instructions = [{ instruction: null, photo: null }];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null });
    }
  }

  removeIngredientAtIndex(index): void {
    this.recipe_in_progress.ingredients.splice(index, 1);
  }

  removeInstructionAtIndex(index): void {
    this.recipe_in_progress.instructions.splice(index, 1);
  }

  public addRecipeClicked(): void {
    this.addRecipe(this.recipe_in_progress);
  }

  public addUpdateRecipeClicked(): void {
    if (this.mode_access === 'MODIFICATION') {
      this.updateRecipe(this.recipe_in_progress);
    } else {
      this.addRecipe(this.recipe_in_progress);
    }
  }

  public updateRecipe(recipe: Recipe): void {
    this.recipeService.updateRecipe(this.recipe_in_progress).subscribe(
      (response) => {
        this.router.navigateByUrl('/recipes');

      }
    );
  }

  public addRecipe(recipe: Recipe): void {
    this.recipeService.createRecipe(this.recipe_in_progress).subscribe(
      (response) => {
        this.router.navigateByUrl('/recipes');

      }
    );

  }

}
